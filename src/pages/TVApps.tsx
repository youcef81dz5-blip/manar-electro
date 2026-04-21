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
    id: "stores",
    title: { ar: "متاجر التطبيقات الموصى بها", en: "Recommended App Stores", fr: "Magasins d'applications recommandés" },
    subtitle: {
      ar: "أفضل المتاجر البديلة لتثبيت التطبيقات على Smart TV و TV Box",
      en: "Best alternative stores to install apps on Smart TV & TV Box",
      fr: "Meilleurs magasins alternatifs pour Smart TV & TV Box",
    },
    icon: ShieldCheck,
    sites: [
      {
        name: "Emotn Store",
        url: "https://app.emotn.com/store/",
        description: {
          ar: "متجر مجاني وخفيف مصمم خصيصاً لـ Android TV و TV Box، يقدم تطبيقات متوافقة بدقة مع التحكم بالريموت.",
          en: "Free, lightweight store built specifically for Android TV & TV Box, with remote-friendly apps.",
          fr: "Magasin gratuit et léger conçu pour Android TV & TV Box, compatible télécommande.",
        },
        tags: ["Android TV", "TV Box", "Free"],
        trust: "trusted",
      },
      {
        name: "Aptoide TV",
        url: "https://en.aptoide.com/",
        description: {
          ar: "متجر مستقل مشهور مخصص لـ Android TV، يحتوي آلاف التطبيقات المتوافقة مع التلفاز.",
          en: "Popular independent store dedicated to Android TV with thousands of TV-compatible apps.",
          fr: "Magasin indépendant populaire dédié à Android TV avec des milliers d'apps compatibles.",
        },
        tags: ["Android TV", "Store"],
        trust: "trusted",
      },
      {
        name: "Uptodown",
        url: "https://en.uptodown.com/android",
        description: {
          ar: "موقع عالمي موثوق لتحميل تطبيقات APK بنسخها المتعددة وبدون إعلانات مزعجة.",
          en: "Trusted global site to download APK apps in multiple versions without intrusive ads.",
          fr: "Site mondial fiable pour télécharger les APK en plusieurs versions sans publicités intrusives.",
        },
        tags: ["APK", "Versions"],
        trust: "trusted",
      },
      {
        name: "APKPure",
        url: "https://apkpure.com/",
        description: {
          ar: "موقع عالمي شهير لتحميل تطبيقات Android و Android TV بنسخها الأصلية وبأمان.",
          en: "Popular global site for safely downloading original Android & Android TV apps.",
          fr: "Site mondial populaire pour télécharger en sécurité les apps Android & Android TV.",
        },
        tags: ["APK", "Android TV"],
        trust: "trusted",
      },
    ],
  },
  {
    id: "arabic",
    title: { ar: "مصادر عربية موثوقة", en: "Trusted Arabic Sources", fr: "Sources arabes de confiance" },
    subtitle: {
      ar: "أفضل المواقع والقنوات العربية لشروحات وتطبيقات Smart TV و TV Box",
      en: "Best Arabic sites & channels for Smart TV & TV Box apps and tutorials",
      fr: "Meilleurs sites et chaînes arabes pour Smart TV & TV Box",
    },
    icon: Star,
    sites: [
      {
        name: "Nooh Freestyle",
        url: "https://noohfreestyle.com/",
        description: {
          ar: "موقع عربي متخصص في شروحات وتطبيقات الأندرويد و Smart TV و TV Box بمحتوى مميز ومحدّث.",
          en: "Arabic site specialized in tutorials and apps for Android, Smart TV & TV Box.",
          fr: "Site arabe spécialisé dans les tutoriels et apps Android, Smart TV & TV Box.",
        },
        tags: ["Tutorials", "Smart TV", "AR"],
        trust: "trusted",
      },
      {
        name: "Android TV Arabic — أندرويد تيفي بالعربي",
        url: "https://www.youtube.com/@AndroidTVArabic",
        description: {
          ar: "قناة يوتيوب عربية متخصصة في شروحات أجهزة Android TV و TV Box وتثبيت التطبيقات خطوة بخطوة.",
          en: "Arabic YouTube channel specialized in Android TV & TV Box tutorials and app installation.",
          fr: "Chaîne YouTube arabe spécialisée dans les tutoriels Android TV & TV Box.",
        },
        tags: ["YouTube", "Tutorials", "AR"],
        trust: "community",
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
