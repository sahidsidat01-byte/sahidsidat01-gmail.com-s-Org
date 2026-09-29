import React, { useState, useMemo } from 'react';
import { PageType, Dish, CartItem } from '../types';
import { DISHES_DATA } from '../data/hotelData';

interface DiningPageProps {
  onNavigate: (page: PageType) => void;
  cartItems: CartItem[];
  onAddToCart: (dish: Dish, customization?: string) => void;
  onUpdateCartQty: (dishId: string, delta: number) => void;
  onClearCart: () => void;
  currency: string;
}

export const DiningPage: React.FC<DiningPageProps> = ({
  onNavigate,
  cartItems,
  onAddToCart,
  onUpdateCartQty,
  onClearCart,
  currency,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDietary, setActiveDietary] = useState<'all' | 'veg' | 'non-veg' | 'recommended'>('all');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [selectedDishForCustom, setSelectedDishForCustom] = useState<Dish | null>(null);
  const [selectedSpice, setSelectedSpice] = useState('Medium Spice');
  const [checkoutNotice, setCheckoutNotice] = useState(false);

  // Cart item lookups
  const cartMap = useMemo(() => {
    const map: Record<string, number> = {};
    cartItems.forEach((ci) => {
      map[ci.dish.id] = ci.quantity;
    });
    return map;
  }, [cartItems]);

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalCartPrice = cartItems.reduce((sum, item) => sum + item.dish.price * item.quantity, 0);

  const filteredDishes = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return DISHES_DATA.filter((dish) => {
      const matchesSearch =
        !q ||
        dish.name.toLowerCase().includes(q) ||
        dish.description.toLowerCase().includes(q) ||
        dish.tags.some((t) => t.toLowerCase().includes(q));

      let matchesDietary = true;
      if (activeDietary === 'veg') matchesDietary = dish.type === 'veg';
      if (activeDietary === 'non-veg') matchesDietary = dish.type === 'non-veg';
      if (activeDietary === 'recommended') matchesDietary = dish.isRecommended;

      let matchesCategory = true;
      if (activeCategory !== 'all') {
        if (activeCategory === 'signatures') matchesCategory = dish.isRecommended;
        else matchesCategory = dish.category === activeCategory;
      }

      return matchesSearch && matchesDietary && matchesCategory;
    });
  }, [searchQuery, activeDietary, activeCategory]);

  const handleApplyCustomization = () => {
    if (selectedDishForCustom) {
      onAddToCart(selectedDishForCustom, selectedSpice);
      setSelectedDishForCustom(null);
    }
  };

  const handleProceedCheckout = () => {
    setCheckoutNotice(true);
    setTimeout(() => {
      setCheckoutNotice(false);
      onClearCart();
    }, 4000);
  };

  return (
    <div className="flex flex-col w-full pb-28">
      
      {/* 1. Atmospheric Restaurant Hero */}
      <section className="relative w-full overflow-hidden bg-[#1b1c1c]">
        <div
          className="relative w-full h-80 sm:h-96 bg-cover bg-center flex flex-col justify-end p-6 sm:p-10 text-white"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuC66UuG20jNY59da_a3w1krh_x12ecURfqSwvJZbM7McxmHraCG73Xa6P6rETeEsinIjsHtlbKwlDxHz9cPfKsXmas8WSuvaEbUcA9kZWBLJV1k2r5vY1K9nWreVYFlaMdXAjleziNvUvseQpP7Ck3B8lmCKeinQcsmzjNrxWh5dIGLdMkuR9I_yvi7N2ZLKdf9Miva7ixYeBYq2irn98E0W7CYWdLijgwkgjZEa5OK0GTz1lCnvKXa')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#1b1c1c] via-[#1b1c1c]/60 to-transparent" />

          <div className="relative z-10 max-w-2xl flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <span className="bg-[#e87524] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                Michelin Recommended 2024
              </span>
              <div className="flex items-center gap-1 text-[#ffb692] text-xs font-semibold">
                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  star
                </span>
                <span>4.9 (420+ Reviews)</span>
              </div>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-semibold leading-tight text-white">
              The Rosewood Bistro & Fine Dining
            </h1>
            <p className="text-xs sm:text-sm text-white/80 line-clamp-2">
              Authentic culinary artistry blending 200-year-old royal Awadhi recipes with modern international flavors.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Operational Status & Action Pairing */}
      <section className="max-w-4xl mx-auto w-full px-4 -mt-6 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl border border-[#dec1b2]/40 p-4 sm:p-5 flex flex-col gap-4">
          <div className="flex items-center justify-between bg-[#f6f3f2] p-3 rounded-xl">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse shrink-0" />
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-[#1b1c1c] truncate">
                  Kitchen Open • All Day Dining
                </span>
                <span className="text-[11px] text-[#574237] truncate">
                  Breakfast: 7:00 – 10:30 AM | All-Day Dining: 12:00 PM – 11:30 PM
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsScheduleOpen(true)}
              type="button"
              className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#574237] hover:text-[#9a4600] shrink-0 active:scale-95 shadow-xs"
            >
              <span className="material-symbols-outlined text-[18px]">info</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => onNavigate('table-reservation')}
              className="flex items-center justify-center gap-2 py-3 px-4 bg-[#e87524] hover:bg-[#9a4600] text-white rounded-xl text-xs sm:text-sm font-bold shadow-sm active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">table_restaurant</span>
              <span>Reserve Table</span>
            </button>
            <button
              onClick={() => onNavigate('table-reservation')}
              className="flex items-center justify-center gap-2 py-3 px-4 bg-[#0D234C] hover:bg-[#1b1c1c] text-white rounded-xl text-xs sm:text-sm font-bold shadow-sm active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">room_service</span>
              <span>Order to Room</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3. Search & Dietary Filters Container */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6 flex flex-col gap-3">
        {/* Search Bar */}
        <div className="relative w-full">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8a7265] text-[20px]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search delicacies, ingredients, aroma..."
            className="w-full bg-[#f6f3f2] text-[#1b1c1c] placeholder:text-[#8a7265] text-sm pl-11 pr-10 py-3 rounded-xl focus:outline-none focus:bg-white border border-transparent focus:border-[#dec1b2] transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8a7265] hover:text-[#1b1c1c]"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          )}
        </div>

        {/* Dietary Quick Toggles */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          <button
            onClick={() => setActiveDietary('all')}
            className={`shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeDietary === 'all'
                ? 'bg-[#1b1c1c] text-white shadow-sm'
                : 'bg-[#f6f3f2] text-[#574237] hover:bg-[#eae7e7]'
            }`}
          >
            All Items
          </button>
          <button
            onClick={() => setActiveDietary('veg')}
            className={`shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeDietary === 'veg'
                ? 'bg-emerald-800 text-white shadow-sm'
                : 'bg-[#f6f3f2] text-[#574237] hover:bg-[#eae7e7]'
            }`}
          >
            <span className="w-3.5 h-3.5 rounded-xs border border-emerald-700 flex items-center justify-center p-[2px] bg-white">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-700" />
            </span>
            <span>Pure Veg</span>
          </button>
          <button
            onClick={() => setActiveDietary('non-veg')}
            className={`shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeDietary === 'non-veg'
                ? 'bg-red-900 text-white shadow-sm'
                : 'bg-[#f6f3f2] text-[#574237] hover:bg-[#eae7e7]'
            }`}
          >
            <span className="w-3.5 h-3.5 rounded-xs border border-red-800 flex items-center justify-center p-[2px] bg-white">
              <span className="w-1.5 h-1.5 rounded-full bg-red-800" />
            </span>
            <span>Non-Veg</span>
          </button>
          <button
            onClick={() => setActiveDietary('recommended')}
            className={`shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeDietary === 'recommended'
                ? 'bg-[#e87524] text-white shadow-sm'
                : 'bg-[#f6f3f2] text-[#574237] hover:bg-[#eae7e7]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              stars
            </span>
            <span>Chef's Choice</span>
          </button>
        </div>
      </section>

      {/* 4. Sticky Food Category Navigation Pills */}
      <section className="sticky top-16 z-30 bg-[#fcf9f8]/95 backdrop-blur-md py-2.5 border-y border-[#dec1b2]/30 shadow-xs mt-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {[
            { id: 'all', label: 'All' },
            { id: 'signatures', label: "Chef's Signatures" },
            { id: 'starters', label: 'Starters & Mezze' },
            { id: 'royal-mains', label: 'Royal Indian Mains' },
            { id: 'continental', label: 'Continental' },
            { id: 'breads', label: 'Artisan Breads' },
            { id: 'desserts', label: 'Desserts' },
            { id: 'mocktails', label: 'Mocktails & Mixology' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeCategory === cat.id
                  ? 'bg-[#e87524] text-white shadow-sm'
                  : 'bg-[#f6f3f2] text-[#574237] hover:bg-[#eae7e7]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* 5. Chef's Note Banner */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-5">
        <div className="bg-[#ffdbcb]/30 border border-[#dec1b2]/40 rounded-2xl p-4 sm:p-5 flex gap-4 items-start shadow-xs">
          <div className="w-13 h-13 rounded-full overflow-hidden shrink-0 bg-[#e4e2e1] ring-2 ring-[#e87524]/20">
            <img
              alt="Master Chef Ananya Sen"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjIDBxGa3yyMOBpXXy0vKQCAvi-lBZsmy968-DOOyKWiDY2PpJinGxokgo7ohW_8gz256Iwrz7Y5y7lDC29kT1RIOb71r8RiaBhR2SAwROGOkDd2T2XvDkR8H-LaoKP4t2Wxe9hr5Tdc0rCoitDJD9z0fXSP8cMJni8jLEX5D9KRGeF8T94npuMz8pG08JgOWEgOsb-fi_dEPKDQfDDvF6_jG_bGh2QrGclEbAoiePV_EpRaJPJ6Ga"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center justify-between">
              <span className="font-serif text-sm sm:text-base font-bold text-[#1b1c1c]">
                Chef's Philosophy
              </span>
              <span className="text-[10px] uppercase font-bold text-[#9a4600] tracking-wider">
                Curated Daily
              </span>
            </div>
            <p className="font-serif text-xs sm:text-sm italic text-[#574237] mt-1">
              “Each preparation revives 200-year-old royal Awadhi and coastal spice secrets, sourced locally each sunrise.”
            </p>
            <span className="text-[11px] font-semibold text-[#8a7265] mt-1">
              — Executive Master Chef Ananya Sen
            </span>
          </div>
        </div>
      </section>

      {/* 6. Menu Dish Listing */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6 flex flex-col gap-6">
        {filteredDishes.length === 0 ? (
          <div className="py-16 text-center space-y-3">
            <span className="material-symbols-outlined text-4xl text-[#dec1b2]">restaurant</span>
            <h3 className="font-serif text-lg font-bold text-[#1b1c1c]">No Culinary Matches</h3>
            <p className="text-xs text-[#574237] max-w-sm mx-auto">
              Our kitchen couldn't find matches for this selection. Try adjusting your dietary filter or search query.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveDietary('all');
                setActiveCategory('all');
              }}
              className="px-4 py-2 bg-[#e87524] text-white text-xs font-bold rounded-xl shadow-xs"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredDishes.map((dish) => {
              const currentQty = cartMap[dish.id] || 0;

              return (
                <div
                  key={dish.id}
                  className="bg-white rounded-2xl overflow-hidden border border-[#dec1b2]/40 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  {/* Photo & Badges */}
                  <div className="relative w-full h-48 bg-[#f0eded] overflow-hidden">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover"
                    />

                    {/* Veg/Non-Veg & Tags */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="bg-white/95 backdrop-blur-md px-2 py-1 rounded-full flex items-center gap-1 shadow-xs">
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
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#1b1c1c]">
                          {dish.type === 'veg' ? 'Veg' : 'Non-Veg'}
                        </span>
                      </span>

                      {dish.isRecommended && (
                        <span className="bg-[#e87524] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1">
                          <span className="material-symbols-outlined text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                            stars
                          </span>
                          <span>Chef Special</span>
                        </span>
                      )}
                    </div>

                    {/* Price tag */}
                    <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-lg shadow-sm border border-[#dec1b2]/30">
                      <span className="font-serif text-base font-bold text-[#1b1c1c]">
                        ₹{dish.price}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 gap-3">
                    <div>
                      <h2 className="font-serif text-lg font-bold text-[#1b1c1c]">
                        {dish.name}
                      </h2>
                      <p className="text-xs text-[#574237] mt-1 leading-relaxed">
                        {dish.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {dish.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="text-[11px] bg-[#f6f3f2] text-[#574237] px-2.5 py-0.5 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions Row */}
                    <div className="pt-2 flex items-center justify-between border-t border-[#f0eded]">
                      <button
                        onClick={() => setSelectedDishForCustom(dish)}
                        className="text-xs font-semibold text-[#9a4600] flex items-center gap-1 hover:underline"
                      >
                        <span className="material-symbols-outlined text-[16px]">tune</span>
                        <span>Customize</span>
                      </button>

                      {currentQty === 0 ? (
                        <button
                          onClick={() => onAddToCart(dish)}
                          className="flex items-center gap-1.5 px-4 py-2 bg-[#e87524] hover:bg-[#9a4600] text-white rounded-xl text-xs font-bold shadow-sm active:scale-95 transition-all"
                        >
                          <span className="material-symbols-outlined text-[16px]">add</span>
                          <span>Add to Order</span>
                        </button>
                      ) : (
                        <div className="flex items-center bg-[#f0eded] rounded-xl p-1 shadow-inner">
                          <button
                            onClick={() => onUpdateCartQty(dish.id, -1)}
                            className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-[#1b1c1c] active:scale-90 transition-transform shadow-xs"
                          >
                            <span className="material-symbols-outlined text-[15px]">remove</span>
                          </button>
                          <span className="w-8 text-center text-xs font-bold text-[#1b1c1c]">
                            {currentQty}
                          </span>
                          <button
                            onClick={() => onUpdateCartQty(dish.id, 1)}
                            className="w-7 h-7 rounded-lg bg-[#e87524] text-white flex items-center justify-center active:scale-90 transition-transform shadow-xs"
                          >
                            <span className="material-symbols-outlined text-[15px]">add</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 7. Private Dining & Heritage Courtyards Inquiry Card */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-10">
        <div className="bg-[#f6f3f2] rounded-3xl p-6 sm:p-8 border border-[#dec1b2]/40 flex flex-col gap-3">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1b1c1c]">
            Private Dining & Heritage Courtyards
          </h3>
          <p className="text-xs sm:text-sm text-[#574237] max-w-2xl leading-relaxed">
            Hosting a celebratory banquet or romantic candlelit dinner under the heritage jacaranda trees? Our culinary team crafts bespoke 7-course degustation menus tailored to your guests.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('table-reservation')}
              className="py-2.5 px-5 bg-[#0D234C] hover:bg-[#1b1c1c] text-white rounded-xl text-xs font-bold active:scale-95 transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">celebration</span>
              <span>Inquire Private Dining</span>
            </button>
          </div>
        </div>
      </section>

      {/* 8. Floating Sticky Mini-Cart Bar */}
      {totalCartCount > 0 && (
        <div className="fixed bottom-20 lg:bottom-4 left-0 right-0 max-w-2xl mx-auto px-4 z-40 transition-all duration-300">
          <div className="bg-[#1b1c1c] text-white rounded-2xl shadow-2xl p-3 sm:p-4 flex items-center justify-between border border-white/10">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-xl bg-[#e87524] text-white flex items-center justify-center font-bold">
                <span className="material-symbols-outlined text-[20px]">room_service</span>
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-white text-[#1b1c1c] text-[10px] font-bold flex items-center justify-center shadow-xs">
                  {totalCartCount}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] text-white/70">
                  {totalCartCount} {totalCartCount === 1 ? 'item' : 'items'} in order
                </span>
                <span className="font-serif text-lg font-bold text-white">
                  ₹{totalCartPrice.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onClearCart}
                title="Clear Cart"
                className="p-2 text-white/60 hover:text-white active:scale-90 transition-transform"
              >
                <span className="material-symbols-outlined text-[20px]">delete_sweep</span>
              </button>
              <button
                onClick={handleProceedCheckout}
                className="px-4 py-2.5 bg-[#e87524] hover:bg-[#9a4600] text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-1.5 active:scale-95 transition-all"
              >
                <span>Proceed Order</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Checkout Success Alert */}
      {checkoutNotice && (
        <div className="fixed top-20 left-4 right-4 max-w-md mx-auto z-50 p-4 bg-emerald-900 text-white rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top duration-300">
          <span className="material-symbols-outlined text-2xl text-emerald-300">check_circle</span>
          <div className="flex-1 text-xs">
            <span className="font-bold block">Order Dispatched to Rosewood Kitchen!</span>
            <span>Room/table charge will be applied to your guest folio.</span>
          </div>
          <button onClick={() => setCheckoutNotice(false)} className="text-white/80 hover:text-white">
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>
      )}

      {/* Schedule Info Modal */}
      {isScheduleOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#1b1c1c]">Rosewood Dining Hours</h3>
            <ul className="text-xs text-[#574237] space-y-2.5">
              <li className="flex justify-between pb-1 border-b border-[#f0eded]">
                <span className="font-medium">Breakfast Buffet:</span>
                <span className="font-semibold text-[#1b1c1c]">7:00 AM – 10:30 AM</span>
              </li>
              <li className="flex justify-between pb-1 border-b border-[#f0eded]">
                <span className="font-medium">Royal Luncheon:</span>
                <span className="font-semibold text-[#1b1c1c]">12:00 PM – 3:30 PM</span>
              </li>
              <li className="flex justify-between pb-1 border-b border-[#f0eded]">
                <span className="font-medium">High Tea & Savories:</span>
                <span className="font-semibold text-[#1b1c1c]">4:00 PM – 6:30 PM</span>
              </li>
              <li className="flex justify-between pb-1 border-b border-[#f0eded]">
                <span className="font-medium">Fine Dinner & Drinks:</span>
                <span className="font-semibold text-[#1b1c1c]">7:00 PM – 11:30 PM</span>
              </li>
              <li className="flex justify-between text-[#9a4600] font-semibold">
                <span>Room Service Delivery:</span>
                <span>Available 24 Hours</span>
              </li>
            </ul>
            <button
              onClick={() => setIsScheduleOpen(false)}
              className="w-full py-2.5 rounded-xl bg-[#9a4600] text-white text-xs font-bold"
            >
              Close Schedule
            </button>
          </div>
        </div>
      )}

      {/* Customization Modal */}
      {selectedDishForCustom && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full space-y-4">
            <h3 className="font-serif text-base font-bold text-[#1b1c1c]">
              Customize {selectedDishForCustom.name}
            </h3>
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#8a7265] uppercase">Spice Preference</span>
              {['Mild Aromatic', 'Medium Spice', 'Royal Awadhi Fiery'].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setSelectedSpice(lvl)}
                  className={`w-full p-2.5 rounded-xl text-left text-xs font-medium flex items-center justify-between ${
                    selectedSpice === lvl
                      ? 'bg-[#ffdbcb] text-[#763300] font-bold'
                      : 'bg-[#f6f3f2] text-[#1b1c1c]'
                  }`}
                >
                  <span>{lvl}</span>
                  {selectedSpice === lvl && <span className="material-symbols-outlined text-[16px]">check</span>}
                </button>
              ))}
            </div>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setSelectedDishForCustom(null)}
                className="flex-1 py-2.5 rounded-xl bg-[#f6f3f2] text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleApplyCustomization}
                className="flex-1 py-2.5 rounded-xl bg-[#e87524] text-white text-xs font-bold"
              >
                Add Custom Order
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
