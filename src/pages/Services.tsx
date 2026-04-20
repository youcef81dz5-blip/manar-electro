import { useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { services, buildWhatsAppLink } from "@/data/catalog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { MessageCircle } from "lucide-react";

const Services = () => {
  const { t, lang } = useI18n();
  const [openId, setOpenId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", message: "" });

  const active = services.find((s) => s.id === openId);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) return;
    const serviceName = active?.name[lang] ?? "";
    const text =
      lang === "ar"
        ? `طلب خدمة: ${serviceName}\nالاسم: ${form.name}\nالهاتف: ${form.phone}\nالرسالة: ${form.message}`
        : lang === "fr"
        ? `Demande de service : ${serviceName}\nNom : ${form.name}\nTél : ${form.phone}\nMessage : ${form.message}`
        : `Service request: ${serviceName}\nName: ${form.name}\nPhone: ${form.phone}\nMessage: ${form.message}`;
    window.open(buildWhatsAppLink(text), "_blank");
    toast.success(t.contact.formSuccess);
    setOpenId(null);
    setForm({ name: "", phone: "", message: "" });
  };

  return (
    <div className="container py-10">
      <header className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">{t.sections.servicesTitle}</h1>
        <p className="text-muted-foreground">{t.sections.servicesSubtitle}</p>
      </header>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((s) => (
          <div key={s.id} className="group rounded-xl bg-gradient-card border border-border/50 p-6 flex flex-col transition-smooth hover:border-primary/50 hover:shadow-glow">
            <div className="text-5xl mb-4">{s.emoji}</div>
            <h3 className="font-bold text-xl mb-2">{s.name[lang]}</h3>
            <p className="text-sm text-muted-foreground flex-1 mb-4">{s.description[lang]}</p>
            {s.startingPrice && s.startingPrice !== "—" && (
              <p className="text-xs text-primary mb-3">
                {t.actions.startingFrom} <span className="font-bold">{s.startingPrice}</span>
              </p>
            )}
            <Button onClick={() => setOpenId(s.id)} className="bg-gradient-primary text-primary-foreground gap-2">
              <MessageCircle className="h-4 w-4" />
              {t.actions.requestService}
            </Button>
          </div>
        ))}
      </div>

      <Dialog open={!!openId} onOpenChange={(o) => !o && setOpenId(null)}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle>{active?.name[lang]}</DialogTitle>
          </DialogHeader>
          <form onSubmit={submit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="name">{t.contact.formName}</Label>
              <Input id="name" value={form.name} maxLength={100} required onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="phone">{t.contact.formPhone}</Label>
              <Input id="phone" value={form.phone} maxLength={30} required onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="msg">{t.contact.formMessage}</Label>
              <Textarea id="msg" value={form.message} maxLength={500} rows={3} onChange={(e) => setForm({ ...form, message: e.target.value })} />
            </div>
            <Button type="submit" className="w-full bg-gradient-primary text-primary-foreground">
              {t.contact.formSubmit}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Services;
