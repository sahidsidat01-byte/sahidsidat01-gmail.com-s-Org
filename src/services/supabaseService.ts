import { getSupabase, isSupabaseConfigured } from '../lib/supabase';
import { Room, Dish, BookingState, TableReservation } from '../types';
import { ROOMS_DATA, DISHES_DATA, INITIAL_BOOKINGS } from '../data/hotelData';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  role: 'guest' | 'admin';
}

export interface SupabaseBookingRecord {
  id: string;
  reservation_code: string;
  room_id: string;
  room_name: string;
  room_image?: string;
  check_in: string;
  check_out: string;
  nights: number;
  adults: number;
  children: number;
  base_rate: number;
  taxes: number;
  resort_fee: number;
  promo_code?: string;
  discount: number;
  total_amount: number;
  guest_first_name: string;
  guest_last_name: string;
  guest_email: string;
  guest_phone: string;
  arrival_time: string;
  special_requests: string[];
  custom_notes?: string;
  payment_method: string;
  status: 'Confirmed' | 'Checked-in' | 'Checked-out' | 'Cancelled';
  created_at: string;
}

export interface SupabaseTableReservationRecord {
  id: string;
  reference_code: string;
  reservation_date: string;
  time_slot: string;
  guests_count: number;
  ambience: string;
  guest_name: string;
  guest_phone: string;
  guest_email: string;
  occasion: string;
  special_requests?: string;
  status: string;
  created_at: string;
}

export interface SupabaseOrderRecord {
  id: string;
  order_code: string;
  room_or_table: string;
  delivery_mode: string;
  items: any;
  total_amount: number;
  note?: string;
  status: string;
  created_at: string;
}

export interface SupabaseInquiryRecord {
  id: string;
  inquiry_type: string;
  full_name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: string;
  created_at: string;
}

// In-memory / LocalStorage cache fallback when Supabase is not yet connected
const LOCAL_BOOKINGS_KEY = 'rg_local_bookings';
const LOCAL_TABLES_KEY = 'rg_local_tables';
const LOCAL_ORDERS_KEY = 'rg_local_orders';
const LOCAL_INQUIRIES_KEY = 'rg_local_inquiries';

function getLocal<T>(key: string, defaultVal: T): T {
  if (typeof window === 'undefined') return defaultVal;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : defaultVal;
  } catch {
    return defaultVal;
  }
}

function setLocal<T>(key: string, val: T) {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {
      console.error(e);
    }
  }
}

// -------------------------------------------------------------
// AUTHENTICATION CRUD
// -------------------------------------------------------------
export async function signUpUser(email: string, password: string, fullName: string, phone: string) {
  const sb = getSupabase();
  if (!sb || !isSupabaseConfigured()) {
    // Local session simulation
    const fakeUser: UserProfile = {
      id: 'local-user-' + Date.now(),
      email,
      fullName,
      phone,
      role: email.includes('admin') || email.includes('gm') ? 'admin' : 'guest',
    };
    setLocal('rg_current_user', fakeUser);
    return { user: fakeUser, error: null };
  }

  const { data, error } = await sb.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        phone,
        role: email.includes('admin') || email.includes('gm') ? 'admin' : 'guest',
      },
    },
  });

  if (error) return { user: null, error: error.message };

  const profile: UserProfile = {
    id: data.user?.id || '',
    email: data.user?.email || '',
    fullName,
    phone,
    role: (data.user?.user_metadata?.role as any) || 'guest',
  };

  return { user: profile, error: null };
}

export async function signInUser(email: string, password: string) {
  const sb = getSupabase();
  if (!sb || !isSupabaseConfigured()) {
    const fakeUser: UserProfile = {
      id: 'local-user-1',
      email,
      fullName: email.split('@')[0],
      role: email.includes('admin') || email.includes('gm') ? 'admin' : 'guest',
    };
    setLocal('rg_current_user', fakeUser);
    return { user: fakeUser, error: null };
  }

  const { data, error } = await sb.auth.signInWithPassword({ email, password });
  if (error) return { user: null, error: error.message };

  const profile: UserProfile = {
    id: data.user.id,
    email: data.user.email || '',
    fullName: data.user.user_metadata?.full_name || email.split('@')[0],
    phone: data.user.user_metadata?.phone,
    role: data.user.user_metadata?.role || 'guest',
  };

  return { user: profile, error: null };
}

