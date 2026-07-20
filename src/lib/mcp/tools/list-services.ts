import { defineTool } from "@lovable.dev/mcp-js";

const SERVICES = [
  { id: "phone_repair", name: { ar: "إصلاح الهواتف", en: "Phone Repair", fr: "Réparation téléphone" }, startingPrice: "1,500 DA" },
  { id: "tv_box_setup", name: { ar: "تهيئة TV Box و السيرفرات", en: "TV Box & Server Setup", fr: "Configuration TV Box & serveurs" }, startingPrice: "1,000 DA" },
  { id: "cctv_installation", name: { ar: "تركيب كاميرات المراقبة", en: "CCTV Installation", fr: "Installation CCTV" } },
  { id: "mosque_audio_installation", name: { ar: "تركيب الأنظمة السمعية للمساجد", en: "Mosque Audio Installation", fr: "Installation audio de mosquée" } },
  { id: "cassette_to_usb", name: { ar: "تحويل أشرطة VHS إلى USB/DVD", en: "VHS to USB/DVD Conversion", fr: "Conversion VHS vers USB/DVD" } },
];

export default defineTool({
  name: "list_services",
  title: "List services",
  description: "List the technical services Manar Electro offers, with multilingual names and starting price when available.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(SERVICES) }],
    structuredContent: { services: SERVICES },
  }),
});
