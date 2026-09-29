import React, { useState } from 'react';
import { PageType, Room, Dish } from '../types';
import { ROOMS_DATA, DISHES_DATA } from '../data/hotelData';

interface HomePageProps {
  onNavigate: (page: PageType) => void;
  onOpenRoomDetails: (room: Room) => void;
  onBookRoom: (room: Room) => void;
  onAddToCart: (dish: Dish) => void;
  currency: string;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenRoomDetails,
  onBookRoom,
  onAddToCart,
  currency,
}) => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchSuccess, setSearchSuccess] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [addedDishId, setAddedDishId] = useState<string | null>(null);

  const handleSearchStay = () => {
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setSearchSuccess(true);
      setTimeout(() => setSearchSuccess(false), 5000);
    }, 600);
  };

  const handleCopyCode = () => {
    navigator.clipboard?.writeText('ROSE20');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleQuickAdd = (dish: Dish) => {
    onAddToCart(dish);
    setAddedDishId(dish.id);
    setTimeout(() => setAddedDishId(null), 1500);
  };

  const featuredRooms = ROOMS_DATA.slice(0, 3);
  const featuredDishes = DISHES_DATA.slice(0, 3);

  return (
    <div className="flex flex-col w-full pb-16">
      
      {/* 1. Atmospheric Hero Section */}
      <section className="relative w-full overflow-hidden bg-[#eae7e7] rounded-b-3xl shadow-sm">
        <div
          className="relative w-full h-[480px] sm:h-[560px] bg-cover bg-center flex flex-col justify-end p-6 sm:p-12 text-white"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCaHTf4VzUBPJQlnxuq1dOrb8vDZSTkaFQ8I7SelAN6Uf9Q-s_2MUgzIayIcAsORBVa3v1ZT1mBcVEU3s2OB2CJFw9TqtzgTRcChKPmNQE7r3WC1cA2hykYPfhfMLsHUoyiWYPDB5tmIVfBS61h5bgM819NsUzGLS8SgGYqNeYtPlL6F2J9gK0YIpoxmWYldIwrtSjzQyxW8hrs1gfaeecYfvVfOqiAvHkWAyqPMGsRBc7il1GoF4sg')`,
          }}
        >
          {/* Subtle warm gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1b1c1c]/90 via-[#1b1c1c]/45 to-black/20" />

          <div className="relative z-10 max-w-2xl flex flex-col items-start gap-3">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold tracking-wider uppercase border border-white/20">
              <span className="material-symbols-outlined text-[16px] text-[#ffb68d]" style={{ fontVariationSettings: "'FILL' 1" }}>
                hotel_class
              </span>
              <span>Boutique Luxury Since 1928</span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-[1.15]">
              Experience Comfort.<br />Discover Exceptional Hospitality.
            </h1>

            {/* Subtext */}
            <p className="text-sm sm:text-base text-white/90 max-w-lg leading-relaxed">
              Timeless luxury and warm botanical grace nestled in the heritage heart of the city. Handcrafted stays, tailored for refined souls.
            </p>

            {/* Dual Hero CTAs */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 pt-2 w-full sm:w-auto">
              <button
                onClick={() => onNavigate('book')}
                className="flex-1 sm:flex-initial py-3.5 px-6 rounded-xl bg-[#e87524] hover:bg-[#9a4600] text-white text-xs sm:text-sm font-bold shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">bed</span>
                <span>Book a Room</span>
              </button>
              <button
                onClick={() => onNavigate('table-reservation')}
                className="flex-1 sm:flex-initial py-3.5 px-6 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-xs sm:text-sm font-bold border border-white/30 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">restaurant</span>
                <span>Reserve Table</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Room Search Widget (Floats over hero) */}
      <section className="max-w-4xl mx-auto w-full px-4 -mt-8 relative z-20" id="booking-widget">
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-xl border border-[#dec1b2]/40 flex flex-col gap-4">
          <div className="flex items-center justify-between pb-1">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#9a4600] text-[22px]">calendar_today</span>
              <span className="font-serif text-base sm:text-lg font-bold text-[#1b1c1c]">
                Stay Reservation
              </span>
            </div>
            <span className="text-[11px] font-bold bg-[#ffdbcb] text-[#341100] px-3 py-1 rounded-full uppercase tracking-wider">
              Best Rate Guaranteed
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Check-in */}
            <div className="bg-[#f6f3f2] p-3 rounded-xl flex flex-col justify-center border border-transparent hover:border-[#dec1b2] transition-colors">
              <span className="text-[10px] font-bold text-[#8a7265] uppercase tracking-wider">Check-in</span>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="font-serif text-lg font-bold text-[#1b1c1c]">24 Oct</span>
                <span className="text-xs text-[#574237]">Thursday</span>
              </div>
            </div>

            {/* Check-out */}
            <div className="bg-[#f6f3f2] p-3 rounded-xl flex flex-col justify-center border border-transparent hover:border-[#dec1b2] transition-colors">
              <span className="text-[10px] font-bold text-[#8a7265] uppercase tracking-wider">Check-out</span>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="font-serif text-lg font-bold text-[#1b1c1c]">27 Oct</span>
                <span className="text-xs text-[#574237]">Sunday (3 Nights)</span>
              </div>
            </div>

            {/* Guests & Suites */}
            <div className="bg-[#f6f3f2] p-3 rounded-xl flex items-center justify-between border border-transparent hover:border-[#dec1b2] transition-colors">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-[#8a7265] uppercase tracking-wider">Guests & Suites</span>
                <span className="text-sm font-semibold text-[#1b1c1c] mt-0.5">
                  2 Adults • 1 Suite
                </span>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('rooms')}
                className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#574237] hover:text-[#9a4600] shadow-xs active:scale-90"
              >
                <span className="material-symbols-outlined text-[18px]">tune</span>
              </button>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={handleSearchStay}
            disabled={isSearching}
            className="w-full py-3.5 bg-[#e87524] hover:bg-[#9a4600] text-white text-sm font-bold rounded-xl shadow-md active:scale-[0.99] transition-all flex items-center justify-center gap-2"
          >
            {isSearching ? (
              <>
                <span className="material-symbols-outlined text-[20px] animate-spin">cyclone</span>
                <span>Checking Royal Suites...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[20px]">travel_explore</span>
                <span>Search Availability & Reserve</span>
              </>
            )}
          </button>

          {/* Availability Success Alert */}
          {searchSuccess && (
            <div className="p-3.5 bg-[#ffdbc9]/40 border border-[#e87524]/40 text-[#763300] rounded-xl text-xs sm:text-sm font-medium flex items-center justify-between animate-in fade-in duration-300">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#9a4600] text-[20px]">verified</span>
                <span>4 exclusive suites ready for 24 Oct – 27 Oct! Special welcome elixir included.</span>
              </div>
              <button
                onClick={() => onNavigate('rooms')}
                className="text-xs font-bold text-[#9a4600] underline uppercase tracking-wider"
              >
                View All
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 3. Welcome Story & Host Highlight */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-16 pb-12 flex flex-col">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-6 h-0.5 bg-[#e87524] rounded-full" />
          <span className="text-xs font-bold uppercase tracking-widest text-[#9a4600]">
            A Sanctuary in Bloom
          </span>
        </div>

        <h2 className="font-serif text-2xl sm:text-4xl text-[#1b1c1c] mb-3">
          Welcome to Rose Garden
        </h2>
        <p className="text-sm sm:text-base text-[#574237] max-w-3xl leading-relaxed mb-6">
          Curated with devotion to heritage, sensory peace, and attentive hospitality. From handcrafted teak verandas to the delicate scent of fresh dawn petals, our private urban retreat offers sanctuary away from the hurried world.
        </p>

        {/* Rating & Host Highlight Bento */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
          <div className="sm:col-span-4 bg-[#ffdbcb]/30 border border-[#dec1b2]/40 rounded-2xl p-5 flex flex-col justify-between shadow-xs">
            <div className="flex items-center gap-1.5 text-[#9a4600]">
              <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                star
              </span>
              <span className="font-serif text-3xl font-bold">4.9</span>
            </div>
            <div className="mt-4">
              <span className="font-serif text-lg font-bold text-[#1b1c1c] block">1,200+</span>
              <span className="text-xs text-[#574237]">Verified luxury reviews from global patrons</span>
            </div>
          </div>

          <div className="sm:col-span-8 bg-[#f6f3f2] border border-[#dec1b2]/40 rounded-2xl p-5 flex items-center gap-4 shadow-xs">
            <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 bg-[#e4e2e1] ring-2 ring-[#e87524]/20">
              <img
                alt="General Manager"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDK2fXczctRL1OqpybJB0ltEqDWuvt1eyBgRCDDPa1SSsGd9dk9q-zQ0CGRm1ypnJ92jrRG-_bzxWsodQlgJjLttv1ICdVZA1VVgxNtJpV1Sz-nBrNEIqcfHDZkZPOMgdaDUQlU0loGXtTIfql3A6cGDXAo0YFxxJwgBXLK51ShGeaIGdL-1VOUaPXtZ3h7uqH4KsuByDzWNXZxsT_Csw7089gxGmdfOUOjfe7Za4Izq_vTcDqyjVa4"
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-serif text-base sm:text-lg text-[#1b1c1c] font-semibold italic">
                “Our home is yours—every petal, hallway, and courtyard is dedicated to your peace.”
              </span>
              <span className="text-xs text-[#8a7265] mt-1 font-medium">
                Vikram Rathore • General Manager & Heritage Custodian
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Featured Rooms & Suites (Swipeable / Grid) */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col">
        <div className="flex items-end justify-between mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#9a4600] block mb-1">
              Private Living
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-[#1b1c1c]">
              Rooms & Suites
            </h2>
          </div>
          <button
            onClick={() => onNavigate('rooms')}
            className="text-xs sm:text-sm font-bold text-[#9a4600] flex items-center gap-1 hover:underline"
          >
            <span>View All Suites</span>
            <span className="material-symbols-outlined text-[18px]">chevron_right</span>
          </button>
        </div>

        {/* Room Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredRooms.map((room) => (
            <div
              key={room.id}
              className="bg-white rounded-2xl overflow-hidden border border-[#dec1b2]/40 shadow-md hover:shadow-lg transition-all flex flex-col group"
            >
              {/* Image & Badges */}
              <div className="relative h-52 w-full overflow-hidden bg-[#f0eded]">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {room.badge && (
                  <div className="absolute top-3 left-3 bg-[#1b1c1c]/75 backdrop-blur-md px-3 py-1 rounded-full text-white text-[11px] font-semibold tracking-wider uppercase">
                    {room.badge}
                  </div>
                )}
                <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-xl shadow-md text-right">
                  <span className="font-serif text-base sm:text-lg font-bold text-[#9a4600]">
                    ₹{room.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] text-[#8a7265] block -mt-1">/ night</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex flex-col flex-1 justify-between gap-4">
                <div>
                  <h3 className="font-serif text-lg font-semibold text-[#1b1c1c] group-hover:text-[#9a4600] transition-colors">
                    {room.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 text-xs text-[#8a7265]">
                    <span className="flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-[14px] text-[#9a4600]">square_foot</span>
                      {room.sizeSqFt} sq ft
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-[14px] text-[#e87524]">star</span>
                      {room.rating} ({room.reviewsCount})
                    </span>
                  </div>
                  <p className="text-xs text-[#574237] mt-2 line-clamp-2">
                    {room.description}
                  </p>

                  {/* Amenity tags */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {room.amenities.slice(0, 3).map((a, i) => (
                      <span
                        key={i}
                        className="bg-[#f6f3f2] px-2.5 py-0.5 rounded-full text-[11px] text-[#574237] font-medium flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-[13px] text-[#9a4600]">{a.icon}</span>
                        {a.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex items-center gap-2 pt-2 border-t border-[#f0eded]">
                  <button
                    onClick={() => onOpenRoomDetails(room)}
                    className="flex-1 py-2.5 rounded-xl bg-[#f6f3f2] hover:bg-[#e4e2e1] text-[#1b1c1c] text-xs font-semibold active:scale-95 transition-all text-center"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => onBookRoom(room)}
                    className="flex-1 py-2.5 rounded-xl bg-[#e87524] hover:bg-[#9a4600] text-white text-xs font-bold active:scale-95 transition-all text-center shadow-sm"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Special Offers & Packages (Curated Experience) */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="relative overflow-hidden rounded-3xl bg-[#0D234C] text-white p-6 sm:p-10 shadow-xl">
          {/* Ambient Glow */}
          <div className="absolute -right-16 -bottom-16 w-64 h-64 rounded-full bg-[#e87524]/20 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 mb-2 text-[#b8cbfe]">
                <span className="material-symbols-outlined text-[20px]">loyalty</span>
                <span className="text-xs font-bold uppercase tracking-wider">Curated Seasonal Package</span>
                <span className="px-2 py-0.5 rounded-full bg-[#e97430] text-white text-[11px] font-bold">
                  20% OFF
                </span>
              </div>
              <h3 className="font-serif text-2xl sm:text-4xl text-white mb-2 font-semibold">
                Weekend Romantic Retreat
              </h3>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                Candlelight four-course dinner in the scented rose pergola, couples aromatic herbal massage at our Ayurvedic spa, and guaranteed late check-out till 3 PM.
              </p>
            </div>

            {/* Promo Code Card */}
            <div className="flex flex-col sm:flex-row items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-2xl">
              <div className="px-3 text-center sm:text-left">
                <span className="text-[10px] uppercase font-bold text-[#b8cbfe] block">
                  Promo Code
                </span>
                <span className="font-mono text-xl font-bold tracking-widest text-white">
                  ROSE20
                </span>
              </div>
              <button
                onClick={handleCopyCode}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white text-[#0D234C] hover:bg-[#ffdbcb] text-xs font-bold active:scale-95 transition-all shadow-sm flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">
                  {copiedCode ? 'done' : 'content_copy'}
                </span>
                <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Dining & Gastronomy Highlights */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-12 pb-8 flex flex-col">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-6 h-0.5 bg-[#e87524] rounded-full" />
          <span className="text-xs font-bold uppercase tracking-widest text-[#9a4600]">
            Gastronomy
          </span>
        </div>

        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="font-serif text-2xl sm:text-4xl text-[#1b1c1c]">
              The Rose Verandah
            </h2>
            <p className="text-xs sm:text-sm text-[#574237] mt-0.5">
              Curated by Master Chef Ananya Sen & Michelin-Recommended Team
            </p>
          </div>
          <button
            onClick={() => onNavigate('dining')}
            className="text-xs sm:text-sm font-bold text-[#9a4600] flex items-center gap-1 hover:underline"
          >
            <span>Full Menu</span>
            <span className="material-symbols-outlined text-[18px]">chevron_right</span>
          </button>
        </div>

        {/* Signature Dishes Stack */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featuredDishes.map((dish) => (
            <div
              key={dish.id}
              className="p-3.5 bg-white rounded-2xl flex gap-3.5 border border-[#dec1b2]/40 shadow-sm hover:shadow-md transition-all items-center"
            >
              <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-[#f0eded]">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span
                    className={`w-3 h-3 rounded-xs border flex items-center justify-center p-[2px] ${
                      dish.type === 'veg' ? 'border-emerald-700' : 'border-red-800'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        dish.type === 'veg' ? 'bg-emerald-700' : 'bg-red-800'
                      }`}
                    />
                  </span>
                  <h4 className="font-serif text-sm font-bold text-[#1b1c1c] truncate">
                    {dish.name}
                  </h4>
                </div>
                <p className="text-xs text-[#574237] line-clamp-1 mt-0.5">
                  {dish.description}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span className="font-serif text-sm font-bold text-[#9a4600]">
                    ₹{dish.price}
                  </span>
                  <button
                    onClick={() => handleQuickAdd(dish)}
                    className="px-3 py-1 rounded-lg bg-[#f0eded] hover:bg-[#e87524] hover:text-white text-[#1b1c1c] text-xs font-semibold active:scale-95 transition-all flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[14px]">
                      {addedDishId === dish.id ? 'check' : 'add'}
                    </span>
                    <span>{addedDishId === dish.id ? 'Added' : 'Add'}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Hotel Amenities Grid (Curated Comforts) */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-[#f6f3f2] rounded-3xl p-6 sm:p-10 border border-[#dec1b2]/40">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#9a4600] block mb-1">
                Signature Perks
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl text-[#1b1c1c]">
                Curated Comforts
              </h2>
            </div>
            <span className="text-xs font-semibold bg-white border border-[#dec1b2]/60 text-[#574237] px-3 py-1 rounded-full">
              All Inclusions
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {[
              { icon: 'pool', title: 'Infinity Pool', desc: 'Heated terrace view' },
              { icon: 'spa', title: 'Ayurvedic Spa', desc: 'Holistic treatments' },
              { icon: 'room_service', title: '24/7 Butler', desc: 'Dedicated concierge' },
              { icon: 'restaurant_menu', title: 'Fine Dining', desc: 'Artisanal farm-to-fork' },
              { icon: 'wifi', title: 'Gbps Wi-Fi', desc: 'Complimentary speed' },
              { icon: 'local_parking', title: 'Valet Service', desc: 'EV charging equipped' },
            ].map((amenity, idx) => (
              <div
                key={idx}
                className="bg-white p-4 rounded-2xl flex flex-col items-center text-center gap-1.5 shadow-xs border border-[#dec1b2]/30"
              >
                <div className="w-11 h-11 rounded-full bg-[#f6f3f2] flex items-center justify-center text-[#9a4600]">
                  <span className="material-symbols-outlined text-[22px]">{amenity.icon}</span>
                </div>
                <span className="text-xs sm:text-sm font-bold text-[#1b1c1c] mt-1">
                  {amenity.title}
                </span>
                <span className="text-[11px] text-[#8a7265] leading-tight">
                  {amenity.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Visual Moments Preview */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1b1c1c]">
            Moments at Rose Garden
          </h3>
          <button
            onClick={() => onNavigate('gallery')}
            className="text-xs font-bold text-[#9a4600] uppercase tracking-wider flex items-center gap-1 hover:underline"
          >
            <span>#RoseGardenHotel Gallery</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div
            onClick={() => onNavigate('gallery')}
            className="h-36 sm:h-48 rounded-2xl overflow-hidden cursor-pointer group relative shadow-sm"
          >
            <img
              alt="Poolside"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYSiIPIV-NJfaciVC2LvwFyF6w8BbbcHvxPf3risMtx3uLGIIWLkmljcWXTvjrsSYQhvhF63vkqHTH9xCbPJ2ZusXdK7QML6ku3gtytZ5A8SS02P__Sv54mH8dtaqPdQVYtRaaAZtB2A4UsuIZwqkyfZkbEgK23ZK-xFubmG1RaBZU06-DfzmdWZHwnzzEa-AAo09ejspp58i5_PxfI2yCKvbWFmtKnT9_IiHSii7bAGGuXtsu834S"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div
            onClick={() => onNavigate('gallery')}
            className="h-36 sm:h-48 rounded-2xl overflow-hidden cursor-pointer group relative shadow-sm"
          >
            <img
              alt="Courtyard Dinner"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNlntrE1yFzvql0c1ZdTMCJwgDdbsavdy1DcxI8MzEOI5E_Mo5P0n6OYcUIsr5BcsN6Aao8L30yZbP8BenJtJotUq17pe5qveNzYll-tvKjBhzT5aR0SI7ZPzCRC_lNriUAsf1Hmn8_wklRv_bcGNRWMX3LHtI3b0mM6RTeyol7R3HtJOo4FpUiic_-m3hOdDpRHzXXKVNjvliN4HNuO_iKV268sLRL7bv7cSGz3MqLL_BJCIBKQDm"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div
            onClick={() => onNavigate('gallery')}
            className="h-36 sm:h-48 rounded-2xl overflow-hidden cursor-pointer group relative shadow-sm"
          >
            <img
              alt="Grand Foyer"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC35-QKV4N4U3StBd2UPCMvHyKirH4y32OoXfBdA3SPNpXVAfpkZGJJX3wv4z0bXZJryzBVQPjB-6W6XGT7yo3xE_lyhl2jNnPRN-ICX7mRF7g3pRWQYFf6Sox1yUsRlkg_ySzPmAgayo7uEjEOGjMP0Cdln1H_r6i706YNAKW2V5GDLMKuGD_S6s26DpWRxcGPkO5ag9by6cqm61JC8i2oH1kEgQeRHgTMoWrQuQcpPOv7wLJZhofQ"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </section>

      {/* 9. Guest Reflections / Testimonial */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-6 h-0.5 bg-[#e87524] rounded-full" />
          <span className="text-xs font-bold uppercase tracking-widest text-[#9a4600]">
            Guest Reflections
          </span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl text-[#1b1c1c] mb-6">
          Cherished Memories
        </h2>

        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#dec1b2]/40 shadow-sm flex flex-col gap-4">
          <div className="flex items-center gap-1 text-[#e87524]">
            {[1, 2, 3, 4, 5].map((s) => (
              <span key={s} className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                star
              </span>
            ))}
          </div>

          <p className="font-serif text-base sm:text-xl text-[#1b1c1c] italic leading-relaxed">
            “The quiet elegance of the Rose Suite combined with breakfast on the verandas made our anniversary unforgettable. The staff anticipates every wish before you utter it.”
          </p>

          <div className="flex items-center justify-between pt-3 border-t border-[#f0eded]">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-[#f0eded] overflow-hidden ring-2 ring-[#e87524]/20">
                <img
                  alt="Lady Eleanor Vance"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0W7HDCWIkthC8JGMkUtrOLkkfd4P2_ZUtdh1PgexrhiVUQ83sjqaj6cAvRbgmp9aLmQstwOm82AJYtK6j7sB5dSwf5PbDusp_zCQbKB091Ki59W1kK_izqfeUoPZqrjSyU4DMHP3SFdq9b4L-pHD20L4RTJYAws9clNimTlZwIJf2NjGrJDNr2W5XEvXqHjf4cCP1bOaBc78pUhm4loR7AR7HJ0j7W2DsbHWbM5Tlr17aXXGwcQvB"
                />
              </div>
              <div>
                <span className="font-serif text-sm sm:text-base font-bold text-[#1b1c1c] block">
                  Lady Eleanor Vance
                </span>
                <span className="text-xs text-[#8a7265]">
                  London, UK • Stayed 5 Nights in The Presidential Suite
                </span>
              </div>
            </div>

            <span className="text-xs font-semibold text-[#9a4600] bg-[#ffdbcb] px-2.5 py-1 rounded-full flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">verified</span>
              Verified Guest
            </span>
          </div>
        </div>
      </section>

      {/* 10. Final Call to Action Banner */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-[#9a4600] text-white rounded-3xl p-6 sm:p-12 flex flex-col items-center text-center shadow-xl relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-white/10 pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-white/10 pointer-events-none" />

          <span className="text-xs font-bold uppercase tracking-widest text-[#ffdbc9] mb-2">
            Your Retreat Awaits
          </span>
          <h3 className="font-serif text-3xl sm:text-5xl font-semibold mb-3">
            Ready for an Unforgettable Escape?
          </h3>
          <p className="text-xs sm:text-sm text-white/90 max-w-md mb-6 leading-relaxed">
            Connect with our private guest concierge for bespoke itinerary planning, dining reservations, or airport transfers.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
              onClick={() => onNavigate('book')}
              className="py-3.5 px-8 rounded-xl bg-white text-[#9a4600] hover:bg-[#ffdbc9] text-sm font-bold shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[20px]">calendar_today</span>
              <span>Reserve Your Stay Now</span>
            </button>
            <a
              href="tel:+919876543210"
              className="py-3.5 px-8 rounded-xl bg-white/20 hover:bg-white/30 text-white text-sm font-bold border border-white/30 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[20px]">call</span>
              <span>Concierge Hotline: +91 98765 43210</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
