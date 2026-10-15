import React, { useState, useMemo } from 'react';
import { Heart, Sparkles, ChevronRight, ChevronLeft, ArrowLeft, Volume2, VolumeX, RotateCcw } from 'lucide-react';
import { playSparkleChime, playBubblePop, playCelebration } from '../utils/audio';

interface MemoriesShowcasePageProps {
  girlfriendName: string;
  boyfriendName: string;
  onRestartToBeginning: () => void;
  onBackToGiftBox: () => void;
  isMusicPlaying: boolean;
  onToggleMusic: () => void;
}

interface PhotoSlot {
  filename: string;
  title: string;
  caption: string;
  tag: string;
  emoji: string;
}

const EXACT_PHOTOS: PhotoSlot[] = [
  {
    filename: "IMG-20261002-WA0097.jpg",
    title: "The Iconic 'Big Eyes' Goofy Face 😂",
    caption: "Look at those wide curious eyes! You tried so hard to look completely serious while resting your chin on your hand, but this is hands down one of my favorite photos of us ever.",
    tag: "Goofy Loves • Best Face Ever",
    emoji: "👀",
  },
  {
    filename: "IMG-20260910-WA0107.jpg",
    title: "Shopping Spree & Mirror Shenanigans 🛍️",
    caption: "Us taking over the clothing store mirror! I stood there arms crossed trying to look all cool, while you snapped photos and carried our shopping treasures. Every date with you feels like an adventure.",
    tag: "Mall Date • My Partner in Crime",
    emoji: "👗",
  },
  {
    filename: "IMG-20261002-WA0091.jpg",
    title: "Heart Crown & Peace Sign ✌️",
    caption: "That mirror selfie in the dressing room where I had the little heart crown and you were flashing your cute peace sign. You make even waiting in line fun.",
    tag: "Fitting Room Fun • Love Crown",
    emoji: "💖",
  },
  {
    filename: "IMG-20261002-WA0130.jpg",
    title: "Beach Waves & Your Purest Smile 🌊",
    caption: "Standing barefoot in the ocean waves as the salty breeze blew your hair. You with your hands in namaste giving that peaceful sweet smile, and me just admiring how completely stunning you are.",
    tag: "Beach Day • Barefoot in the Surf",
    emoji: "🌅",
  },
  {
    filename: "Snapchat-263942217.jpg",
    title: "The Milkshake Thief in Action 🥤",
    caption: "That cozy brick cafe where you ordered the tall chocolate shake, grabbed the straw, and basically didn't let me have more than two sips! Wearing that cute cloud shirt looking irresistible.",
    tag: "Sweet Tooth • Cafe Amore",
    emoji: "🍫",
  },
  {
    filename: "Snapchat-768837026.jpg",
    title: "Caught In The Moment Candid 😮",
    caption: "You talking with your hands and mid-sentence with that cute expressive face! You never have to pose or try to be anyone else with me; every candid moment of you is perfection.",
    tag: "Candid Cutie • Pure Expressions",
    emoji: "✨",
  },
  {
    filename: "Snapchat-859922140.jpg",
    title: "The World's Cutest Grumpy Pout 🥺",
    caption: "The famous Ritu chin-rest pout! Even when you're mildly annoyed or sleepy, you are ten times cuter than anyone on this planet. My heart literally melts every single time you make this face.",
    tag: "Grumps & Smiles • Priceless",
    emoji: "😾",
  },
];

