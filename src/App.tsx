/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageType, Room, Dish, CartItem, BookingState } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MobileNav } from './components/MobileNav';
import { MoreDrawer } from './components/MoreDrawer';
import { SearchModal } from './components/SearchModal';
import { RoomDetailModal } from './components/RoomDetailModal';
import { LightboxModal } from './components/LightboxModal';
import { BookingSuccessModal } from './components/BookingSuccessModal';
import { SupabaseSetupModal } from './components/SupabaseSetupModal';
import { AuthModal } from './components/AuthModal';

import { HomePage } from './pages/HomePage';
import { RoomsPage } from './pages/RoomsPage';
import { DiningPage } from './pages/DiningPage';
import { StayBookingPage } from './pages/StayBookingPage';
import { TableReservationPage } from './pages/TableReservationPage';
import { GalleryPage } from './pages/GalleryPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';

import { ROOMS_DATA, GALLERY_PHOTOS } from './data/hotelData';
import { isSupabaseConfigured } from './lib/supabase';
import { UserProfile, getCurrentUserProfile } from './services/supabaseService';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSupabaseSetupOpen, setIsSupabaseSetupOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [currency, setCurrency] = useState<'INR' | 'USD' | 'EUR' | 'GBP'>('INR');

  // Room Detail Modal state
  const [selectedRoomForModal, setSelectedRoomForModal] = useState<Room | null>(null);
  const [isRoomModalOpen, setIsRoomModalOpen] = useState(false);

  // Lightbox Modal state
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Booking Success Modal state
  const [isBookingSuccessOpen, setIsBookingSuccessOpen] = useState(false);
  const [activeReservationCode, setActiveReservationCode] = useState('#RG-883492');

  // Load current user profile if available
  useEffect(() => {
    getCurrentUserProfile().then((u) => {
      if (u) setCurrentUser(u);
    });
  }, []);

  // Global Dining Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      dish: {
        id: 'dish-1',
        name: 'Royal Saffron Dum Biryani',
        category: 'royal-mains',
        type: 'non-veg',
        price: 750,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRWjOaoTEx1VXx36F5TZroXOD9-vK3vyJ9uVh3u84vGA0LtMlhytPC1xiP_1l3L_yEjEs-GuEEKPy0YYkZ51-0TF7n78T3Ra1OcopgBzS3IfyZMYJkhacq9b8_n9qgMyXmmZHyxaFYFXSVDt_ckVDrZLXbvXSF_LRoBZ7Pdvj5YSoQw0HSQdQpTxg-PKHALo1Jylg_tGXS4I-Exk9wOZ_e-vx-VDapeo2hu-8Gk4boAU3XfKCrXC19',
        description: 'Slow-cooked fragrant Basmati, tender spiced spring lamb, infused with royal Kashmiri saffron aroma.',
        isRecommended: true,
        tags: ['Awadhi Special'],
      },
      quantity: 1,
    },
  ]);

  // Global Booking State
  const defaultRoom = ROOMS_DATA[1]; // Executive Garden Deluxe
  const [bookingState, setBookingState] = useState<BookingState>({
    roomId: defaultRoom.id,
    roomName: defaultRoom.name,
    roomImage: defaultRoom.image,
    checkIn: 'Oct 14',
    checkOut: 'Oct 17',
    nights: 3,
    adults: 2,
    children: 0,
    baseRate: defaultRoom.price,
    taxes: Math.round(defaultRoom.price * 3 * 0.18),
    resortFee: 1200,
    promoCode: 'ROSE20',
    discount: 2000,
    total: 31768,
    guestFirstName: 'Aarav',
    guestLastName: 'Kapoor',
    guestEmail: 'aarav.kapoor@outlook.com',
    guestPhone: '98201 44589',
    arrivalTime: '14:00 – 16:00',
    specialRequests: ['Quiet Corner Room', 'High Floor'],
    customNotes: 'Please ensure high floor with morning sunlight over rose garden.',
    paymentMethod: 'upi',
  });

  // Scroll to top upon page navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleNavigate = (page: PageType) => {
    setCurrentPage(page);
    setIsDrawerOpen(false);
  };

  const handleOpenRoomDetails = (room: Room) => {
    setSelectedRoomForModal(room);
    setIsRoomModalOpen(true);
  };

  const handleBookRoom = (room: Room) => {
    const baseTotal = room.price * bookingState.nights;
    const taxes = Math.round(baseTotal * 0.18);
    const finalTotal = baseTotal + taxes + bookingState.resortFee - bookingState.discount;

    setBookingState((prev) => ({
      ...prev,
      roomId: room.id,
      roomName: room.name,
      roomImage: room.image,
      baseRate: room.price,
      taxes,
      total: finalTotal,
    }));
    setCurrentPage('book');
  };

  const handleAddToCart = (dish: Dish, customization?: string) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.dish.id === dish.id);
      if (existing) {
        return prev.map((item) =>
          item.dish.id === dish.id
            ? { ...item, quantity: item.quantity + 1, customization: customization || item.customization }
            : item
        );
      }
      return [...prev, { dish, quantity: 1, customization }];
    });
  };

  const handleUpdateCartQty = (dishId: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.dish.id === dishId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleCompleteBooking = (reservationCode: string) => {
    setActiveReservationCode(reservationCode);
    setIsBookingSuccessOpen(true);
  };

  const handleToggleCurrency = () => {
    const order: Array<'INR' | 'USD' | 'EUR' | 'GBP'> = ['INR', 'USD', 'EUR', 'GBP'];
    const nextIdx = (order.indexOf(currency) + 1) % order.length;
    setCurrency(order[nextIdx]);
  };

  const isSupabaseLive = isSupabaseConfigured();

  return (
    <div className="min-h-screen bg-[#fcf9f8] text-[#1b1c1c] flex flex-col font-sans selection:bg-[#ffdbc9] selection:text-[#321200]">
      
      {/* Fixed Sticky Header */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenDrawer={() => setIsDrawerOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenSupabase={() => setIsSupabaseSetupOpen(true)}
        isSupabaseLive={isSupabaseLive}
        currentUser={currentUser}
        cartItems={cartItems}
        currency={currency}
        onToggleCurrency={handleToggleCurrency}
      />

      {/* Main Viewport Content */}
      <main className="flex-1 w-full pt-16">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenRoomDetails={handleOpenRoomDetails}
            onBookRoom={handleBookRoom}
            onAddToCart={handleAddToCart}
            currency={currency}
          />
        )}

        {currentPage === 'rooms' && (
          <RoomsPage
            onNavigate={handleNavigate}
            onOpenRoomDetails={handleOpenRoomDetails}
            onBookRoom={handleBookRoom}
            currency={currency}
          />
        )}

        {currentPage === 'dining' && (
          <DiningPage
            onNavigate={handleNavigate}
            cartItems={cartItems}
            onAddToCart={handleAddToCart}
            onUpdateCartQty={handleUpdateCartQty}
            onClearCart={handleClearCart}
            currency={currency}
          />
        )}

        {currentPage === 'book' && (
          <StayBookingPage
            onNavigate={handleNavigate}
            booking={bookingState}
            onUpdateBooking={(updated) => setBookingState((prev) => ({ ...prev, ...updated }))}
            onCompleteBooking={handleCompleteBooking}
            currentUserId={currentUser?.id}
            currency={currency}
          />
        )}

        {currentPage === 'table-reservation' && (
          <TableReservationPage
            onNavigate={handleNavigate}
            currency={currency}
          />
        )}

        {currentPage === 'gallery' && (
          <GalleryPage
            onNavigate={handleNavigate}
            onOpenLightbox={(idx) => {
              setLightboxIndex(idx);
              setIsLightboxOpen(true);
            }}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'contact' && (
          <ContactPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'admin' && (
          <AdminPage
            onNavigate={handleNavigate}
            onOpenSupabaseSetup={() => setIsSupabaseSetupOpen(true)}
            currency={currency}
          />
        )}
      </main>

      {/* Comprehensive Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Mobile Bottom Navigation Bar */}
      <MobileNav
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenMore={() => setIsDrawerOpen(true)}
      />

      {/* Slide-out Navigation & More Drawer */}
      <MoreDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenSupabase={() => setIsSupabaseSetupOpen(true)}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        currency={currency}
        onSetCurrency={(c) => setCurrency(c as any)}
      />

      {/* Global Interactive Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleNavigate}
        onSelectRoom={(roomId) => {
          const rm = ROOMS_DATA.find((r) => r.id === roomId);
          if (rm) handleOpenRoomDetails(rm);
        }}
      />

      {/* Room Detail Modal */}
      <RoomDetailModal
        room={selectedRoomForModal}
        isOpen={isRoomModalOpen}
        onClose={() => setIsRoomModalOpen(false)}
        onBookNow={handleBookRoom}
        currency={currency}
      />

      {/* Fullscreen Lightbox Modal */}
      <LightboxModal
        photos={GALLERY_PHOTOS}
        currentIndex={lightboxIndex}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        onPrev={() => setLightboxIndex((prev) => (prev - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length)}
        onNext={() => setLightboxIndex((prev) => (prev + 1) % GALLERY_PHOTOS.length)}
      />

      {/* Booking Voucher & QR Confirmation Modal */}
      <BookingSuccessModal
        isOpen={isBookingSuccessOpen}
        onClose={() => {
          setIsBookingSuccessOpen(false);
          setCurrentPage('home');
        }}
        booking={bookingState}
        reservationCode={activeReservationCode}
      />

      {/* Supabase Connection & Schema Setup Modal */}
      <SupabaseSetupModal
        isOpen={isSupabaseSetupOpen}
        onClose={() => setIsSupabaseSetupOpen(false)}
      />

      {/* Patron Auth & Profile Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={currentUser}
        onUserChange={setCurrentUser}
        onOpenSupabaseSetup={() => {
          setIsAuthModalOpen(false);
          setIsSupabaseSetupOpen(true);
        }}
      />

    </div>
  );
}
