import React from 'react';
import { PageType, CartItem } from '../types';

interface HeaderProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
  onOpenDrawer: () => void;
  onOpenSearch: () => void;
  onOpenAuth: () => void;
  onOpenSupabase: () => void;
  isSupabaseLive: boolean;
  currentUser: any;
  cartItems: CartItem[];
  currency: string;
  onToggleCurrency: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onOpenDrawer,
  onOpenSearch,
  onOpenAuth,
  onOpenSupabase,
  isSupabaseLive,
  currentUser,
  cartItems,
  currency,
  onToggleCurrency,
}) => {
  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="fixed top-0 w-full z-50 pt-safe bg-[#ffffff]/95 backdrop-blur-xl border-b border-[#0d234c]/10 shadow-[0_1px_12px_rgba(13,35,76,0.05)]">
      <div className="max-w-7xl mx-auto h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Left: Mobile Drawer Trigger + Brand Emblem & Title */}
        <div className="flex items-center gap-3">
          <button
            aria-label="Open Menu"
            onClick={onOpenDrawer}
            type="button"
            className="w-10 h-10 flex items-center justify-center text-[#1b1c1c] rounded-lg hover:bg-[#f0eded] active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-[24px]">menu</span>
          </button>

          <button
            onClick={() => onNavigate('home')}
            type="button"
            className="flex items-center gap-2.5 text-left group"
          >
            {/* Elegant Royal Rose Logo Icon */}
            <div className="w-9 h-9 rounded-full bg-[#0D234C] flex items-center justify-center text-white shadow-sm ring-2 ring-[#e87524]/20 group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[20px] text-white" style={{ fontVariationSettings: "'FILL' 1" }}>
                spa
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-[19px] sm:text-[21px] font-semibold tracking-tight text-[#1b1c1c] leading-tight group-hover:text-[#9a4600] transition-colors">
                Rose Garden
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] font-medium text-[#8a7265] hidden sm:block -mt-0.5">
                Heritage Hotel & Suites
              </span>
            </div>
          </button>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          <button
            onClick={() => onNavigate('home')}
            className={`text-[14px] font-medium tracking-wide transition-colors relative py-1 ${
              currentPage === 'home'
                ? 'text-[#9a4600] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#9a4600]'
                : 'text-[#574237] hover:text-[#9a4600]'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => onNavigate('rooms')}
            className={`text-[14px] font-medium tracking-wide transition-colors relative py-1 ${
              currentPage === 'rooms'
                ? 'text-[#9a4600] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#9a4600]'
                : 'text-[#574237] hover:text-[#9a4600]'
            }`}
          >
            Rooms & Suites
          </button>
          <button
            onClick={() => onNavigate('dining')}
            className={`text-[14px] font-medium tracking-wide transition-colors relative py-1 ${
              currentPage === 'dining'
                ? 'text-[#9a4600] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#9a4600]'
                : 'text-[#574237] hover:text-[#9a4600]'
            }`}
          >
            Dining
          </button>
          <button
            onClick={() => onNavigate('table-reservation')}
            className={`text-[14px] font-medium tracking-wide transition-colors relative py-1 ${
              currentPage === 'table-reservation'
                ? 'text-[#9a4600] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#9a4600]'
                : 'text-[#574237] hover:text-[#9a4600]'
            }`}
          >
            Table Reservation
          </button>
          <button
            onClick={() => onNavigate('gallery')}
            className={`text-[14px] font-medium tracking-wide transition-colors relative py-1 ${
              currentPage === 'gallery'
                ? 'text-[#9a4600] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#9a4600]'
                : 'text-[#574237] hover:text-[#9a4600]'
            }`}
          >
            Gallery
          </button>
          <button
            onClick={() => onNavigate('about')}
            className={`text-[14px] font-medium tracking-wide transition-colors relative py-1 ${
              currentPage === 'about'
                ? 'text-[#9a4600] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#9a4600]'
                : 'text-[#574237] hover:text-[#9a4600]'
            }`}
          >
            About Us
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className={`text-[14px] font-medium tracking-wide transition-colors relative py-1 ${
              currentPage === 'contact'
                ? 'text-[#9a4600] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#9a4600]'
                : 'text-[#574237] hover:text-[#9a4600]'
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Right: Actions (Supabase status, Search, Currency, Cart, Book Room CTA, Auth) */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Supabase Status Trigger */}
          <button
            onClick={onOpenSupabase}
            title={isSupabaseLive ? 'Supabase Database Connected' : 'Supabase Setup & Schema'}
            type="button"
            className={`hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-semibold border transition-all active:scale-95 ${
              isSupabaseLive
                ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                : 'bg-[#ffdbcb]/30 border-[#dec1b2] text-[#763300] hover:bg-[#ffdbcb]'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${isSupabaseLive ? 'bg-emerald-600 animate-pulse' : 'bg-[#e87524]'}`} />
            <span className="hidden md:inline">Supabase</span>
          </button>

          {/* Currency Switcher */}
          <button
            onClick={onToggleCurrency}
            title="Toggle Currency"
            className="px-2 py-1 text-xs font-semibold rounded-md bg-[#f0eded] text-[#574237] hover:bg-[#e4e2e1] active:scale-95 transition-all hidden sm:flex items-center gap-1"
          >
            <span>{currency}</span>
            <span className="material-symbols-outlined text-[14px]">swap_vert</span>
          </button>

          {/* Search Trigger */}
          <button
            aria-label="Search"
            onClick={onOpenSearch}
            type="button"
            className="w-9 h-9 flex items-center justify-center text-[#574237] hover:text-[#1b1c1c] rounded-full hover:bg-[#f0eded] active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-[20px]">search</span>
          </button>

          {/* Dining Cart Pill (if items in cart) */}
          {totalCartCount > 0 && (
            <button
              onClick={() => onNavigate('dining')}
              aria-label="View Dining Order"
              className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#ffdbc9] text-[#763300] font-semibold text-xs shadow-xs active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[16px]">room_service</span>
              <span>{totalCartCount}</span>
            </button>
          )}

          {/* Desktop "Book a Stay" CTA */}
          <button
            onClick={() => onNavigate('book')}
            type="button"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#e87524] hover:bg-[#9a4600] text-white text-xs font-semibold tracking-wide shadow-sm hover:shadow-md active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[16px]">calendar_month</span>
            <span>Book Stay</span>
          </button>

          {/* Guest Profile / Auth Trigger */}
          <button
            aria-label="Patron Profile & Auth"
            onClick={onOpenAuth}
            title={currentUser ? `Signed in as ${currentUser.fullName}` : 'Sign In / Register'}
            type="button"
            className="relative w-9 h-9 rounded-full ring-2 ring-[#e87524]/30 hover:ring-[#e87524] overflow-hidden active:scale-95 transition-all shadow-sm flex items-center justify-center bg-[#f6f3f2]"
          >
            {currentUser ? (
              <span className="font-serif text-xs font-bold text-[#9a4600]">
                {currentUser.fullName ? currentUser.fullName.slice(0, 2).toUpperCase() : 'GM'}
              </span>
            ) : (
              <img
                alt="Profile"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSoL4pXP5Jw8-y8Wa2VUPTB3MQ_VRnaDG1xPt9uYOhcwADx-WcOlMxxVQmCCJjEBqZTc2kJoTKo05GLfglAIjxTmmgo32P0IxmzuaGjDjgswhtMrSC_ohAJ_InGXoWQn_Wsz-_DBvjKRRm4_FwGOnOV8KMDf8IQInfp9njAs2kd-_Am-bu9GPWpz_bX2-UBkdqPG23EPE7KXx_7ttIMZhrt7FZa4FnNx7WdDbgRfXeyeF3fpuDWoLR"
              />
            )}
            {currentUser && (
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-white" />
            )}
          </button>
        </div>

      </div>
    </header>
  );
};
