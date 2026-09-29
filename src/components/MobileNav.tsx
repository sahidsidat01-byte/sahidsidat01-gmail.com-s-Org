import React from 'react';
import { PageType } from '../types';

interface MobileNavProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
  onOpenMore: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  currentPage,
  onNavigate,
  onOpenMore,
}) => {
  return (
    <nav className="lg:hidden fixed bottom-0 w-full z-50 pb-safe bg-[#ffffff]/95 backdrop-blur-xl border-t border-[#dec1b2]/40 shadow-[0_-4px_20px_rgba(13,35,76,0.06)]">
      <div className="flex justify-around items-center h-16 px-1">
        
        {/* Home */}
        <button
          onClick={() => onNavigate('home')}
          className={`flex flex-col items-center justify-center min-w-[56px] h-12 gap-0.5 transition-colors ${
            currentPage === 'home' ? 'text-[#9a4600] font-bold' : 'text-[#574237] hover:text-[#1b1c1c]'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">cottage</span>
          <span className="text-[10px] tracking-wide">Home</span>
        </button>

        {/* Rooms */}
        <button
          onClick={() => onNavigate('rooms')}
          className={`flex flex-col items-center justify-center min-w-[56px] h-12 gap-0.5 transition-colors ${
            currentPage === 'rooms' ? 'text-[#9a4600] font-bold' : 'text-[#574237] hover:text-[#1b1c1c]'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">bed</span>
          <span className="text-[10px] tracking-wide">Rooms</span>
        </button>

        {/* Book (Hero Floating Button) */}
        <button
          onClick={() => onNavigate('book')}
          className="flex flex-col items-center justify-center min-w-[56px] h-12 gap-0.5 -mt-3.5 relative group active:scale-95 transition-transform"
        >
          <div className="w-12 h-12 rounded-full bg-[#e87524] text-white flex items-center justify-center shadow-[0_6px_16px_rgba(232,117,36,0.35)] ring-4 ring-white">
            <span className="material-symbols-outlined text-[24px]">calendar_month</span>
          </div>
          <span className={`text-[10px] font-semibold mt-0.5 ${currentPage === 'book' ? 'text-[#9a4600]' : 'text-[#574237]'}`}>
            Book
          </span>
        </button>

        {/* Dining */}
        <button
          onClick={() => onNavigate('dining')}
          className={`flex flex-col items-center justify-center min-w-[56px] h-12 gap-0.5 transition-colors ${
            currentPage === 'dining' ? 'text-[#9a4600] font-bold' : 'text-[#574237] hover:text-[#1b1c1c]'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">restaurant_menu</span>
          <span className="text-[10px] tracking-wide">Dining</span>
        </button>

        {/* More */}
        <button
          onClick={onOpenMore}
          className={`flex flex-col items-center justify-center min-w-[56px] h-12 gap-0.5 transition-colors ${
            ['gallery', 'about', 'contact', 'admin', 'table-reservation'].includes(currentPage)
              ? 'text-[#9a4600] font-bold'
              : 'text-[#574237] hover:text-[#1b1c1c]'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">grid_view</span>
          <span className="text-[10px] tracking-wide">More</span>
        </button>

      </div>
    </nav>
  );
};
