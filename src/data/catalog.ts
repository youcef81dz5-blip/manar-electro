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
};

export type Service = {
  id: string;
  type: ServiceType;
  name: Tri;
  description: Tri;
  startingPrice?: string;
  emoji: string;
};

export const SHOP_PHONE = "+213555000000"; // placeholder — admin can change
export const WHATSAPP_NUMBER = "213555000000"; // no '+' for wa.me

export const contactLinks = {
  whatsapp: `https://wa.me/${WHATSAPP_NUMBER}`,
  facebook: "https://facebook.com/manarelectro",
  tiktok: "https://www.tiktok.com/@merabtihouari",
  phone: SHOP_PHONE,
};

export const buildWhatsAppLink = (message: string) =>
  `${contactLinks.whatsapp}?text=${encodeURIComponent(message)}`;

export const products: Product[] = [
  {
    id: "p1", category: "phones", emoji: "📱",
    name: { ar: "هاتف Samsung Galaxy A55", en: "Samsung Galaxy A55", fr: "Samsung Galaxy A55" },
    shortDescription: {
      ar: "شاشة AMOLED 6.6\"، 8GB رام، 256GB تخزين، كاميرا 50MP.",
      en: "6.6\" AMOLED, 8GB RAM, 256GB storage, 50MP camera.",
      fr: "AMOLED 6.6\", 8 Go RAM, 256 Go, caméra 50MP.",
    },
    price: "65,000 DA", isAvailable: true, tags: ["Samsung", "5G", "AMOLED"],
  },
  {
    id: "p2", category: "phones", emoji: "📱",
    name: { ar: "iPhone 13 - 128GB", en: "iPhone 13 - 128GB", fr: "iPhone 13 - 128 Go" },
    shortDescription: {
      ar: "حالة ممتازة، بطارية 90%+، ضمان المحل.",
      en: "Excellent condition, 90%+ battery, shop warranty.",
      fr: "Excellent état, batterie 90%+, garantie magasin.",
    },
    price: "95,000 DA", isAvailable: true, tags: ["Apple", "iPhone"],
  },
  {
    id: "p3", category: "tv_box", emoji: "📺",
    name: { ar: "Xiaomi Mi TV Box S 4K", en: "Xiaomi Mi TV Box S 4K", fr: "Xiaomi Mi TV Box S 4K" },
    shortDescription: {
      ar: "Android TV، دعم 4K HDR، Google Assistant.",
      en: "Android TV, 4K HDR support, Google Assistant.",
      fr: "Android TV, 4K HDR, Google Assistant.",
    },
    price: "12,500 DA", isAvailable: true, tags: ["Android", "4K", "HDR"],
  },
  {
    id: "p4", category: "tv_box", emoji: "🛰️",
    name: { ar: "اشتراك سيرفر IPTV - 12 شهر", en: "IPTV Server - 12 months", fr: "Serveur IPTV - 12 mois" },
    shortDescription: {
      ar: "أكثر من 15,000 قناة وVOD، استقرار عالي، دعم فني.",
      en: "15,000+ channels & VOD, high stability, tech support.",
      fr: "15 000+ chaînes & VOD, haute stabilité, support.",
    },
    price: "4,500 DA", isAvailable: true, tags: ["IPTV", "Server", "Code"],
  },
  {
    id: "p5", category: "cctv", emoji: "📹",
    name: { ar: "كاميرا مراقبة Hikvision 4MP", en: "Hikvision 4MP CCTV", fr: "Caméra Hikvision 4MP" },
    shortDescription: {
      ar: "رؤية ليلية، مقاومة للماء IP67، تركيب احترافي.",
      en: "Night vision, IP67 waterproof, pro installation.",
      fr: "Vision nocturne, étanche IP67, installation pro.",
    },
    price: "8,900 DA", isAvailable: true, tags: ["Hikvision", "4MP", "Outdoor"],
  },
  {
    id: "p6", category: "mosque_audio", emoji: "🕌",
    name: { ar: "نظام صوت كامل للمسجد", en: "Complete Mosque Audio System", fr: "Système audio mosquée" },
    shortDescription: {
      ar: "مكبرات صوت + ميكروفون + أمبليفاير + كابلات وتركيب.",
      en: "Speakers + mic + amplifier + cables + installation.",
      fr: "HP + micro + ampli + câbles + installation.",
    },
    price: "—", isAvailable: true, tags: ["Mosque", "Audio", "Amplifier"],
  },
  {
    id: "p7", category: "conversion_service", emoji: "💾",
    name: { ar: "تحويل الكاسيت إلى USB", en: "Cassette to USB", fr: "Cassette vers USB" },
    shortDescription: {
      ar: "تحويل الأشرطة القديمة إلى ملفات MP3 على فلاش USB.",
      en: "Convert old tapes to MP3 files on a USB flash drive.",
      fr: "Convertissez vos cassettes en MP3 sur clé USB.",
    },
    price: "500 DA / كاسيت", isAvailable: true, tags: ["Cassette", "USB", "MP3"],
  },
  {
    id: "p8", category: "accessories", emoji: "🔌",
    name: { ar: "شاحن سريع 33W", en: "33W Fast Charger", fr: "Chargeur rapide 33W" },
    shortDescription: {
      ar: "متوافق مع معظم الهواتف، ضمان 6 أشهر.",
      en: "Compatible with most phones, 6-month warranty.",
      fr: "Compatible avec la plupart des téléphones, garantie 6 mois.",
    },
    price: "1,800 DA", isAvailable: true, tags: ["Charger", "USB-C"],
  },
];

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
    id: "s5", type: "cassette_to_usb", emoji: "💾",
    name: { ar: "تحويل الكاسيت إلى USB", en: "Cassette to USB", fr: "Cassette vers USB" },
    description: {
      ar: "احفظ ذكرياتك! تحويل الأشرطة القديمة إلى ملفات رقمية بجودة عالية.",
      en: "Preserve your memories! Convert old tapes to high-quality digital files.",
      fr: "Préservez vos souvenirs ! Conversion des cassettes en fichiers numériques.",
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
