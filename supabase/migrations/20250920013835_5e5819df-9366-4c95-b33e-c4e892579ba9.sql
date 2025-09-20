-- Enable RLS on profiles table and add missing columns
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT now();

-- Create subscription plans enum
CREATE TYPE public.subscription_plan AS ENUM ('monthly', 'semiannual', 'annual');

-- Create subscription status enum  
CREATE TYPE public.subscription_status AS ENUM ('active', 'expired', 'suspended');

-- Create user roles enum
CREATE TYPE public.user_role AS ENUM ('super_admin', 'admin', 'user');

-- Update profiles table with new columns
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS subscription_plan public.subscription_plan DEFAULT 'monthly',
ADD COLUMN IF NOT EXISTS subscription_status public.subscription_status DEFAULT 'active',
ADD COLUMN IF NOT EXISTS subscription_start_date DATE,
ADD COLUMN IF NOT EXISTS subscription_end_date DATE,
ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES auth.users(id);

-- Update the role column to use the new enum
ALTER TABLE public.profiles ALTER COLUMN role TYPE public.user_role USING role::public.user_role;
ALTER TABLE public.profiles ALTER COLUMN role SET DEFAULT 'user';

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Super admins can view all profiles" 
ON public.profiles 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'super_admin'
  )
);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = id);

CREATE POLICY "Super admins can update all profiles" 
ON public.profiles 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'super_admin'
  )
);

CREATE POLICY "Super admins can insert profiles" 
ON public.profiles 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'super_admin'
  )
);

CREATE POLICY "Auto insert profile on signup" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = id);

-- Create function to handle new user registration
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user registration
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert super admin user (will be created when user signs up)
-- This is just a placeholder - the actual user will be created through auth

-- Function to check if user has expired subscription
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update subscription dates based on plan
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
$$ LANGUAGE plpgsql;

-- Create trigger for subscription date updates
CREATE TRIGGER update_subscription_dates_trigger
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_subscription_dates();