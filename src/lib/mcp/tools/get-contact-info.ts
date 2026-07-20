import { defineTool } from "@lovable.dev/mcp-js";

const CONTACT = {
  shop_name: "Manar Electro",
  location: "Béchar, Algeria",
  phone: "+213671995077",
  whatsapp: "https://wa.me/213671995077",
  facebook: "https://www.facebook.com/manardjm",
  tiktok: "https://www.tiktok.com/@merabtihouari",
  maps: "https://maps.app.goo.gl/VxhXsABYR4CxAN3E7",
  coordinates: { lat: 31.617842, lng: -2.207584 },
};

export default defineTool({
  name: "get_contact_info",
  title: "Get shop contact info",
  description: "Return Manar Electro's public contact details: phone, WhatsApp, Facebook, TikTok, map location, and coordinates.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(CONTACT) }],
    structuredContent: CONTACT,
  }),
});
