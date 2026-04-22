import { Link } from "react-router-dom";
import { useI18n } from "@/i18n/I18nProvider";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageSquare, Smartphone, Tv, Camera, Building2, Disc3, Wrench, Download, AppWindow } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import { products, services } from "@/data/catalog";
import { ProductCard } from "@/components/ProductCard";

const categoryIcons = [
  { key: "phones" as const, Icon: Smartphone, to: "/products?cat=phones" },
  { key: "tv_box" as const, Icon: Tv, to: "/products?cat=tv_box" },
  { key: "cctv" as const, Icon: Camera, to: "/products?cat=cctv" },
  { key: "mosque_audio" as const, Icon: Building2, to: "/products?cat=mosque_audio" },
  { key: "conversion" as const, Icon: Disc3, to: "/services" },
  { key: "repair" as const, Icon: Wrench, to: "/services" },
];

const Home = () => {
  const { t, dir, lang } = useI18n();
  const featured = products.slice(0, 4);
  const Arrow = dir === "rtl" ? "←" : "→";

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" />
        <div className="container relative py-16 md:py-24 grid lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6 animate-fade-in">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-semibold">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse-glow" />
              {t.hero.badge}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="text-gradient">{t.brand}</span>
              <br />
              <span className="text-foreground">{t.hero.title}</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">{t.hero.subtitle}</p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-90 gap-2">
                <Link to="/chatbot">
                  <MessageSquare className="h-5 w-5" />
                  {t.hero.ctaChat}
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary/30 hover:bg-primary/10 gap-2">
                <Link to="/products">
                  {t.hero.ctaProducts}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-primary opacity-20 blur-3xl rounded-full" />
            <img
              src={heroImg}
              alt="Manar Electro tech"
              width={1536}
              height={1024}
              className="relative rounded-2xl shadow-elegant border border-border/50 animate-float"
            />
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="container py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">{t.sections.categoriesTitle}</h2>
          <p className="text-muted-foreground">{t.sections.categoriesSubtitle}</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categoryIcons.map(({ key, Icon, to }) => (
            <Link
              key={key}
              to={to}
              className="group relative overflow-hidden rounded-xl bg-gradient-card border border-border/50 p-5 text-center transition-smooth hover:border-primary/50 hover:shadow-glow"
            >
              <div className="mx-auto mb-3 h-12 w-12 grid place-items-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-smooth">
                <Icon className="h-6 w-6" />
              </div>
              <span className="text-sm font-semibold">{t.categories[key]}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* TV APPS BANNER */}
      <section className="container py-8">
        <Link
          to="/tv-apps"
          className="group relative block overflow-hidden rounded-2xl border border-primary/30 bg-gradient-primary p-6 md:p-10 shadow-glow transition-smooth hover:shadow-elegant"
        >
          <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
          <div className="absolute -end-10 -top-10 h-40 w-40 rounded-full bg-primary-foreground/10 blur-3xl" />
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-primary-foreground">
              <div className="h-14 w-14 grid place-items-center rounded-xl bg-primary-foreground/15 backdrop-blur">
                <AppWindow className="h-7 w-7" />
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider opacity-80">
                  {lang === "ar" ? "متجر التطبيقات" : lang === "fr" ? "Boutique d'applications" : "Apps Store"}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold">
                  {lang === "ar"
                    ? "حمّل تطبيقات TV مجاناً"
                    : lang === "fr"
                    ? "Téléchargez des applis TV gratuitement"
                    : "Download TV Apps for Free"}
                </h3>
                <p className="text-sm md:text-base opacity-90 mt-1">
                  {lang === "ar"
                    ? "مجموعة تطبيقات مختارة لأجهزة Smart TV و TV Box"
                    : lang === "fr"
                    ? "Sélection d'applis pour Smart TV et TV Box"
                    : "Curated apps for Smart TV and TV Box"}
                </p>
              </div>
            </div>
            <Button size="lg" variant="secondary" className="gap-2 group-hover:scale-105 transition-smooth">
              <Download className="h-5 w-5" />
              {lang === "ar" ? "ادخل للمتجر" : lang === "fr" ? "Entrer dans la boutique" : "Enter Store"}
            </Button>
          </div>
        </Link>
      </section>
      <section className="container py-12">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-1">{t.sections.productsTitle}</h2>
            <p className="text-muted-foreground">{t.sections.productsSubtitle}</p>
          </div>
          <Link to="/products" className="text-primary text-sm font-semibold hover:underline whitespace-nowrap">
            {Arrow}
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* SERVICES STRIP */}
      <section className="container py-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">{t.sections.servicesTitle}</h2>
          <p className="text-muted-foreground">{t.sections.servicesSubtitle}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.slice(0, 6).map((s) => (
            <div key={s.id} className="group rounded-xl bg-gradient-card border border-border/50 p-6 transition-smooth hover:border-primary/50 hover:shadow-glow">
              <div className="text-4xl mb-3">{s.emoji}</div>
              <h3 className="font-bold text-lg mb-2">{s.name[lang]}</h3>
              <p className="text-sm text-muted-foreground line-clamp-3">{s.description[lang]}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Button asChild variant="outline" className="border-primary/30 hover:bg-primary/10">
            <Link to="/services">{t.nav.services} {Arrow}</Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default Home;
