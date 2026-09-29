import React, { useState } from 'react';
import { PageType, BookingState, Room } from '../types';
import { ROOMS_DATA } from '../data/hotelData';
import { createBooking } from '../services/supabaseService';

interface StayBookingPageProps {
  onNavigate: (page: PageType) => void;
  booking: BookingState;
  onUpdateBooking: (updated: Partial<BookingState>) => void;
  onCompleteBooking: (reservationCode: string) => void;
  currentUserId?: string;
  currency: string;
}

export const StayBookingPage: React.FC<StayBookingPageProps> = ({
  onNavigate,
  booking,
  onUpdateBooking,
  onCompleteBooking,
  currentUserId,
  currency,
}) => {
  const [promoCodeInput, setPromoCodeInput] = useState(booking.promoCode || 'ROSE20');
  const [promoApplied, setPromoApplied] = useState(true);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [isRoomChangeOpen, setIsRoomChangeOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Recalculate amounts
  const baseTotal = booking.baseRate * booking.nights;
  const taxes = Math.round(baseTotal * 0.18);
  const resortFee = 1200;
  const discount = promoApplied ? 2000 : 0;
  const finalTotal = baseTotal + taxes + resortFee - discount;

  const handleApplyPromo = () => {
    if (promoCodeInput.trim().toUpperCase() === 'ROSE20') {
      setPromoApplied(true);
      onUpdateBooking({ promoCode: 'ROSE20', discount: 2000, total: finalTotal });
    } else {
      alert('Invalid promo code. Try "ROSE20" for 20% discount.');
    }
  };

  const handleRemovePromo = () => {
    setPromoApplied(false);
    onUpdateBooking({ promoCode: '', discount: 0 });
  };

  const handleSelectRoomChange = (room: Room) => {
    onUpdateBooking({
      roomId: room.id,
      roomName: room.name,
      roomImage: room.image,
      baseRate: room.price,
    });
    setIsRoomChangeOpen(false);
  };

  const handleCheckboxToggle = (req: string) => {
    const exists = booking.specialRequests.includes(req);
    const updated = exists
      ? booking.specialRequests.filter((r) => r !== req)
      : [...booking.specialRequests, req];
    onUpdateBooking({ specialRequests: updated });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const generatedCode = `#RG-${Math.floor(100000 + Math.random() * 900000)}`;
    const fullBookingState = { ...booking, total: finalTotal };
    onUpdateBooking({ total: finalTotal });

    // Call Supabase service
    await createBooking(fullBookingState, generatedCode, currentUserId);
    setIsSubmitting(false);
    onCompleteBooking(generatedCode);
  };

  return (
    <div className="flex flex-col w-full pb-20">
      
      {/* 1. Stepper Progress Bar */}
      <section className="max-w-3xl mx-auto w-full px-4 sm:px-6 pt-6 pb-4">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-0.5 bg-[#e4e2e1] -z-0">
            <div className="w-1/2 h-full bg-[#e87524]" />
          </div>

          <div className="flex flex-col items-center gap-1 z-10 bg-white px-2">
            <div className="w-8 h-8 rounded-full bg-[#e87524] text-white flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[18px]">done</span>
            </div>
            <span className="text-[11px] font-bold text-[#9a4600]">Room</span>
          </div>

          <div className="flex flex-col items-center gap-1 z-10 bg-white px-2">
            <div className="w-8 h-8 rounded-full bg-[#9a4600] text-white flex items-center justify-center shadow-md ring-4 ring-[#ffdbc9]">
              <span className="text-xs font-bold">2</span>
            </div>
            <span className="text-[11px] font-bold text-[#1b1c1c]">Guest Info</span>
          </div>

          <div className="flex flex-col items-center gap-1 z-10 bg-white px-2">
            <div className="w-8 h-8 rounded-full bg-[#e4e2e1] text-[#574237] flex items-center justify-center">
              <span className="text-xs font-semibold">3</span>
            </div>
            <span className="text-[11px] text-[#8a7265]">Payment</span>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-3xl mx-auto w-full px-4 sm:px-6 space-y-6">
        
        {/* 2. Confirmed Suite Summary Card */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-[#dec1b2]/40">
          <div className="flex gap-4 items-center">
            <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-[#f0eded]">
              <img
                src={booking.roomImage}
                alt={booking.roomName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <div className="flex items-center justify-between gap-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#9a4600]">
                  Confirmed Suite
                </span>
                <button
                  type="button"
                  onClick={() => setIsRoomChangeOpen(true)}
                  className="text-xs font-semibold text-[#4b5e8a] underline hover:text-[#9a4600]"
                >
                  Change Suite
                </button>
              </div>

              <h2 className="font-serif text-base sm:text-lg text-[#1b1c1c] font-semibold truncate mt-0.5">
                {booking.roomName}
              </h2>

              <div className="flex items-center gap-2 text-xs text-[#574237] mt-1">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-[#9a4600]">calendar_today</span>
                  {booking.checkIn} – {booking.checkOut}
                </span>
                <span>•</span>
                <span>{booking.nights} Nights</span>
              </div>

              <div className="flex items-center gap-2 mt-2">
                <span className="inline-flex items-center gap-1 bg-[#f6f3f2] px-2.5 py-0.5 rounded-full text-[#574237] text-[11px]">
                  <span className="material-symbols-outlined text-[13px]">group</span>
                  {booking.adults} Adults
                </span>
                <span className="inline-flex items-center gap-1 bg-[#f6f3f2] px-2.5 py-0.5 rounded-full text-[#574237] text-[11px]">
                  <span className="material-symbols-outlined text-[13px]">yard</span>
                  Garden View
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Booking Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Guest Information */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-[#dec1b2]/40 space-y-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#9a4600] text-[22px]">badge</span>
              <h3 className="font-serif text-lg font-bold text-[#1b1c1c]">Guest Information</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#8a7265] uppercase">First Name</label>
                <input
                  required
                  type="text"
                  value={booking.guestFirstName}
                  onChange={(e) => onUpdateBooking({ guestFirstName: e.target.value })}
                  className="w-full h-11 px-3.5 rounded-xl bg-[#f6f3f2] text-[#1b1c1c] text-sm focus:outline-none focus:bg-white border border-transparent focus:border-[#dec1b2] transition-all"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#8a7265] uppercase">Last Name</label>
                <input
                  required
                  type="text"
                  value={booking.guestLastName}
                  onChange={(e) => onUpdateBooking({ guestLastName: e.target.value })}
                  className="w-full h-11 px-3.5 rounded-xl bg-[#f6f3f2] text-[#1b1c1c] text-sm focus:outline-none focus:bg-white border border-transparent focus:border-[#dec1b2] transition-all"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#8a7265] uppercase">Email Address</label>
              <div className="relative">
                <input
                  required
                  type="email"
                  value={booking.guestEmail}
                  onChange={(e) => onUpdateBooking({ guestEmail: e.target.value })}
                  className="w-full h-11 pl-10 pr-3.5 rounded-xl bg-[#f6f3f2] text-[#1b1c1c] text-sm focus:outline-none focus:bg-white border border-transparent focus:border-[#dec1b2] transition-all"
                />
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-[#8a7265]">
                  mail
                </span>
              </div>
              <p className="text-[11px] text-[#8a7265] mt-0.5">Booking voucher and check-in QR code sent here</p>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#8a7265] uppercase">Phone Number</label>
              <div className="flex gap-2">
                <div className="h-11 px-3 rounded-xl bg-[#f6f3f2] flex items-center gap-1 text-sm font-semibold text-[#1b1c1c]">
                  <span>🇮🇳</span>
                  <span>+91</span>
                </div>
                <input
                  required
                  type="tel"
                  value={booking.guestPhone}
                  onChange={(e) => onUpdateBooking({ guestPhone: e.target.value })}
                  className="w-full h-11 px-3.5 rounded-xl bg-[#f6f3f2] text-[#1b1c1c] text-sm focus:outline-none focus:bg-white border border-transparent focus:border-[#dec1b2] transition-all"
                />
              </div>
            </div>

            {/* Estimated Arrival Time */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-bold text-[#8a7265] uppercase">Estimated Arrival Time</label>
              <div className="grid grid-cols-3 gap-2">
                {['12:00 – 14:00', '14:00 – 16:00', '16:00 – 20:00'].map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => onUpdateBooking({ arrivalTime: time })}
                    className={`h-11 rounded-xl text-xs font-bold transition-all ${
                      booking.arrivalTime === time
                        ? 'bg-[#e87524] text-white shadow-sm'
                        : 'bg-[#f6f3f2] text-[#1b1c1c] hover:bg-[#eae7e7]'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {/* Special Requests Accordion */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setIsAccordionOpen(!isAccordionOpen)}
                className="w-full flex items-center justify-between p-3.5 rounded-xl bg-[#f6f3f2] hover:bg-[#eae7e7] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px] text-[#9a4600]">room_service</span>
                  <span className="text-xs sm:text-sm font-bold text-[#1b1c1c]">
                    Special Requests & Preferences
                  </span>
                </div>
                <span className={`material-symbols-outlined text-[20px] text-[#8a7265] transition-transform ${isAccordionOpen ? 'rotate-180' : ''}`}>
                  expand_more
                </span>
              </button>

              {isAccordionOpen && (
                <div className="mt-3 p-4 bg-[#f6f3f2] rounded-xl space-y-3 animate-in fade-in duration-200">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {[
                      'Quiet Corner Room',
                      'High Floor Suite',
                      'Honeymoon Rose Setup',
                      'Late Evening Check-in',
                    ].map((req) => (
                      <label
                        key={req}
                        className="flex items-center gap-2 p-2 rounded-lg bg-white border border-[#dec1b2]/30 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={booking.specialRequests.includes(req)}
                          onChange={() => handleCheckboxToggle(req)}
                          className="w-4 h-4 accent-[#9a4600] rounded"
                        />
                        <span className="text-[#1b1c1c] font-medium">{req}</span>
                      </label>
                    ))}
                  </div>
                  <textarea
                    rows={2}
                    value={booking.customNotes}
                    onChange={(e) => onUpdateBooking({ customNotes: e.target.value })}
                    placeholder="Any dietary restrictions or personal preferences for our butler desk..."
                    className="w-full p-3 rounded-lg bg-white border border-[#dec1b2]/30 text-xs text-[#1b1c1c] focus:outline-none resize-none"
                  />
                </div>
              )}
            </div>
          </div>

          {/* 4. Booking Summary */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-[#dec1b2]/40 space-y-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#9a4600] text-[22px]">receipt_long</span>
              <h3 className="font-serif text-lg font-bold text-[#1b1c1c]">Booking Summary</h3>
            </div>

            <div className="space-y-2.5 text-xs sm:text-sm text-[#574237]">
              <div className="flex justify-between items-center">
                <span>Base Room Rate (₹{booking.baseRate.toLocaleString('en-IN')} × {booking.nights} nights)</span>
                <span className="text-[#1b1c1c] font-semibold">₹{baseTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1">
                  Luxury Taxes & GST (18%)
                  <span className="material-symbols-outlined text-[14px] text-[#8a7265]" title="Govt. Luxury GST 18%">info</span>
                </span>
                <span className="text-[#1b1c1c] font-semibold">₹{taxes.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Resort & Botanical Spa Access</span>
                <span className="text-[#1b1c1c] font-semibold">₹{resortFee.toLocaleString('en-IN')}</span>
              </div>

              {promoApplied && (
                <div className="flex justify-between items-center text-[#9a4600]">
                  <div className="flex items-center gap-1 font-medium">
                    <span className="material-symbols-outlined text-[16px]">local_offer</span>
                    <span>Autumn Escape Promo ('ROSE20')</span>
                  </div>
                  <span className="font-semibold">-₹{discount.toLocaleString('en-IN')}</span>
                </div>
              )}
            </div>

            {/* Promo Code Input Field */}
            <div className="bg-[#f6f3f2] p-2.5 rounded-xl flex items-center gap-2 border border-[#dec1b2]/30">
              <span className="material-symbols-outlined text-[18px] text-[#8a7265]">sell</span>
              <input
                type="text"
                value={promoCodeInput}
                onChange={(e) => setPromoCodeInput(e.target.value.toUpperCase())}
                placeholder="PROMO CODE"
                className="bg-transparent uppercase tracking-wider text-[#9a4600] text-xs font-bold flex-1 focus:outline-none"
              />
              {promoApplied ? (
                <div className="flex items-center gap-2">
                  <span className="bg-[#ffdbcb] text-[#341100] text-[10px] font-bold px-2 py-0.5 rounded-full">
                    APPLIED
                  </span>
                  <button
                    type="button"
                    onClick={handleRemovePromo}
                    className="text-xs text-[#8a7265] hover:text-[#ba1a1a]"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleApplyPromo}
                  className="px-3 py-1 rounded-lg bg-[#9a4600] text-white text-xs font-bold"
                >
                  Apply
                </button>
              )}
            </div>

            {/* Total Highlight */}
            <div className="bg-[#f6f3f2] p-4 sm:p-5 rounded-xl flex items-center justify-between border border-[#dec1b2]/40">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#8a7265] block">
                  Total Payable Amount
                </span>
                <span className="text-xs text-[#574237]">Includes all luxury hospitality duties</span>
              </div>
              <div className="text-right">
                <span className="font-serif text-2xl sm:text-3xl font-bold text-[#e87524] block">
                  ₹{finalTotal.toLocaleString('en-IN')}
                </span>
                {promoApplied && (
                  <span className="text-xs text-[#8a7265] line-through">
                    ₹{(finalTotal + discount).toLocaleString('en-IN')}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* 5. Payment Method */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-[#dec1b2]/40 space-y-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#9a4600] text-[22px]">account_balance_wallet</span>
              <h3 className="font-serif text-lg font-bold text-[#1b1c1c]">Payment Method</h3>
            </div>

            <div className="space-y-2">
              <label
                onClick={() => onUpdateBooking({ paymentMethod: 'upi' })}
                className="flex items-start gap-3 p-3.5 rounded-xl bg-[#f6f3f2] hover:bg-[#eae7e7] cursor-pointer border border-[#dec1b2]/30 transition-colors"
              >
                <input
                  type="radio"
                  name="pay_method"
                  checked={booking.paymentMethod === 'upi'}
                  onChange={() => {}}
                  className="mt-1 w-4 h-4 accent-[#9a4600]"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-[#1b1c1c]">UPI & Instant NetBanking</span>
                    <span className="bg-[#ffdbcb] text-[#341100] text-[10px] font-bold px-2 py-0.5 rounded">Fastest</span>
                  </div>
                  <p className="text-xs text-[#574237] mt-0.5">Google Pay, PhonePe, Paytm, or direct BHIM UPI transfer</p>
                </div>
              </label>

              <label
                onClick={() => onUpdateBooking({ paymentMethod: 'card' })}
                className="flex items-start gap-3 p-3.5 rounded-xl bg-[#f6f3f2] hover:bg-[#eae7e7] cursor-pointer border border-[#dec1b2]/30 transition-colors"
              >
                <input
                  type="radio"
                  name="pay_method"
                  checked={booking.paymentMethod === 'card'}
                  onChange={() => {}}
                  className="mt-1 w-4 h-4 accent-[#9a4600]"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-[#1b1c1c]">Credit / Debit Card</span>
                    <span className="material-symbols-outlined text-[18px] text-[#574237]">credit_card</span>
                  </div>
                  <p className="text-xs text-[#574237] mt-0.5">Visa, Mastercard, RuPay & American Express welcomed</p>
                </div>
              </label>

              <label
                onClick={() => onUpdateBooking({ paymentMethod: 'arrival' })}
                className="flex items-start gap-3 p-3.5 rounded-xl bg-[#f6f3f2] hover:bg-[#eae7e7] cursor-pointer border border-[#dec1b2]/30 transition-colors"
              >
                <input
                  type="radio"
                  name="pay_method"
                  checked={booking.paymentMethod === 'arrival'}
                  onChange={() => {}}
                  className="mt-1 w-4 h-4 accent-[#9a4600]"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-[#1b1c1c]">Pay at Check-in</span>
                    <span className="material-symbols-outlined text-[18px] text-[#8a7265]">hotel</span>
                  </div>
                  <p className="text-xs text-[#574237] mt-0.5">Card required only to guarantee reservation. Pay upon arrival.</p>
                </div>
              </label>
            </div>
          </div>

          {/* 6. Worry-Free Cancellation Note */}
          <div className="bg-[#4b5e8a]/10 border border-[#4b5e8a]/20 rounded-2xl p-4 sm:p-5 flex items-start gap-3">
            <span className="material-symbols-outlined text-[#4b5e8a] text-[22px] shrink-0 mt-0.5">verified_user</span>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#0D234C]">
                Worry-Free Cancellation Guarantee
              </h4>
              <p className="text-xs text-[#574237] mt-0.5 leading-relaxed">
                Free cancellation until 48 hours prior to arrival. Modify or cancel with a single tap from your confirmation voucher.
              </p>
            </div>
          </div>

          {/* 7. Action CTA Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full h-14 rounded-2xl bg-[#e87524] hover:bg-[#9a4600] text-white font-serif text-lg font-bold flex items-center justify-center gap-2 shadow-lg active:scale-[0.99] transition-all"
            >
              <span className="material-symbols-outlined text-[22px]">lock</span>
              <span>Confirm & Reserve Room • ₹{finalTotal.toLocaleString('en-IN')}</span>
            </button>
            <p className="text-center text-xs text-[#8a7265] mt-2.5 flex items-center justify-center gap-1.5">
              <span className="material-symbols-outlined text-[14px]">shield</span>
              <span>256-Bit SSL Encrypted Luxury Booking Portal</span>
            </p>
          </div>

        </form>

      </div>

      {/* Room Change Modal */}
      {isRoomChangeOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full space-y-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center">
              <h3 className="font-serif text-lg font-bold text-[#1b1c1c]">Select Different Suite</h3>
              <button onClick={() => setIsRoomChangeOpen(false)}>
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="space-y-2">
              {ROOMS_DATA.map((r) => (
                <div
                  key={r.id}
                  onClick={() => handleSelectRoomChange(r)}
                  className="p-3 rounded-xl bg-[#f6f3f2] hover:bg-[#ffdbcb]/30 border border-[#dec1b2]/30 flex items-center gap-3 cursor-pointer transition-all"
                >
                  <img src={r.image} alt={r.name} className="w-14 h-14 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif text-sm font-semibold text-[#1b1c1c] truncate">{r.name}</h4>
                    <span className="text-xs font-bold text-[#9a4600]">₹{r.price.toLocaleString('en-IN')}/night</span>
                  </div>
                  <span className="material-symbols-outlined text-[18px] text-[#9a4600]">chevron_right</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
