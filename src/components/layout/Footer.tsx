import { useI18n } from "@/i18n/I18nProvider";
import { contactLinks } from "@/data/catalog";
import { Facebook, Phone, MessageCircle } from "lucide-react";
import { TikTokIcon } from "@/components/icons/TikTokIcon";

export const Footer = () => {
  const { t } = useI18n();
  return (
    <footer className="mt-24 border-t border-border/50 bg-card/40">
      <div className="container py-10 grid gap-6 md:grid-cols-3 items-start">
        <div>
          <h3 className="text-gradient font-bold text-lg mb-2">{t.brand}</h3>
          <p className="text-sm text-muted-foreground">{t.footer.tagline}</p>
        </div>
        <div className="space-y-2 text-sm">
          <p className="text-muted-foreground">{t.contact.hours}: <span className="text-foreground">{t.contact.hoursValue}</span></p>
          <p className="text-muted-foreground">{t.contact.location}: <span className="text-foreground">{t.contact.address}</span></p>
        </div>
        <div className="flex gap-3 md:justify-end">
          <a href={contactLinks.whatsapp} target="_blank" rel="noreferrer"
             className="h-10 w-10 grid place-items-center rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-smooth">
            <MessageCircle className="h-5 w-5" />
          </a>
          <a href={contactLinks.facebook} target="_blank" rel="noreferrer"
             className="h-10 w-10 grid place-items-center rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-smooth">
            <Facebook className="h-5 w-5" />
          </a>
          <a href={contactLinks.tiktok} target="_blank" rel="noreferrer" aria-label="TikTok"
             className="h-10 w-10 grid place-items-center rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-smooth">
            <TikTokIcon className="h-5 w-5" />
          </a>
          <a href={`tel:${contactLinks.phone}`}
             className="h-10 w-10 grid place-items-center rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-smooth">
            <Phone className="h-5 w-5" />
          </a>
        </div>
      </div>
      <div className="border-t border-border/50 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {t.brand} — {t.footer.rights}
      </div>
    </footer>
  );
};
