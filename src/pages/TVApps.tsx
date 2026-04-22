import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useI18n } from "@/i18n/I18nProvider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Loader2, Tv, Package } from "lucide-react";

type TVApp = {
  id: string;
  name: string;
  description: string;
  image_url: string | null;
  apk_url: string;
  is_available: boolean;
  sort_order: number;
};

const TVApps = () => {
  const { t, lang } = useI18n();
  const [apps, setApps] = useState<TVApp[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("tv_apps")
        .select("*")
        .eq("is_available", true)
        .order("sort_order", { ascending: false })
        .order("created_at", { ascending: false });
      setApps((data as TVApp[]) || []);
      setLoading(false);
    })();
  }, []);

  const isAr = lang === "ar";

  return (
    <div className="container py-12">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
          <Tv className="h-4 w-4" />
          {t.nav.tvApps}
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-3">
          {isAr ? "متجر تطبيقات TV" : lang === "fr" ? "Boutique d'applications TV" : "TV Apps Store"}
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {isAr
            ? "حمّل أفضل التطبيقات لتلفازك الذكي وأجهزة TV Box مباشرة"
            : lang === "fr"
            ? "Téléchargez les meilleures applications pour Smart TV et TV Box"
            : "Download the best apps for your Smart TV & TV Box directly"}
        </p>
      </div>

      {loading ? (
        <div className="grid place-items-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : apps.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <Package className="h-12 w-12 mx-auto mb-3 opacity-40" />
          {isAr ? "لا توجد تطبيقات متاحة حالياً" : lang === "fr" ? "Aucune application disponible" : "No apps available yet"}
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {apps.map((app) => (
            <article
              key={app.id}
              className="group rounded-2xl border border-border/60 bg-card overflow-hidden hover:border-primary/50 hover:shadow-lg transition-all"
            >
              <div className="aspect-video bg-secondary/40 overflow-hidden grid place-items-center">
                {app.image_url ? (
                  <img
                    src={app.image_url}
                    alt={app.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                ) : (
                  <Package className="h-14 w-14 text-muted-foreground/40" />
                )}
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg mb-1.5 truncate">{app.name}</h3>
                {app.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4 min-h-[2.5rem]">
                    {app.description}
                  </p>
                )}
                <div className="flex items-center justify-between gap-2">
                  <Badge variant="secondary" className="gap-1">
                    <Package className="h-3 w-3" /> APK
                  </Badge>
                  <Button asChild size="sm" className="gap-1.5">
                    <a href={app.apk_url} download target="_blank" rel="noopener noreferrer">
                      <Download className="h-4 w-4" />
                      {isAr ? "تحميل" : lang === "fr" ? "Télécharger" : "Download"}
                    </a>
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      <p className="text-xs text-muted-foreground text-center mt-10 max-w-xl mx-auto">
        {isAr
          ? "ملاحظة: قم بتفعيل «التثبيت من مصادر غير معروفة» في إعدادات جهازك قبل تثبيت ملفات APK."
          : lang === "fr"
          ? "Note : activez « Sources inconnues » dans les paramètres avant d'installer les APK."
          : "Note: Enable 'Unknown sources' in your device settings before installing APK files."}
      </p>
    </div>
  );
};

export default TVApps;
