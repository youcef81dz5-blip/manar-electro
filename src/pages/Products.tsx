import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useI18n } from "@/i18n/I18nProvider";
import { products as staticProducts, CategoryType, Product } from "@/data/catalog";
import { ProductCard } from "@/components/ProductCard";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

const categoryKeyMap: Record<CategoryType, keyof ReturnType<typeof useI18n>["t"]["categories"] | null> = {
  phones: "phones",
  tv_box: "tv_box",
  cctv: "cctv",
  mosque_audio: "mosque_audio",
  conversion_service: "conversion",
  accessories: null,
};

const Products = () => {
  const { t } = useI18n();
  const [params, setParams] = useSearchParams();
  const initial = (params.get("cat") as CategoryType | null) ?? "all";
  const [filter, setFilter] = useState<CategoryType | "all">(initial);
  const [dbProducts, setDbProducts] = useState<Product[]>([]);

  useEffect(() => {
    supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (!data) return;
        setDbProducts(
          data.map((p: any) => ({
            id: p.id,
            category: p.category as CategoryType,
            name: { ar: p.name_ar, en: p.name_en, fr: p.name_fr },
            shortDescription: {
              ar: p.short_description_ar,
              en: p.short_description_en,
              fr: p.short_description_fr,
            },
            price: p.price ?? undefined,
            isAvailable: p.is_available,
            tags: p.tags ?? [],
            emoji: p.emoji,
            image: p.image_url ?? undefined,
          }))
        );
      });
  }, []);

  const all = useMemo(() => [...dbProducts, ...staticProducts], [dbProducts]);

  const cats: (CategoryType | "all")[] = ["all", "phones", "tv_box", "cctv", "mosque_audio", "conversion_service"];

  const list = useMemo(
    () => (filter === "all" ? all : all.filter((p) => p.category === filter)),
    [filter, all]
  );

  const handle = (c: CategoryType | "all") => {
    setFilter(c);
    if (c === "all") setParams({});
    else setParams({ cat: c });
  };

  return (
    <div className="container py-10">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">{t.sections.productsTitle}</h1>
        <p className="text-muted-foreground">{t.sections.productsSubtitle}</p>
      </header>

      <div className="flex flex-wrap gap-2 mb-8">
        {cats.map((c) => {
          const label =
            c === "all"
              ? t.actions.filterAll
              : (() => {
                  const k = categoryKeyMap[c as CategoryType];
                  return k ? t.categories[k] : c;
                })();
          return (
            <button
              key={c}
              onClick={() => handle(c)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium border transition-smooth",
                filter === c
                  ? "bg-primary text-primary-foreground border-primary shadow-glow"
                  : "border-border bg-secondary/40 hover:border-primary/40"
              )}
            >
              {label}
            </button>
          );
        })}
      </div>

      {list.length === 0 ? (
        <div className="text-center text-muted-foreground py-16">—</div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {list.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
};

export default Products;
