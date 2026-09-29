import React from 'react';
import { BookingState } from '../types';

interface BookingSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: BookingState;
  reservationCode: string;
}

export const BookingSuccessModal: React.FC<BookingSuccessModalProps> = ({
  isOpen,
  onClose,
  booking,
  reservationCode,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl animate-in slide-in-from-bottom duration-300">
        
        {/* Header Icon & Close */}
        <div className="flex justify-between items-start">
          <div className="w-12 h-12 rounded-full bg-[#ffdbc9] text-[#9a4600] flex items-center justify-center shadow-sm">
            <span className="material-symbols-outlined text-[28px]">verified</span>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#f0eded] flex items-center justify-center text-[#574237] hover:text-[#1b1c1c] active:scale-90 transition-transform"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Title */}
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#9a4600]">
            Booking Confirmed
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl text-[#1b1c1c] mt-1 font-semibold leading-tight">
            We Await Your Arrival, {booking.guestFirstName || 'Esteemed Guest'}
          </h3>
          <p className="text-xs sm:text-sm text-[#574237] mt-1">
            An official royal confirmation voucher has been dispatched to{' '}
            <span className="font-semibold text-[#1b1c1c]">
              {booking.guestEmail || 'your email'}
            </span>.
          </p>
        </div>

        {/* Voucher Snapshot */}
        <div className="bg-[#f6f3f2] p-4 rounded-xl space-y-3 border border-[#dec1b2]/40 text-xs sm:text-sm">
          <div className="flex justify-between items-center pb-2 border-b border-[#dec1b2]/30">
            <span className="text-[11px] font-bold text-[#8a7265] uppercase">
              Reservation Code
            </span>
            <span className="font-mono text-base font-bold text-[#9a4600] tracking-wider">
              {reservationCode}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-[#8a7265]">Suite Selection</span>
            <span className="font-medium text-[#1b1c1c]">{booking.roomName}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-[#8a7265]">Stay Schedule</span>
            <span className="font-medium text-[#1b1c1c]">
              {booking.checkIn} – {booking.checkOut} ({booking.nights} Nights)
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-[#8a7265]">Guests</span>
            <span className="font-medium text-[#1b1c1c]">
              {booking.adults} Adults{booking.children > 0 ? `, ${booking.children} Children` : ''}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-[#8a7265]">Arrival Window</span>
            <span className="font-medium text-[#1b1c1c]">{booking.arrivalTime}</span>
          </div>

          <div className="flex justify-between items-center pt-2 border-t border-[#dec1b2]/30">
            <span className="text-[11px] font-bold text-[#8a7265] uppercase">Total Paid / Due</span>
            <span className="font-serif text-base font-bold text-[#9a4600]">
              ₹{booking.total.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* QR Code for Express Contactless Check-in */}
        <div className="flex flex-col items-center justify-center p-4 bg-[#fcf9f8] rounded-xl border border-dashed border-[#dec1b2]">
          <div className="w-32 h-32 bg-white p-2 rounded-lg shadow-xs flex items-center justify-center border border-[#dec1b2]/40">
            <svg className="w-full h-full text-[#1b1c1c]" fill="currentColor" viewBox="0 0 100 100">
              <path d="M0 0h30v30H0zM10 10h10v10H10zM70 0h30v30H70zM80 10h10v10H80zM0 70h30v30H0zM10 80h10v10H10zM40 0h20v10H40zM40 20h10v10H40zM60 20h10v10H60zM40 40h20v20H40zM0 40h20v10H0zM20 50h10v10H20zM0 60h10v10H0zM70 40h10v20H70zM90 40h10v10H90zM80 60h20v10H80zM40 70h10v20H40zM60 70h10v10H60zM50 80h20v10H50zM40 90h30v10H40zM80 80h10v20H80zM90 70h10v10H90zM90 90h10v10H90z" />
            </svg>
          </div>
          <span className="text-xs text-[#8a7265] mt-2 text-center">
            Scan at front portico for express contactless keycard dispensing
          </span>
        </div>

        {/* Digital Wallet Passes */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => alert('Pass downloaded for Apple Wallet!')}
            className="h-11 rounded-xl bg-[#f0eded] hover:bg-[#e4e2e1] text-[#1b1c1c] text-xs font-semibold flex items-center justify-center gap-1.5 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">wallet</span>
            <span>Apple Wallet</span>
          </button>
          <button
            onClick={() => alert('Pass synchronized with Google Wallet!')}
            className="h-11 rounded-xl bg-[#f0eded] hover:bg-[#e4e2e1] text-[#1b1c1c] text-xs font-semibold flex items-center justify-center gap-1.5 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">account_balance_wallet</span>
            <span>Google Wallet</span>
          </button>
        </div>

        {/* Return Button */}
        <button
          onClick={onClose}
          className="w-full h-12 rounded-xl bg-[#9a4600] hover:bg-[#763300] text-white text-sm font-bold shadow-md active:scale-98 transition-all"
        >
          Return to Experience Portal
        </button>

      </div>
    </div>
  );
};
