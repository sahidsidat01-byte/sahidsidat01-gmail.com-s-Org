-- ====================================================================
-- ROSE GARDEN LUXURY HERITAGE HOTEL & RESTAURANT
-- SUPABASE POSTGRESQL DATABASE SCHEMA & ROW LEVEL SECURITY (RLS)
-- ====================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. User Profiles Table (Synchronized with Supabase Auth)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  phone TEXT,
  role TEXT DEFAULT 'guest' CHECK (role IN ('guest', 'admin', 'concierge')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger to automatically create a profile record when a user signs up via Supabase Auth
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, phone, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'phone', ''),
    COALESCE(NEW.raw_user_meta_data->>'role', 'guest')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 3. Rooms & Suites Catalog Table
CREATE TABLE IF NOT EXISTS public.rooms (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('deluxe', 'executive', 'penthouse', 'villas')),
  price NUMERIC NOT NULL,
  original_price NUMERIC,
  size_sq_ft INTEGER NOT NULL,
  rating NUMERIC DEFAULT 4.9,
  reviews_count INTEGER DEFAULT 0,
  badge TEXT,
  badge_type TEXT DEFAULT 'neutral',
  free_cancellation BOOLEAN DEFAULT TRUE,
  image_url TEXT NOT NULL,
  description TEXT NOT NULL,
  amenities JSONB DEFAULT '[]'::jsonb,
  bed_type TEXT NOT NULL,
  view_type TEXT NOT NULL,
  max_guests INTEGER DEFAULT 2,
  is_available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Stay Bookings Table
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  reservation_code TEXT NOT NULL UNIQUE,
  room_id TEXT REFERENCES public.rooms(id) ON DELETE RESTRICT,
  room_name TEXT NOT NULL,
  room_image TEXT,
  check_in TEXT NOT NULL,
  check_out TEXT NOT NULL,
  nights INTEGER NOT NULL DEFAULT 1,
  adults INTEGER NOT NULL DEFAULT 2,
  children INTEGER NOT NULL DEFAULT 0,
  base_rate NUMERIC NOT NULL,
  taxes NUMERIC NOT NULL,
  resort_fee NUMERIC DEFAULT 1200,
  promo_code TEXT,
  discount NUMERIC DEFAULT 0,
  total_amount NUMERIC NOT NULL,
  guest_first_name TEXT NOT NULL,
  guest_last_name TEXT NOT NULL,
  guest_email TEXT NOT NULL,
  guest_phone TEXT NOT NULL,
  arrival_time TEXT DEFAULT '14:00 – 16:00',
  special_requests TEXT[] DEFAULT ARRAY[]::TEXT[],
  custom_notes TEXT,
  payment_method TEXT DEFAULT 'upi' CHECK (payment_method IN ('upi', 'card', 'arrival')),
  status TEXT DEFAULT 'Confirmed' CHECK (status IN ('Confirmed', 'Checked-in', 'Checked-out', 'Cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Dishes & Menu Delicacies Table
CREATE TABLE IF NOT EXISTS public.dishes (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('signatures', 'starters', 'royal-mains', 'continental', 'breads', 'desserts', 'mocktails')),
  type TEXT NOT NULL CHECK (type IN ('veg', 'non-veg')),
  price NUMERIC NOT NULL,
  image_url TEXT NOT NULL,
  description TEXT NOT NULL,
  is_recommended BOOLEAN DEFAULT FALSE,
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  pairing_suggestion TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Restaurant Table Reservations Table
CREATE TABLE IF NOT EXISTS public.table_reservations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  reference_code TEXT NOT NULL UNIQUE,
  reservation_date TEXT NOT NULL,
  time_slot TEXT NOT NULL,
  guests_count INTEGER NOT NULL DEFAULT 2,
  ambience TEXT NOT NULL CHECK (ambience IN ('Courtyard Fountain', 'Candlelight Verandah', 'Private Salon', 'Wine Cellar Alcove')),
  guest_name TEXT NOT NULL,
  guest_phone TEXT NOT NULL,
  guest_email TEXT NOT NULL,
  occasion TEXT NOT NULL,
  special_requests TEXT,
  status TEXT DEFAULT 'Confirmed' CHECK (status IN ('Confirmed', 'Seated', 'Completed', 'Cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. In-Room & Dining Delivery Orders Table
CREATE TABLE IF NOT EXISTS public.room_orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  order_code TEXT NOT NULL UNIQUE,
  room_or_table TEXT NOT NULL,
  delivery_mode TEXT NOT NULL CHECK (delivery_mode IN ('suite', 'takeaway', 'local')),
  items JSONB NOT NULL,
  total_amount NUMERIC NOT NULL,
  note TEXT,
  status TEXT DEFAULT 'Preparing (12m)' CHECK (status IN ('Preparing (12m)', 'Ready for Delivery', 'Completed', 'Cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Concierge & Experience Inquiries Table
CREATE TABLE IF NOT EXISTS public.inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  inquiry_type TEXT NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'Pending' CHECK (status IN ('Pending', 'In Progress', 'Resolved')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================

-- Enable RLS across all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dishes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.table_reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.room_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- A. Profiles Policies
CREATE POLICY "Public profiles can be viewed by all authenticated users"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- B. Rooms Policies (Anyone can view catalog, admins can manage)
CREATE POLICY "Anyone can view rooms"
  ON public.rooms FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage rooms"
  ON public.rooms FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- C. Bookings Policies
-- Guests can create reservations (even unauthenticated guest checkouts allowed)
CREATE POLICY "Anyone can insert bookings"
  ON public.bookings FOR INSERT
  WITH CHECK (true);

-- Authenticated users can view their own bookings, admins can view all
CREATE POLICY "Users can view own bookings or admins view all"
  ON public.bookings FOR SELECT
  USING (
    auth.uid() = user_id OR
    user_id IS NULL OR
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins or owners can update bookings"
  ON public.bookings FOR UPDATE
  USING (
    auth.uid() = user_id OR
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- D. Dishes Policies
CREATE POLICY "Anyone can view menu dishes"
  ON public.dishes FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage dishes"
  ON public.dishes FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- E. Table Reservations Policies
CREATE POLICY "Anyone can insert table reservations"
  ON public.table_reservations FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users view own table reservations or admins view all"
  ON public.table_reservations FOR SELECT
  USING (
    auth.uid() = user_id OR
    user_id IS NULL OR
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins or owners can update table reservations"
  ON public.table_reservations FOR UPDATE
  USING (
    auth.uid() = user_id OR
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- F. Room Orders Policies
CREATE POLICY "Anyone can insert room orders"
  ON public.room_orders FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users view own room orders or admins view all"
  ON public.room_orders FOR SELECT
  USING (
    auth.uid() = user_id OR
    user_id IS NULL OR
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can update room orders"
  ON public.room_orders FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- G. Inquiries Policies
CREATE POLICY "Anyone can insert inquiries"
  ON public.inquiries FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view and update inquiries"
  ON public.inquiries FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- ====================================================================
-- INITIAL SEED DATA
-- ====================================================================

-- Insert Rooms
INSERT INTO public.rooms (id, name, category, price, original_price, size_sq_ft, rating, reviews_count, badge, badge_type, free_cancellation, image_url, description, bed_type, view_type, max_guests, amenities)
VALUES
('presidential-suite', 'The Presidential Rose Suite', 'penthouse', 22000, 26000, 850, 4.98, 86, 'Most Luxurious', 'primary', true, 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-et3JtSDCvZ_vib_7JE4AY7EjjGS-G1JhxQbmvaFa9yE9QRbebmYLGFUiZDVo-MlnQvYMHWzCklpEE_IrKVXw_peoOcggg2FPLIMY2iTX2ugbQ9hg2kD266bYg3Jp3RrOYxHrGUaV23Yqcjq-3McAjUOEEc0MUce7YpVC4jvx2KsQytDe34GQWfLhqqWYWh_AbsO9PQFZscWsQKhwYfogX67-RquzZD34aTGBHOiUtBSiSHGhKA95', 'Panoramic mountain & garden vista, bespoke imperial decor, dual king bedrooms, and an expansive private balcony with an outdoor heated plunge pool.', '2 King Beds', 'Mountain & Rose Garden', 4, '[{"name": "Private Plunge Pool", "icon": "pool"}, {"name": "2 King Beds", "icon": "bed"}, {"name": "Mountain Panorama", "icon": "landscape"}, {"name": "24h Butler", "icon": "room_service"}]'::jsonb),
('executive-deluxe', 'Executive Garden Deluxe', 'deluxe', 9200, 11000, 480, 4.86, 142, 'Garden View', 'secondary', true, 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfRN62bINs6cuFTeSYsWASoIVWRh0NIfwi0gmmbQkcZrXK7a4w3OjPm3vxef7W6Q0hHo5ROjYsKfox1h2DawdufpRNmAYgi3NwDsA-a8-WZ2ay7aPYWlkgXzh53sWj7vdluTuSa2P6gA3h2nSKsp_pGPlnMigz7KvK9OXxGnu72o3PXfcwuhjbu1oqxpWzLn2uZv9e95PSdqchzSijKvXE-FO8oUsmRZU7v_q5Bk1ICsBirM5mPfhz', 'Private sun-drenched veranda directly overlooking the heritage rose nursery, featuring spa-grade rain shower and artisanal morning breakfast.', 'King Bed', 'Heritage Rose Nursery', 2, '[{"name": "Private Balcony", "icon": "balcony"}, {"name": "King Bed", "icon": "king_bed"}, {"name": "Rain Shower", "icon": "shower"}, {"name": "Buffet Breakfast", "icon": "free_breakfast"}]'::jsonb),
('heritage-royal-club', 'Heritage Royal Club', 'executive', 12500, 14500, 600, 4.93, 98, 'Club Privileges', 'tertiary', true, 'https://lh3.googleusercontent.com/aida-public/AB6AXuAD1Qzuzgu8icir9ClshEAODAyO9fosAo57Mws_6d4DuCjP6qh_C6v-6txozAh_iHVjlMxqB7MqZg0AoNAAI1p8ZhFNxygfgyZxDOymQ6BE1niBMQRJycAdHhiFW9jR1-oqqrYsy-1L5D6h8rFYnDIecvv1QsoGufcqtpfixAvrFk-cjToNF0ceNdLb0kFlsq5tJwqO9x6zqneBr-PaTe2Du3McksNdGh9BBNhnH4llI1uS1St25ZbF', 'Colonial grandeur elevated by bespoke personalized butler service, deep soaking bathtub, and exclusive evening tea service in the Member''s Lounge.', 'King Canopy Bed', 'Inner Courtyard Fountain', 3, '[{"name": "Butler Service", "icon": "concierge"}, {"name": "Soaking Tub", "icon": "bathtub"}, {"name": "Evening High Tea", "icon": "local_cafe"}]'::jsonb),
('superior-comfort', 'Superior Comfort Room', 'deluxe', 6400, 7800, 350, 4.74, 210, 'Great Value', 'neutral', true, 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6TS8kpFQhYuB7cJm0-35WI-ZBmCcQ0oFofQqRG81vm23M6L3VTOBHtAv7Z3xEc4KLJ7drPTghe0jorNlNwfQAKWmm2Zbv8Fpaa1XymnLW5Th7hvsSmjsnoxZaE-PKS81b05gjRU5olErvvQYAY9NyalivJmdKYUIfbr_AsEw0tn2LPxOJVH166gW0JFJjwWuPTNfaMgsYgzVC3QgZy3MC9kr0GG9qtOrCjnL0p8W254f_bjqwSOMZ', 'An intimate, tranquil sanctuary thoughtfully configured with an ergonomic workspace, high-speed Wi-Fi, and a bean-to-cup espresso setup.', 'Queen Bed', 'Botanical Grounds', 2, '[{"name": "Queen Bed", "icon": "single_bed"}, {"name": "Work Desk", "icon": "desk"}, {"name": "1 Gbps Wi-Fi", "icon": "wifi"}]'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- Insert Dishes
INSERT INTO public.dishes (id, name, category, type, price, image_url, description, is_recommended, tags, pairing_suggestion)
VALUES
('dish-1', 'Royal Saffron Dum Biryani', 'royal-mains', 'non-veg', 750, 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRWjOaoTEx1VXx36F5TZroXOD9-vK3vyJ9uVh3u84vGA0LtMlhytPC1xiP_1l3L_yEjEs-GuEEKPy0YYkZ51-0TF7n78T3Ra1OcopgBzS3IfyZMYJkhacq9b8_n9qgMyXmmZHyxaFYFXSVDt_ckVDrZLXbvXSF_LRoBZ7Pdvj5YSoQw0HSQdQpTxg-PKHALo1Jylg_tGXS4I-Exk9wOZ_e-vx-VDapeo2hu-8Gk4boAU3XfKCrXC19', 'Slow-cooked fragrant Basmati, tender spiced spring lamb, infused with royal Kashmiri saffron aroma and sealed with pastry dough.', true, ARRAY['Served with Burani Raita', 'Serves 1-2', 'Awadhi Special'], 'Vintage Syrah or Spiced Rose Chai'),
('dish-2', 'Paneer Tikka Angara', 'starters', 'veg', 580, 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWxEcNxJC0Sl3lrZiXt6NJ5ZdxOtUYlC-NR98X4o9p3aR6WuZx9eNL2UjWmmXJ5D_ekKDpFYREnQBkC330ChXGmNKFunshyezBvW61mh47Yz707vPH618wf5tSez3qHznh879kaFvOH-OQkIXVuVKfoPg-hwsfzXtBo7HXBKN3Jn5JOnzI0tnQQCvK4tRxCndNiLwfk_BwueUPKqZO00Qb4CdJMRge_48BHnHfE3xeWLihgSlmEI41', 'Farm-fresh cottage cheese cubes smoked in charcoal clay oven, infused with Mathania pickled chili spices and roasted cumin.', true, ARRAY['Mint Laccha Salad', 'Gluten-Free', 'Clay Smoked'], 'Cold-pressed Guava Panna'),
('dish-3', 'Wild Mushroom & Truffle Sotto', 'continental', 'veg', 720, 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5JzRoI-FxRJd53C4ODK-VRPz7loBTCF6YTQ54qf6IQ8kDmTToSuXUsNI08qVAWjIul_AzL7cw4IgQbaPUUuFqr2XuFAkYr5e4lTgUWiu1cYpIjYP6htB1dxCYgS9LUsoHOOyV7jMJmJrYAJ1x0iNqjuU0WPc8eJQNZXWaLvQydbkUp1ouK-GrF0SCu7dKWoajQVrO9HIBsZcI0Fe2ckfPVXnN1Q-xggm5jmBTHtdWD-iuPTpMsO-k', 'Velvety slow-stirred Arborio rice, infused with forest porcini mushrooms, cold-pressed black truffle oil, and 24-month aged Parmigiano Reggiano.', true, ARRAY['Artisan Cheese', 'Vegetarian Delight', 'Italian Classic'], 'Crisp Pinot Grigio'),
('dish-5', 'Rose Petal Panna Cotta', 'desserts', 'veg', 420, 'https://lh3.googleusercontent.com/aida-public/AB6AXuASLJUYdaIsGFPsgerhLV8_4Rl1b-N9h32UzX4eTvk5wV-jw4zI4qOp1PU50IpHYaCehhBYh9LGlg3G6Y4Vhl8wmhr0wyhSL2ZHIEyKLCK13MZ9s5PWs5pQJZhTglubcMb4PpWtEpD9lstzs8p09Q-46HiCrdWYEICF7J3uOx6aVI1JIg4yHocX56jM8Gmt5ycl2vizLs9JZkVb8qL-YyVr1fjIulMdsJnPDHPg2TRclDoJixOZNu8Z', 'Infused with estate-grown organic Damask rose petal reduction, organic vanilla bean cream, crowned with roasted Iranian pistachio praline.', true, ARRAY['House Icon', 'Contains Nuts', 'Eggless'], 'Dessert Wine or Kahwa')
ON CONFLICT (id) DO NOTHING;
