import React, { useState, useMemo } from 'react';
import { PageType, Room } from '../types';
import { ROOMS_DATA } from '../data/hotelData';

interface RoomsPageProps {
  onNavigate: (page: PageType) => void;
  onOpenRoomDetails: (room: Room) => void;
  onBookRoom: (room: Room) => void;
  currency: string;
}

export const RoomsPage: React.FC<RoomsPageProps> = ({
  onNavigate,
  onOpenRoomDetails,
  onBookRoom,
  currency,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('Recommended');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({
    'presidential-suite': true,
  });

  // Date and guest picker states
  const [dateRange, setDateRange] = useState('Oct 18 – Oct 21');
  const [guestConfig, setGuestConfig] = useState('2 Adults, 1 Room');
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredRooms = useMemo(() => {
    let list = [...ROOMS_DATA];

    if (selectedCategory !== 'all') {
      list = list.filter((r) => r.category === selectedCategory);
    }

    if (sortBy === 'Price: Low to High') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'Price: High to Low') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'Guest Rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'Popularity') {
      list.sort((a, b) => b.reviewsCount - a.reviewsCount);
    }

    return list;
  }, [selectedCategory, sortBy]);

  return (
    <div className="flex flex-col w-full pb-16">
      
      {/* 1. Refined Editorial Page Title Header */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6 pb-4 flex flex-col gap-1.5">
        <div className="flex items-center gap-2 text-[#9a4600]">
          <span className="material-symbols-outlined text-[18px]">bed</span>
          <span className="text-[11px] uppercase tracking-widest font-bold text-[#9a4600]">
            Rose Garden Stays
          </span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-[#1b1c1c] tracking-tight">
          Rooms & Suites
        </h1>
        <p className="text-sm text-[#574237] max-w-xl">
          Sanctuaries of refined comfort, tailored for memorable stays amidst scented botanical courtyards.
        </p>
      </section>

      {/* 2. Sticky Top Filter & Reservation Bar */}
      <section className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-y border-[#dec1b2]/40 py-3 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-3">
          
          {/* Date & Guest Quick Pill Selectors */}
          <div className="grid grid-cols-2 gap-2 sm:max-w-md">
            <button
              onClick={() => setIsDateModalOpen(true)}
              type="button"
              className="flex items-center justify-between px-3 py-2 rounded-xl bg-[#f6f3f2] hover:bg-[#eae7e7] active:bg-[#e4e2e1] transition-colors text-left"
            >
              <div className="flex items-center gap-2 overflow-hidden">
                <span className="material-symbols-outlined text-[20px] text-[#9a4600]">calendar_month</span>
                <div className="flex flex-col min-w-0">
                  <span className="text-[9px] uppercase font-bold text-[#8a7265]">Dates</span>
                  <span className="text-xs font-semibold text-[#1b1c1c] truncate">{dateRange}</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-[18px] text-[#8a7265]">expand_more</span>
            </button>

            <button
              onClick={() => setIsGuestModalOpen(true)}
              type="button"
              className="flex items-center justify-between px-3 py-2 rounded-xl bg-[#f6f3f2] hover:bg-[#eae7e7] active:bg-[#e4e2e1] transition-colors text-left"
            >
              <div className="flex items-center gap-2 overflow-hidden">
                <span className="material-symbols-outlined text-[20px] text-[#9a4600]">group</span>
                <div className="flex flex-col min-w-0">
                  <span className="text-[9px] uppercase font-bold text-[#8a7265]">Guests</span>
                  <span className="text-xs font-semibold text-[#1b1c1c] truncate">{guestConfig}</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-[18px] text-[#8a7265]">expand_more</span>
            </button>
          </div>

          {/* Quick Category Horizontal Filter Bar */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
            {[
              { id: 'all', label: 'All Rooms' },
              { id: 'deluxe', label: 'Deluxe Rooms' },
              { id: 'executive', label: 'Executive Suites' },
              { id: 'penthouse', label: 'Presidential Penthouse' },
              { id: 'villas', label: 'Garden Villas' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                type="button"
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === tab.id
                    ? 'bg-[#9a4600] text-white shadow-sm'
                    : 'bg-[#f6f3f2] text-[#574237] hover:bg-[#eae7e7]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* 3. Control & Sorting Ribbon */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-5 pb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-serif text-base sm:text-lg font-bold text-[#1b1c1c]">
            Available Suites
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-[#ffdbcb] text-[#341100] text-[11px] font-bold">
            {filteredRooms.length} Options
          </span>
        </div>

        {/* Sorting Dropdown trigger */}
        <div className="relative inline-block text-left">
          <button
            onClick={() => setIsSortOpen(!isSortOpen)}
            type="button"
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#f6f3f2] hover:bg-[#eae7e7] text-[#1b1c1c] text-xs font-semibold active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[16px] text-[#9a4600]">swap_vert</span>
            <span>{sortBy}</span>
            <span className="material-symbols-outlined text-[16px]">arrow_drop_down</span>
          </button>

          {isSortOpen && (
            <div className="absolute right-0 mt-1 w-48 rounded-xl bg-white border border-[#dec1b2]/40 shadow-xl py-1 z-40">
              {['Recommended', 'Popularity', 'Price: Low to High', 'Price: High to Low', 'Guest Rating'].map((sort) => (
                <button
                  key={sort}
                  onClick={() => {
                    setSortBy(sort);
                    setIsSortOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-xs font-medium hover:bg-[#f6f3f2] transition-colors ${
                    sortBy === sort ? 'text-[#9a4600] font-bold bg-[#ffdbcb]/30' : 'text-[#1b1c1c]'
                  }`}
                >
                  {sort}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. Room Listings Stack */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-6 pt-3 pb-8">
        {filteredRooms.map((room) => {
          const isFav = favorites[room.id];

          return (
            <article
              key={room.id}
              className="flex flex-col lg:flex-row bg-white rounded-2xl overflow-hidden border border-[#dec1b2]/40 shadow-md hover:shadow-lg transition-all group"
            >
              {/* Photo & Badges */}
              <div className="relative w-full lg:w-5/12 aspect-[16/10] lg:aspect-auto overflow-hidden bg-[#f0eded]">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Floating Badges */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  {room.badge && (
                    <span className="px-3 py-1 rounded-full bg-[#e87524] text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
                      {room.badge}
                    </span>
                  )}
                  {room.freeCancellation && (
                    <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[#1b1c1c] text-[10px] font-semibold shadow-sm">
                      Free Cancellation
                    </span>
                  )}
                </div>

                {/* Favorite Heart Button */}
                <button
                  aria-label="Save to favorites"
                  onClick={(e) => toggleFavorite(room.id, e)}
                  type="button"
                  className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#9a4600] active:scale-90 transition-transform shadow-sm"
                >
                  <span
                    className="material-symbols-outlined text-[20px]"
                    style={{ fontVariationSettings: isFav ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    favorite
                  </span>
                </button>

                {/* Price Tag Overlay */}
                <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl shadow-md text-right border border-[#dec1b2]/30">
                  <span className="font-serif text-lg sm:text-xl text-[#9a4600] font-bold tracking-tight block">
                    {currency === 'INR' ? '₹' : currency === 'USD' ? '$' : currency === 'EUR' ? '€' : '£'}
                    {currency === 'INR' ? room.price.toLocaleString('en-IN') : Math.round(room.price / 85).toLocaleString()}
                  </span>
                  <span className="text-[10px] text-[#8a7265] block -mt-1">/ night + taxes</span>
                </div>
              </div>

              {/* Room Content */}
              <div className="p-5 sm:p-6 lg:w-7/12 flex flex-col justify-between gap-4">
                <div>
                  <h2 className="font-serif text-xl sm:text-2xl text-[#1b1c1c] group-hover:text-[#9a4600] transition-colors">
                    {room.name}
                  </h2>
                  
                  <div className="flex items-center gap-2 mt-1 text-xs text-[#8a7265]">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px] text-[#9a4600]">square_foot</span>
                      {room.sizeSqFt} sq ft
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px] text-[#e87524]">star</span>
                      {room.rating} ({room.reviewsCount} reviews)
                    </span>
                    <span>•</span>
                    <span>Max {room.maxGuests} Guests</span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#574237] mt-2.5 leading-relaxed line-clamp-2">
                    {room.description}
                  </p>

                  {/* Amenity Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-3">
                    {room.amenities.map((a, i) => (
                      <span
                        key={i}
                        className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#f6f3f2] text-[#574237] text-[11px] font-medium"
                      >
                        <span className="material-symbols-outlined text-[14px] text-[#9a4600]">
                          {a.icon}
                        </span>
                        {a.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex items-center gap-3 border-t border-[#f0eded]">
                  <button
                    onClick={() => onOpenRoomDetails(room)}
                    className="flex-1 py-3 px-4 rounded-xl bg-[#f6f3f2] hover:bg-[#eae7e7] text-[#1b1c1c] text-xs font-semibold text-center active:scale-95 transition-all"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => onBookRoom(room)}
                    className="flex-1 py-3 px-4 rounded-xl bg-[#e87524] hover:bg-[#9a4600] text-white text-xs font-bold text-center shadow-md active:scale-95 transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Book Now</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* 5. Direct Booking Inclusions Banner */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 mb-8">
        <div className="p-6 sm:p-8 rounded-3xl bg-[#f6f3f2] border border-[#dec1b2]/40 flex flex-col gap-4 shadow-sm">
          <div className="flex items-center gap-2 text-[#9a4600]">
            <span className="material-symbols-outlined text-[24px]">verified</span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#9a4600]">
              Direct Booking Inclusions
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-[#dec1b2]/30 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#ffdbcb] text-[#341100] flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[20px]">restaurant</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-sm font-bold text-[#1b1c1c]">
                  Artisanal Breakfast
                </span>
                <span className="text-xs text-[#574237]">
                  Daily curated chef selection in Courtyard Dining Pavilion.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-[#dec1b2]/30 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#d9e2ff] text-[#021943] flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[20px]">schedule</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-sm font-bold text-[#1b1c1c]">
                  Flexible Early Check-In
                </span>
                <span className="text-xs text-[#574237]">
                  Arrive from 11:00 AM upon room readiness with no additional fee.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-[#dec1b2]/30 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#ffdbcb] text-[#341100] flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[20px]">support_agent</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-sm font-bold text-[#1b1c1c]">
                  Dedicated 24h Butler
                </span>
                <span className="text-xs text-[#574237]">
                  Immediate itinerary management, spa reservations, and luggage care.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Need Tailored Assistance / Concierge Card */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 mb-8">
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0D234C] text-white flex flex-col gap-4 shadow-xl relative overflow-hidden">
          <div className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full bg-white/5 pointer-events-none" />

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white flex-shrink-0">
              <span className="material-symbols-outlined text-[28px]">concierge</span>
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-semibold block">
                Need Tailored Assistance?
              </span>
              <span className="text-xs text-[#b8cbfe]">Our chief guest relations host is on stand-by.</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-white/80 max-w-xl leading-relaxed">
            Looking for custom event setups, adjoining family suites, or specific dietary requests? Speak with us directly.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 max-w-md">
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white text-[#1b1c1c] text-xs font-bold active:scale-95 transition-transform shadow-sm"
            >
              <span className="material-symbols-outlined text-[20px] text-[#25D366]">chat</span>
              <span>WhatsApp Concierge</span>
            </a>
            <a
              href="tel:+919876543210"
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/15 text-white hover:bg-white/25 text-xs font-bold active:scale-95 transition-transform"
            >
              <span className="material-symbols-outlined text-[20px]">call</span>
              <span>Direct Call: +91 98765 43210</span>
            </a>
          </div>
        </div>
      </section>

      {/* Date Picker Modal */}
      {isDateModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#1b1c1c]">Select Stay Dates</h3>
            <div className="space-y-2">
              {['Oct 14 – Oct 17', 'Oct 18 – Oct 21', 'Oct 24 – Oct 27', 'Nov 01 – Nov 04'].map((d) => (
                <button
                  key={d}
                  onClick={() => {
                    setDateRange(d);
                    setIsDateModalOpen(false);
                  }}
                  className={`w-full p-3 rounded-xl text-left text-xs font-semibold flex items-center justify-between ${
                    dateRange === d ? 'bg-[#ffdbcb] text-[#763300]' : 'bg-[#f6f3f2] text-[#1b1c1c]'
                  }`}
                >
                  <span>{d}</span>
                  {dateRange === d && <span className="material-symbols-outlined text-[18px]">check</span>}
                </button>
              ))}
            </div>
            <button
              onClick={() => setIsDateModalOpen(false)}
              className="w-full py-2.5 rounded-xl bg-[#9a4600] text-white text-xs font-bold"
            >
              Confirm Dates
            </button>
          </div>
        </div>
      )}

      {/* Guest Picker Modal */}
      {isGuestModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#1b1c1c]">Select Guests & Rooms</h3>
            <div className="space-y-2">
              {['1 Adult, 1 Room', '2 Adults, 1 Room', '2 Adults, 1 Child, 1 Suite', '4 Adults, 2 Suites'].map((g) => (
                <button
                  key={g}
                  onClick={() => {
                    setGuestConfig(g);
                    setIsGuestModalOpen(false);
                  }}
                  className={`w-full p-3 rounded-xl text-left text-xs font-semibold flex items-center justify-between ${
                    guestConfig === g ? 'bg-[#ffdbcb] text-[#763300]' : 'bg-[#f6f3f2] text-[#1b1c1c]'
                  }`}
                >
                  <span>{g}</span>
                  {guestConfig === g && <span className="material-symbols-outlined text-[18px]">check</span>}
                </button>
              ))}
            </div>
            <button
              onClick={() => setIsGuestModalOpen(false)}
              className="w-full py-2.5 rounded-xl bg-[#9a4600] text-white text-xs font-bold"
            >
              Confirm Guests
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