export async function signOutUser() {
  const sb = getSupabase();
  if (sb && isSupabaseConfigured()) {
    await sb.auth.signOut();
  }
  if (typeof window !== 'undefined') {
    localStorage.removeItem('rg_current_user');
  }
}

export async function getCurrentUserProfile(): Promise<UserProfile | null> {
  const sb = getSupabase();
  if (!sb || !isSupabaseConfigured()) {
    return getLocal<UserProfile | null>('rg_current_user', null);
  }

  const { data: { user } } = await sb.auth.getUser();
  if (!user) return null;

  return {
    id: user.id,
    email: user.email || '',
    fullName: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Guest',
    phone: user.user_metadata?.phone,
    role: user.user_metadata?.role || 'guest',
  };
}

// -------------------------------------------------------------
// STAY BOOKINGS CRUD
// -------------------------------------------------------------
export async function createBooking(
  booking: BookingState,
  reservationCode: string,
  userId?: string
): Promise<{ success: boolean; data?: any; error?: string }> {
  const sb = getSupabase();

  const bookingRecord: Omit<SupabaseBookingRecord, 'id' | 'created_at'> = {
    reservation_code: reservationCode,
    room_id: booking.roomId,
    room_name: booking.roomName,
    room_image: booking.roomImage,
    check_in: booking.checkIn,
    check_out: booking.checkOut,
    nights: booking.nights,
    adults: booking.adults,
    children: booking.children,
    base_rate: booking.baseRate,
    taxes: booking.taxes,
    resort_fee: booking.resortFee,
    promo_code: booking.promoCode,
    discount: booking.discount,
    total_amount: booking.total,
    guest_first_name: booking.guestFirstName,
    guest_last_name: booking.guestLastName,
    guest_email: booking.guestEmail,
    guest_phone: booking.guestPhone,
    arrival_time: booking.arrivalTime,
    special_requests: booking.specialRequests,
    custom_notes: booking.customNotes,
    payment_method: booking.paymentMethod,
    status: 'Confirmed',
  };

  // Always update local cache for instant offline access
  const localList = getLocal<any[]>(LOCAL_BOOKINGS_KEY, INITIAL_BOOKINGS);
  const localNew = {
    id: reservationCode.replace('#', ''),
    guestName: `${booking.guestFirstName} ${booking.guestLastName}`.trim(),
    initials: (booking.guestFirstName[0] + (booking.guestLastName[0] || '')).toUpperCase(),
    suite: booking.roomName,
    dates: `${booking.checkIn} – ${booking.checkOut} (${booking.nights} Nights)`,
    amount: booking.total,
    status: 'Confirmed',
    details: bookingRecord,
  };
  setLocal(LOCAL_BOOKINGS_KEY, [localNew, ...localList]);

  if (sb && isSupabaseConfigured()) {
    try {
      const payload: any = { ...bookingRecord };
      if (userId) payload.user_id = userId;

      const { data, error } = await sb.from('bookings').insert([payload]).select().single();
      if (error) {
        console.warn('Supabase booking insert warning:', error.message);
        return { success: true, data: localNew };
      }
      return { success: true, data };
    } catch (err: any) {
      console.warn('Network issue during booking insert:', err.message);
      return { success: true, data: localNew };
    }
  }

  return { success: true, data: localNew };
}

