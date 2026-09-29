import React, { useState } from 'react';
import { PageType } from '../types';
import { createInquiry } from '../services/supabaseService';

interface ContactPageProps {
  onNavigate: (page: PageType) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [inquiryType, setInquiryType] = useState('Room Reservation');
  const [fullName, setFullName] = useState('Lady Anya Croft');
  const [email, setEmail] = useState('anya.croft@luxury.com');
  const [phone, setPhone] = useState('+91 98290 12345');
  const [subject, setSubject] = useState('Anniversary stay & candlelight dinner setup');
  const [message, setMessage] = useState(
    'Please outline arrival times, food allergies, or celebration preferences...'
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedFeedback, setSubmittedFeedback] = useState<string | null>(null);

  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleSubmitInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await createInquiry({
      inquiryType,
      fullName,
      email,
      phone,
      subject,
      message,
    });

    setIsSubmitting(false);
    setSubmittedFeedback(
      `Thank you, ${fullName}. Your request regarding "${inquiryType}" has been registered in our concierge registry and our team will follow up within two hours.`
    );
    setTimeout(() => setSubmittedFeedback(null), 6000);
  };

  return (
    <div className="flex flex-col w-full pb-20">
      
      {/* 1. Header Introduction */}
      <section className="max-w-4xl mx-auto w-full px-4 sm:px-6 pt-6 pb-4">
        <div className="flex items-center gap-2 text-[#9a4600] mb-1">
          <span className="material-symbols-outlined text-[18px]">support_agent</span>
          <span className="text-[11px] uppercase tracking-wider font-bold">At Your Service</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-[#1b1c1c] tracking-tight">
          Get in Touch
        </h1>
        <p className="text-xs sm:text-sm text-[#574237] mt-1 max-w-xl">
          Our dedicated guest relations team and concierge are available 24/7 to assist your reservations and custom itineraries.
        </p>
      </section>

      {/* 2. Direct Hub & Contact Bento */}
      <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 space-y-4">
        
        {/* WhatsApp Direct Action Banner */}
        <a
          href="https://wa.me/919876543210?text=Namaste%2C%20I%20would%20like%20to%20inquire%20about%20a%20stay%20at%20Rose%20Garden."
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#9a4600] hover:bg-[#763300] text-white rounded-2xl p-4 sm:p-5 shadow-md flex items-center justify-between active:scale-[0.99] transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-[24px]">chat</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-white/80 block">Instant Assistance</span>
              <span className="font-serif text-base sm:text-lg font-bold">WhatsApp Concierge</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs font-bold bg-white/20 px-3 py-1.5 rounded-full">
            <span>Chat</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </div>
        </a>

        {/* Quick Contact Bento Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Call Reservations */}
          <a
            href="tel:+911412894500"
            className="bg-white p-4 sm:p-5 rounded-2xl shadow-xs border border-[#dec1b2]/40 flex flex-col justify-between hover:border-[#9a4600] transition-colors"
          >
            <div className="w-9 h-9 rounded-full bg-[#ffdbcb] text-[#341100] flex items-center justify-center mb-3">
              <span className="material-symbols-outlined text-[20px]">phone_in_talk</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#8a7265] uppercase block">Reservations</span>
              <span className="font-serif text-base font-bold text-[#1b1c1c] block mt-0.5">
                +91 141 289 4500
              </span>
              <span className="text-xs text-[#9a4600] font-semibold flex items-center gap-1 mt-1">
                <span>Call direct</span>
                <span className="material-symbols-outlined text-[14px]">north_east</span>
              </span>
            </div>
          </a>

          {/* Call Concierge Desk */}
          <a
            href="tel:+919876543210"
            className="bg-white p-4 sm:p-5 rounded-2xl shadow-xs border border-[#dec1b2]/40 flex flex-col justify-between hover:border-[#0D234C] transition-colors"
          >
            <div className="w-9 h-9 rounded-full bg-[#d9e2ff] text-[#021943] flex items-center justify-center mb-3">
              <span className="material-symbols-outlined text-[20px]">concierge</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#8a7265] uppercase block">24h Concierge Desk</span>
              <span className="font-serif text-base font-bold text-[#1b1c1c] block mt-0.5">
                +91 98765 43210
              </span>
              <span className="text-xs text-[#4b5e8a] font-semibold flex items-center gap-1 mt-1">
                <span>Always on duty</span>
                <span className="material-symbols-outlined text-[14px]">north_east</span>
              </span>
            </div>
          </a>
        </div>

        {/* Email Routing Card */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-xs border border-[#dec1b2]/40 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#9a4600] text-[20px]">mail</span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#1b1c1c]">Email Inquiries</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 border-t border-[#f0eded]">
            <a href="mailto:reservations@rosegardenhotel.com" className="group">
              <span className="text-[11px] text-[#8a7265] block">Room Stays & Suites</span>
              <span className="text-xs sm:text-sm font-semibold text-[#9a4600] group-hover:underline">
                reservations@rosegardenhotel.com
              </span>
            </a>
            <a href="mailto:dining@rosegardenhotel.com" className="group">
              <span className="text-[11px] text-[#8a7265] block">Fine Dining & Banquets</span>
              <span className="text-xs sm:text-sm font-semibold text-[#9a4600] group-hover:underline">
                dining@rosegardenhotel.com
              </span>
            </a>
          </div>
        </div>

        {/* Postal Address Card */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-xs border border-[#dec1b2]/40 flex items-start gap-3">
          <div className="w-9 h-9 rounded-full bg-[#f6f3f2] text-[#9a4600] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[20px]">location_on</span>
          </div>
          <div>
            <span className="text-[10px] font-bold text-[#8a7265] uppercase block">The Estate Address</span>
            <p className="text-xs sm:text-sm font-medium text-[#1b1c1c] mt-0.5 leading-relaxed">
              14 Heritage Boulevard, Civil Lines, Jaipur, Rajasthan 302006, India
            </p>
          </div>
        </div>

        {/* Map & Transit Distances */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-xs border border-[#dec1b2]/40">
          <div
            className="w-full h-44 sm:h-52 bg-cover bg-center relative"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCR22hKHngKGeR7lKlLyaalsuEN2nUzvqRvCJzhDfp0s1dVzpcknO1aNv4XhJXRKzTNWqbYkd8tzUaDojYPRALJcURv3mlXzAw-gkkAQhxI3sXYQgsx8zDcA4qruLjWWoOexWIVy57jcwUgUV7s7fGExriQp90wLsdOrcA_u1Ka7Yfux0pCevbPDFd2z8gNrdBDBDYKendRrgiWLvgD6egcdOFoagmz3gY2cQOfrIlBZNhv3iKyK3Ps')`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
              <span className="text-xs text-white bg-black/50 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#ffb68d]">pin_drop</span>
                <span>Civil Lines Heritage Enclave • Jaipur</span>
              </span>
            </div>
          </div>

          <div className="p-4 sm:p-5 flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3 bg-[#f6f3f2] p-3 rounded-xl">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[#4b5e8a] text-[22px]">flight</span>
                <div>
                  <span className="text-[10px] text-[#8a7265] uppercase block">Jaipur Airport</span>
                  <span className="text-xs font-bold text-[#1b1c1c]">11.4 km (25 min)</span>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[#4b5e8a] text-[22px]">train</span>
                <div>
                  <span className="text-[10px] text-[#8a7265] uppercase block">Railway Station</span>
                  <span className="text-xs font-bold text-[#1b1c1c]">3.2 km (8 min)</span>
                </div>
              </div>
            </div>

            <a
              href="https://maps.google.com/?q=Civil+Lines+Jaipur+Rajasthan"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 bg-[#f0eded] hover:bg-[#e4e2e1] text-[#1b1c1c] text-xs font-bold rounded-xl flex items-center justify-center gap-2 active:scale-98 transition-all"
            >
              <span className="material-symbols-outlined text-[18px] text-[#9a4600]">directions</span>
              <span>Open Google Maps Directions</span>
            </a>
          </div>
        </div>

        {/* 3. Interactive Experience Curation Form */}
        <div className="bg-white p-5 sm:p-7 rounded-3xl shadow-sm border border-[#dec1b2]/40">
          <div className="flex items-center gap-2 mb-1">
            <span className="material-symbols-outlined text-[#9a4600] text-[22px]">edit_note</span>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1b1c1c]">
              Curate Your Experience
            </h2>
          </div>
          <p className="text-xs text-[#574237] mb-5">
            Share your dates, dietary preferences, or private celebration requests with our team.
          </p>

          <form onSubmit={handleSubmitInquiry} className="space-y-4">
            {/* Inquiry Type */}
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#8a7265] block mb-2">
                Inquiry Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                {['Room Reservation', 'Dining & Banquets', 'Weddings & Events', 'General Inquiry'].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setInquiryType(t)}
                    className={`py-2 px-2.5 text-center rounded-xl text-xs font-bold transition-all ${
                      inquiryType === t
                        ? 'bg-[#e87524] text-white shadow-xs'
                        : 'bg-[#f6f3f2] text-[#574237] hover:bg-[#eae7e7]'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#8a7265] block mb-1">
                Full Name
              </label>
              <input
                required
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-[#f6f3f2] text-sm text-[#1b1c1c] px-3.5 py-2.5 rounded-xl focus:outline-none focus:bg-white border border-transparent focus:border-[#dec1b2] transition-colors"
              />
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#8a7265] block mb-1">
                  Email Address
                </label>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#f6f3f2] text-sm text-[#1b1c1c] px-3.5 py-2.5 rounded-xl focus:outline-none focus:bg-white border border-transparent focus:border-[#dec1b2] transition-colors"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#8a7265] block mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#f6f3f2] text-sm text-[#1b1c1c] px-3.5 py-2.5 rounded-xl focus:outline-none focus:bg-white border border-transparent focus:border-[#dec1b2] transition-colors"
                />
              </div>
            </div>

            {/* Subject */}
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#8a7265] block mb-1">
                Subject
              </label>
              <input
                required
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-[#f6f3f2] text-sm text-[#1b1c1c] px-3.5 py-2.5 rounded-xl focus:outline-none focus:bg-white border border-transparent focus:border-[#dec1b2] transition-colors"
              />
            </div>

            {/* Message */}
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#8a7265] block mb-1">
                Special Requests & Message
              </label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-[#f6f3f2] text-xs text-[#1b1c1c] p-3.5 rounded-xl focus:outline-none focus:bg-white border border-transparent focus:border-[#dec1b2] transition-colors resize-none"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-[#9a4600] hover:bg-[#763300] text-white text-xs sm:text-sm font-bold rounded-xl shadow-md active:scale-[0.99] transition-all flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className="material-symbols-outlined text-[18px] animate-spin">refresh</span>
                  <span>Transmitting Inquiry...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">send</span>
                  <span>Send Inquiry to Concierge Desk</span>
                </>
              )}
            </button>

            {submittedFeedback && (
              <div className="p-3.5 rounded-xl bg-emerald-900 text-white text-xs leading-relaxed animate-in fade-in">
                {submittedFeedback}
              </div>
            )}
          </form>
        </div>

        {/* 4. Arrival Guidelines & Timings */}
        <div className="bg-[#f6f3f2] p-5 rounded-3xl border border-[#dec1b2]/40 space-y-3">
          <div className="flex items-center gap-2 text-[#9a4600]">
            <span className="material-symbols-outlined text-[20px]">schedule</span>
            <h3 className="font-serif text-base font-bold text-[#1b1c1c]">Arrival & Timings</h3>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-3 bg-white rounded-xl">
              <span className="text-[#574237]">Guest Check-in</span>
              <span className="font-bold text-[#1b1c1c]">2:00 PM onwards</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white rounded-xl">
              <span className="text-[#574237]">Guest Check-out</span>
              <span className="font-bold text-[#1b1c1c]">12:00 PM (Noon)</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white rounded-xl">
              <span className="text-[#574237]">The Saffron Court Dining</span>
              <span className="font-bold text-[#1b1c1c]">7:00 AM – 11:30 PM</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white rounded-xl text-[#9a4600]">
              <span className="font-bold">Concierge & Front Desk</span>
              <span className="font-bold">24 Hours / 7 Days</span>
            </div>
          </div>
        </div>

        {/* 5. FAQ Accordion Section */}
        <div className="space-y-3 pt-3">
          <div className="flex items-center gap-2 text-[#9a4600]">
            <span className="material-symbols-outlined text-[18px]">help_outline</span>
            <span className="text-xs font-bold uppercase tracking-wider">Guest Inquiries</span>
          </div>
          <h3 className="font-serif text-2xl font-bold text-[#1b1c1c]">
            Frequently Asked Questions
          </h3>

          <div className="space-y-2">
            {[
              {
                q: 'What is your cancellation and booking policy?',
                a: 'Cancellations received 48 hours prior to scheduled arrival incur no charge. For cancellations within 48 hours, or no-shows, a one-night room charge applies. Festival and high-peak periods may have extended notice terms.',
              },
              {
                q: 'Do you provide airport and railway transfers?',
                a: 'Yes, our private fleet of luxury sedans and vintage carriages can be reserved via the concierge at least 12 hours prior to arrival. Chilled rosewater towels and mineral water are complimentary on every transfer.',
              },
              {
                q: 'What is the pet policy at Rose Garden?',
                a: 'We warmly welcome well-behaved canine companions up to 15 kg in dedicated Garden Pavilion suites. Tailored bedding, artisanal treats, and bespoke lawn walking sessions are arranged upon prior notice.',
              },
              {
                q: 'Is there a dress code for the dining rooms?',
                a: 'The Rosewood Bistro invites smart casual attire during evening service. We respectfully request that swimwear and athletic jerseys be restricted to the courtyard pool and wellness deck areas.',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl overflow-hidden border border-[#dec1b2]/40 shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-[#1b1c1c] hover:bg-[#f6f3f2] transition-colors"
                >
                  <span>{item.q}</span>
                  <span
                    className={`material-symbols-outlined text-[#8a7265] transition-transform duration-200 shrink-0 ${
                      openFaq === idx ? 'rotate-180' : ''
                    }`}
                  >
                    expand_more
                  </span>
                </button>
                {openFaq === idx && (
                  <div className="px-4 pb-4 text-xs text-[#574237] leading-relaxed border-t border-[#f0eded] pt-2">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
