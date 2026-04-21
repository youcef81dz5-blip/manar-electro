// Static catalog for MVP — products, services, categories, contact links.
// Multilingual fields (ar/en/fr) per the data model.

export type CategoryType =
  | "phones"
  | "tv_box"
  | "cctv"
  | "mosque_audio"
  | "conversion_service"
  | "accessories";

export type ServiceType =
  | "phone_repair"
  | "tv_box_setup"
  | "server_renewal"
  | "cctv_installation"
  | "mosque_audio_installation"
  | "cassette_to_usb";

type Tri = { ar: string; en: string; fr: string };

export type Product = {
  id: string;
  category: CategoryType;
  name: Tri;
  shortDescription: Tri;
  price?: string;
  isAvailable: boolean;
  tags: string[];
  emoji: string;
  image?: string;
};

export type Service = {
  id: string;
  type: ServiceType;
  name: Tri;
  description: Tri;
  startingPrice?: string;
  emoji: string;
};

export const SHOP_PHONE = "+213671995077";
export const WHATSAPP_NUMBER = "213671995077"; // no '+' for wa.me

export const contactLinks = {
  whatsapp: `https://wa.me/${WHATSAPP_NUMBER}`,
  facebook: "https://www.facebook.com/manardjm",
  tiktok: "https://www.tiktok.com/@merabtihouari",
  phone: SHOP_PHONE,
};

export const buildWhatsAppLink = (message: string) =>
  `${contactLinks.whatsapp}?text=${encodeURIComponent(message)}`;

// Products are now stored in the database (table: products) and managed via Admin.
export const products: Product[] = [];

export const services: Service[] = [
  {
    id: "s1", type: "phone_repair", emoji: "🔧",
    name: { ar: "إصلاح الهواتف", en: "Phone Repair", fr: "Réparation téléphone" },
    description: {
      ar: "تغيير الشاشات، البطاريات، حل مشاكل البرمجيات لكل أنواع الهواتف.",
      en: "Screen & battery replacement, software fixes for all phone brands.",
      fr: "Remplacement écran/batterie, dépannage logiciel pour tous les téléphones.",
    },
    startingPrice: "1,500 DA",
  },
  {
    id: "s2", type: "tv_box_setup", emoji: "📺",
    name: { ar: "تهيئة TV Box و السيرفرات", en: "TV Box & Server Setup", fr: "Configuration TV Box & serveurs" },
    description: {
      ar: "تركيب وتفعيل أكواد IPTV، حل مشاكل التقطيع وضبط الإعدادات.",
      en: "IPTV code activation, fix buffering, optimal configuration.",
      fr: "Activation IPTV, correction du buffering, configuration optimale.",
    },
    startingPrice: "1,000 DA",
  },
  {
    id: "s3", type: "cctv_installation", emoji: "📹",
    name: { ar: "تركيب كاميرات المراقبة", en: "CCTV Installation", fr: "Installation CCTV" },
    description: {
      ar: "دراسة المكان، تركيب احترافي للكاميرات مع DVR وضبط الوصول عن بعد.",
      en: "Site survey, professional camera install with DVR and remote access.",
      fr: "Étude du site, installation pro avec DVR et accès distant.",
    },
    startingPrice: "—",
  },
  {
    id: "s4", type: "mosque_audio_installation", emoji: "🕌",
    name: { ar: "تركيب أنظمة صوت المساجد", en: "Mosque Audio Installation", fr: "Installation audio mosquée" },
    description: {
      ar: "تصميم وتركيب أنظمة صوت كاملة للمساجد بأعلى جودة.",
      en: "Design & install complete mosque audio systems with top quality.",
      fr: "Conception et installation de systèmes audio complets.",
    },
    startingPrice: "—",
  },
  {
    id: "s5", type: "cassette_to_usb", emoji: "📼",
    name: { ar: "تحويل أشرطة VHS إلى USB/DVD", en: "VHS Tapes to USB/DVD", fr: "Cassettes VHS vers USB/DVD" },
    description: {
      ar: "احفظ ذكرياتك! تحويل أشرطة VHS القديمة إلى USB أو DVD بجودة عالية.",
      en: "Preserve your memories! Convert old VHS tapes to USB or DVD in high quality.",
      fr: "Préservez vos souvenirs ! Conversion des cassettes VHS vers USB ou DVD en haute qualité.",
    },
    startingPrice: "500 DA",
  },
  {
    id: "s6", type: "server_renewal", emoji: "🛰️",
    name: { ar: "تجديد سيرفرات IPTV", en: "IPTV Server Renewal", fr: "Renouvellement serveur IPTV" },
    description: {
      ar: "تجديد فوري لاشتراكات IPTV مع أفضل السيرفرات وأقل تقطيع.",
      en: "Instant IPTV subscription renewal with the best servers.",
      fr: "Renouvellement instantané d'abonnements IPTV.",
    },
    startingPrice: "4,500 DA",
  },
];