export async function fetchAllBookings(): Promise<any[]> {
  const sb = getSupabase();
  const fallback = getLocal<any[]>(LOCAL_BOOKINGS_KEY, INITIAL_BOOKINGS);

  if (sb && isSupabaseConfigured()) {
    try {
      const { data, error } = await sb
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        return data.map((b: SupabaseBookingRecord) => ({
          id: b.reservation_code.replace('#', ''),
          guestName: `${b.guest_first_name} ${b.guest_last_name}`,
          initials: (b.guest_first_name[0] + (b.guest_last_name[0] || '')).toUpperCase(),
          suite: b.room_name,
          dates: `${b.check_in} – ${b.check_out} (${b.nights} Nights)`,
          amount: Number(b.total_amount),
          status: b.status,
        }));
      }
    } catch (err) {
      console.warn('Using local bookings fallback:', err);
    }
  }

  return fallback;
}

export async function updateBookingStatus(id: string, status: string): Promise<boolean> {
  const sb = getSupabase();
  const fallback = getLocal<any[]>(LOCAL_BOOKINGS_KEY, INITIAL_BOOKINGS);
  const updated = fallback.map((b) => (b.id === id ? { ...b, status } : b));
  setLocal(LOCAL_BOOKINGS_KEY, updated);

  if (sb && isSupabaseConfigured()) {
    try {
      await sb
        .from('bookings')
        .update({ status })
        .or(`id.eq.${id},reservation_code.eq.${id},reservation_code.eq.#${id}`);
      return true;
    } catch (err) {
      console.error(err);
    }
  }

  return true;
}

// -------------------------------------------------------------
// TABLE RESERVATIONS CRUD
// -------------------------------------------------------------
export async function createTableReservation(
  reservation: {
    date: string;
    timeSlot: string;
    guestsCount: number;
    ambience: string;
    guestName: string;
    phone: string;
    email: string;
    occasion: string;
    specialRequests?: string;
  },
  referenceCode: string
): Promise<{ success: boolean; data?: any }> {
  const sb = getSupabase();
  const record: Omit<SupabaseTableReservationRecord, 'id' | 'created_at'> = {
    reference_code: referenceCode,
    reservation_date: reservation.date,
    time_slot: reservation.timeSlot,
    guests_count: reservation.guestsCount,
    ambience: reservation.ambience,
    guest_name: reservation.guestName,
    guest_phone: reservation.phone,
    guest_email: reservation.email,
    occasion: reservation.occasion,
    special_requests: reservation.specialRequests,
    status: 'Confirmed',
  };

  const localTables = getLocal<any[]>(LOCAL_TABLES_KEY, []);
  setLocal(LOCAL_TABLES_KEY, [record, ...localTables]);

  if (sb && isSupabaseConfigured()) {
    try {
      const { data, error } = await sb.from('table_reservations').insert([record]).select().single();
      if (!error) return { success: true, data };
    } catch (err) {
      console.warn('Table reservation cloud insert fallback:', err);
    }
  }

  return { success: true, data: record };
}

export async function fetchTableReservations(): Promise<any[]> {
  const sb = getSupabase();
  const fallback = getLocal<any[]>(LOCAL_TABLES_KEY, []);

  if (sb && isSupabaseConfigured()) {
    try {
      const { data, error } = await sb.from('table_reservations').select('*').order('created_at', { ascending: false });
      if (!error && data) return data;
    } catch (err) {
      console.warn('Fetch table reservations fallback:', err);
    }
  }
  return fallback;
}

// -------------------------------------------------------------
// ROOM & DINING ORDERS CRUD
// -------------------------------------------------------------
export async function createRoomOrder(
  order: {
    roomOrTable: string;
    deliveryMode: string;
    items: any;
    totalAmount: number;
    note?: string;
  },
  orderCode: string
): Promise<{ success: boolean; data?: any }> {
  const sb = getSupabase();
  const record: Omit<SupabaseOrderRecord, 'id' | 'created_at'> = {
    order_code: orderCode,
    room_or_table: order.roomOrTable,
    delivery_mode: order.deliveryMode,
    items: order.items,
    total_amount: order.totalAmount,
    note: order.note,
    status: 'Preparing (12m)',
  };

  const localOrders = getLocal<any[]>(LOCAL_ORDERS_KEY, []);
  setLocal(LOCAL_ORDERS_KEY, [record, ...localOrders]);

  if (sb && isSupabaseConfigured()) {
    try {
      const { data, error } = await sb.from('room_orders').insert([record]).select().single();
      if (!error) return { success: true, data };
    } catch (err) {
      console.warn('Room order insert fallback:', err);
    }
  }

  return { success: true, data: record };
}

