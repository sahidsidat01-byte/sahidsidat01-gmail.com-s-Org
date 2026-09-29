import React, { useState, useEffect } from 'react';
import { PageType } from '../types';
import { INITIAL_BOOKINGS } from '../data/hotelData';
import {
  fetchAllBookings,
  updateBookingStatus,
  createBooking,
  fetchRoomOrders,
} from '../services/supabaseService';
import { isSupabaseConfigured } from '../lib/supabase';

interface AdminPageProps {
  onNavigate: (page: PageType) => void;
  onOpenSupabaseSetup?: () => void;
  currency: string;
}

export const AdminPage: React.FC<AdminPageProps> = ({
  onNavigate,
  onOpenSupabaseSetup,
  currency,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'rooms' | 'kitchen' | 'crm' | 'reports'>('overview');
  const [bookingsList, setBookingsList] = useState(INITIAL_BOOKINGS);
  const [searchGuest, setSearchGuest] = useState('');
  const [isWalkinModalOpen, setIsWalkinModalOpen] = useState(false);
  const [walkinGuestName, setWalkinGuestName] = useState('');
  const [walkinSuite, setWalkinSuite] = useState('Executive Garden Deluxe');
  const [tariffPeakMultiplier, setTariffPeakMultiplier] = useState(1.0);
  const [isLoadingBookings, setIsLoadingBookings] = useState(false);

  // Sync bookings on load
  const refreshBookings = async () => {
    setIsLoadingBookings(true);
    const data = await fetchAllBookings();
    if (data && data.length > 0) {
      setBookingsList(data);
    }
    setIsLoadingBookings(false);
  };

  useEffect(() => {
    refreshBookings();
  }, []);

  const [kitchenOrders, setKitchenOrders] = useState([
    {
      id: 'k-1',
      location: 'Table 04',
      area: 'Garden Courtyard',
      items: '2× Royal Awadhi Dum Biryani, 1× Charred Paneer Tikka',
      note: 'Special: Mild spice level for Table 4',
      status: 'Preparing (12m)',
      statusColor: 'bg-[#FFF3E8] text-[#C85C18]',
    },
    {
      id: 'k-2',
      location: 'Room 204',
      area: 'In-Room Dining',
      items: '1× Black Truffle Risotto, 1× Sula Dindori Reserve Shiraz',
      note: 'Butler: Suresh Kumar assigned',
      status: 'Ready for Delivery',
      statusColor: 'bg-[#E8F5E9] text-[#1E4620]',
    },
  ]);

  const toggleCheckIn = async (id: string) => {
    const current = bookingsList.find((b) => b.id === id);
    if (!current) return;
    const newStatus = current.status === 'Checked-in' ? 'Checked-out' : 'Checked-in';

    // Local optimistic update
    setBookingsList((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
    );

    await updateBookingStatus(id, newStatus);
  };

  const handleAddWalkin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!walkinGuestName.trim()) return;
    const code = `#RG-${Math.floor(10000 + Math.random() * 90000)}`;

    const newBookingData = {
      roomId: 'walkin-suite',
      roomName: walkinSuite,
      roomImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfRN62bINs6cuFTeSYsWASoIVWRh0NIfwi0gmmbQkcZrXK7a4w3OjPm3vxef7W6Q0hHo5ROjYsKfox1h2DawdufpRNmAYgi3NwDsA-a8-WZ2ay7aPYWlkgXzh53sWj7vdluTuSa2P6gA3h2nSKsp_pGPlnMigz7KvK9OXxGnu72o3PXfcwuhjbu1oqxpWzLn2uZv9e95PSdqchzSijKvXE-FO8oUsmRZU7v_q5Bk1ICsBirM5mPfhz',
      checkIn: 'Today',
      checkOut: 'Oct 16',
      nights: 2,
      adults: 2,
      children: 0,
      baseRate: walkinSuite.includes('Presidential') ? 22000 : 9200,
      taxes: walkinSuite.includes('Presidential') ? 7920 : 3312,
      resortFee: 1200,
      promoCode: '',
      discount: 0,
      total: walkinSuite.includes('Presidential') ? 53120 : 22912,
      guestFirstName: walkinGuestName.split(' ')[0] || walkinGuestName,
      guestLastName: walkinGuestName.split(' ').slice(1).join(' ') || 'Guest',
      guestEmail: `${walkinGuestName.toLowerCase().replace(/\s+/g, '.')}@patron.com`,
      guestPhone: '+91 98200 00000',
      arrivalTime: 'Immediate Walk-in',
      specialRequests: ['Express Keycard Assigned'],
      customNotes: 'Registered directly at Reception portico.',
      paymentMethod: 'arrival' as any,
    };

    await createBooking(newBookingData, code);
    await refreshBookings();

    setWalkinGuestName('');
    setIsWalkinModalOpen(false);
  };

  const markOrderDelivered = (orderId: string) => {
    setKitchenOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: 'Completed', statusColor: 'bg-[#f0eded] text-[#574237]' } : o))
    );
  };

  const filteredBookings = bookingsList.filter(
    (b) =>
      b.guestName.toLowerCase().includes(searchGuest.toLowerCase()) ||
      b.id.toLowerCase().includes(searchGuest.toLowerCase()) ||
      b.suite.toLowerCase().includes(searchGuest.toLowerCase())
  );

  return (
    <div className="flex flex-col w-full pb-20">
      
      {/* 1. Executive Management Header Sub-bar */}
      <section className="bg-white px-4 sm:px-6 lg:px-8 py-4 shadow-sm border-b border-[#dec1b2]/30 flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#ffdbcb] flex items-center justify-center text-[#9a4600]">
              <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                spa
              </span>
            </div>
            <div>
              <span className="font-serif text-lg text-[#1b1c1c] block font-semibold leading-tight">
                Rose Garden
              </span>
              <span className="text-[10px] text-[#8a7265] block uppercase tracking-widest">
                Executive Portal
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => alert('No urgent executive alerts. All 32 suites nominal.')}
              className="relative w-9 h-9 rounded-full bg-[#f6f3f2] flex items-center justify-center text-[#574237] active:scale-95"
            >
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#e87524] rounded-full animate-pulse" />
            </button>

            <div className="flex items-center gap-2 pl-2 py-1 pr-3 rounded-full bg-[#f6f3f2]">
              <img
                alt="A. Varma"
                className="w-7 h-7 rounded-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSoL4pXP5Jw8-y8Wa2VUPTB3MQ_VRnaDG1xPt9uYOhcwADx-WcOlMxxVQmCCJjEBqZTc2kJoTKo05GLfglAIjxTmmgo32P0IxmzuaGjDjgswhtMrSC_ohAJ_InGXoWQn_Wsz-_DBvjKRRm4_FwGOnOV8KMDf8IQInfp9njAs2kd-_Am-bu9GPWpz_bX2-UBkdqPG23EPE7KXx_7ttIMZhrt7FZa4FnNx7WdDbgRfXeyeF3fpuDWoLR"
              />
              <div className="text-left">
                <span className="text-xs font-bold text-[#1b1c1c] block leading-none">A. Varma</span>
                <span className="text-[9px] text-[#8a7265] uppercase">General Manager</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search & Active Date Strip */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#8a7265] text-[18px]">
              search
            </span>
            <input
              type="text"
              value={searchGuest}
              onChange={(e) => setSearchGuest(e.target.value)}
              placeholder="Search guests, folio, suite..."
              className="w-full bg-[#f6f3f2] pl-9 pr-3 py-2 rounded-xl text-xs sm:text-sm text-[#1b1c1c] placeholder:text-[#8a7265] focus:outline-none focus:bg-white border border-transparent focus:border-[#dec1b2]"
            />
          </div>
          <div className="flex items-center gap-1 bg-[#f6f3f2] px-3 py-2 rounded-xl flex-shrink-0 text-xs font-semibold text-[#1b1c1c]">
            <span className="material-symbols-outlined text-[16px] text-[#9a4600]">calendar_today</span>
            <span>Today: Oct 14</span>
          </div>
        </div>
      </section>

      {/* 2. Horizontal Module Tabs */}
      <nav className="bg-white border-b border-[#dec1b2]/30 px-4 sm:px-6 lg:px-8 flex gap-2 py-2 overflow-x-auto no-scrollbar">
        {[
          { id: 'overview', label: 'Overview', icon: 'dashboard' },
          { id: 'rooms', label: 'Rooms & Stays', icon: 'hotel' },
          { id: 'kitchen', label: 'Restaurant & Kitchen', icon: 'restaurant' },
          { id: 'crm', label: 'Guest CRM', icon: 'group' },
          { id: 'reports', label: 'Reports', icon: 'receipt_long' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === tab.id
                ? 'bg-[#9a4600] text-white shadow-sm'
                : 'bg-[#f6f3f2] text-[#574237] hover:bg-[#eae7e7]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* 3. Main Dashboard Body */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Operational KPI Metrics (2x2 Grid) */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* KPI 1 */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-xs border border-[#dec1b2]/40 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#8a7265] uppercase">Total Bookings</span>
              <div className="w-8 h-8 rounded-xl bg-[#ffdbcb] text-[#9a4600] flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">bed</span>
              </div>
            </div>
            <div className="mt-3">
              <span className="font-serif text-2xl font-bold text-[#1b1c1c]">38</span>
              <span className="text-xs text-[#8a7265] ml-1">Stays</span>
              <div className="flex items-center gap-1 mt-1 text-xs text-emerald-800 font-semibold">
                <span className="material-symbols-outlined text-[14px]">trending_up</span>
                <span>+12% vs last week</span>
              </div>
            </div>
          </div>

          {/* KPI 2 */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-xs border border-[#dec1b2]/40 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#8a7265] uppercase">Occupancy</span>
              <div className="w-8 h-8 rounded-xl bg-[#d9e2ff] text-[#021943] flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">pie_chart</span>
              </div>
            </div>
            <div className="mt-3">
              <span className="font-serif text-2xl font-bold text-[#1b1c1c]">88%</span>
              <div className="text-xs text-[#8a7265] mt-1">28 / 32 Suites Occupied</div>
            </div>
          </div>

          {/* KPI 3 */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-xs border border-[#dec1b2]/40 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#8a7265] uppercase">F&B Revenue</span>
              <div className="w-8 h-8 rounded-xl bg-[#ffdbcb] text-[#9a4600] flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">restaurant</span>
              </div>
            </div>
            <div className="mt-3">
              <span className="font-serif text-2xl font-bold text-[#1b1c1c]">₹1,48,250</span>
              <div className="text-xs text-[#9a4600] font-semibold mt-1">54 Dining Orders</div>
            </div>
          </div>

          {/* KPI 4 */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-xs border border-[#dec1b2]/40 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#8a7265] uppercase">Waitlist / Holds</span>
              <div className="w-8 h-8 rounded-xl bg-[#eae7e7] text-[#574237] flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">hourglass_top</span>
              </div>
            </div>
            <div className="mt-3">
              <span className="font-serif text-2xl font-bold text-[#1b1c1c]">7</span>
              <span className="text-xs text-[#8a7265] ml-1">Tables</span>
              <div className="text-xs text-[#793100] font-semibold mt-1 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#9a4600] animate-ping" />
                <span>Needs confirmation</span>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Action Launchpad */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-lg font-bold text-[#1b1c1c]">Quick Actions</h2>
            <span className="text-[10px] text-[#8a7265] uppercase font-bold tracking-wider">Flash Controls</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button
              onClick={() => setIsWalkinModalOpen(true)}
              className="p-3.5 bg-[#9a4600] hover:bg-[#763300] text-white rounded-2xl shadow-xs active:scale-95 transition-all text-left flex items-center gap-2.5"
            >
              <span className="material-symbols-outlined text-[22px]">add_circle</span>
              <span className="text-xs font-bold">Walk-in Stay</span>
            </button>
            <button
              onClick={() => onNavigate('table-reservation')}
              className="p-3.5 bg-[#0D234C] hover:bg-[#1b1c1c] text-white rounded-2xl shadow-xs active:scale-95 transition-all text-left flex items-center gap-2.5"
            >
              <span className="material-symbols-outlined text-[22px]">table_restaurant</span>
              <span className="text-xs font-bold">Reserve Table</span>
            </button>
            <button
              onClick={() => {
                const nextMult = tariffPeakMultiplier === 1.0 ? 1.15 : 1.0;
                setTariffPeakMultiplier(nextMult);
                alert(`Seasonal Tariff Multiplier set to ${nextMult === 1.15 ? '+15% Peak' : 'Standard 1.0x'}`);
              }}
              className="p-3.5 bg-white hover:bg-[#f6f3f2] text-[#1b1c1c] border border-[#dec1b2]/40 rounded-2xl shadow-xs active:scale-95 transition-all text-left flex items-center gap-2.5"
            >
              <span className="material-symbols-outlined text-[22px] text-[#9a4600]">price_change</span>
              <div>
                <span className="text-xs font-bold block">Tariffs: {tariffPeakMultiplier === 1.15 ? '+15%' : 'Standard'}</span>
              </div>
            </button>
            <button
              onClick={() => onOpenSupabaseSetup && onOpenSupabaseSetup()}
              className="p-3.5 bg-white hover:bg-[#f6f3f2] text-[#1b1c1c] border border-[#dec1b2]/40 rounded-2xl shadow-xs active:scale-95 transition-all text-left flex items-center gap-2.5"
            >
              <span className="material-symbols-outlined text-[22px] text-emerald-700">database</span>
              <div className="min-w-0">
                <span className="text-xs font-bold block truncate">Supabase DB</span>
                <span className="text-[10px] text-[#8a7265] block truncate">
                  {isSupabaseConfigured() ? 'Live Connected' : 'Local Fallback'}
                </span>
              </div>
            </button>
          </div>
        </section>

        {/* Visual Analytics: Revenue Spark & Yield */}
        <section className="bg-white p-5 sm:p-6 rounded-3xl shadow-sm border border-[#dec1b2]/40 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif text-lg font-bold text-[#1b1c1c]">Weekly Revenue Yield</h2>
              <span className="text-xs text-[#8a7265]">Oct 08 – Oct 14 • Total ₹14,82,400</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#f6f3f2] px-3 py-1 rounded-full text-xs font-semibold text-[#1b1c1c]">
              <span className="w-2 h-2 rounded-full bg-[#9a4600]" />
              <span>Rooms 74%</span>
            </div>
          </div>

          {/* SVG Line Chart */}
          <div className="w-full pt-2">
            <svg className="w-full h-24 overflow-visible" fill="none" viewBox="0 0 320 80">
              <defs>
                <linearGradient id="adminChartGrad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#e87524" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#e87524" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <line stroke="#f0eded" strokeDasharray="3 3" x1="0" x2="320" y1="20" y2="20" />
              <line stroke="#f0eded" strokeDasharray="3 3" x1="0" x2="320" y1="50" y2="50" />
              <path
                d="M 0 65 L 45 52 L 95 58 L 150 36 L 205 40 L 260 22 L 320 12 L 320 80 L 0 80 Z"
                fill="url(#adminChartGrad)"
              />
              <path
                d="M 0 65 L 45 52 L 95 58 L 150 36 L 205 40 L 260 22 L 320 12"
                stroke="#9a4600"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="320" cy="12" r="4.5" fill="#ffffff" stroke="#9a4600" strokeWidth="2.5" />
            </svg>
            <div className="flex justify-between items-center text-[10px] text-[#8a7265] font-semibold mt-1 px-1">
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
              <span className="text-[#9a4600] font-bold">Mon (Peak)</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 p-3 bg-[#f6f3f2] rounded-xl text-center">
            <div>
              <span className="text-[10px] font-bold text-[#8a7265] uppercase block">Suite Tariffs</span>
              <span className="font-serif text-sm sm:text-base font-bold text-[#1b1c1c]">₹10.9L</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#8a7265] uppercase block">Bespoke Dining</span>
              <span className="font-serif text-sm sm:text-base font-bold text-[#1b1c1c]">₹3.1L</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#8a7265] uppercase block">Spa & Tours</span>
              <span className="font-serif text-sm sm:text-base font-bold text-[#1b1c1c]">₹82K</span>
            </div>
          </div>
        </section>

        {/* Live Kitchen & Dining Stream */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#9a4600] animate-pulse" />
              <h2 className="font-serif text-lg font-bold text-[#1b1c1c]">Kitchen & Dining Queue</h2>
            </div>
            <span className="text-xs font-bold text-[#9a4600]">Active Orders ({kitchenOrders.length})</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {kitchenOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white p-4 rounded-2xl shadow-xs border border-[#dec1b2]/40 flex flex-col justify-between gap-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-lg bg-[#ffdbcb] text-[#341100] text-xs font-bold">
                      {order.location}
                    </span>
                    <span className="text-xs text-[#8a7265]">{order.area}</span>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${order.statusColor}`}>
                    {order.status}
                  </span>
                </div>

                <div className="text-xs text-[#1b1c1c] font-medium leading-relaxed">
                  {order.items}
                  <span className="text-[11px] text-[#8a7265] block mt-0.5">{order.note}</span>
                </div>

                {order.status !== 'Completed' && (
                  <button
                    onClick={() => markOrderDelivered(order.id)}
                    className="self-end px-3 py-1 rounded-lg bg-[#f6f3f2] hover:bg-[#e87524] hover:text-white text-xs font-semibold active:scale-95 transition-all"
                  >
                    Mark Dispatched
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Recent Suite Bookings Section */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif text-lg font-bold text-[#1b1c1c]">Recent Stays & Bookings</h2>
              <span className="text-xs text-[#8a7265]">Live guest folio manager</span>
            </div>
          </div>

          <div className="space-y-3">
            {filteredBookings.map((b) => (
              <div
                key={b.id}
                className="bg-white p-4 sm:p-5 rounded-2xl shadow-xs border border-[#dec1b2]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#ffdbcb] text-[#763300] font-serif text-sm font-bold flex items-center justify-center">
                    {b.initials}
                  </div>
                  <div>
                    <h3 className="font-serif text-sm sm:text-base font-semibold text-[#1b1c1c]">
                      {b.guestName}
                    </h3>
                    <span className="text-xs text-[#8a7265]">
                      #{b.id} • {b.suite}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 border-t sm:border-t-0 pt-2 sm:pt-0">
                  <div className="text-left sm:text-right">
                    <span className="text-xs text-[#8a7265] block">{b.dates}</span>
                    <span className="font-serif text-sm font-bold text-[#9a4600]">
                      ₹{b.amount.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <button
                    onClick={() => toggleCheckIn(b.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                      b.status === 'Checked-in'
                        ? 'bg-[#d9e2ff] text-[#021943]'
                        : b.status === 'Confirmed'
                        ? 'bg-[#E8F5E9] text-[#1E4620]'
                        : 'bg-[#f0eded] text-[#574237]'
                    }`}
                  >
                    {b.status}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Manager On-Duty Notes */}
        <section className="bg-[#f6f3f2] p-4 sm:p-5 rounded-2xl border border-[#dec1b2]/40 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white text-[#9a4600] flex items-center justify-center shrink-0 shadow-xs">
            <span className="material-symbols-outlined text-[20px]">assignment_turned_in</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-[#8a7265] tracking-wider block">
              Staff Handover • Shift A
            </span>
            <p className="text-xs text-[#1b1c1c] leading-relaxed">
              VIP arrival scheduled at 16:30 for Presidential Suite 401. Damask rose welcome basket and bespoke chilled champagne verified by Butler team.
            </p>
          </div>
        </section>

      </div>

      {/* Walk-in Stay Modal */}
      {isWalkinModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#1b1c1c]">Register Walk-in Guest</h3>
            <form onSubmit={handleAddWalkin} className="space-y-3 text-xs">
              <div>
                <label className="text-[10px] uppercase font-bold text-[#8a7265] block mb-1">Guest Name</label>
                <input
                  required
                  type="text"
                  value={walkinGuestName}
                  onChange={(e) => setWalkinGuestName(e.target.value)}
                  placeholder="e.g. Rohini Sharma"
                  className="w-full px-3 py-2 rounded-xl bg-[#f6f3f2] text-sm focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold text-[#8a7265] block mb-1">Available Suite</label>
                <select
                  value={walkinSuite}
                  onChange={(e) => setWalkinSuite(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#f6f3f2] text-xs font-semibold focus:outline-none"
                >
                  <option>Executive Garden Deluxe (₹9,200/n)</option>
                  <option>Heritage Royal Club (₹12,500/n)</option>
                  <option>The Presidential Rose Suite (₹22,000/n)</option>
                  <option>Superior Comfort Room (₹6,400/n)</option>
                </select>
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsWalkinModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl bg-[#f6f3f2] font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#9a4600] text-white font-bold"
                >
                  Confirm Check-in
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
