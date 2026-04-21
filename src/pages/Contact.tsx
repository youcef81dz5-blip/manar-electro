import { useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { contactLinks, buildWhatsAppLink } from "@/data/catalog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MessageCircle, Facebook, Phone, MapPin, Clock } from "lucide-react";
import { TikTokIcon } from "@/components/icons/TikTokIcon";
import { toast } from "sonner";
import shopLocation from "@/assets/shop-location.jpg";

const Contact = () => {
  const { t, lang } = useI18n();
  const [form, setForm] = useState({ name: "", phone: "", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const text =
      lang === "ar"
        ? `رسالة جديدة من ${form.name} (${form.phone}): ${form.message}`
        : lang === "fr"
        ? `Nouveau message de ${form.name} (${form.phone}) : ${form.message}`
        : `New message from ${form.name} (${form.phone}): ${form.message}`;
    window.open(buildWhatsAppLink(text), "_blank");
    toast.success(t.contact.formSuccess);
    setForm({ name: "", phone: "", message: "" });
  };

  const cards = [
    { icon: MessageCircle, label: t.contact.whatsapp, href: contactLinks.whatsapp, color: "text-primary" },
    { icon: Facebook, label: t.contact.facebook, href: contactLinks.facebook, color: "text-primary" },
    { icon: TikTokIcon, label: "TikTok", href: contactLinks.tiktok, color: "text-foreground" },
    { icon: Phone, label: t.contact.phone, href: `tel:${contactLinks.phone}`, color: "text-accent" },
  ];

  return (
    <div className="container py-10">
      <header className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">{t.sections.contactTitle}</h1>
        <p className="text-muted-foreground">{t.sections.contactSubtitle}</p>
      </header>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {cards.map(({ icon: Icon, label, href, color }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer"
                 className="rounded-xl bg-gradient-card border border-border/50 p-5 text-center transition-smooth hover:border-primary/50 hover:shadow-glow">
                <Icon className={`h-7 w-7 mx-auto mb-2 ${color}`} />
                <span className="text-sm font-semibold">{label}</span>
              </a>
            ))}
          </div>

          <div className="rounded-xl bg-gradient-card border border-border/50 p-5 space-y-3">
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="text-xs text-muted-foreground">{t.contact.hours}</p>
                <p className="font-semibold">{t.contact.hoursValue}</p>
              </div>
            </div>
            <a
              href="https://maps.app.goo.gl/VxhXsABYR4CxAN3E7"
              target="_blank"
              rel="noreferrer"
              className="flex items-start gap-3 group"
            >
              <MapPin className="h-5 w-5 text-accent mt-0.5" />
              <div>
                <p className="text-xs text-muted-foreground">{t.contact.location}</p>
                <p className="font-semibold group-hover:text-primary transition-smooth">{t.contact.address}</p>
              </div>
            </a>
            <a
              href="https://maps.app.goo.gl/VxhXsABYR4CxAN3E7"
              target="_blank"
              rel="noreferrer"
              className="block rounded-lg overflow-hidden border border-border/50 aspect-video relative group"
            >
              <img
                src={shopLocation}
                alt="Manar Electro storefront"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-smooth group-hover:scale-105"
              />
            </a>
            <div className="rounded-lg overflow-hidden border border-border/50 aspect-video">
              <iframe
                src="https://maps.google.com/maps?q=31.617842,-2.207584&hl=ar&z=16&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Manar Electro Location"
              />
            </div>
          </div>
        </div>

        <form onSubmit={submit} className="rounded-xl bg-gradient-card border border-border/50 p-6 space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="cn">{t.contact.formName}</Label>
            <Input id="cn" required maxLength={100} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="cp">{t.contact.formPhone}</Label>
            <Input id="cp" required maxLength={30} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="cm">{t.contact.formMessage}</Label>
            <Textarea id="cm" required maxLength={500} rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
          </div>
          <Button type="submit" className="w-full bg-gradient-primary text-primary-foreground">
            {t.contact.formSubmit}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
