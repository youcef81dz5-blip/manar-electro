import { createClient } from "@supabase/supabase-js";
import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "list_tv_apps",
  title: "List TV apps",
  description:
    "List the TV apps published by Manar Electro (name, description, image, download URL, free-or-subscription flag, and subscription note).",
  inputSchema: {
    only_free: z.boolean().optional().describe("If true, return only free apps."),
    limit: z.number().int().min(1).max(200).optional(),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ only_free, limit }) => {
    const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!);
    let q = supabase.from("tv_apps").select("*").limit(limit ?? 100);
    if (only_free) q = q.eq("is_free", true);
    const { data, error } = await q;
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data ?? []) }],
      structuredContent: { apps: data ?? [] },
    };
  },
});
