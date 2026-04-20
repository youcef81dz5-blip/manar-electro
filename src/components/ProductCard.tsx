import { Product, buildWhatsAppLink } from "@/data/catalog";
import { useI18n } from "@/i18n/I18nProvider";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

export const ProductCard = ({ product }: { product: Product }) => {
  const { t, lang } = useI18n();
  const message =
    lang === "ar"
      ? `السلام عليكم، أريد الاستفسار عن: ${product.name.ar}`
      : lang === "fr"
      ? `Bonjour, je souhaite des informations sur : ${product.name.fr}`
      : `Hello, I'd like info about: ${product.name.en}`;

  return (
    <div className="group flex flex-col rounded-xl bg-gradient-card border border-border/50 overflow-hidden transition-smooth hover:border-primary/50 hover:shadow-glow">
      <div className="aspect-[4/3] grid place-items-center bg-secondary/40 text-7xl border-b border-border/50">
        <span className="transition-smooth group-hover:scale-110">{product.emoji}</span>
      </div>
      <div className="p-4 flex flex-col flex-1 gap-2">
        <h3 className="font-semibold leading-tight line-clamp-1">{product.name[lang]}</h3>
        <p className="text-xs text-muted-foreground line-clamp-2 flex-1">{product.shortDescription[lang]}</p>
        <div className="flex items-center justify-between pt-2">
          <span className="text-primary font-bold text-sm">{product.price ?? "—"}</span>
          <span className={`text-xs px-2 py-0.5 rounded-full ${product.isAvailable ? "bg-primary/15 text-primary" : "bg-destructive/15 text-destructive"}`}>
            {product.isAvailable ? t.actions.available : t.actions.unavailable}
          </span>
        </div>
        <Button asChild size="sm" className="bg-gradient-accent text-accent-foreground hover:opacity-90 gap-1.5 mt-2">
          <a href={buildWhatsAppLink(message)} target="_blank" rel="noreferrer">
            <MessageCircle className="h-4 w-4" />
            {t.actions.whatsapp}
          </a>
        </Button>
      </div>
    </div>
  );
};
