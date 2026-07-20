import { createClient } from "@supabase/supabase-js";
import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "list_products",
  title: "List products",
  description:
    "List Manar Electro's public product catalog (smartphones, TV boxes, CCTV, mosque audio, accessories) with names in Arabic/English/French, price, category, tags, and availability.",
  inputSchema: {
    category: z
      .enum(["phones", "tv_box", "cctv", "mosque_audio", "conversion_service", "accessories"])
      .optional()
      .describe("Optional category filter."),
    limit: z.number().int().min(1).max(200).optional().describe("Max results (default 100)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ category, limit }) => {
    const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!);
    let q = supabase
      .from("products")
      .select("id,category,name_ar,name_en,name_fr,short_ar,short_en,short_fr,price,is_available,tags,emoji,image_url,sort_order")
      .order("sort_order", { ascending: false })
      .limit(limit ?? 100);
    if (category) q = q.eq("category", category);
    const { data, error } = await q;
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data ?? []) }],
      structuredContent: { products: data ?? [] },
    };
  },
});