export const MemoriesShowcasePage: React.FC<MemoriesShowcasePageProps> = ({
  girlfriendName,
  boyfriendName,
  onRestartToBeginning,
  onBackToGiftBox,
  isMusicPlaying,
  onToggleMusic,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [showFinalLetter, setShowFinalLetter] = useState<boolean>(false);

  // Auto-resolve any images in src/assets/photos/ using Vite's eager glob
  const assetPhotos = useMemo(() => {
    try {
      const glob = import.meta.glob<{ default: string }>(
        '../assets/photos/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG}',
        { eager: true }
      );
      const map: { [key: string]: string } = {};
      Object.entries(glob).forEach(([path, module]) => {
        const name = path.split('/').pop();
        if (name) {
          map[name] = module.default;
        }
      });
      return map;
    } catch {
      return {};
    }
  }, []);

  const isLastPhoto = currentIndex === EXACT_PHOTOS.length - 1;
  const currentPhoto = EXACT_PHOTOS[currentIndex];

  // Resolve photo URL: checks assets map first, then public/photos/
  const photoUrl = assetPhotos[currentPhoto.filename] || `/photos/${currentPhoto.filename}`;

  const handleNextPhoto = () => {
    playSparkleChime();
    if (isLastPhoto) {
      playCelebration();
      setShowFinalLetter(true);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrevPhoto = () => {
    playBubblePop();
    if (showFinalLetter) {
      setShowFinalLetter(false);
    } else if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-[#fff6f2] via-[#fdefeb] to-[#fce5df] text-[#4a352c] flex flex-col justify-between p-4 sm:p-6 overflow-x-hidden font-['Nunito',sans-serif]">
      {/* Background Floating Decor */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-12 text-2xl animate-pulse opacity-40">✨</div>
        <div className="absolute top-28 right-16 text-2xl animate-bounce opacity-40">📸</div>
        <div className="absolute bottom-20 left-10 text-3xl animate-pulse opacity-30">💖</div>
        <div className="absolute bottom-32 right-12 text-2xl animate-bounce opacity-40">🌸</div>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-pink-200/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Top Header */}
      <header className="relative z-20 w-full max-w-4xl mx-auto flex items-center justify-between py-2">
        <button
          onClick={onBackToGiftBox}
          className="flex items-center gap-1.5 bg-white/90 hover:bg-white text-[#7a4e42] px-4 py-2 rounded-full shadow-sm border border-pink-100 text-xs sm:text-sm font-bold transition-all hover:scale-105 active:scale-95"
        >
          <ArrowLeft className="w-4 h-4 text-pink-500" />
          <span>Back to Gift Box 📦</span>
        </button>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1.5 bg-pink-100/90 text-pink-700 px-3.5 py-1.5 rounded-full text-xs font-black">
            <Heart className="w-3.5 h-3.5 fill-pink-500" />
            <span>Joseph & Ritu's Memory Vault</span>
          </div>

          <button
            onClick={onToggleMusic}
            title={isMusicPlaying ? 'Mute music' : 'Play music'}
            className="flex items-center gap-1.5 bg-white/90 hover:bg-white text-[#7a4e42] px-3.5 py-2 rounded-full shadow-sm border border-pink-100 text-xs sm:text-sm font-bold transition-all hover:scale-105"
          >
            {isMusicPlaying ? (
              <>
                <Volume2 className="w-4 h-4 text-pink-500 animate-pulse" />
                <span className="hidden md:inline">Music: On 🎵</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-stone-400" />
                <span className="hidden md:inline">Music: Off</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Content: Showcase Photos One by One OR Final Ending Page */}
      <main className="relative z-10 w-full max-w-2xl mx-auto my-auto py-6 flex flex-col items-center">
        {!showFinalLetter ? (
          // PHOTO SHOWCASE (One by One)
          <div className="w-full flex flex-col items-center animate-in fade-in zoom-in-95 duration-300">
            {/* Stage Indicator & Title */}
            <div className="text-center mb-4">
              <div className="inline-flex items-center gap-2 bg-pink-500/10 text-pink-700 font-black text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-2 border border-pink-200">
                <span>{currentPhoto.emoji}</span>
                <span>Photo {currentIndex + 1} of {EXACT_PHOTOS.length}</span>
                <Sparkles className="w-3.5 h-3.5 text-pink-500" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#4a352c]">
                {currentPhoto.title}
              </h1>
            </div>

            {/* Vintage Polaroid Card */}
            <div className="relative group w-full max-w-sm sm:max-w-md bg-white p-4 sm:p-5 pb-6 rounded-2xl shadow-2xl border-4 border-[#faeae6] transition-transform duration-300 hover:scale-[1.01]">
              {/* Cute Washi Tape at Top */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-6 bg-pink-200/80 border border-pink-300/80 rotate-[-1deg] shadow-xs flex items-center justify-center text-[10px] font-black text-pink-700 uppercase tracking-widest">
                {currentPhoto.tag}
              </div>

              {/* Exact Photo Image Frame */}
              <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden bg-stone-100 shadow-inner border border-stone-200 flex items-center justify-center">
                <img
                  src={photoUrl}
                  alt={currentPhoto.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Subtle vintage shine overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Caption */}
              <div className="mt-4 px-2">
                <p className="text-xs sm:text-sm text-[#5a3a2f] font-semibold italic leading-relaxed text-center font-['Playfair_Display',serif]">
                  "{currentPhoto.caption}"
                </p>
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="mt-6 w-full max-w-sm flex items-center justify-between gap-3">
              <button
                onClick={handlePrevPhoto}
                disabled={currentIndex === 0}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold transition-all ${
                  currentIndex === 0
                    ? 'opacity-30 cursor-not-allowed bg-stone-100 text-stone-400'
                    : 'bg-white hover:bg-stone-50 text-[#6a4237] shadow-sm border border-pink-200 hover:scale-105 active:scale-95'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              {/* Step Dots */}
              <div className="flex items-center gap-1">
                {EXACT_PHOTOS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      playBubblePop();
                      setCurrentIndex(idx);
                    }}
                    className={`h-2 rounded-full transition-all ${
                      currentIndex === idx
                        ? 'w-5 bg-pink-500'
                        : 'w-2 bg-pink-200 hover:bg-pink-300'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={handleNextPhoto}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs sm:text-sm font-black bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-md shadow-pink-300 transition-all hover:scale-105 active:scale-95"
              >
                <span>{isLastPhoto ? 'Final Message 💌' : 'Next Photo'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          // FINAL ENDING PAGE / DIV WITH DEEP LINES & "LOVE YOU 3000" & "🤫" BUTTON
          <div className="w-full bg-[#fffdfa] rounded-3xl p-6 sm:p-9 shadow-2xl border-4 border-pink-200 text-center animate-in zoom-in-95 duration-500 relative">
            {/* Romantic Aura */}
            <div className="absolute -inset-2 bg-gradient-to-r from-rose-200 via-pink-200 to-amber-200 rounded-3xl blur-xl opacity-50 pointer-events-none" />

            <div className="relative z-10 space-y-6">
              {/* Golden Crown Stamp */}
              <div className="w-16 h-16 mx-auto rounded-full bg-pink-100 flex items-center justify-center text-3xl shadow-inner border border-pink-200">
                👑
              </div>

              <div>
                <span className="text-[11px] font-black uppercase tracking-widest text-pink-600 bg-pink-50 px-3.5 py-1 rounded-full border border-pink-200">
                  A Final Promise From Jojo To Ritu
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#452b21] mt-2 font-['Playfair_Display',serif]">
                  For My Forever Person, Ritu ❤️
                </h2>
              </div>

              {/* Deep, Emotional Lines Written For Ritu */}
              <div className="space-y-4 text-xs sm:text-sm md:text-base text-[#593b32] font-medium leading-relaxed max-w-lg mx-auto font-['Nunito',sans-serif]">
                <p className="italic text-[#6d4638] font-['Playfair_Display',serif] text-base sm:text-lg">
                  "They say happiness is found in moments, but since the day you entered my life, happiness became a person."
                </p>

                <p>
                  Every silly face you make, every smile you give, every time you hold my hand or burst into laughter—you remind me that the world is soft, kind, and beautiful.
                </p>

                <p>
                  On the days when you feel exhausted, when you're doubting yourself, or when things get too loud in your head... please remember that someone loves you with every beat of his heart. You don't have to carry the weight of everything alone, Ritu. I am always standing right beside you.
                </p>

                <p>
                  Thank you for being my comfort, my best friend, my funniest memory, and my safest home.
                </p>

                {/* THE CLIMAX: LOVE YOU 3000 */}
                <div className="pt-4 pb-2">
                  <div className="inline-block bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white font-black text-xl sm:text-2xl px-8 py-3 rounded-full shadow-xl shadow-pink-300 transform hover:scale-105 transition-transform tracking-wide">
                    ❤️ Love you 3000, Ritu ❤️
                  </div>
                  <p className="text-xs text-[#9a6e60] font-bold mt-2">
                    — Yours always, Joseph (Jojo boy) 🧸
                  </p>
                </div>
              </div>

              {/* SECRET RESTART BUTTON WITH EMOJI "🤫" */}
              <div className="pt-6 border-t border-pink-100 flex flex-col items-center">
                <p className="text-xs text-[#9a6e60] font-bold mb-3">
                  Click the secret button below to return to where our story started...
                </p>

                <button
                  onClick={() => {
                    playSparkleChime();
                    onRestartToBeginning();
                  }}
                  className="group flex items-center gap-2.5 bg-white hover:bg-pink-50 text-[#593b32] font-black text-sm sm:text-base px-8 py-4 rounded-full border-2 border-pink-300 shadow-xl shadow-pink-200/50 transition-all transform hover:scale-110 active:scale-95"
                >
                  <span className="text-2xl group-hover:scale-125 transition-transform">🤫</span>
                  <span className="tracking-wide text-pink-700 font-extrabold">
                    🤫 Shhh... Start from the first!
                  </span>
                  <RotateCcw className="w-4 h-4 text-pink-400 group-hover:rotate-180 transition-transform duration-500" />
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full max-w-md mx-auto text-center py-2 text-xs text-[#8a685e] font-semibold">
        <span>Joseph & Ritu • Infinity and Beyond ✨</span>
      </footer>
    </div>
  );
};
