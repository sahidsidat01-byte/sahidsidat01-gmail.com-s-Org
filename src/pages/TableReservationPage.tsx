import React, { useState } from 'react';
import { PageType, TableReservation } from '../types';

interface TableReservationPageProps {
  onNavigate: (page: PageType) => void;
  currency: string;
}

export const TableReservationPage: React.FC<TableReservationPageProps> = ({
  onNavigate,
  currency,
}) => {
  const [activeTab, setActiveTab] = useState<'reserve' | 'order'>('reserve');

  // Reservation form states
  const [dateOption, setDateOption] = useState('Tonight, Oct 24, 2024');
  const [selectedSlot, setSelectedSlot] = useState('7:30 PM');
  const [guestsCount, setGuestsCount] = useState(2);
  const [selectedAmbience, setSelectedAmbience] = useState<
    'Courtyard Fountain' | 'Candlelight Verandah' | 'Private Salon' | 'Wine Cellar Alcove'
  >('Candlelight Verandah');
  const [guestName, setGuestName] = useState('Lady Evelyn Montgomery');
  const [phone, setPhone] = useState('+91 98200 45892');
  const [email, setEmail] = useState('evelyn.m@heritage.in');
  const [occasion, setOccasion] = useState('Anniversary Celebration');
  const [specialRequests, setSpecialRequests] = useState(
    'Fresh rose petal table runner and please prepare a celebratory dessert plate.'
  );
  const [showReservationToast, setShowReservationToast] = useState(false);

  // Delivery Tab states
  const [deliveryMode, setDeliveryMode] = useState<'suite' | 'takeaway' | 'local'>('suite');
  const [roomSuiteNum, setRoomSuiteNum] = useState('Suite 304');
  const [orderItems, setOrderItems] = useState<{ [key: string]: number }>({
    dal: 1,
    biryani: 1,
    naan: 2,
  });
  const [showOrderToast, setShowOrderToast] = useState(false);

  const updateOrderQty = (itemKey: string, delta: number) => {
    setOrderItems((prev) => ({
      ...prev,
      [itemKey]: Math.max(0, (prev[itemKey] || 0) + delta),
    }));
  };

  const calculateOrderTotal = () => {
    const prices: Record<string, number> = { dal: 590, biryani: 890, naan: 180 };
    return (
      (orderItems.dal || 0) * prices.dal +
      (orderItems.biryani || 0) * prices.biryani +
      (orderItems.naan || 0) * prices.naan
    );
  };

  const totalOrderCount =
    (orderItems.dal || 0) + (orderItems.biryani || 0) + (orderItems.naan || 0);

  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();
    setShowReservationToast(true);
    setTimeout(() => setShowReservationToast(false), 5000);
  };

  const handleOrderCheckout = () => {
    setShowOrderToast(true);
    setTimeout(() => setShowOrderToast(false), 4500);
  };

  const getGuestLabel = (count: number) => {
    if (count === 1) return 'Solo Dining Experience';
    if (count === 2) return 'Couples Intimate Table';
    if (count <= 4) return 'Small Family / Friends Table';
    return 'Private Celebration / Banquet Table';
  };

  return (
    <div className="flex flex-col w-full pb-20">
      
      {/* View Switcher Segmented Control */}
      <section className="max-w-3xl mx-auto w-full px-4 sm:px-6 pt-6 pb-2">
        <div className="p-1 bg-[#f0eded] rounded-full flex relative shadow-xs border border-[#dec1b2]/30">
          <button
            onClick={() => setActiveTab('reserve')}
            className={`flex-1 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'reserve'
                ? 'bg-[#9a4600] text-white shadow-sm'
                : 'text-[#574237] hover:text-[#1b1c1c]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">table_restaurant</span>
            <span>Table Reservation</span>
          </button>
          <button
            onClick={() => setActiveTab('order')}
            className={`flex-1 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'order'
                ? 'bg-[#9a4600] text-white shadow-sm'
                : 'text-[#574237] hover:text-[#1b1c1c]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">room_service</span>
            <span>Room Service & Delivery</span>
          </button>
        </div>
      </section>

      {/* Main Form Container */}
      <div className="max-w-3xl mx-auto w-full px-4 sm:px-6 space-y-6 mt-4">
        
        {/* =========================================
            TAB 1: TABLE RESERVATION
           ========================================= */}
        {activeTab === 'reserve' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            
            {/* Visual Ambience Framing Card */}
            <div className="relative rounded-2xl overflow-hidden shadow-sm bg-[#1b1c1c]">
              <div
                className="w-full h-44 sm:h-52 bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDxnArdq4x8bmwbNFT8rUgOnvjCoHFKt19Atd2AxHCUDyQScFEMQs1G7jXRX0NCgvGFUSNNF5vzx3tOocxk5GT4-Eq5HoQGqJbwHRYAXVkFU95IltbYKyF2kjCHHQR6vGD9cmpKtTlT971eJTVdMKfDUejdkyyhejQV9PZbmKNx-ywzZ5eDkAyV9PFCMHBwoXadyrDspTKvUgR9QmmY92GCoNe6gyQcEM1nbmoN4NFIOCCNuL5gI73Q')`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#1b1c1c]/90 via-[#1b1c1c]/40 to-transparent flex flex-col justify-end p-5 sm:p-6 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#ffb68d]">
                    Fine Dining & Courtyard
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl text-white font-semibold mt-0.5">
                    Reserve an Intimate Table at Rosewood
                  </h2>
                  <p className="text-xs text-white/80 mt-1">
                    Curated culinary heritage under twilight skies and scented pergolas.
                  </p>
                </div>
              </div>
            </div>

            {/* Active Booking Reference Snapshot */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-[#dec1b2]/40 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#9a4600] animate-pulse" />
                  <span className="text-xs font-bold uppercase text-[#9a4600] tracking-wider">
                    Live Concierge Booking
                  </span>
                </div>
                <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-[#b8cbfe]/40 text-[#021943]">
                  REF #TBL-504
                </span>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-[#f0eded]">
                <div className="flex items-center gap-2 text-xs text-[#574237]">
                  <span className="material-symbols-outlined text-[18px] text-[#9a4600]">apparel</span>
                  <span>Dress Code: <strong className="text-[#1b1c1c]">Smart Casual</strong></span>
                </div>
                <button
                  type="button"
                  onClick={() => alert('Calendar event added: "Dinner at Rosewood Verandah - 7:30 PM (Ref #TBL-504)"')}
                  className="flex items-center gap-1 text-xs font-bold text-[#9a4600] hover:underline"
                >
                  <span className="material-symbols-outlined text-[16px]">event</span>
                  <span>Add to Google Cal</span>
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleConfirmReservation} className="space-y-6">
              
              {/* Step 1: Date & Seating Configuration */}
              <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-[#dec1b2]/40 space-y-4">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#1b1c1c]">Select Date & Service</h3>
                  <span className="text-xs text-[#8a7265]">Reservations open 30 days in advance</span>
                </div>

                {/* Quick Date Shortcuts */}
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: 'Tonight', val: 'Tonight, Oct 24, 2024' },
                    { label: 'Tomorrow', val: 'Tomorrow, Oct 25, 2024' },
                    { label: 'This Weekend', val: 'Saturday, Oct 26, 2024' },
                  ].map((d) => (
                    <button
                      key={d.label}
                      type="button"
                      onClick={() => setDateOption(d.val)}
                      className={`py-2 px-1 rounded-xl text-center text-xs font-bold transition-all ${
                        dateOption === d.val
                          ? 'bg-[#9a4600] text-white shadow-sm'
                          : 'bg-[#f6f3f2] text-[#574237] hover:bg-[#eae7e7]'
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>

                {/* Selected Date Box */}
                <div className="p-3 rounded-xl bg-[#f6f3f2] flex items-center justify-between border border-[#dec1b2]/30">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#1b1c1c]">
                    <span className="material-symbols-outlined text-[20px] text-[#9a4600]">calendar_month</span>
                    <span>{dateOption}</span>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-[#9a4600]">Standard Seating</span>
                </div>

                {/* Lunch & Dinner Slots */}
                <div className="space-y-3 pt-2">
                  <span className="text-xs font-bold text-[#8a7265] uppercase block">
                    Available Seating Slots (90 min dining)
                  </span>

                  {/* Lunch */}
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-[#574237] mb-1.5 font-medium">
                      <span className="material-symbols-outlined text-[16px] text-[#e87524]">wb_sunny</span>
                      <span>Lunch Service</span>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {['12:30 PM', '1:00 PM', '1:45 PM', '2:15 PM'].map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedSlot(slot)}
                          className={`py-2 rounded-xl text-xs font-semibold transition-all ${
                            selectedSlot === slot
                              ? 'bg-[#9a4600] text-white shadow-sm'
                              : 'bg-[#f6f3f2] text-[#1b1c1c] hover:bg-[#eae7e7]'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Dinner */}
                  <div className="pt-2">
                    <div className="flex items-center gap-1.5 text-xs text-[#574237] mb-1.5 font-medium">
                      <span className="material-symbols-outlined text-[16px] text-[#0D234C]">bedtime</span>
                      <span>Dinner Service</span>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {['7:00 PM', '7:30 PM', '8:15 PM', '9:00 PM'].map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedSlot(slot)}
                          className={`py-2 rounded-xl text-xs font-semibold transition-all ${
                            selectedSlot === slot
                              ? 'bg-[#9a4600] text-white shadow-sm'
                              : 'bg-[#f6f3f2] text-[#1b1c1c] hover:bg-[#eae7e7]'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Number of Guests Stepper */}
                <div className="space-y-2 pt-2">
                  <label className="text-xs font-bold text-[#8a7265] uppercase">Number of Guests</label>
                  <div className="flex items-center justify-between p-3.5 bg-[#f6f3f2] rounded-xl border border-[#dec1b2]/30">
                    <div className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-[24px] text-[#9a4600]">group</span>
                      <div>
                        <span className="text-sm font-bold text-[#1b1c1c] block">
                          {guestsCount} {guestsCount === 1 ? 'Guest' : 'Guests'}
                        </span>
                        <span className="text-xs text-[#8a7265]">{getGuestLabel(guestsCount)}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setGuestsCount((c) => Math.max(1, c - 1))}
                        className="w-9 h-9 rounded-full bg-white text-[#1b1c1c] flex items-center justify-center shadow-xs active:scale-90"
                      >
                        <span className="material-symbols-outlined text-[18px]">remove</span>
                      </button>
                      <span className="w-6 text-center font-bold text-sm text-[#1b1c1c]">{guestsCount}</span>
                      <button
                        type="button"
                        onClick={() => setGuestsCount((c) => Math.min(12, c + 1))}
                        className="w-9 h-9 rounded-full bg-[#9a4600] text-white flex items-center justify-center shadow-xs active:scale-90"
                      >
                        <span className="material-symbols-outlined text-[18px]">add</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Seating Ambience Preferences */}
                <div className="space-y-2 pt-2">
                  <label className="text-xs font-bold text-[#8a7265] uppercase">Seating Ambience</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      {
                        title: 'Courtyard Fountain',
                        desc: 'Central fountain & jasmine breeze',
                        icon: 'yard',
                      },
                      {
                        title: 'Candlelight Verandah',
                        desc: 'Lush colonial arch balcony',
                        icon: 'explore_off',
                      },
                      {
                        title: 'Private Salon',
                        desc: 'Acoustic curtains & quiet service',
                        icon: 'meeting_room',
                      },
                      {
                        title: 'Wine Cellar Alcove',
                        desc: 'Exposed brick & sommelier table',
                        icon: 'wine_bar',
                      },
                    ].map((amb) => (
                      <button
                        key={amb.title}
                        type="button"
                        onClick={() => setSelectedAmbience(amb.title as any)}
                        className={`p-3 rounded-xl text-left transition-all border ${
                          selectedAmbience === amb.title
                            ? 'bg-[#ffdbcb] border-[#9a4600] text-[#341100] shadow-sm'
                            : 'bg-[#f6f3f2] border-transparent text-[#1b1c1c] hover:bg-[#eae7e7]'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 text-[#9a4600]">
                          <span className="material-symbols-outlined text-[18px]">{amb.icon}</span>
                          <span className="text-xs font-bold text-[#1b1c1c]">{amb.title}</span>
                        </div>
                        <span className="text-[11px] text-[#574237] mt-0.5 block">{amb.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Step 2: Contact Information */}
              <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-[#dec1b2]/40 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-lg font-bold text-[#1b1c1c]">Contact Information</h3>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#9a4600]">Step 2 of 2</span>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-bold text-[#8a7265] uppercase block mb-1">Full Name</label>
                    <input
                      required
                      type="text"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#f6f3f2] text-sm text-[#1b1c1c] focus:outline-none focus:bg-white border border-transparent focus:border-[#dec1b2] transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-[#8a7265] uppercase block mb-1">Phone Number</label>
                      <input
                        required
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#f6f3f2] text-sm text-[#1b1c1c] focus:outline-none focus:bg-white border border-transparent focus:border-[#dec1b2] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-[#8a7265] uppercase block mb-1">Email Address</label>
                      <input
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#f6f3f2] text-sm text-[#1b1c1c] focus:outline-none focus:bg-white border border-transparent focus:border-[#dec1b2] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#8a7265] uppercase block mb-1">Occasion</label>
                    <select
                      value={occasion}
                      onChange={(e) => setOccasion(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#f6f3f2] text-sm text-[#1b1c1c] focus:outline-none focus:bg-white border border-transparent focus:border-[#dec1b2] transition-colors"
                    >
                      <option>Anniversary Celebration</option>
                      <option>Romantic Birthday</option>
                      <option>Executive Business Dinner</option>
                      <option>Casual Dining with Friends</option>
                    </select>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-bold text-[#8a7265] uppercase">Special Requests & Allergies</label>
                      <span className="text-[10px] text-[#9a4600] font-semibold">Complimentary rose petals</span>
                    </div>
                    <textarea
                      rows={2}
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#f6f3f2] text-xs text-[#1b1c1c] focus:outline-none focus:bg-white border border-transparent focus:border-[#dec1b2] transition-colors resize-none"
                    />
                  </div>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#9a4600] hover:bg-[#763300] text-white text-sm font-bold shadow-md flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
                >
                  <span className="material-symbols-outlined text-[20px]">check_circle</span>
                  <span>Confirm Table Reservation</span>
                </button>

                {/* Toast Notification */}
                {showReservationToast && (
                  <div className="p-3.5 rounded-xl bg-[#d9e2ff] text-[#021943] flex items-center gap-3 animate-in fade-in duration-300">
                    <span className="material-symbols-outlined text-[24px] text-[#9a4600]">mark_email_read</span>
                    <div className="flex-1 text-xs">
                      <p className="font-bold">Table Reservation Request Confirmed!</p>
                      <p className="text-[#334670]">
                        Confirmed for {guestsCount} guests at {selectedSlot} on {dateOption}. SMS sent to {phone}.
                      </p>
                    </div>
                  </div>
                )}
              </div>

            </form>
          </div>
        )}

        {/* =========================================
            TAB 2: ROOM SERVICE & GOURMET DELIVERY
           ========================================= */}
        {activeTab === 'order' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            
            {/* Visual Header */}
            <div className="relative rounded-2xl overflow-hidden shadow-sm bg-[#1b1c1c]">
              <div
                className="w-full h-36 sm:h-44 bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAnvVSAH_Cg0cILDm_PTiLR6nszTFQfCcK2rKO2_1nwpj2uVmciLFubspJVINjmtIfrtPcvgBnQJP_FvLCpdP2zjSKd2iiirZ4cteNnOQC8kCY2p1oLt2R9T_SONdFCBudK6eK2jSnEuLX5J11dSOpcuq8f-2CPjdrFQTGjWbGDTkkbmQsCOzIXztSYq40TBEY_8czL8N3l1y1z8rmHw6vtdQnLMJyLRJMMcHhnXS7PlbOFHf1fNZcX')`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#1b1c1c]/90 via-[#1b1c1c]/40 to-transparent flex flex-col justify-end p-5 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#ffb68d]">
                    Boutique Kitchen
                  </span>
                  <h2 className="font-serif text-2xl font-semibold text-white">
                    Room Service & Gourmet Delivery
                  </h2>
                </div>
              </div>
            </div>

            {/* Delivery Mode Selector */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#dec1b2]/40 space-y-3">
              <span className="font-serif text-base font-bold text-[#1b1c1c]">Select Delivery Mode</span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'suite', label: 'Room Suite', icon: 'room_service' },
                  { id: 'takeaway', label: 'Takeaway', icon: 'shopping_bag' },
                  { id: 'local', label: 'Express Local', icon: 'electric_moped' },
                ].map((mode) => (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => setDeliveryMode(mode.id as any)}
                    className={`py-3 px-2 rounded-xl text-center text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                      deliveryMode === mode.id
                        ? 'bg-[#9a4600] text-white shadow-sm'
                        : 'bg-[#f6f3f2] text-[#574237] hover:bg-[#eae7e7]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px]">{mode.icon}</span>
                    <span>{mode.label}</span>
                  </button>
                ))}
              </div>

              <div className="p-3 bg-[#f6f3f2] rounded-xl flex items-center justify-between text-xs text-[#574237]">
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#9a4600]">schedule</span>
                  <span>Est. Preparation: 25-35 mins</span>
                </span>
                <span className="font-bold text-[#9a4600]">
                  {deliveryMode === 'suite' ? `${roomSuiteNum} (Auto-detected)` : 'Lobby Pick-up'}
                </span>
              </div>
            </div>

            {/* Order Items Stack */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-lg font-bold text-[#1b1c1c]">Signature Room Curations</h3>
                <span className="text-[11px] font-bold text-[#8a7265] uppercase">Fresh from Clay Ovens</span>
              </div>

              {/* Item 1: Dal */}
              <div className="bg-white p-3.5 rounded-2xl shadow-sm border border-[#dec1b2]/40 flex gap-3.5 items-center">
                <div
                  className="w-20 h-20 rounded-xl bg-cover bg-center shrink-0"
                  style={{
                    backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuB5ZR8ttm-ShhAduZ8ITyTjAq0tEJ9IiLwcrxAZlaaBu0xbV6oyW7zOf2kBRPWnti8ba0GPP9THJmnjOU4HOx7XCdFlVr-uWnDc_wDflzmOToOQpfHeJVFQW7hf_2OFtmiU8Pwp-AKPnsUIW6GUKuY2c5dHsFX-aRwRHRZVlRTei7hjobLNkV580KSNdP_ODUJqc4bzBHJfyAD0Fj-oDccXR512srI9fDc7KX9fSpz9ctUjuWDaVtyG')`,
                  }}
                />
                <div className="flex flex-col justify-between flex-1 min-w-0">
                  <div>
                    <h4 className="font-serif text-sm font-bold text-[#1b1c1c] truncate">
                      Slow-Simmered Dal Bukhara
                    </h4>
                    <p className="text-xs text-[#574237] line-clamp-1 mt-0.5">Black lentils cooked 18 hrs with butter.</p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs font-bold text-[#1b1c1c]">₹590</span>
                    <div className="flex items-center gap-2 bg-[#f6f3f2] rounded-lg p-1">
                      <button
                        onClick={() => updateOrderQty('dal', -1)}
                        className="w-6 h-6 rounded bg-white flex items-center justify-center text-[#1b1c1c] active:scale-90"
                      >
                        -
                      </button>
                      <span className="text-xs font-bold w-4 text-center">{orderItems.dal || 0}</span>
                      <button
                        onClick={() => updateOrderQty('dal', 1)}
                        className="w-6 h-6 rounded bg-[#9a4600] text-white flex items-center justify-center active:scale-90"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Item 2: Biryani */}
              <div className="bg-white p-3.5 rounded-2xl shadow-sm border border-[#dec1b2]/40 flex gap-3.5 items-center">
                <div
                  className="w-20 h-20 rounded-xl bg-cover bg-center shrink-0"
                  style={{
                    backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCDqA_c3AXRjXqhK4ahBo1jWQP4NrTcx_rKvoIALJ0dqjDitazdvsfK0mdBNf3dA5oywwdhmoAf7DaOm2L-FgpnoG8q08Wf8LsNKWuYb_FTLJp0CX3hMGu0FVe2dgeOf1dlbO_4fZwIlwCJT1dQGfu1Nnp1GjWn5oLMOVs9C6naZrBZauZH3MA0chWUANYl1eT-yt21oVMev8a-anniEx6avgE23siMYhrCzsWBj_yK34veOxSA1T90')`,
                  }}
                />
                <div className="flex flex-col justify-between flex-1 min-w-0">
                  <div>
                    <h4 className="font-serif text-sm font-bold text-[#1b1c1c] truncate">
                      Awadhi Mutton Dum Biryani
                    </h4>
                    <p className="text-xs text-[#574237] line-clamp-1 mt-0.5">Sealed clay pot, aged basmati, saffron.</p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs font-bold text-[#1b1c1c]">₹890</span>
                    <div className="flex items-center gap-2 bg-[#f6f3f2] rounded-lg p-1">
                      <button
                        onClick={() => updateOrderQty('biryani', -1)}
                        className="w-6 h-6 rounded bg-white flex items-center justify-center text-[#1b1c1c] active:scale-90"
                      >
                        -
                      </button>
                      <span className="text-xs font-bold w-4 text-center">{orderItems.biryani || 0}</span>
                      <button
                        onClick={() => updateOrderQty('biryani', 1)}
                        className="w-6 h-6 rounded bg-[#9a4600] text-white flex items-center justify-center active:scale-90"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Item 3: Garlic Naan */}
              <div className="bg-white p-3.5 rounded-2xl shadow-sm border border-[#dec1b2]/40 flex gap-3.5 items-center">
                <div
                  className="w-20 h-20 rounded-xl bg-cover bg-center shrink-0"
                  style={{
                    backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBvf2EykBBfjASmLE9cx8_cf3BKQVEFypeSSIjYjNjb5hx-D_Pm3vQpW5rp1pd5DdZeoPbkzQZCLlBtGs8iI0Ut_Y2L516qGS8LsUznw0FotpQFlxxbYW0l7DAWbMu0h9WK3gvbQuWrjjnPLZ0CpibU_q0BENgCHl_f5NJVNS9Nc8b1rz2mognPV_Jk_7LujFMKrD5xTw3gpeJUSLqkWeSWshhCpVIv6HQQTGp3KHHJ1NfJ2xsmApJu')`,
                  }}
                />
                <div className="flex flex-col justify-between flex-1 min-w-0">
                  <div>
                    <h4 className="font-serif text-sm font-bold text-[#1b1c1c] truncate">
                      Tandoori Garlic Butter Naan
                    </h4>
                    <p className="text-xs text-[#574237] line-clamp-1 mt-0.5">Crisp clay oven flatbread with roasted garlic.</p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs font-bold text-[#1b1c1c]">₹180</span>
                    <div className="flex items-center gap-2 bg-[#f6f3f2] rounded-lg p-1">
                      <button
                        onClick={() => updateOrderQty('naan', -1)}
                        className="w-6 h-6 rounded bg-white flex items-center justify-center text-[#1b1c1c] active:scale-90"
                      >
                        -
                      </button>
                      <span className="text-xs font-bold w-4 text-center">{orderItems.naan || 0}</span>
                      <button
                        onClick={() => updateOrderQty('naan', 1)}
                        className="w-6 h-6 rounded bg-[#9a4600] text-white flex items-center justify-center active:scale-90"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Room Delivery Checkout Bar */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-[#dec1b2]/40 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-[#1b1c1c]">Total Delivery Folio</span>
                  <p className="text-[11px] text-[#8a7265]">{totalOrderCount} delicacies selected</p>
                </div>
                <div className="text-right">
                  <span className="font-serif text-xl font-bold text-[#9a4600]">
                    ₹{calculateOrderTotal().toLocaleString('en-IN')}
                  </span>
                  <p className="text-[10px] text-[#8a7265]">Taxes & luxury delivery included</p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleOrderCheckout}
                disabled={totalOrderCount === 0}
                className="w-full py-3.5 rounded-xl bg-[#e87524] hover:bg-[#9a4600] disabled:bg-[#dcd9d9] text-white text-xs sm:text-sm font-bold shadow-md flex items-center justify-center gap-2 active:scale-98 transition-all"
              >
                <span>Proceed to Room Charge ({roomSuiteNum})</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>

              {showOrderToast && (
                <div className="p-3 rounded-xl bg-emerald-900 text-white text-xs flex items-center gap-2 animate-in fade-in">
                  <span className="material-symbols-outlined text-[20px] text-emerald-300">check_circle</span>
                  <span>Order dispatched to Rosewood Kitchen! Charged to Suite #304.</span>
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
