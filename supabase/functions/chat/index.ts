// Manar Electro — Tech Assistant streaming chat via Google Gemini API (user's key)

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT_AR = `أنت "مساعد منار إلكترو" — مساعد تقني افتراضي يعمل لصالح محل إلكترونيات وخدمات تقنية اسمه Manar Electro في الجزائر.
تخصصات المحل:
- بيع و إصلاح الهواتف الذكية واللوحات.
- بيع TV Box وسيرفرات IPTV / أكواد القنوات.
- تركيب كاميرات المراقبة (CCTV) للمنازل والمحلات.
- تركيب الأنظمة السمعية للمساجد (مكبرات، ميكروفون، أمبليفاير).
- خدمة تحويل الأشرطة (الكاسيت) إلى ملفات رقمية على USB.

أسلوبك:
- قدم الحلول خطوة بخطوة، بسيطة وعملية.
- اذكر أن الفحص النهائي يتم في المحل عند الحاجة.
- لا تقدّم وعوداً قانونية أو ضمانات نهائية.
- إذا سُئلت من أنت، أجب: "أنا مساعد منار إلكترو التقني".
- أجب بلغة المستخدم (العربية، الإنجليزية، أو الفرنسية).`;

const MODEL = "gemini-2.0-flash";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages, language } = await req.json();
    const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
    if (!GEMINI_API_KEY) throw new Error("GEMINI_API_KEY not configured");

    const langNote =
      language === "en"
        ? "\n\nThe user prefers English. Reply in English."
        : language === "fr"
        ? "\n\nL'utilisateur préfère le français. Répondez en français."
        : "\n\nالمستخدم يفضل العربية. أجب بالعربية الفصحى البسيطة.";

    // Convert OpenAI-style messages to Gemini "contents" format
    const contents = (messages as Array<{ role: string; content: string }>).map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:streamGenerateContent?alt=sse&key=${GEMINI_API_KEY}`;

    const upstream = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT_AR + langNote }] },
        contents,
      }),
    });

    if (!upstream.ok || !upstream.body) {
      const t = await upstream.text();
      console.error("Gemini error:", upstream.status, t);
      if (upstream.status === 429) {
        return new Response(JSON.stringify({ error: "rate_limit" }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (upstream.status === 401 || upstream.status === 403) {
        return new Response(JSON.stringify({ error: "invalid_api_key" }), {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      return new Response(JSON.stringify({ error: "gateway_error", detail: t }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Transform Gemini SSE -> OpenAI-compatible SSE so the frontend doesn't change.
    const reader = upstream.body.getReader();
    const decoder = new TextDecoder();
    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        let buffer = "";
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });

            let nl: number;
            while ((nl = buffer.indexOf("\n")) !== -1) {
              let line = buffer.slice(0, nl);
              buffer = buffer.slice(nl + 1);
              if (line.endsWith("\r")) line = line.slice(0, -1);
              if (!line.startsWith("data: ")) continue;
              const json = line.slice(6).trim();
              if (!json) continue;
              try {
                const parsed = JSON.parse(json);
                const text =
                  parsed?.candidates?.[0]?.content?.parts
                    ?.map((p: { text?: string }) => p.text ?? "")
                    .join("") ?? "";
                if (text) {
                  const payload = {
                    choices: [{ delta: { content: text } }],
                  };
                  controller.enqueue(
                    encoder.encode(`data: ${JSON.stringify(payload)}\n\n`),
                  );
                }
              } catch (e) {
                console.error("parse error:", e, json);
              }
            }
          }
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch (e) {
          console.error("stream error:", e);
          controller.error(e);
        }
      },
    });

    return new Response(stream, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "unknown" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