export async function fetchRoomOrders(): Promise<any[]> {
  const sb = getSupabase();
  const fallback = getLocal<any[]>(LOCAL_ORDERS_KEY, []);

  if (sb && isSupabaseConfigured()) {
    try {
      const { data, error } = await sb.from('room_orders').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) return data;
    } catch (err) {
      console.warn('Fetch room orders fallback:', err);
    }
  }
  return fallback;
}

// -------------------------------------------------------------
// CONCIERGE INQUIRIES CRUD
// -------------------------------------------------------------
export async function createInquiry(inquiry: {
  inquiryType: string;
  fullName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}): Promise<{ success: boolean }> {
  const sb = getSupabase();
  const record = {
    inquiry_type: inquiry.inquiryType,
    full_name: inquiry.fullName,
    email: inquiry.email,
    phone: inquiry.phone,
    subject: inquiry.subject,
    message: inquiry.message,
    status: 'Pending',
  };

  const localInquiries = getLocal<any[]>(LOCAL_INQUIRIES_KEY, []);
  setLocal(LOCAL_INQUIRIES_KEY, [record, ...localInquiries]);

  if (sb && isSupabaseConfigured()) {
    try {
      await sb.from('inquiries').insert([record]);
    } catch (err) {
      console.warn('Inquiry insert fallback:', err);
    }
  }
  return { success: true };
}

export async function fetchInquiries(): Promise<any[]> {
  const sb = getSupabase();
  const fallback = getLocal<any[]>(LOCAL_INQUIRIES_KEY, []);

  if (sb && isSupabaseConfigured()) {
    try {
      const { data, error } = await sb.from('inquiries').select('*').order('created_at', { ascending: false });
      if (!error && data) return data;
    } catch (err) {
      console.warn('Fetch inquiries fallback:', err);
    }
  }
  return fallback;
}

// -------------------------------------------------------------
// ROOMS & DISHES CATALOG QUERY (with live fallback)
// -------------------------------------------------------------
export async function getRoomsCatalog(): Promise<Room[]> {
  const sb = getSupabase();
  if (sb && isSupabaseConfigured()) {
    try {
      const { data, error } = await sb.from('rooms').select('*');
      if (!error && data && data.length > 0) {
        return data.map((r: any) => ({
          id: r.id,
          name: r.name,
          category: r.category,
          price: Number(r.price),
          originalPrice: r.original_price ? Number(r.original_price) : undefined,
          sizeSqFt: r.size_sq_ft,
          rating: Number(r.rating),
          reviewsCount: r.reviews_count,
          badge: r.badge,
          badgeType: r.badge_type,
          freeCancellation: r.free_cancellation,
          image: r.image_url,
          description: r.description,
          amenities: r.amenities || [],
          bedType: r.bed_type,
          view: r.view_type,
          maxGuests: r.max_guests,
        }));
      }
    } catch (err) {
      console.warn('Rooms cloud query fallback:', err);
    }
  }
  return ROOMS_DATA;
}

export async function getDishesCatalog(): Promise<Dish[]> {
  const sb = getSupabase();
  if (sb && isSupabaseConfigured()) {
    try {
      const { data, error } = await sb.from('dishes').select('*');
      if (!error && data && data.length > 0) {
        return data.map((d: any) => ({
          id: d.id,
          name: d.name,
          category: d.category,
          type: d.type,
          price: Number(d.price),
          image: d.image_url,
          description: d.description,
          isRecommended: d.is_recommended,
          tags: d.tags || [],
          pairingSuggestion: d.pairing_suggestion,
        }));
      }
    } catch (err) {
      console.warn('Dishes cloud query fallback:', err);
    }
  }
  return DISHES_DATA;
}
