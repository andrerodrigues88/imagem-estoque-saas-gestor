-- Enable RLS on all remaining tables
ALTER TABLE public.entradas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.estoque ENABLE ROW LEVEL SECURITY; 
ALTER TABLE public.fornecedores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.produtos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saidas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.unidades_medida ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;

-- Create basic RLS policies for existing tables
-- Produtos policies
CREATE POLICY "All users can view products" ON public.produtos FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage products" ON public.produtos FOR ALL USING (auth.role() = 'authenticated');

-- Fornecedores policies  
CREATE POLICY "All users can view suppliers" ON public.fornecedores FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage suppliers" ON public.fornecedores FOR ALL USING (auth.role() = 'authenticated');

-- Unidades medida policies
CREATE POLICY "All users can view units" ON public.unidades_medida FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage units" ON public.unidades_medida FOR ALL USING (auth.role() = 'authenticated');

-- Entradas policies
CREATE POLICY "All users can view entries" ON public.entradas FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage entries" ON public.entradas FOR ALL USING (auth.role() = 'authenticated');

-- Saidas policies
CREATE POLICY "All users can view exits" ON public.saidas FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage exits" ON public.saidas FOR ALL USING (auth.role() = 'authenticated');

-- Estoque policies
CREATE POLICY "All users can view stock" ON public.estoque FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage stock" ON public.estoque FOR ALL USING (auth.role() = 'authenticated');

-- Usuarios policies (legacy table - may not be needed with auth)
CREATE POLICY "Users can view their own data" ON public.usuarios FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage users" ON public.usuarios FOR ALL USING (auth.role() = 'authenticated');

-- Businesses policies
CREATE POLICY "All users can view businesses" ON public.businesses FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage businesses" ON public.businesses FOR ALL USING (auth.role() = 'authenticated');

-- Fix function search paths by recreating functions with proper search_path
CREATE OR REPLACE FUNCTION public.atualiza_estoque_entrada()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO estoque (produto_id, quantidade, atualizado_em)
  VALUES (NEW.produto_id, NEW.quantidade, now())
  ON CONFLICT (produto_id) DO UPDATE
  SET quantidade = estoque.quantidade + EXCLUDED.quantidade,
      atualizado_em = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION public.atualiza_estoque_saida()
RETURNS TRIGGER AS $$
BEGIN
  IF (SELECT quantidade FROM estoque WHERE produto_id = NEW.produto_id) < NEW.quantidade THEN
    RAISE EXCEPTION 'Estoque insuficiente para produto %', NEW.produto_id;
  END IF;

  UPDATE estoque
  SET quantidade = quantidade - NEW.quantidade,
      atualizado_em = now()
  WHERE produto_id = NEW.produto_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name, role, created_at, subscription_status)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    'user',
    NOW(),
    'active'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION public.is_subscription_active(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = user_id 
    AND subscription_status = 'active'
    AND (subscription_end_date IS NULL OR subscription_end_date >= CURRENT_DATE)
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE SET search_path = public;

CREATE OR REPLACE FUNCTION public.update_subscription_dates()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.subscription_plan IS DISTINCT FROM OLD.subscription_plan OR 
     NEW.subscription_start_date IS DISTINCT FROM OLD.subscription_start_date THEN
    
    CASE NEW.subscription_plan
      WHEN 'monthly' THEN
        NEW.subscription_end_date := NEW.subscription_start_date + INTERVAL '1 month';
      WHEN 'semiannual' THEN  
        NEW.subscription_end_date := NEW.subscription_start_date + INTERVAL '6 months';
      WHEN 'annual' THEN
        NEW.subscription_end_date := NEW.subscription_start_date + INTERVAL '1 year';
    END CASE;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;