import React from 'react';
import { Room } from '../types';

interface RoomDetailModalProps {
  room: Room | null;
  isOpen: boolean;
  onClose: () => void;
  onBookNow: (room: Room) => void;
  currency: string;
}

export const RoomDetailModal: React.FC<RoomDetailModalProps> = ({
  room,
  isOpen,
  onClose,
  onBookNow,
  currency,
}) => {
  if (!isOpen || !room) return null;

  return (
    <div className="fixed inset-0 z-[75] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/65 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl z-10 overflow-hidden flex flex-col max-h-[90vh] my-auto">
        {/* Room Image & Close Button */}
        <div className="relative w-full h-64 sm:h-80 bg-[#f0eded] overflow-hidden flex-shrink-0">
          <img
            alt={room.name}
            src={room.image}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/60 flex items-center justify-center active:scale-90 transition-transform"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>

          {room.badge && (
            <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#e87524] text-white text-xs font-bold uppercase tracking-wider shadow-sm">
              {room.badge}
            </span>
          )}

          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold leading-tight">
              {room.name}
            </h2>
            <div className="flex items-center gap-3 text-xs sm:text-sm text-white/90 mt-1">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-[#ffb692]">square_foot</span>
                {room.sizeSqFt} sq ft
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-[#ffb692]">star</span>
                {room.rating} ({room.reviewsCount} reviews)
              </span>
              <span>•</span>
              <span>Max {room.maxGuests} Guests</span>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Key Specs Row */}
          <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-[#f6f3f2] text-center">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#8a7265] block">Bed Arrangement</span>
              <span className="text-xs sm:text-sm font-semibold text-[#1b1c1c]">{room.bedType}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-[#8a7265] block">View</span>
              <span className="text-xs sm:text-sm font-semibold text-[#1b1c1c]">{room.view}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-[#8a7265] block">Cancellation</span>
              <span className="text-xs sm:text-sm font-semibold text-emerald-700">Free 48h Prior</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#9a4600] mb-1.5">
              Suite Overview & Architecture
            </h3>
            <p className="text-sm text-[#574237] leading-relaxed">
              {room.description} Handcrafted teakwood furnishings, fine Egyptian cotton linens, and double-glazed soundproof French doors ensuring tranquil rest amidst natural botanical fragrances.
            </p>
          </div>

          {/* Amenities Grid */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#9a4600] mb-2.5">
              Curated In-Room Amenities
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {room.amenities.map((amenity, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-[#fcf9f8] border border-[#dec1b2]/40 text-xs text-[#1b1c1c]"
                >
                  <span className="material-symbols-outlined text-[18px] text-[#9a4600]">
                    {amenity.icon}
                  </span>
                  <span className="font-medium">{amenity.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Direct Booking Guarantee */}
          <div className="p-4 rounded-xl bg-[#ffdbc9]/30 border border-[#dec1b2]/50 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#763300] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              Direct Reservation Privileges Included
            </span>
            <ul className="text-xs text-[#574237] space-y-1 pl-5 list-disc">
              <li>Complimentary Daily Artisanal Breakfast in Courtyard Pavilion</li>
              <li>Priority Early Check-in from 11:00 AM upon room readiness</li>
              <li>Signature Damask Rose petal welcome elixir & chilled towel</li>
            </ul>
          </div>
        </div>

        {/* Modal Footer with Price & Book CTA */}
        <div className="p-4 sm:p-5 bg-[#f6f3f2] border-t border-[#e4e2e1] flex items-center justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#8a7265] block">Nightly Tariff</span>
            <div className="flex items-baseline gap-1">
              <span className="font-serif text-2xl font-bold text-[#9a4600]">
                {currency === 'INR' ? '₹' : currency === 'USD' ? '$' : currency === 'EUR' ? '€' : '£'}
                {currency === 'INR' ? room.price.toLocaleString('en-IN') : Math.round(room.price / 85).toLocaleString()}
              </span>
              <span className="text-xs text-[#8a7265]">/ night + taxes</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-[#dec1b2] text-[#574237] hover:bg-white text-xs sm:text-sm font-semibold active:scale-95 transition-all"
            >
              Close
            </button>
            <button
              onClick={() => {
                onBookNow(room);
                onClose();
              }}
              className="px-5 py-2.5 rounded-xl bg-[#e87524] hover:bg-[#9a4600] text-white text-xs sm:text-sm font-bold shadow-md active:scale-95 transition-all flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px]">calendar_month</span>
              <span>Reserve Suite</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
