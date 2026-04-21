ALTER TABLE public.products ADD COLUMN sort_order integer NOT NULL DEFAULT 0;
CREATE INDEX idx_products_sort_order ON public.products(sort_order DESC, created_at DESC);