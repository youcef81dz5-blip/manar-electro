
-- Table for TV apps
CREATE TABLE public.tv_apps (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  image_url TEXT,
  apk_url TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_available BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.tv_apps ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view tv apps"
ON public.tv_apps FOR SELECT
USING (true);

CREATE POLICY "Admins can insert tv apps"
ON public.tv_apps FOR INSERT
TO authenticated
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update tv apps"
ON public.tv_apps FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete tv apps"
ON public.tv_apps FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_tv_apps_updated_at
BEFORE UPDATE ON public.tv_apps
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Storage bucket for APK files and images
INSERT INTO storage.buckets (id, name, public)
VALUES ('tv-apps', 'tv-apps', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public can read tv-apps files"
ON storage.objects FOR SELECT
USING (bucket_id = 'tv-apps');

CREATE POLICY "Admins can upload tv-apps files"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'tv-apps' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update tv-apps files"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'tv-apps' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete tv-apps files"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'tv-apps' AND has_role(auth.uid(), 'admin'::app_role));
