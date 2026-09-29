import React from 'react';
import { PageType } from '../types';

interface FooterProps {
  onNavigate: (page: PageType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#e4e2e1] text-[#1b1c1c] border-t border-[#dec1b2]/50 pt-12 pb-24 lg:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8">
        
        {/* Top Brand & Location summary */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 pb-6 border-b border-[#dec1b2]/40">
          <div className="space-y-2 max-w-md">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#0D234C] flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-[18px] text-[#e87524]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  spa
                </span>
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-[#1b1c1c]">
                Rose Garden
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#574237] leading-relaxed">
              14 Heritage Boulevard, Civil Lines, Jaipur, Rajasthan 302006, India.
              A sanctuary of imperial grace, rare scented rose gardens, and Michelin-recommended hospitality.
            </p>
          </div>

          {/* Instant Connect Buttons */}
          <div className="flex flex-wrap sm:flex-nowrap gap-3 items-center">
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial py-2.5 px-4 rounded-xl bg-white hover:bg-[#f6f3f2] text-[#1b1c1c] flex items-center justify-center gap-2 text-xs font-semibold shadow-xs active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[18px] text-[#25D366]">chat</span>
              <span>WhatsApp Concierge</span>
            </a>
            <a
              href="mailto:reservations@rosegardenhotel.com"
              className="flex-1 sm:flex-initial py-2.5 px-4 rounded-xl bg-white hover:bg-[#f6f3f2] text-[#1b1c1c] flex items-center justify-center gap-2 text-xs font-semibold shadow-xs active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[18px] text-[#9a4600]">mail</span>
              <span>Email Inquiries</span>
            </a>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1b1c1c]">
              Experiences & Stays
            </span>
            <button onClick={() => onNavigate('rooms')} className="text-left text-xs sm:text-sm text-[#574237] hover:text-[#9a4600] transition-colors">
              The Presidential Rose Suite
            </button>
            <button onClick={() => onNavigate('rooms')} className="text-left text-xs sm:text-sm text-[#574237] hover:text-[#9a4600] transition-colors">
              Executive Garden Deluxe
            </button>
            <button onClick={() => onNavigate('rooms')} className="text-left text-xs sm:text-sm text-[#574237] hover:text-[#9a4600] transition-colors">
              Heritage Royal Club
            </button>
            <button onClick={() => onNavigate('book')} className="text-left text-xs sm:text-sm text-[#9a4600] font-semibold hover:underline">
              Stay Reservation & Availability
            </button>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1b1c1c]">
              Gastronomy & Bars
            </span>
            <button onClick={() => onNavigate('dining')} className="text-left text-xs sm:text-sm text-[#574237] hover:text-[#9a4600] transition-colors">
              Rosewood Bistro & Fine Dining
            </button>
            <button onClick={() => onNavigate('table-reservation')} className="text-left text-xs sm:text-sm text-[#574237] hover:text-[#9a4600] transition-colors">
              Reserve an Intimate Table
            </button>
            <button onClick={() => onNavigate('table-reservation')} className="text-left text-xs sm:text-sm text-[#574237] hover:text-[#9a4600] transition-colors">
              24h In-Room Dining Service
            </button>
            <button onClick={() => onNavigate('dining')} className="text-left text-xs sm:text-sm text-[#574237] hover:text-[#9a4600] transition-colors">
              Chef Ananya Sen's Philosophy
            </button>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1b1c1c]">
              Discovery
            </span>
            <button onClick={() => onNavigate('gallery')} className="text-left text-xs sm:text-sm text-[#574237] hover:text-[#9a4600] transition-colors">
              The Visual Journey (Gallery)
            </button>
            <button onClick={() => onNavigate('about')} className="text-left text-xs sm:text-sm text-[#574237] hover:text-[#9a4600] transition-colors">
              Est. 1928 Heritage Story
            </button>
            <button onClick={() => onNavigate('about')} className="text-left text-xs sm:text-sm text-[#574237] hover:text-[#9a4600] transition-colors">
              Leadership & Master Artisans
            </button>
            <button onClick={() => onNavigate('admin')} className="text-left text-xs sm:text-sm text-[#4b5e8a] font-semibold hover:underline">
              Executive Management Portal
            </button>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1b1c1c]">
              Policies & Comforts
            </span>
            <button onClick={() => onNavigate('contact')} className="text-left text-xs sm:text-sm text-[#574237] hover:text-[#9a4600] transition-colors">
              Worry-Free Cancellation (48 hrs)
            </button>
            <button onClick={() => onNavigate('contact')} className="text-left text-xs sm:text-sm text-[#574237] hover:text-[#9a4600] transition-colors">
              Guest Privacy & Data Shield
            </button>
            <button onClick={() => onNavigate('contact')} className="text-left text-xs sm:text-sm text-[#574237] hover:text-[#9a4600] transition-colors">
              Airport & Railway Transfers
            </button>
            <button onClick={() => onNavigate('contact')} className="text-left text-xs sm:text-sm text-[#574237] hover:text-[#9a4600] transition-colors">
              Frequently Asked Questions
            </button>
          </div>
        </div>

        {/* Bottom Rights */}
        <div className="pt-6 border-t border-[#dec1b2]/40 flex flex-col sm:flex-row items-center justify-between text-center gap-2 text-xs text-[#8a7265]">
          <span>
            © 2024 Rose Garden Luxury Boutique Hotel & Restaurant. All rights reserved.
          </span>
          <span className="text-[11px] opacity-80">
            Crafted with timeless grace for discerning travelers.
          </span>
        </div>

      </div>
    </footer>
  );
};
