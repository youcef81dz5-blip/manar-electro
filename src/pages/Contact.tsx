import { useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { contactLinks, buildWhatsAppLink } from "@/data/catalog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MessageCircle, Facebook, Phone, MapPin, Clock } from "lucide-react";
import { toast } from "sonner";

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
          <div className="grid sm:grid-cols-3 gap-3">
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
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-accent mt-0.5" />
              <div>
                <p className="text-xs text-muted-foreground">{t.contact.location}</p>
                <p className="font-semibold">{t.contact.address}</p>
              </div>
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
