import React from 'react';
import { PageType } from '../types';

interface MoreDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
  onOpenSupabase: () => void;
  onOpenAuth: () => void;
  currency: string;
  onSetCurrency: (curr: string) => void;
}

export const MoreDrawer: React.FC<MoreDrawerProps> = ({
  isOpen,
  onClose,
  currentPage,
  onNavigate,
  onOpenSupabase,
  onOpenAuth,
  currency,
  onSetCurrency,
}) => {
  if (!isOpen) return null;

  const handleNav = (page: PageType) => {
    onNavigate(page);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[70] flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-xs sm:max-w-sm bg-[#ffffff] h-full shadow-2xl z-10 flex flex-col justify-between overflow-y-auto">
        <div>
          {/* Header */}
          <div className="p-5 bg-[#0D234C] text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px] text-[#e87524]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  spa
                </span>
              </div>
              <div>
                <h3 className="font-serif text-lg font-semibold tracking-tight text-white leading-tight">
                  Rose Garden
                </h3>
                <span className="text-[10px] text-white/70 uppercase tracking-widest block">
                  Heritage Hotel & Suites
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:text-white active:scale-90 transition-transform"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Currency Switcher Bar */}
          <div className="px-5 py-3 bg-[#f6f3f2] border-b border-[#e4e2e1] flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#8a7265]">Currency</span>
            <div className="flex items-center gap-1">
              {['INR', 'USD', 'EUR', 'GBP'].map((curr) => (
                <button
                  key={curr}
                  onClick={() => onSetCurrency(curr)}
                  className={`px-2 py-0.5 rounded text-xs font-medium transition-all ${
                    currency === curr
                      ? 'bg-[#9a4600] text-white font-bold shadow-xs'
                      : 'bg-white text-[#574237] hover:bg-[#e4e2e1]'
                  }`}
                >
                  {curr === 'INR' ? '₹ INR' : curr === 'USD' ? '$ USD' : curr === 'EUR' ? '€ EUR' : '£ GBP'}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation Links Group */}
          <div className="p-4 space-y-1">
            <button
              onClick={() => handleNav('home')}
              className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-left text-sm font-semibold transition-all ${
                currentPage === 'home'
                  ? 'bg-[#ffdbc9] text-[#763300]'
                  : 'text-[#1b1c1c] hover:bg-[#f6f3f2]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px] text-[#9a4600]">cottage</span>
              <span>Home Overview</span>
            </button>

            <button
              onClick={() => handleNav('rooms')}
              className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-left text-sm font-semibold transition-all ${
                currentPage === 'rooms'
                  ? 'bg-[#ffdbc9] text-[#763300]'
                  : 'text-[#1b1c1c] hover:bg-[#f6f3f2]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px] text-[#9a4600]">bed</span>
              <span>Rooms & Suites</span>
            </button>

            <button
              onClick={() => handleNav('dining')}
              className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-left text-sm font-semibold transition-all ${
                currentPage === 'dining'
                  ? 'bg-[#ffdbc9] text-[#763300]'
                  : 'text-[#1b1c1c] hover:bg-[#f6f3f2]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px] text-[#9a4600]">restaurant_menu</span>
              <span>The Rosewood Bistro & Dining</span>
            </button>

            <button
              onClick={() => handleNav('table-reservation')}
              className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-left text-sm font-semibold transition-all ${
                currentPage === 'table-reservation'
                  ? 'bg-[#ffdbc9] text-[#763300]'
                  : 'text-[#1b1c1c] hover:bg-[#f6f3f2]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px] text-[#9a4600]">table_restaurant</span>
              <span>Table Reservation & Room Dining</span>
            </button>

            <button
              onClick={() => handleNav('book')}
              className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-left text-sm font-semibold transition-all ${
                currentPage === 'book'
                  ? 'bg-[#ffdbc9] text-[#763300]'
                  : 'text-[#1b1c1c] hover:bg-[#f6f3f2]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px] text-[#9a4600]">calendar_month</span>
              <span>Stay Reservation & Checkout</span>
            </button>

            <button
              onClick={() => handleNav('gallery')}
              className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-left text-sm font-semibold transition-all ${
                currentPage === 'gallery'
                  ? 'bg-[#ffdbc9] text-[#763300]'
                  : 'text-[#1b1c1c] hover:bg-[#f6f3f2]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px] text-[#9a4600]">photo_library</span>
              <span>The Visual Journey (Gallery)</span>
            </button>

            <button
              onClick={() => handleNav('about')}
              className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-left text-sm font-semibold transition-all ${
                currentPage === 'about'
                  ? 'bg-[#ffdbc9] text-[#763300]'
                  : 'text-[#1b1c1c] hover:bg-[#f6f3f2]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px] text-[#9a4600]">castle</span>
              <span>About Us & Heritage Legacy</span>
            </button>

            <button
              onClick={() => handleNav('contact')}
              className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-left text-sm font-semibold transition-all ${
                currentPage === 'contact'
                  ? 'bg-[#ffdbc9] text-[#763300]'
                  : 'text-[#1b1c1c] hover:bg-[#f6f3f2]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px] text-[#9a4600]">support_agent</span>
              <span>Contact Us & Concierge Hub</span>
            </button>

            <div className="pt-2 border-t border-[#f0eded] space-y-1">
              <button
                onClick={() => {
                  onClose();
                  onOpenSupabase();
                }}
                className="w-full flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-left text-sm font-semibold text-[#0D234C] hover:bg-[#ffdbcb]/30 transition-all"
              >
                <span className="material-symbols-outlined text-[20px] text-[#25D366]">cloud_sync</span>
                <div className="flex-1">
                  <span>Supabase Backend & Schema</span>
                  <span className="block text-[10px] text-[#8a7265] font-normal">PostgreSQL tables, RLS & API keys</span>
                </div>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onOpenAuth();
                }}
                className="w-full flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-left text-sm font-semibold text-[#1b1c1c] hover:bg-[#f6f3f2] transition-all"
              >
                <span className="material-symbols-outlined text-[20px] text-[#9a4600]">account_circle</span>
                <div className="flex-1">
                  <span>Patron Account & Auth</span>
                  <span className="block text-[10px] text-[#8a7265] font-normal">Sign In, Register or Profile</span>
                </div>
              </button>

              <button
                onClick={() => handleNav('admin')}
                className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-left text-sm font-semibold transition-all ${
                  currentPage === 'admin'
                    ? 'bg-[#0D234C] text-white'
                    : 'text-[#4b5e8a] hover:bg-[#d9e2ff]/40'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">admin_panel_settings</span>
                <div className="flex-1">
                  <span>Executive Management Portal</span>
                  <span className="block text-[10px] opacity-75 font-normal">GM Dashboard & Operations</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Support Buttons */}
        <div className="p-4 bg-[#f6f3f2] border-t border-[#e4e2e1] space-y-2.5">
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white border border-[#25D366]/40 text-[#1b1c1c] text-xs font-semibold shadow-xs active:scale-98 transition-transform"
          >
            <span className="material-symbols-outlined text-[18px] text-[#25D366]">chat</span>
            <span>WhatsApp Concierge</span>
          </a>
          <a
            href="tel:+911412894500"
            className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#0D234C] text-white text-xs font-semibold shadow-xs active:scale-98 transition-transform"
          >
            <span className="material-symbols-outlined text-[18px]">phone</span>
            <span>Call Concierge: +91 141 289 4500</span>
          </a>
          <div className="text-center text-[10px] text-[#8a7265] pt-1">
            Civil Lines, Jaipur, Rajasthan 302006 • Est. 1928
          </div>
        </div>
      </div>
    </div>
  );
};
