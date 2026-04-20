// Manar Electro — Tech Assistant streaming chat via Lovable AI Gateway

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

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages, language } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const langNote =
      language === "en"
        ? "\n\nThe user prefers English. Reply in English."
        : language === "fr"
        ? "\n\nL'utilisateur préfère le français. Répondez en français."
        : "\n\nالمستخدم يفضل العربية. أجب بالعربية الفصحى البسيطة.";

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT_AR + langNote },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "rate_limit" }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "payment_required" }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "gateway_error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "unknown" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
