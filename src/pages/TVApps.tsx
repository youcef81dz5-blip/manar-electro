import { useI18n } from "@/i18n/I18nProvider";
import { ExternalLink, Globe, ShieldCheck, Tv, Download, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type AppSite = {
  name: string;
  url: string;
  description: { ar: string; en: string; fr: string };
  tags: string[];
  trust: "official" | "trusted" | "community";
};

type Section = {
  id: string;
  title: { ar: string; en: string; fr: string };
  subtitle: { ar: string; en: string; fr: string };
  icon: typeof Globe;
  sites: AppSite[];
};

const sections: Section[] = [
  {
    id: "arabic",
    title: { ar: "مواقع عربية موثوقة", en: "Trusted Arabic Sources", fr: "Sources arabes de confiance" },
    subtitle: {
      ar: "أفضل المواقع العربية لتحميل تطبيقات Smart TV و TV Box",
      en: "Best Arabic websites for Smart TV & TV Box apps",
      fr: "Meilleurs sites arabes pour applications Smart TV & TV Box",
    },
    icon: Star,
    sites: [
      {
        name: "ArabSeed Apps",
        url: "https://www.arabseed.ink/",
        description: {
          ar: "مكتبة عربية ضخمة لتطبيقات وألعاب الأندرويد و Smart TV.",
          en: "Huge Arabic library of Android & Smart TV apps and games.",
          fr: "Grande bibliothèque arabe d'applications Android & Smart TV.",
        },
        tags: ["Android TV", "APK", "AR"],
        trust: "trusted",
      },
      {
        name: "MyEgy Apps",
        url: "https://www.my-egy.com/category/apps/",
        description: {
          ar: "قسم تطبيقات يضم تطبيقات الأندرويد و TV Box بنسخ محدثة.",
          en: "Apps section with up-to-date Android & TV Box apps.",
          fr: "Section apps avec applications Android & TV Box à jour.",
        },
        tags: ["TV Box", "APK", "AR"],
        trust: "trusted",
      },
      {
        name: "Mobizil",
        url: "https://www.mobizil.com/",
        description: {
          ar: "موقع عربي شامل للتطبيقات والشروحات لأجهزة الأندرويد و Smart TV.",
          en: "Comprehensive Arabic site for apps and tutorials for Android & Smart TV.",
          fr: "Site arabe complet pour applications et tutoriels Android & Smart TV.",
        },
        tags: ["Tutorials", "APK", "AR"],
        trust: "trusted",
      },
      {
        name: "Mr-Apk",
        url: "https://mr-apk.com/",
        description: {
          ar: "موقع عربي متخصص في تطبيقات APK مع نسخ معدلة وأصلية.",
          en: "Arabic site specialized in APK files (original & modded).",
          fr: "Site arabe spécialisé dans les fichiers APK (originaux & modifiés).",
        },
        tags: ["APK", "Mod", "AR"],
        trust: "community",
      },
      {
        name: "Egybest Apps",
        url: "https://egy.best/",
        description: {
          ar: "موقع عربي شهير، يحتوي قسم تطبيقات للترفيه والمشاهدة.",
          en: "Popular Arabic site with an apps section for entertainment.",
          fr: "Site arabe populaire avec une section apps pour le divertissement.",
        },
        tags: ["Streaming", "AR"],
        trust: "community",
      },
    ],
  },
  {
    id: "official",
    title: { ar: "المتاجر الرسمية", en: "Official Stores", fr: "Magasins officiels" },
    subtitle: {
      ar: "المصادر الرسمية الأكثر أماناً لتثبيت التطبيقات",
      en: "Safest official sources to install apps",
      fr: "Sources officielles les plus sûres pour installer des applications",
    },
    icon: ShieldCheck,
    sites: [
      {
        name: "Google Play Store",
        url: "https://play.google.com/store/apps",
        description: {
          ar: "المتجر الرسمي لتطبيقات Android TV من جوجل، آمن ومحدث.",
          en: "Official Google store for Android TV apps, safe and up-to-date.",
          fr: "Magasin officiel Google pour applications Android TV.",
        },
        tags: ["Android TV", "Official"],
        trust: "official",
      },
      {
        name: "Amazon Appstore",
        url: "https://www.amazon.com/appstore",
        description: {
          ar: "متجر أمازون الرسمي، يدعم Fire TV و TV Box المتوافقة.",
          en: "Amazon's official store, supports Fire TV & compatible TV Boxes.",
          fr: "Magasin officiel Amazon, prend en charge Fire TV & TV Box compatibles.",
        },
        tags: ["Fire TV", "Official"],
        trust: "official",
      },
      {
        name: "Samsung Smart Hub",
        url: "https://www.samsung.com/global/tv/apps/",
        description: {
          ar: "متجر تطبيقات تلفزيونات سامسونج Tizen الرسمي.",
          en: "Official app store for Samsung Tizen Smart TVs.",
          fr: "Magasin officiel pour Smart TV Samsung Tizen.",
        },
        tags: ["Tizen", "Samsung"],
        trust: "official",
      },
      {
        name: "LG Content Store",
        url: "https://www.lg.com/us/lg-channels",
        description: {
          ar: "متجر تطبيقات تلفزيونات LG webOS الرسمي.",
          en: "Official app store for LG webOS Smart TVs.",
          fr: "Magasin officiel pour Smart TV LG webOS.",
        },
        tags: ["webOS", "LG"],
        trust: "official",
      },
      {
        name: "Huawei AppGallery",
        url: "https://appgallery.huawei.com/",
        description: {
          ar: "متجر هواوي الرسمي، بديل ممتاز لأجهزة بدون خدمات جوجل.",
          en: "Huawei's official store, great alternative for devices without Google services.",
          fr: "Magasin officiel Huawei, excellente alternative sans services Google.",
        },
        tags: ["Huawei", "Official"],
        trust: "official",
      },
    ],
  },
  {
    id: "global",
    title: { ar: "أفضل المواقع العالمية", en: "Top Global Sources", fr: "Meilleures sources mondiales" },
    subtitle: {
      ar: "مواقع عالمية موثوقة ومشهورة لتطبيقات الأندرويد و TV Box",
      en: "Trusted global websites for Android & TV Box apps",
      fr: "Sites mondiaux fiables pour applications Android & TV Box",
    },
    icon: Globe,
    sites: [
      {
        name: "APKMirror",
        url: "https://www.apkmirror.com/",
        description: {
          ar: "الموقع الأكثر موثوقية عالمياً لتحميل APK بنسخها الأصلية مع توقيع التحقق.",
          en: "World's most trusted site for original APKs with signature verification.",
          fr: "Site mondial le plus fiable pour APK originaux avec vérification de signature.",
        },
        tags: ["APK", "Verified"],
        trust: "trusted",
      },
      {
        name: "APKPure",
        url: "https://apkpure.com/",
        description: {
          ar: "موقع عالمي شهير لتحميل تطبيقات أندرويد و Android TV بأمان.",
          en: "Popular global site for safely downloading Android & Android TV apps.",
          fr: "Site mondial populaire pour télécharger en sécurité applications Android & TV.",
        },
        tags: ["APK", "Android TV"],
        trust: "trusted",
      },
      {
        name: "F-Droid",
        url: "https://f-droid.org/",
        description: {
          ar: "متجر تطبيقات مفتوحة المصدر، آمن جداً ومدقق.",
          en: "Open-source apps catalog, very safe and audited.",
          fr: "Catalogue d'applications open-source, très sûr et audité.",
        },
        tags: ["Open Source", "FOSS"],
        trust: "trusted",
      },
      {
        name: "Aptoide TV",
        url: "https://en.aptoide.com/",
        description: {
          ar: "متجر مستقل مخصص لـ Android TV و TV Box.",
          en: "Independent store dedicated to Android TV & TV Boxes.",
          fr: "Magasin indépendant dédié à Android TV & TV Box.",
        },
        tags: ["Android TV", "Store"],
        trust: "trusted",
      },
      {
        name: "Uptodown",
        url: "https://en.uptodown.com/android",
        description: {
          ar: "موقع إسباني عالمي لتحميل التطبيقات بنسخها المتعددة.",
          en: "Global Spanish site to download apps in multiple versions.",
          fr: "Site mondial espagnol pour télécharger les apps en plusieurs versions.",
        },
        tags: ["APK", "Versions"],
        trust: "trusted",
      },
      {
        name: "Filelinked / Downloader (by AFTVnews)",
        url: "https://www.aftvnews.com/downloader/",
        description: {
          ar: "أداة Downloader الشهيرة لتثبيت التطبيقات على Fire TV و Android TV.",
          en: "Famous Downloader tool to sideload apps on Fire TV & Android TV.",
          fr: "Outil Downloader célèbre pour installer des apps sur Fire TV & Android TV.",
        },
        tags: ["Fire TV", "Sideload"],
        trust: "trusted",
      },
    ],
  },
];

const trustBadge = (trust: AppSite["trust"], lang: "ar" | "en" | "fr") => {
  const map = {
    official: { ar: "رسمي", en: "Official", fr: "Officiel", className: "bg-primary/15 text-primary border-primary/30" },
    trusted: { ar: "موثوق", en: "Trusted", fr: "Fiable", className: "bg-accent/15 text-accent border-accent/30" },
    community: { ar: "مجتمعي", en: "Community", fr: "Communauté", className: "bg-secondary text-foreground/80 border-border" },
  } as const;
  const item = map[trust];
  return (
    <Badge variant="outline" className={item.className}>
      {item[lang]}
    </Badge>
  );
};

const TVApps = () => {
  const { t, lang } = useI18n();

  const heading = {
    ar: "تطبيقات التلفاز الذكي و TV Box",
    en: "Smart TV & TV Box Apps",
    fr: "Applications Smart TV & TV Box",
  };
  const sub = {
    ar: "قائمة منتقاة لأفضل المصادر الموثوقة لتحميل التطبيقات لأجهزة التلفاز الذكي و TV Box.",
    en: "A curated list of the most trusted sources to download apps for Smart TVs and TV Boxes.",
    fr: "Une liste sélectionnée des sources les plus fiables pour télécharger des applications pour Smart TV et TV Box.",
  };
  const warning = {
    ar: "⚠️ نصيحة: حمّل دائماً من المصادر الرسمية أو الموثوقة، وتجنّب التطبيقات المجهولة لحماية جهازك.",
    en: "⚠️ Tip: Always download from official or trusted sources, and avoid unknown apps to protect your device.",
    fr: "⚠️ Conseil : Téléchargez toujours depuis des sources officielles ou fiables pour protéger votre appareil.",
  };
  const visit = { ar: "زيارة الموقع", en: "Visit website", fr: "Visiter le site" };

  return (
    <div className="container py-10">
      <header className="mb-10 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
          <Tv className="h-3.5 w-3.5" />
          Smart TV · TV Box · Android TV
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">{heading[lang]}</h1>
        <p className="text-muted-foreground">{sub[lang]}</p>
      </header>

      <div className="mb-10 rounded-xl border border-accent/30 bg-accent/5 p-4 text-sm text-foreground/90 max-w-4xl mx-auto">
        {warning[lang]}
      </div>

      <div className="space-y-14">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <section key={section.id}>
              <div className="mb-6 flex items-start gap-3">
                <div className="rounded-lg bg-primary/10 p-2.5 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{section.title[lang]}</h2>
                  <p className="text-sm text-muted-foreground">{section.subtitle[lang]}</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {section.sites.map((site) => (
                  <a
                    key={site.url}
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group rounded-xl bg-gradient-card border border-border/50 p-5 flex flex-col transition-smooth hover:border-primary/50 hover:shadow-glow"
                  >
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-smooth">
                        {site.name}
                      </h3>
                      {trustBadge(site.trust, lang)}
                    </div>
                    <p className="text-sm text-muted-foreground flex-1 mb-4">
                      {site.description[lang]}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {site.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md bg-secondary text-muted-foreground border border-border/50"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-sm font-medium text-primary">
                      <span className="inline-flex items-center gap-1.5">
                        <Download className="h-4 w-4" />
                        {visit[lang]}
                      </span>
                      <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-smooth" />
                    </div>
                  </a>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default TVApps;
