import React, { useState, useMemo } from 'react';
import { PageType, GalleryPhoto } from '../types';
import { GALLERY_PHOTOS } from '../data/hotelData';

interface GalleryPageProps {
  onNavigate: (page: PageType) => void;
  onOpenLightbox: (index: number) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({
  onNavigate,
  onOpenLightbox,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredPhotos = useMemo(() => {
    if (activeCategory === 'all') return GALLERY_PHOTOS;
    return GALLERY_PHOTOS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="flex flex-col w-full pb-20">
      
      {/* 1. Visual Introduction Section */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6 pb-4 flex flex-col gap-1.5">
        <div className="flex items-center gap-2 text-[#9a4600]">
          <span className="material-symbols-outlined text-[18px]">photo_camera</span>
          <span className="text-[11px] uppercase tracking-wider font-bold text-[#9a4600]">
            Editorial Portfolio
          </span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-[#1b1c1c] tracking-tight">
          The Visual Journey
        </h1>
        <p className="text-sm text-[#574237] max-w-xl">
          Explore our century-old heritage architecture, sun-drenched private suites, fragrant botanical courtyards, and royal culinary artistry.
        </p>
      </section>

      {/* 2. Filterable Category Pills */}
      <section className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-y border-[#dec1b2]/40 py-3 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {[
            { id: 'all', label: 'All Moments' },
            { id: 'suites', label: 'Grand Suites' },
            { id: 'architecture', label: 'Heritage Architecture' },
            { id: 'dining', label: 'Gourmet Dining' },
            { id: 'pool', label: 'Courtyards & Pools' },
            { id: 'events', label: 'Heritage Events' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeCategory === cat.id
                  ? 'bg-[#9a4600] text-white shadow-sm'
                  : 'bg-[#f6f3f2] text-[#574237] hover:bg-[#eae7e7]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* 3. Editorial Staggered / Masonry Gallery Grid */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo, idx) => {
            const originalIndex = GALLERY_PHOTOS.findIndex((p) => p.id === photo.id);

            return (
              <article
                key={photo.id}
                onClick={() => onOpenLightbox(originalIndex >= 0 ? originalIndex : idx)}
                className="relative rounded-2xl overflow-hidden bg-white border border-[#dec1b2]/40 shadow-md group cursor-pointer aspect-[4/3] flex flex-col justify-end"
              >
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                {/* Top Badge */}
                <div className="absolute top-3 right-3 bg-white/85 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs">
                  <span className="material-symbols-outlined text-[14px] text-[#9a4600]">photo_camera</span>
                  <span className="text-[10px] font-bold text-[#1b1c1c] uppercase">View</span>
                </div>

                {/* Bottom Caption Overlay */}
                <div className="relative z-10 p-4 text-white">
                  <span className="text-[10px] font-bold text-[#ffb692] uppercase tracking-wider block">
                    {photo.categoryLabel}
                  </span>
                  <h3 className="font-serif text-lg font-semibold leading-tight mt-0.5 group-hover:text-[#ffdbc9] transition-colors">
                    {photo.title}
                  </h3>
                  <p className="text-xs text-white/80 line-clamp-1 mt-0.5">
                    {photo.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* 4. Instagram Social Chronicle Feed Strip */}
      <section className="bg-[#f6f3f2] py-10 border-y border-[#dec1b2]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
            <div>
              <div className="flex items-center gap-1.5 text-[#9a4600]">
                <span className="material-symbols-outlined text-[18px]">camera_alt</span>
                <span className="text-[11px] font-bold uppercase tracking-wider">Social Chronicle</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1b1c1c]">
                @RoseGardenHotel
              </h3>
            </div>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-white shadow-xs text-xs font-bold text-[#9a4600] hover:bg-[#ffdbcb] transition-colors w-fit"
            >
              <span>Follow on Instagram</span>
              <span className="material-symbols-outlined text-[16px]">north_east</span>
            </a>
          </div>

          <p className="text-xs text-[#574237] mb-6">
            Tag your moments with <span className="font-semibold text-[#9a4600]">#RoseGardenMoments</span> for a chance to be featured in our official royal chronicle.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              {
                alt: 'Chai tasting',
                src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEDLDR1LyUcYPhiyswSvCliG766kXoEem6etUgjDzEcCA1EcdcCR-CKnmeeQcpXEAkvv5gf2NBjynNqoSgRuzPXNO_a16ayC0pyAb1S3v4sdLMELmBAJeJHAhbS-648GvsHoGF5ulRN6VZRGdoZh31YPSELzUzNZiFDYl1QyNpy4H1DGaRhVyHvRdz0Dc972HM1Fiazu1-JyeGV4xn2umI4AAzBOFFyizHwgn8W0VzFzcqss0nNADL',
              },
              {
                alt: 'Dessert thali',
                src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_MWqmzIKTiU3Gr4Wdmrd9dEivTKHcwqT6_R47ED4m6J8nCVOUuQyCoP2thl8nhSxkYS7Y21x_bjLuNOtLcmEjMubMjRNM39GK_YgAagCst2Us3u5ef7H5EbHrBUV_8lHZQj3wkh3oxsYvJX3NbRHXWDd8GrUwp8Mt6BKk6I9teKnQ2SgCAQobwI-L13o-sN_mVxe6r4vQOjU89g8vypec1z3j7p6JUTSBESxjq3sBfT5hDVjauSWL',
              },
              {
                alt: 'Bride in lehenga',
                src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9DxWad59Ru_cOhg01GdTtGXdOGl0vMxjoU7lkiNpsly998irbOzvFUAXh0fFNBNbSaHnshwOHv2Usxg5yaClSozxBi80Zly-cr0mBrsJiE1iCQMbgRUrHtrhNT82EMlpAw9sjS6PHaavgfCeJYPVd0QKTQV789n5zce-r542_Ais9EjJg_Rg5INerfUdwtZjQFcrmlcaPD0jiwsyzcK2l8iRgSMuO8IZy4U-IJ5jtKWfSnWhQOulA',
              },
              {
                alt: 'Courtyard Pool',
                src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDo_-bYD-tYM3_ENlKBExdJLleYYXbqw8XEwGWP_ctwhu6LW1XoK1aAniapFJDREYuVxP1WL5QCh5L8CAdqpu64CS-hFsA1ZdDPPyDgNAgo4Ln7sjPeCJG8jbV7H3CJgTnKt17C2IsDCE_TKt2mCeRz4T_itbkuJLnH6qrgLdTVbcaKqkxaZWq39fNYnJ-l4EmBIcYr5qtcEttowNVwynjwejocUO8sxMHHb0vUwT87g3hLjqpWxPX',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="h-32 sm:h-40 rounded-2xl overflow-hidden relative shadow-xs group cursor-pointer"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Bottom Conversion Callout */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-10">
        <div className="w-full bg-[#0D234C] text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full bg-[#e87524]/20 blur-2xl pointer-events-none" />

          <div className="space-y-2 relative z-10 max-w-xl">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#b8cbfe] block">
              A Bespoke Stay
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl text-white font-semibold leading-tight">
              Experience Rose Garden in Person
            </h3>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              From serene courtyards to regal chambers, reserve your retreat and author your own story at Rose Garden.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 relative z-10">
            <button
              onClick={() => onNavigate('book')}
              className="py-3 px-6 bg-[#e87524] hover:bg-[#9a4600] text-white rounded-xl text-xs sm:text-sm font-bold shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              <span>Book Your Stay</span>
              <span className="material-symbols-outlined text-[18px]">calendar_today</span>
            </button>
            <button
              onClick={() => onNavigate('dining')}
              className="py-3 px-6 bg-white/15 hover:bg-white/25 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              <span>Explore Menus</span>
              <span className="material-symbols-outlined text-[18px]">restaurant_menu</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
