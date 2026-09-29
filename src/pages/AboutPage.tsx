import React, { useState } from 'react';
import { PageType } from '../types';
import { HISTORICAL_QUOTES } from '../data/hotelData';

interface AboutPageProps {
  onNavigate: (page: PageType) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const [artisanFilter, setArtisanFilter] = useState<'all' | 'patron' | 'culinary' | 'concierge'>('all');
  const [quoteIndex, setQuoteIndex] = useState(0);

  const cycleQuote = () => {
    setQuoteIndex((prev) => (prev + 1) % HISTORICAL_QUOTES.length);
  };

  const currentQuote = HISTORICAL_QUOTES[quoteIndex];

  return (
    <div className="flex flex-col w-full pb-20">
      
      {/* 1. Storytelling Hero Banner */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <div className="relative w-full overflow-hidden rounded-3xl bg-[#1b1c1c] shadow-lg">
          <div
            className="w-full h-80 sm:h-96 bg-cover bg-center flex flex-col justify-between p-6 sm:p-10 relative text-white"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCJd4liQdxqGJJ2sPAkuddCqdahY_A-Jw1LJseDFIG_ZIgYI8EiJOEdGCsaIgF2JWz_rAYDqmoTRtGmdqGdBm3reuuc930uzYYd6RynGVbEWFI-IyP2v1_wsUyI9Ol92RQO8stmF8zVXHUHTklg0rLQaMWjeIdhSdw6YzNrvsnFEvSsGcJrXxGKVuNESCsadmjL2Qs385jtKEDN4vUPXZ2FhnJ0q9fh1UsfTwRf7BzQpxtDgRx1NJOS')`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#1b1c1c]/95 via-[#1b1c1c]/40 to-transparent" />

            <div className="relative z-10 flex justify-between items-center w-full">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white text-xs font-semibold uppercase tracking-wider">
                <span className="material-symbols-outlined text-[16px] text-[#ffb68d]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  spa
                </span>
                <span>Est. 1928 • Heritage Estate</span>
              </div>
              <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-[18px]">verified</span>
              </div>
            </div>

            <div className="relative z-10 max-w-xl">
              <span className="text-[10px] uppercase font-bold text-[#ffb68d] tracking-widest block mb-1">
                Rose Garden Hotel & Suites
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl font-semibold leading-tight text-white mb-2">
                A Century of Gracious Hospitality
              </h1>
              <p className="text-xs sm:text-sm text-white/80 line-clamp-2">
                Where regal legacy meets sunlit botanical serenity in the historic heart of the valley.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. The Sanctuary Origin Narrative */}
      <section className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-6 space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#9a4600]" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#9a4600]">
            The Sanctuary Origin
          </span>
        </div>

        <div className="bg-[#f6f3f2] rounded-3xl p-6 sm:p-8 border border-[#dec1b2]/40 shadow-sm space-y-4">
          <h2 className="font-serif text-2xl sm:text-3xl text-[#1b1c1c] font-semibold">
            An Ancestral Dream Revived in Living Bloom
          </h2>
          <p className="text-xs sm:text-sm text-[#574237] leading-relaxed">
            Nearly a century ago, the noble estate was christened as a secluded retreat for visiting diplomats, poets, and royal botanists. Hand-carved sandstone verandas overlooked cascading terraces of heirloom Damask and Kashmiri roses.
          </p>

          <div className="relative rounded-2xl overflow-hidden h-52 sm:h-64 w-full shadow-inner">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBE3DU7glchHJ0Kr6cPMr2EvPfLW-iHnWREROSZnB-q4RFIX3Xi8KTM-t8depLcNhQgdoWxm--muGeNkAHI86dySNirrYmn2SeCz4Kq75Zx6Rgkwws4_b6nhqO78eS8kBDvvPhtEbkLpGTp_U2joyAMY1pTlAzUV1hgm9VtcUA3HMKAdYIEaYf1I5J0xwwUv2gsp-usU2NGU-9gNwZ2Mf_NIMCAMay7v2ywRo7Kk1G2FwC7yG1WHzxt"
              alt="Archival Wing"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-3 left-3 bg-[#1b1c1c]/80 backdrop-blur-md px-3 py-1 rounded-full text-white text-[11px] font-semibold">
              Archival Wing • Restored 2018
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[#574237] leading-relaxed">
            Today, after an eight-year conservation journey guided by national craftsmen and botanical preservationists, Rose Garden stands reborn: an intimate 32-suite haven where discerning wanderers discover restorative quietude, discreet bespoke butler care, and authentic culinary journeys steeped in regional pride.
          </p>

          {/* Signature Quote */}
          <div className="bg-white rounded-2xl p-5 border border-[#dec1b2]/40 shadow-xs flex items-start gap-3 mt-2">
            <span className="material-symbols-outlined text-[#9a4600] text-[32px] shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>
              format_quote
            </span>
            <div>
              <p className="font-serif text-sm sm:text-base italic text-[#1b1c1c]">
                “We do not merely host guests; we steward memories within a living botanical sanctuary.”
              </p>
              <span className="text-[11px] text-[#8a7265] block mt-1">
                — Royal Patron Council, 1928 Foundation
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Pillars */}
      <section className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-6 space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#9a4600]" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#9a4600]">
            Our Core Pillars
          </span>
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl text-[#1b1c1c]">
          Devotion to Gracious Living
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-[#dec1b2]/40 shadow-xs flex gap-4 items-start">
            <div className="w-12 h-12 rounded-xl bg-[#ffdbcb] text-[#341100] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[24px]">castle</span>
            </div>
            <div>
              <h4 className="font-serif text-base font-bold text-[#1b1c1c]">1. Heritage Preservation</h4>
              <p className="text-xs text-[#574237] mt-1 leading-relaxed">
                Honoring imperial masonry, restored lime plaster frescoes, and bespoke brass artisanry by regional guild masters.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-[#dec1b2]/40 shadow-xs flex gap-4 items-start">
            <div className="w-12 h-12 rounded-xl bg-[#ffdbcb] text-[#341100] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[24px]">local_florist</span>
            </div>
            <div>
              <h4 className="font-serif text-base font-bold text-[#1b1c1c]">2. Botanical Tranquility</h4>
              <p className="text-xs text-[#574237] mt-1 leading-relaxed">
                Over 50 rare varietals of fragrant heritage roses fragrance every morning courtyard stroll and tranquil water fountain.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-[#dec1b2]/40 shadow-xs flex gap-4 items-start">
            <div className="w-12 h-12 rounded-xl bg-[#ffdbcb] text-[#341100] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[24px]">skillet</span>
            </div>
            <div>
              <h4 className="font-serif text-base font-bold text-[#1b1c1c]">3. Thoughtful Gastronomy</h4>
              <p className="text-xs text-[#574237] mt-1 leading-relaxed">
                Farm-to-fork culinary reverence. Ancient palace recipes prepared with organic micro-greens harvested daily from our private kitchen patches.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-[#dec1b2]/40 shadow-xs flex gap-4 items-start">
            <div className="w-12 h-12 rounded-xl bg-[#ffdbcb] text-[#341100] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[24px]">room_service</span>
            </div>
            <div>
              <h4 className="font-serif text-base font-bold text-[#1b1c1c]">4. Personalized Warmth</h4>
              <p className="text-xs text-[#574237] mt-1 leading-relaxed">
                Intuitive bespoke care, custom scent selections for your bed linens, and a silent dedication to each patron's quietest desire.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Estate Features Bento Grid */}
      <section className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#9a4600] block">
              The Property
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#1b1c1c]">Estate Features</h3>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#ffdbcb] text-[#341100]">
            12 Acres Sanctuary
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-[#f6f3f2] p-4 rounded-2xl border border-[#dec1b2]/30 flex flex-col justify-between h-28">
            <span className="text-[10px] font-bold text-[#8a7265] uppercase">Exclusive</span>
            <div>
              <span className="font-serif text-2xl font-bold text-[#1b1c1c] block">32</span>
              <span className="text-xs text-[#574237]">Bespoke Suites</span>
            </div>
          </div>

          <div className="bg-[#f6f3f2] p-4 rounded-2xl border border-[#dec1b2]/30 flex flex-col justify-between h-28">
            <span className="text-[10px] font-bold text-[#8a7265] uppercase">Fine Dining</span>
            <div>
              <span className="font-serif text-2xl font-bold text-[#1b1c1c] block">2</span>
              <span className="text-xs text-[#574237]">Curated Salons</span>
            </div>
          </div>

          <div className="bg-[#f6f3f2] p-4 rounded-2xl border border-[#dec1b2]/30 flex flex-col justify-between h-28">
            <span className="text-[10px] font-bold text-[#8a7265] uppercase">Holistic Spa</span>
            <div>
              <span className="font-serif text-2xl font-bold text-[#1b1c1c] block">1</span>
              <span className="text-xs text-[#574237]">Ayurvedic Sanctuary</span>
            </div>
          </div>

          <div className="bg-[#f6f3f2] p-4 rounded-2xl border border-[#dec1b2]/30 flex flex-col justify-between h-28">
            <span className="text-[10px] font-bold text-[#8a7265] uppercase">Heated Waters</span>
            <div>
              <span className="font-serif text-2xl font-bold text-[#1b1c1c] block">Emerald</span>
              <span className="text-xs text-[#574237]">Courtyard Pool</span>
            </div>
          </div>
        </div>

        {/* Organic Rose Herb Garden */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#dec1b2]/40 shadow-xs flex items-center gap-4">
          <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-[#f0eded]">
            <img
              alt="Rose Nursery"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9b3_kBDex885dZFjLm6D_cv2Ozwa4REriuWENruek9WCDBCmZX4reN54ibFFr8hIz-NMhR21nkD4ZAzkfegAFH9nFp2YZ8VXc7xqDtF1NKq5bwARD0E9srp1bfQLFNX_rw45PJdtSuU5p6JtE-XufPKgdtDPkMDHxBwPgAbhWNlvSBHLgRfOUcmN7VMaHOuQ2nlW3jDLe9k1f2BCeg6COYOy-HYuy26JfNotauOPYolVGPyH75-5z"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-serif text-base font-bold text-[#1b1c1c]">
                Organic Rose & Herb Garden
              </span>
              <span className="w-2 h-2 rounded-full bg-[#9a4600]" />
            </div>
            <p className="text-xs text-[#574237] mt-0.5 leading-relaxed">
              Daily botanical tea-tasting sessions and wild rose oil distilling demonstrations for resident guests.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Leadership & Custodians of Hospitality */}
      <section className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-6 space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#9a4600]" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#9a4600]">
            Custodians of Hospitality
          </span>
        </div>
        <h3 className="font-serif text-2xl font-bold text-[#1b1c1c]">Leadership & Artisans</h3>

        {/* Tab Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {[
            { id: 'all', label: 'All Stewards' },
            { id: 'patron', label: 'Patron Council' },
            { id: 'culinary', label: 'Gastronomy' },
            { id: 'concierge', label: 'Concierge' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setArtisanFilter(tab.id as any)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                artisanFilter === tab.id
                  ? 'bg-[#9a4600] text-white shadow-sm'
                  : 'bg-[#f6f3f2] text-[#574237] hover:bg-[#eae7e7]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {/* Card 1: Founder */}
          {(artisanFilter === 'all' || artisanFilter === 'patron') && (
            <div className="bg-[#f6f3f2] rounded-2xl p-5 border border-[#dec1b2]/40 shadow-xs space-y-3 animate-in fade-in">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 ring-2 ring-[#e87524]/20 bg-[#eae7e7]">
                  <img
                    alt="Maharaj Vikramaditya Rao"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlMzOj9CjIz3K5p7yIW7ylIzkYycadZX9PuVO3Ig-CfqQPmzBTeztHLMYOSvkEzdoNssCqBIbIKjcbsrVD4pEZFFjKRVNIpCscWi6SvaYa7EEAf83L3mP3rQY7du6DkbdNAYcigexwZvHd3jk4npZ3IAYOKU30k_-Yz0nnRDCFWdq5oXdNBB9lh0hkl9iUiMVTNCTNOagEziMbHj25XGHOJ7_kS7KisS4kGXl9cJWXVW2bjnzUnlQC"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#9a4600] uppercase tracking-wider block">
                    Founder & Chief Patron
                  </span>
                  <h4 className="font-serif text-lg font-bold text-[#1b1c1c]">
                    Maharaj Vikramaditya Rao
                  </h4>
                  <span className="text-xs text-[#8a7265]">Third-Generation Custodian</span>
                </div>
              </div>
              <p className="text-xs text-[#574237] italic bg-white p-3 rounded-xl border border-[#dec1b2]/30">
                “Our home was built on the eternal Indian tenet of Atithi Devo Bhava—the guest is an avatar of the divine. We welcome you to find peace in our rose arbors.”
              </p>
            </div>
          )}

          {/* Card 2: Executive Chef */}
          {(artisanFilter === 'all' || artisanFilter === 'culinary') && (
            <div className="bg-[#f6f3f2] rounded-2xl p-5 border border-[#dec1b2]/40 shadow-xs space-y-3 animate-in fade-in">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 ring-2 ring-[#e87524]/20 bg-[#eae7e7]">
                  <img
                    alt="Chef Ananya Sen"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcL8rGui-twqsjm8RGaH4QOSsYZYZ1JezZePjEIcu497SVb1JddjgkgMyRjIXGiinhXkGjZ9qVZ-hcZdP8RBFb-aIhcV61dodIWc6P6C-oM17h1EuRRgnKNo_QZfKftUDhxXVxj2Gncro2Ty72UxeTvQjBmLZb9vTMpYR9H4hjYBqETSJW7ATJFs_zQF_ZJj4pldFKE73lMW1UJQqJ6Y9BAvPaHimpFQgNsp4Rjv0g0rzb3p8wGSrK"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#9a4600] uppercase tracking-wider block">
                    Culinary Director
                  </span>
                  <h4 className="font-serif text-lg font-bold text-[#1b1c1c]">
                    Chef Ananya Sen
                  </h4>
                  <span className="text-xs text-[#8a7265]">Michelin-Trained Master of Royal Cuisine</span>
                </div>
              </div>
              <p className="text-xs text-[#574237] bg-white p-3 rounded-xl border border-[#dec1b2]/30">
                Curating our daily menus from 400-year-old preserved family scrolls, harmonizing slow-simmered saffron broths, clay-oven flatbreads, and wild rose petal reductions.
              </p>
            </div>
          )}

          {/* Card 3: Head Concierge */}
          {(artisanFilter === 'all' || artisanFilter === 'concierge') && (
            <div className="bg-[#f6f3f2] rounded-2xl p-5 border border-[#dec1b2]/40 shadow-xs space-y-3 animate-in fade-in">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 ring-2 ring-[#e87524]/20 bg-[#eae7e7]">
                  <img
                    alt="Tenzin Norbu"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHoNg6ijds9OavnvFIVfpysN7-a8iMsnVA7J7f5FvfMNIXsML6CmOuN-chrcUepAbXXFJn7_d0lAQKsscf7y4K4j_d4-S4KEWZZKYalANyspFk_V-_6qSWEQLiVtfC2_mJEMCCNvAy-bgfvZ4SOQ5VyZ5WmbCLfiXqAH3KtIlRcbdEnb8LB9pxemt1gUJesKXllpANUmfhCpycI9u1L049hOep_B_Uln1dKTUw78MqsbhSALxlvhmA"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold text-[#9a4600] uppercase tracking-wider">
                      Head Concierge
                    </span>
                    <span className="material-symbols-outlined text-[16px] text-[#9a4600]">key</span>
                  </div>
                  <h4 className="font-serif text-lg font-bold text-[#1b1c1c]">
                    Tenzin Norbu
                  </h4>
                  <span className="text-xs text-[#8a7265]">Les Clefs d'Or Member • 19 Years of Service</span>
                </div>
              </div>
              <p className="text-xs text-[#574237] bg-white p-3 rounded-xl border border-[#dec1b2]/30">
                “Whether arranging a sunrise private sitar performance on the lake or securing rare regional vintage teas, no detail is ever too modest or magnificent.”
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 6. Accolades & Honors Ribbon */}
      <section className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-6">
        <div className="bg-[#eae7e7] rounded-3xl p-6 border border-[#dec1b2]/40 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#9a4600] uppercase tracking-wider">
              Accolades & Recognition
            </span>
            <span className="material-symbols-outlined text-[#9a4600] text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              military_tech
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-white p-4 rounded-2xl flex items-center gap-3 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#ffdbcb] text-[#341100] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">award_star</span>
              </div>
              <div>
                <span className="font-serif text-xs sm:text-sm font-bold text-[#1b1c1c] block">
                  Condé Nast Traveler
                </span>
                <span className="text-[11px] text-[#8a7265]">Gold List 2024</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl flex items-center gap-3 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#ffdbcb] text-[#341100] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">restaurant</span>
              </div>
              <div>
                <span className="font-serif text-xs sm:text-sm font-bold text-[#1b1c1c] block">
                  Michelin Recommended
                </span>
                <span className="text-[11px] text-[#8a7265]">The Rosewood Bistro</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl flex items-center gap-3 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#ffdbcb] text-[#341100] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">thumb_up</span>
              </div>
              <div>
                <span className="font-serif text-xs sm:text-sm font-bold text-[#1b1c1c] block">
                  TripAdvisor Best of Best
                </span>
                <span className="text-[11px] text-[#8a7265]">Top 1% Worldwide</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Historical Guestbook Quote */}
      <section className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-4">
        <div className="bg-gradient-to-br from-[#ffdbcb]/60 to-white rounded-3xl p-6 border border-[#dec1b2]/40 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[#9a4600]">
              <span className="material-symbols-outlined text-[20px]">auto_stories</span>
              <span className="text-xs font-bold uppercase tracking-wider">Historical Estate Guestbook</span>
            </div>
            <span className="text-xs font-bold text-[#9a4600]">{currentQuote.date}</span>
          </div>

          <p className="font-serif text-base sm:text-lg italic text-[#1b1c1c] leading-relaxed">
            “{currentQuote.text}”
          </p>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-[#574237] font-medium">— {currentQuote.author}</span>
            <button
              onClick={cycleQuote}
              className="text-xs font-bold text-[#9a4600] flex items-center gap-1 hover:underline"
            >
              <span>Turn Page</span>
              <span className="material-symbols-outlined text-[16px]">navigate_next</span>
            </button>
          </div>
        </div>
      </section>

      {/* 8. Experience Rose Garden CTA Block */}
      <section className="max-w-4xl mx-auto w-full px-4 sm:px-6 pt-6">
        <div className="bg-[#0D234C] text-white rounded-3xl p-6 sm:p-10 text-center flex flex-col items-center gap-3 shadow-xl">
          <span className="text-xs font-bold uppercase tracking-widest text-[#b8cbfe]">
            Your Journey Awaits
          </span>
          <h3 className="font-serif text-2xl sm:text-4xl font-semibold">Experience Rose Garden</h3>
          <p className="text-xs sm:text-sm text-white/80 max-w-sm leading-relaxed mb-3">
            Join our storied circle of patrons. Reservations are handled individually with discreet personal care.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
              onClick={() => onNavigate('rooms')}
              className="py-3 px-8 rounded-xl bg-[#e87524] hover:bg-[#9a4600] text-white text-xs sm:text-sm font-bold shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">hotel</span>
              <span>Book a Room</span>
            </button>
            <button
              onClick={() => onNavigate('table-reservation')}
              className="py-3 px-8 rounded-xl bg-white text-[#1b1c1c] hover:bg-[#ffdbcb] text-xs sm:text-sm font-bold shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">table_bar</span>
              <span>Reserve a Table</span>
            </button>
          </div>

          <div className="pt-3 text-xs text-white/60">
            Personal Guest Concierge Desk: <a href="tel:+911412891928" className="text-[#ffb68d] underline">+91 141 289 1928</a>
          </div>
        </div>
      </section>

    </div>
  );
};
