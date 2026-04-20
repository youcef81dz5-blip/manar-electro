import { useEffect, useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { Loader2, Plus, Pencil, Trash2, LogOut, Upload } from "lucide-react";

type DBProduct = {
  id: string;
  category: string;
  name_ar: string;
  name_en: string;
  name_fr: string;
  short_description_ar: string;
  short_description_en: string;
  short_description_fr: string;
  price: string | null;
  is_available: boolean;
  tags: string[];
  emoji: string;
  image_url: string | null;
};

const CATEGORIES = ["phones", "tv_box", "cctv", "mosque_audio", "conversion_service", "accessories"];

const productSchema = z.object({
  category: z.string().min(1),
  name_ar: z.string().trim().min(1).max(200),
  name_en: z.string().trim().min(1).max(200),
  name_fr: z.string().trim().min(1).max(200),
  short_description_ar: z.string().trim().max(500),
  short_description_en: z.string().trim().max(500),
  short_description_fr: z.string().trim().max(500),
  price: z.string().trim().max(50),
  is_available: z.boolean(),
  tags: z.string().trim().max(300),
  emoji: z.string().trim().max(10),
  image_url: z.string().trim().max(1000),
});

const empty = {
  category: "phones",
  name_ar: "",
  name_en: "",
  name_fr: "",
  short_description_ar: "",
  short_description_en: "",
  short_description_fr: "",
  price: "",
  is_available: true,
  tags: "",
  emoji: "📦",
  image_url: "",
};

const Admin = () => {
  const { signOut, user } = useAuth();
  const [items, setItems] = useState<DBProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<DBProduct | null>(null);
  const [form, setForm] = useState<typeof empty>(empty);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    setItems((data as DBProduct[]) || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => {
    setEditing(null);
    setForm(empty);
    setOpen(true);
  };

  const openEdit = (p: DBProduct) => {
    setEditing(p);
    setForm({
      category: p.category,
      name_ar: p.name_ar,
      name_en: p.name_en,
      name_fr: p.name_fr,
      short_description_ar: p.short_description_ar,
      short_description_en: p.short_description_en,
      short_description_fr: p.short_description_fr,
      price: p.price ?? "",
      is_available: p.is_available,
      tags: p.tags.join(", "),
      emoji: p.emoji,
      image_url: p.image_url ?? "",
    });
    setOpen(true);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("الحجم الأقصى 5MB");
      return;
    }
    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const path = `${user!.id}/${Date.now()}.${ext}`;
      const { error } = await supabase.storage
        .from("product-images")
        .upload(path, file, { contentType: file.type });
      if (error) throw error;
      const { data } = supabase.storage.from("product-images").getPublicUrl(path);
      setForm((f) => ({ ...f, image_url: data.publicUrl }));
      toast.success("تم رفع الصورة");
    } catch (err: any) {
      toast.error(err.message || "فشل الرفع");
    } finally {
      setUploading(false);
    }
  };

  const save = async () => {
    const parsed = productSchema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setSaving(true);
    try {
      const payload = {
        category: form.category,
        name_ar: form.name_ar.trim(),
        name_en: form.name_en.trim(),
        name_fr: form.name_fr.trim(),
        short_description_ar: form.short_description_ar.trim(),
        short_description_en: form.short_description_en.trim(),
        short_description_fr: form.short_description_fr.trim(),
        price: form.price.trim() || null,
        is_available: form.is_available,
        tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        emoji: form.emoji.trim() || "📦",
        image_url: form.image_url.trim() || null,
      };
      if (editing) {
        const { error } = await supabase.from("products").update(payload).eq("id", editing.id);
        if (error) throw error;
        toast.success("تم التحديث");
      } else {
        const { error } = await supabase.from("products").insert(payload);
        if (error) throw error;
        toast.success("تمت الإضافة");
      }
      setOpen(false);
      load();
    } catch (err: any) {
      toast.error(err.message || "فشل الحفظ");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) toast.error(error.message);
    else { toast.success("تم الحذف"); load(); }
  };

  return (
    <div className="container py-10">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">لوحة الإدارة</h1>
          <p className="text-muted-foreground text-sm">إدارة المنتجات</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={openCreate} className="gap-1.5">
            <Plus className="h-4 w-4" /> إضافة منتج
          </Button>
          <Button variant="outline" onClick={signOut} className="gap-1.5">
            <LogOut className="h-4 w-4" /> خروج
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="grid place-items-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : items.length === 0 ? (
        <div className="text-center text-muted-foreground py-20">لا توجد منتجات بعد</div>
      ) : (
        <div className="grid gap-3">
          {items.map((p) => (
            <div key={p.id} className="flex items-center gap-4 p-4 rounded-lg border border-border/50 bg-card">
              <div className="w-16 h-16 rounded bg-secondary/40 grid place-items-center text-3xl overflow-hidden flex-shrink-0">
                {p.image_url ? (
                  <img src={p.image_url} alt={p.name_ar} className="w-full h-full object-cover" />
                ) : (
                  <span>{p.emoji}</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold truncate">{p.name_ar}</div>
                <div className="text-xs text-muted-foreground truncate">
                  {p.category} · {p.price || "—"} · {p.is_available ? "متوفر" : "غير متوفر"}
                </div>
              </div>
              <Button size="sm" variant="outline" onClick={() => openEdit(p)} className="gap-1.5">
                <Pencil className="h-3.5 w-3.5" /> تعديل
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button size="sm" variant="destructive" className="gap-1.5">
                    <Trash2 className="h-3.5 w-3.5" /> حذف
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>حذف المنتج؟</AlertDialogTitle>
                    <AlertDialogDescription>هذا الإجراء لا يمكن التراجع عنه.</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>إلغاء</AlertDialogCancel>
                    <AlertDialogAction onClick={() => remove(p.id)}>حذف</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          ))}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? "تعديل منتج" : "منتج جديد"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>الفئة</Label>
                <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>السعر</Label>
                <Input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="12,500 DA" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <Label>الاسم (AR)</Label>
                <Input value={form.name_ar} onChange={(e) => setForm({ ...form, name_ar: e.target.value })} />
              </div>
              <div>
                <Label>الاسم (EN)</Label>
                <Input value={form.name_en} onChange={(e) => setForm({ ...form, name_en: e.target.value })} />
              </div>
              <div>
                <Label>الاسم (FR)</Label>
                <Input value={form.name_fr} onChange={(e) => setForm({ ...form, name_fr: e.target.value })} />
              </div>
            </div>

            <div>
              <Label>الوصف (AR)</Label>
              <Textarea rows={2} value={form.short_description_ar} onChange={(e) => setForm({ ...form, short_description_ar: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>الوصف (EN)</Label>
                <Textarea rows={2} value={form.short_description_en} onChange={(e) => setForm({ ...form, short_description_en: e.target.value })} />
              </div>
              <div>
                <Label>الوصف (FR)</Label>
                <Textarea rows={2} value={form.short_description_fr} onChange={(e) => setForm({ ...form, short_description_fr: e.target.value })} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>الوسوم (مفصولة بفواصل)</Label>
                <Input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} placeholder="Samsung, 5G" />
              </div>
              <div>
                <Label>الإيموجي</Label>
                <Input value={form.emoji} onChange={(e) => setForm({ ...form, emoji: e.target.value })} />
              </div>
            </div>

            <div>
              <Label>صورة المنتج</Label>
              <div className="flex items-center gap-3">
                <Input type="file" accept="image/*" onChange={handleUpload} disabled={uploading} className="flex-1" />
                {uploading && <Loader2 className="h-4 w-4 animate-spin" />}
              </div>
              {form.image_url && (
                <div className="mt-2 flex items-center gap-2">
                  <img src={form.image_url} alt="" className="h-16 w-16 object-cover rounded border border-border/50" />
                  <Input value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} className="flex-1 text-xs" />
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              <Switch checked={form.is_available} onCheckedChange={(v) => setForm({ ...form, is_available: v })} />
              <Label>متوفر</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>إلغاء</Button>
            <Button onClick={save} disabled={saving}>
              {saving && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
              حفظ
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;
