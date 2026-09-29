import React, { useEffect } from 'react';
import { GalleryPhoto } from '../types';

interface LightboxModalProps {
  photos: GalleryPhoto[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  photos,
  currentIndex,
  isOpen,
  onClose,
  onPrev,
  onNext,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen || photos.length === 0) return null;

  const currentPhoto = photos[currentIndex] || photos[0];

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex flex-col justify-between select-none">
      {/* Top Action Bar */}
      <div className="w-full flex items-center justify-between p-4 sm:p-6 text-white z-10">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#e87524] text-[20px]">photo_library</span>
          <span className="text-xs sm:text-sm font-semibold tracking-wider text-white/80">
            {currentIndex + 1} / {photos.length}
          </span>
        </div>

        <button
          onClick={onClose}
          aria-label="Close Lightbox"
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center active:scale-90 transition-transform"
        >
          <span className="material-symbols-outlined text-[24px]">close</span>
        </button>
      </div>

      {/* Centered Image with Navigation Arrows */}
      <div className="relative flex-1 w-full flex items-center justify-center px-4 sm:px-16 overflow-hidden">
        {/* Prev Arrow */}
        <button
          onClick={onPrev}
          aria-label="Previous photo"
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/15 hover:bg-white/30 text-white backdrop-blur-md flex items-center justify-center active:scale-90 transition-all z-20"
        >
          <span className="material-symbols-outlined text-[28px]">chevron_left</span>
        </button>

        {/* Current Image */}
        <div className="max-w-4xl max-h-[70vh] rounded-2xl overflow-hidden shadow-2xl bg-black/50 flex items-center justify-center">
          <img
            src={currentPhoto.image}
            alt={currentPhoto.title}
            className="w-full h-full max-h-[70vh] object-contain transition-all duration-300"
          />
        </div>

        {/* Next Arrow */}
        <button
          onClick={onNext}
          aria-label="Next photo"
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/15 hover:bg-white/30 text-white backdrop-blur-md flex items-center justify-center active:scale-90 transition-all z-20"
        >
          <span className="material-symbols-outlined text-[28px]">chevron_right</span>
        </button>
      </div>

      {/* Bottom Caption Bar */}
      <div className="p-4 sm:p-6 bg-gradient-to-t from-black via-black/90 to-transparent text-white flex flex-col gap-1 max-w-4xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-[#ffb692] uppercase tracking-wider">
            {currentPhoto.categoryLabel}
          </span>
          <span className="text-white/40">•</span>
          <span className="text-xs text-white/70">{currentPhoto.location}</span>
          {currentPhoto.timeOfDay && (
            <>
              <span className="text-white/40">•</span>
              <span className="text-xs text-[#ffdbc9]">{currentPhoto.timeOfDay}</span>
            </>
          )}
        </div>
        <h4 className="font-serif text-lg sm:text-xl font-semibold leading-tight text-white">
          {currentPhoto.title}
        </h4>
        <p className="text-xs sm:text-sm text-white/80 line-clamp-2 max-w-2xl">
          {currentPhoto.description}
        </p>
      </div>
    </div>
  );
};
