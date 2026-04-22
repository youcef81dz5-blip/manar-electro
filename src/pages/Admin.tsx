import { useEffect, useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { Loader2, Plus, Pencil, Trash2, LogOut, Package } from "lucide-react";

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
  sort_order: number;
};

type DBTVApp = {
  id: string;
  name: string;
  description: string;
  image_url: string | null;
  apk_url: string;
  is_available: boolean;
  sort_order: number;
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
  sort_order: z.number().int().min(0).max(99999),
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
  sort_order: 0,
};

const tvAppSchema = z.object({
  name: z.string().trim().min(1, "الاسم مطلوب").max(150),
  description: z.string().trim().max(500),
  image_url: z.string().trim().max(1000),
  apk_url: z.string().trim().min(1, "رابط APK مطلوب").max(1000),
  is_available: z.boolean(),
  sort_order: z.number().int().min(0).max(99999),
});

const emptyApp = {
  name: "",
  description: "",
  image_url: "",
  apk_url: "",
  is_available: true,
  sort_order: 0,
};

const Admin = () => {
  const { signOut, user } = useAuth();

  // Products state
  const [items, setItems] = useState<DBProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<DBProduct | null>(null);
  const [form, setForm] = useState<typeof empty>(empty);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  // TV Apps state
  const [apps, setApps] = useState<DBTVApp[]>([]);
  const [appsLoading, setAppsLoading] = useState(true);
  const [appOpen, setAppOpen] = useState(false);
  const [editingApp, setEditingApp] = useState<DBTVApp | null>(null);
  const [appForm, setAppForm] = useState<typeof emptyApp>(emptyApp);
  const [appSaving, setAppSaving] = useState(false);
  const [imgUploading, setImgUploading] = useState(false);
  const [apkUploading, setApkUploading] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("sort_order", { ascending: false })
      .order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    setItems((data as DBProduct[]) || []);
    setLoading(false);
  };

  const loadApps = async () => {
    setAppsLoading(true);
    const { data, error } = await supabase
      .from("tv_apps")
      .select("*")
      .order("sort_order", { ascending: false })
      .order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    setApps((data as DBTVApp[]) || []);
    setAppsLoading(false);
  };

  useEffect(() => { load(); loadApps(); }, []);

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
      sort_order: p.sort_order ?? 0,
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
        sort_order: Number(form.sort_order) || 0,
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

  // ===== TV Apps handlers =====
  const openCreateApp = () => { setEditingApp(null); setAppForm(emptyApp); setAppOpen(true); };
  const openEditApp = (a: DBTVApp) => {
    setEditingApp(a);
    setAppForm({
      name: a.name,
      description: a.description,
      image_url: a.image_url ?? "",
      apk_url: a.apk_url,
      is_available: a.is_available,
      sort_order: a.sort_order,
    });
    setAppOpen(true);
  };

  const handleAppImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { toast.error("الحجم الأقصى 5MB"); return; }
    setImgUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const path = `${user!.id}/img-${Date.now()}.${ext}`;
      const { error } = await supabase.storage.from("tv-apps").upload(path, file, { contentType: file.type });
      if (error) throw error;
      const { data } = supabase.storage.from("tv-apps").getPublicUrl(path);
      setAppForm((f) => ({ ...f, image_url: data.publicUrl }));
      toast.success("تم رفع الصورة");
    } catch (err: any) {
      toast.error(err.message || "فشل الرفع");
    } finally { setImgUploading(false); }
  };

  const handleApkUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 200 * 1024 * 1024) { toast.error("الحجم الأقصى 200MB"); return; }
    setApkUploading(true);
    try {
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      const path = `${user!.id}/apk-${Date.now()}-${safeName}`;
      const { error } = await supabase.storage
        .from("tv-apps")
        .upload(path, file, { contentType: "application/vnd.android.package-archive" });
      if (error) throw error;
      const { data } = supabase.storage.from("tv-apps").getPublicUrl(path);
      setAppForm((f) => ({ ...f, apk_url: data.publicUrl }));
      toast.success("تم رفع ملف APK");
    } catch (err: any) {
      toast.error(err.message || "فشل الرفع");
    } finally { setApkUploading(false); }
  };

  const saveApp = async () => {
    const parsed = tvAppSchema.safeParse(appForm);
    if (!parsed.success) { toast.error(parsed.error.issues[0].message); return; }
    setAppSaving(true);
    try {
      const payload = {
        name: appForm.name.trim(),
        description: appForm.description.trim(),
        image_url: appForm.image_url.trim() || null,
        apk_url: appForm.apk_url.trim(),
        is_available: appForm.is_available,
        sort_order: Number(appForm.sort_order) || 0,
      };
      if (editingApp) {
        const { error } = await supabase.from("tv_apps").update(payload).eq("id", editingApp.id);
        if (error) throw error;
        toast.success("تم التحديث");
      } else {
        const { error } = await supabase.from("tv_apps").insert(payload);
        if (error) throw error;
        toast.success("تمت الإضافة");
      }
      setAppOpen(false);
      loadApps();
    } catch (err: any) {
      toast.error(err.message || "فشل الحفظ");
    } finally { setAppSaving(false); }
  };

  const removeApp = async (id: string) => {
    const { error } = await supabase.from("tv_apps").delete().eq("id", id);
    if (error) toast.error(error.message);
    else { toast.success("تم الحذف"); loadApps(); }
  };

  return (
    <div className="container py-10">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">لوحة الإدارة</h1>
          <p className="text-muted-foreground text-sm">إدارة المنتجات وتطبيقات TV</p>
        </div>
        <Button variant="outline" onClick={signOut} className="gap-1.5">
          <LogOut className="h-4 w-4" /> خروج
        </Button>
      </div>

      <Tabs defaultValue="products">
        <TabsList className="mb-6">
          <TabsTrigger value="products">المنتجات</TabsTrigger>
          <TabsTrigger value="tvapps">تطبيقات TV</TabsTrigger>
        </TabsList>

        <TabsContent value="products">
          <div className="flex justify-end mb-4">
            <Button onClick={openCreate} className="gap-1.5">
              <Plus className="h-4 w-4" /> إضافة منتج
            </Button>
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
                      {p.category} · {p.price || "—"} · {p.is_available ? "متوفر" : "غير متوفر"} · ترتيب: {p.sort_order}
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
        </TabsContent>

        <TabsContent value="tvapps">
          <div className="flex justify-end mb-4">
            <Button onClick={openCreateApp} className="gap-1.5">
              <Plus className="h-4 w-4" /> إضافة تطبيق
            </Button>
          </div>

          {appsLoading ? (
            <div className="grid place-items-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : apps.length === 0 ? (
            <div className="text-center text-muted-foreground py-20">لا توجد تطبيقات بعد</div>
          ) : (
            <div className="grid gap-3">
              {apps.map((a) => (
                <div key={a.id} className="flex items-center gap-4 p-4 rounded-lg border border-border/50 bg-card">
                  <div className="w-16 h-16 rounded bg-secondary/40 grid place-items-center overflow-hidden flex-shrink-0">
                    {a.image_url ? (
                      <img src={a.image_url} alt={a.name} className="w-full h-full object-cover" />
                    ) : (
                      <Package className="h-7 w-7 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold truncate">{a.name}</div>
                    <div className="text-xs text-muted-foreground truncate">
                      {a.is_available ? "متوفر" : "مخفي"} · ترتيب: {a.sort_order}
                    </div>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => openEditApp(a)} className="gap-1.5">
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
                        <AlertDialogTitle>حذف التطبيق؟</AlertDialogTitle>
                        <AlertDialogDescription>هذا الإجراء لا يمكن التراجع عنه.</AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>إلغاء</AlertDialogCancel>
                        <AlertDialogAction onClick={() => removeApp(a.id)}>حذف</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* ===== Product dialog ===== */}
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

            <div className="grid grid-cols-3 gap-3">
              <div>
                <Label>الوسوم (مفصولة بفواصل)</Label>
                <Input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} placeholder="Samsung, 5G" />
              </div>
              <div>
                <Label>الإيموجي</Label>
                <Input value={form.emoji} onChange={(e) => setForm({ ...form, emoji: e.target.value })} />
              </div>
              <div>
                <Label>الترتيب (الأكبر يظهر أولاً)</Label>
                <Input
                  type="number"
                  min={0}
                  value={form.sort_order}
                  onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) || 0 })}
                />
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

      {/* ===== TV App dialog ===== */}
      <Dialog open={appOpen} onOpenChange={setAppOpen}>
        <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingApp ? "تعديل تطبيق" : "تطبيق جديد"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div>
              <Label>اسم التطبيق</Label>
              <Input value={appForm.name} onChange={(e) => setAppForm({ ...appForm, name: e.target.value })} placeholder="مثال: Smart IPTV" />
            </div>
            <div>
              <Label>الوصف</Label>
              <Textarea rows={2} value={appForm.description} onChange={(e) => setAppForm({ ...appForm, description: e.target.value })} />
            </div>

            <div>
              <Label>صورة/أيقونة التطبيق</Label>
              <div className="flex items-center gap-3">
                <Input type="file" accept="image/*" onChange={handleAppImageUpload} disabled={imgUploading} className="flex-1" />
                {imgUploading && <Loader2 className="h-4 w-4 animate-spin" />}
              </div>
              {appForm.image_url && (
                <div className="mt-2 flex items-center gap-2">
                  <img src={appForm.image_url} alt="" className="h-16 w-16 object-cover rounded border border-border/50" />
                  <Input value={appForm.image_url} onChange={(e) => setAppForm({ ...appForm, image_url: e.target.value })} className="flex-1 text-xs" />
                </div>
              )}
            </div>

            <div>
              <Label>ملف APK (حد أقصى 200MB)</Label>
              <div className="flex items-center gap-3">
                <Input
                  type="file"
                  accept=".apk,application/vnd.android.package-archive"
                  onChange={handleApkUpload}
                  disabled={apkUploading}
                  className="flex-1"
                />
                {apkUploading && <Loader2 className="h-4 w-4 animate-spin" />}
              </div>
              {appForm.apk_url && (
                <Input
                  value={appForm.apk_url}
                  onChange={(e) => setAppForm({ ...appForm, apk_url: e.target.value })}
                  className="mt-2 text-xs"
                  placeholder="رابط APK"
                />
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 items-end">
              <div>
                <Label>الترتيب</Label>
                <Input
                  type="number"
                  min={0}
                  value={appForm.sort_order}
                  onChange={(e) => setAppForm({ ...appForm, sort_order: Number(e.target.value) || 0 })}
                />
              </div>
              <div className="flex items-center gap-3 pb-2">
                <Switch checked={appForm.is_available} onCheckedChange={(v) => setAppForm({ ...appForm, is_available: v })} />
                <Label>منشور</Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAppOpen(false)}>إلغاء</Button>
            <Button onClick={saveApp} disabled={appSaving || apkUploading || imgUploading}>
              {appSaving && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
              حفظ
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;
