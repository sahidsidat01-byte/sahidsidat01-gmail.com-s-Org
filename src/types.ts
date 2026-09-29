export type PageType = 
  | 'home' 
  | 'rooms' 
  | 'dining' 
  | 'book' 
  | 'table-reservation' 
  | 'gallery' 
  | 'about' 
  | 'contact' 
  | 'admin';

export interface Room {
  id: string;
  name: string;
  category: 'deluxe' | 'executive' | 'penthouse' | 'villas';
  price: number;
  originalPrice?: number;
  sizeSqFt: number;
  rating: number;
  reviewsCount: number;
  badge?: string;
  badgeType?: 'primary' | 'secondary' | 'tertiary' | 'neutral';
  freeCancellation: boolean;
  image: string;
  description: string;
  amenities: { name: string; icon: string }[];
  bedType: string;
  view: string;
  maxGuests: number;
}

export interface Dish {
  id: string;
  name: string;
  category: 'signatures' | 'starters' | 'royal-mains' | 'continental' | 'breads' | 'desserts' | 'mocktails';
  type: 'veg' | 'non-veg';
  price: number;
  image: string;
  description: string;
  isRecommended: boolean;
  tags: string[];
  spiceLevel?: 'Mild' | 'Medium' | 'Royal Fiery';
  pairingSuggestion?: string;
  serves?: string;
  allergens?: string;
}

export interface CartItem {
  dish: Dish;
  quantity: number;
  customization?: string;
}

export interface BookingState {
  roomId: string;
  roomName: string;
  roomImage: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  adults: number;
  children: number;
  baseRate: number;
  taxes: number;
  resortFee: number;
  promoCode: string;
  discount: number;
  total: number;
  guestFirstName: string;
  guestLastName: string;
  guestEmail: string;
  guestPhone: string;
  arrivalTime: string;
  specialRequests: string[];
  customNotes: string;
  paymentMethod: 'upi' | 'card' | 'arrival';
}

export interface TableReservation {
  id: string;
  date: string;
  timeSlot: string;
  guestsCount: number;
  ambience: 'Courtyard Fountain' | 'Candlelight Verandah' | 'Private Salon' | 'Wine Cellar Alcove';
  guestName: string;
  phone: string;
  email: string;
  occasion: string;
  specialRequests: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'suites' | 'architecture' | 'dining' | 'pool' | 'events';
  categoryLabel: string;
  location: string;
  description: string;
  image: string;
  aspect?: string;
  timeOfDay?: string;
}
