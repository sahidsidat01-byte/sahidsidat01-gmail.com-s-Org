import React, { useState, useMemo } from 'react';
import { PageType } from '../types';
import { ROOMS_DATA, DISHES_DATA, GALLERY_PHOTOS } from '../data/hotelData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: PageType) => void;
  onSelectRoom?: (roomId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onSelectRoom,
}) => {
  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    if (!query.trim()) return { rooms: [], dishes: [], gallery: [] };
    const q = query.toLowerCase();

    const rooms = ROOMS_DATA.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.amenities.some((a) => a.name.toLowerCase().includes(q))
    );

    const dishes = DISHES_DATA.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q) ||
        d.tags.some((t) => t.toLowerCase().includes(q))
    );

    const gallery = GALLERY_PHOTOS.filter(
      (g) =>
        g.title.toLowerCase().includes(q) ||
        g.description.toLowerCase().includes(q) ||
        g.location.toLowerCase().includes(q)
    );

    return { rooms, dishes, gallery };
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-start justify-center p-4 sm:p-6 md:p-20 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl z-10 overflow-hidden flex flex-col my-auto max-h-[85vh]">
        {/* Search Bar Input */}
        <div className="p-4 border-b border-[#f0eded] flex items-center gap-3">
          <span className="material-symbols-outlined text-[#9a4600] text-[24px]">search</span>
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search suites, Michelin delicacies, amenities, spa..."
            className="w-full text-base sm:text-lg text-[#1b1c1c] placeholder:text-[#8a7265] focus:outline-none bg-transparent"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[#8a7265] hover:text-[#1b1c1c] p-1"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-[#f0eded] text-[#574237] hover:bg-[#e4e2e1]"
          >
            ESC
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 overflow-y-auto space-y-6">
          {!query.trim() ? (
            <div className="py-8 text-center space-y-4">
              <span className="material-symbols-outlined text-4xl text-[#dec1b2]">explore</span>
              <p className="text-sm text-[#8a7265]">
                Try searching for <span className="font-semibold text-[#9a4600]">"Presidential Suite"</span>,{' '}
                <span className="font-semibold text-[#9a4600]">"Saffron Biryani"</span>,{' '}
                <span className="font-semibold text-[#9a4600]">"Soaking Tub"</span>, or{' '}
                <span className="font-semibold text-[#9a4600]">"Courtyard Pool"</span>.
              </p>

              {/* Quick links shortcuts */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                <button
                  onClick={() => {
                    onNavigate('rooms');
                    onClose();
                  }}
                  className="px-3 py-1.5 rounded-full bg-[#f6f3f2] text-xs font-medium text-[#574237] hover:bg-[#ffdbc9] hover:text-[#763300] transition-colors"
                >
                  All Suites
                </button>
                <button
                  onClick={() => {
                    onNavigate('dining');
                    onClose();
                  }}
                  className="px-3 py-1.5 rounded-full bg-[#f6f3f2] text-xs font-medium text-[#574237] hover:bg-[#ffdbc9] hover:text-[#763300] transition-colors"
                >
                  Bistro Menu
                </button>
                <button
                  onClick={() => {
                    onNavigate('table-reservation');
                    onClose();
                  }}
                  className="px-3 py-1.5 rounded-full bg-[#f6f3f2] text-xs font-medium text-[#574237] hover:bg-[#ffdbc9] hover:text-[#763300] transition-colors"
                >
                  Reserve Table
                </button>
                <button
                  onClick={() => {
                    onNavigate('gallery');
                    onClose();
                  }}
                  className="px-3 py-1.5 rounded-full bg-[#f6f3f2] text-xs font-medium text-[#574237] hover:bg-[#ffdbc9] hover:text-[#763300] transition-colors"
                >
                  Photo Gallery
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Room Matches */}
              {searchResults.rooms.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#9a4600]">
                    <span className="material-symbols-outlined text-[16px]">bed</span>
                    <span>Suites & Accommodations ({searchResults.rooms.length})</span>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {searchResults.rooms.map((room) => (
                      <div
                        key={room.id}
                        onClick={() => {
                          if (onSelectRoom) onSelectRoom(room.id);
                          onNavigate('rooms');
                          onClose();
                        }}
                        className="p-3 rounded-xl bg-[#fcf9f8] hover:bg-[#ffdbc9]/30 border border-[#dec1b2]/40 flex items-center gap-3 cursor-pointer transition-all group"
                      >
                        <img
                          alt={room.name}
                          src={room.image}
                          className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-serif text-sm font-semibold text-[#1b1c1c] group-hover:text-[#9a4600] truncate">
                            {room.name}
                          </h4>
                          <p className="text-xs text-[#574237] line-clamp-1">{room.description}</p>
                          <div className="flex items-center gap-2 mt-1 text-xs text-[#8a7265]">
                            <span>₹{room.price.toLocaleString('en-IN')}/night</span>
                            <span>•</span>
                            <span>{room.sizeSqFt} sq ft</span>
                            <span>•</span>
                            <span>★ {room.rating}</span>
                          </div>
                        </div>
                        <span className="material-symbols-outlined text-[18px] text-[#8a7265] group-hover:text-[#9a4600]">
                          arrow_forward
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Dining Matches */}
              {searchResults.dishes.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#9a4600]">
                    <span className="material-symbols-outlined text-[16px]">restaurant_menu</span>
                    <span>Culinary Delicacies ({searchResults.dishes.length})</span>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {searchResults.dishes.map((dish) => (
                      <div
                        key={dish.id}
                        onClick={() => {
                          onNavigate('dining');
                          onClose();
                        }}
                        className="p-3 rounded-xl bg-[#fcf9f8] hover:bg-[#ffdbc9]/30 border border-[#dec1b2]/40 flex items-center gap-3 cursor-pointer transition-all group"
                      >
                        <img
                          alt={dish.name}
                          src={dish.image}
                          className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span
                              className={`w-3 h-3 rounded-xs border flex items-center justify-center p-[2px] ${
                                dish.type === 'veg' ? 'border-emerald-700' : 'border-red-800'
                              }`}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${
                                  dish.type === 'veg' ? 'bg-emerald-700' : 'bg-red-800'
                                }`}
                              />
                            </span>
                            <h4 className="font-serif text-sm font-semibold text-[#1b1c1c] group-hover:text-[#9a4600] truncate">
                              {dish.name}
                            </h4>
                          </div>
                          <p className="text-xs text-[#574237] line-clamp-1 mt-0.5">{dish.description}</p>
                          <span className="text-xs font-bold text-[#9a4600] block mt-1">
                            ₹{dish.price}
                          </span>
                        </div>
                        <span className="material-symbols-outlined text-[18px] text-[#8a7265] group-hover:text-[#9a4600]">
                          arrow_forward
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Gallery Matches */}
              {searchResults.gallery.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#9a4600]">
                    <span className="material-symbols-outlined text-[16px]">photo_library</span>
                    <span>Gallery & Grounds ({searchResults.gallery.length})</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {searchResults.gallery.map((photo) => (
                      <div
                        key={photo.id}
                        onClick={() => {
                          onNavigate('gallery');
                          onClose();
                        }}
                        className="rounded-xl overflow-hidden border border-[#dec1b2]/40 cursor-pointer group relative aspect-[16/10]"
                      >
                        <img
                          alt={photo.title}
                          src={photo.image}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-2 text-white">
                          <span className="text-xs font-semibold truncate">{photo.title}</span>
                          <span className="text-[10px] text-white/80">{photo.location}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* No results */}
              {searchResults.rooms.length === 0 &&
                searchResults.dishes.length === 0 &&
                searchResults.gallery.length === 0 && (
                  <div className="py-12 text-center space-y-2">
                    <span className="material-symbols-outlined text-4xl text-[#8a7265]">search_off</span>
                    <h4 className="font-serif text-base font-semibold text-[#1b1c1c]">No matches found</h4>
                    <p className="text-xs text-[#574237]">
                      No results for "{query}". Try checking your spelling or search another keyword.
                    </p>
                  </div>
                )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
