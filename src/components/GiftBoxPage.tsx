
import React, { useState } from 'react';
import {
  Heart,
  Sparkles,
  ArrowLeft,
  Mail,
  Gift,
  Volume2,
  VolumeX,
  X,
  ChevronRight,
} from 'lucide-react';
import {
  playCardboardUnfold,
  playCelebration,
  playSparkleChime,
  playBubblePop,
} from '../utils/audio';
import { EternalHeart } from './EternalHeart';
import giftBoxInterior from '../assets/images/gift_box_interior_1792085939028.jpg';

interface GiftBoxPageProps {
  onBackToBench: () => void;
  onNavigateToMemories: () => void;
  isMusicPlaying: boolean;
  onToggleMusic: () => void;
}

export const GiftBoxPage: React.FC<GiftBoxPageProps> = ({
  onBackToBench,
  onNavigateToMemories,
  isMusicPlaying,
  onToggleMusic,
}) => {
  const [flapsOpened, setFlapsOpened] = useState<number>(0);
  const [showPopupMessage, setShowPopupMessage] = useState<boolean>(false);
  const [isLetterModalOpen, setIsLetterModalOpen] = useState<boolean>(false);
  const [activeLetterTab, setActiveLetterTab] = useState<
    'main' | 'heart' | 'reasons' | 'vouchers' | 'gifts'
  >('main');
  const [unwrappedGifts, setUnwrappedGifts] = useState<{
    [key: string]: boolean;
  }>({});

  const isBoxFullyOpened = flapsOpened >= 4;

  const handleBoxClick = () => {
    if (flapsOpened < 4) {
      const nextCount = flapsOpened + 1;
      setFlapsOpened(nextCount);

      if (nextCount < 4) {
        playCardboardUnfold();
      } else {
        playCardboardUnfold();
        setTimeout(() => {
          playCelebration();
          playSparkleChime();
          setShowPopupMessage(true);
        }, 350);
      }
    } else {
      playSparkleChime();
      setIsLetterModalOpen(true);
    }
  };

  const openLetters = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    playSparkleChime();
    setIsLetterModalOpen(true);
  };

  const handleUnwrapGift = (id: string) => {
    playBubblePop();
    playSparkleChime();
    setUnwrappedGifts((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-[#fbf4ee] via-[#f7e9df] to-[#f3dfd2] text-[#4a352c] flex flex-col items-center justify-between p-4 sm:p-6 select-none overflow-x-hidden font-['Nunito',sans-serif]">
      {/* Background Ambience & Fairy Lights */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-8 left-10 text-2xl animate-pulse opacity-40">
          ✨
        </div>
        <div className="absolute top-20 right-14 text-xl animate-bounce opacity-50">
          🌸
        </div>
        <div className="absolute bottom-24 left-16 text-3xl animate-pulse opacity-30">
          💖
        </div>
        <div className="absolute bottom-16 right-20 text-2xl animate-bounce opacity-40">
          🎀
        </div>
        <div className="absolute top-1/2 left-4 w-60 h-60 bg-pink-300/15 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-4 w-72 h-72 bg-amber-300/15 rounded-full blur-3xl" />
      </div>

      {/* Top Navigation Bar */}
      <header className="relative z-20 w-full max-w-4xl flex items-center justify-between py-2">
        <button
          onClick={onBackToBench}
          className="flex items-center gap-1.5 bg-white/90 hover:bg-white text-[#7a4e42] px-4 py-2 rounded-full shadow-sm border border-pink-100 text-xs sm:text-sm font-bold transition-all transform hover:scale-105 active:scale-95"
        >
          <ArrowLeft className="w-4 h-4 text-pink-500" />
          <span>Back to Park Bench 🌸</span>
        </button>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1.5 bg-pink-100/90 text-pink-700 px-3.5 py-1.5 rounded-full text-xs font-black">
            <Heart className="w-3.5 h-3.5 fill-pink-500" />
            <span>For Ritu ❤️ from Jojo boy</span>
          </div>

          <button
            onClick={onToggleMusic}
            title={isMusicPlaying ? 'Mute cozy melody' : 'Play cozy melody'}
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

      {/* Main Box Station */}
      <main className="relative z-10 w-full max-w-3xl flex flex-col items-center justify-center my-auto py-6">
        {/* Instruction Banner Above Box */}
        <div className="text-center mb-6 max-w-md">
          <div className="inline-flex items-center gap-2 bg-pink-500/10 text-pink-700 font-extrabold text-xs uppercase tracking-widest px-3.5 py-1 rounded-full mb-2">
            <Gift className="w-3.5 h-3.5 text-pink-500" />
            <span>Special Delivery Parcel</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-[#4a352c]">
            A Surprise Package for Ritu ❤️
          </h1>

          <p className="text-xs sm:text-sm text-[#8a685e] mt-1 font-semibold">
            {!isBoxFullyOpened
              ? `The box is sealed with 4 cardboard flaps! Tap the box to open each flap (${flapsOpened}/4 opened)`
              : `All 4 flaps are opened! Look at all the gifts Jojo boy packed inside! ✨`}
          </p>

          {/* Progress Indicators */}
          <div className="flex items-center justify-center gap-2.5 mt-3">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  flapsOpened >= step
                    ? 'w-8 bg-pink-500 shadow-sm shadow-pink-300'
                    : 'w-2.5 bg-stone-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Interactive Cardboard Box */}
        <div className="relative flex items-center justify-center perspective-[1200px]">
          <div
            onClick={handleBoxClick}
            className={`relative w-76 h-76 sm:w-96 sm:h-96 md:w-[420px] md:h-[420px] rounded-3xl cursor-pointer select-none transition-all duration-500 ${
              !isBoxFullyOpened
                ? 'hover:scale-[1.02] active:scale-[0.99] shadow-2xl shadow-stone-600/30 ring-8 ring-[#ecd3be]'
                : 'shadow-2xl shadow-pink-300/40 ring-8 ring-pink-200/80 scale-100'
            }`}
          >
            {/* Gift Box Interior — corrected Vite image import */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden bg-[#ecd1b8] border-4 border-[#b88c63]">
              <img
                src={giftBoxInterior}
                alt="Inside the gift box packed with letters, gifts, teddy bear and fairy lights"
                className="w-full h-full object-cover"
              />

              {isBoxFullyOpened && (
                <div className="absolute inset-0 bg-gradient-to-t from-pink-500/10 via-transparent to-amber-300/10 pointer-events-none" />
              )}
            </div>

            {/* Flap 1 */}
            <div
              className={`absolute top-0 inset-x-0 h-1/2 rounded-t-2xl bg-gradient-to-b from-[#d4a880] to-[#c79970] border-4 border-b-2 border-[#b5885f] shadow-md origin-top transition-all duration-700 ease-out z-20 flex flex-col items-center justify-center p-3 overflow-hidden ${
                flapsOpened >= 1
                  ? 'transform -rotate-x-120 opacity-0 pointer-events-none'
                  : 'opacity-100'
              }`}
            >
              <div className="w-full border-t border-dashed border-[#8d5e36]/40 mb-2" />
              <div className="flex items-center gap-1.5 bg-[#b58359]/30 px-3 py-1 rounded-md text-[11px] font-black uppercase text-[#5a361c] tracking-wider border border-[#8d5e36]/40">
                <span>📦 FLAP 1: CLICK TO OPEN</span>
              </div>
              <p className="text-[10px] font-bold text-[#683f22] mt-1">
                Tap here to peel flap 1
              </p>
            </div>

            {/* Flap 2 */}
            <div
              className={`absolute top-0 right-0 w-1/2 inset-y-0 rounded-r-2xl bg-gradient-to-l from-[#d4a880] to-[#c79970] border-4 border-l-2 border-[#b5885f] shadow-md origin-right transition-all duration-700 ease-out z-19 flex flex-col items-center justify-center p-3 overflow-hidden ${
                flapsOpened >= 2
                  ? 'transform rotate-y-120 opacity-0 pointer-events-none'
                  : 'opacity-100'
              }`}
            >
              <div className="bg-[#b58359]/30 px-2.5 py-1 rounded-md text-[10px] font-black uppercase text-[#5a361c] tracking-wider border border-[#8d5e36]/40 text-center">
                <span>FLAP 2 📦</span>
              </div>
            </div>

            {/* Flap 3 */}
            <div
              className={`absolute bottom-0 inset-x-0 h-1/2 rounded-b-2xl bg-gradient-to-t from-[#d4a880] to-[#c79970] border-4 border-t-2 border-[#b5885f] shadow-md origin-bottom transition-all duration-700 ease-out z-18 flex flex-col items-center justify-center p-3 overflow-hidden ${
                flapsOpened >= 3
                  ? 'transform rotate-x-120 opacity-0 pointer-events-none'
                  : 'opacity-100'
              }`}
            >
              <div className="bg-[#b58359]/30 px-2.5 py-1 rounded-md text-[10px] font-black uppercase text-[#5a361c] tracking-wider border border-[#8d5e36]/40 text-center">
                <span>FLAP 3 📦</span>
              </div>
            </div>

            {/* Flap 4 */}
            <div
              className={`absolute top-0 left-0 w-1/2 inset-y-0 rounded-l-2xl bg-gradient-to-r from-[#d4a880] to-[#c79970] border-4 border-r-2 border-[#b5885f] shadow-md origin-left transition-all duration-700 ease-out z-17 flex flex-col items-center justify-center p-3 overflow-hidden ${
                flapsOpened >= 4
                  ? 'transform -rotate-y-120 opacity-0 pointer-events-none'
                  : 'opacity-100'
              }`}
            >
              <div className="bg-[#b58359]/30 px-2.5 py-1 rounded-md text-[10px] font-black uppercase text-[#5a361c] tracking-wider border border-[#8d5e36]/40 text-center">
                <span>FINAL FLAP 📦</span>
              </div>
            </div>

            {/* Packing Tape and Shipping Stamp */}
            {flapsOpened === 0 && (
              <div className="absolute inset-0 z-30 pointer-events-none flex flex-col items-center justify-center p-4">
                <div className="w-full h-8 bg-amber-100/90 border-y-2 border-amber-300 shadow-sm rotate-[-8deg] flex items-center justify-center text-[10px] font-black text-amber-900 tracking-widest uppercase">
                  ❤️ CAUTION: PACKED WITH JOJO'S LOVE FOR RITU ❤️
                </div>

                <div className="mt-4 bg-white/95 rounded-xl p-3 shadow-lg border border-stone-200 text-center w-56 rotate-[2deg]">
                  <p className="text-[10px] uppercase font-black text-pink-600 tracking-wider">
                    PRIORITY LOVE AIRMAIL
                  </p>
                  <p className="text-xs font-black text-[#4a352c] mt-0.5">
                    TO: Ritu ❤️ (My Cutie)
                  </p>
                  <p className="text-[10px] text-stone-500 font-bold">
                    FROM: Jojo boy 🧸
                  </p>
                  <div className="mt-1 text-[9px] font-extrabold text-pink-500 bg-pink-50 py-0.5 px-2 rounded-full inline-block">
                    👆 Click to peel flaps!
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Popup Message When Box Is Opened */}
        {isBoxFullyOpened && (
          <div className="mt-6 w-full max-w-md animate-in zoom-in-95 duration-500 flex flex-col items-center">
            <button
              onClick={openLetters}
              className="group relative w-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:to-rose-600 text-white font-black py-4 px-6 rounded-2xl shadow-xl shadow-pink-400/40 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3 border-2 border-white/80 animate-bounce duration-1000"
            >
              <Mail className="w-6 h-6 text-pink-100 group-hover:scale-110 transition-transform" />
              <span className="text-base sm:text-lg">
                💌 Click here to read the letters! 💌
              </span>
              <Sparkles className="w-5 h-5 text-amber-200 group-hover:rotate-12 transition-transform" />
            </button>

            <button
              onClick={() => {
                playSparkleChime();
                setActiveLetterTab('heart');
                setIsLetterModalOpen(true);
              }}
              className="mt-3 text-xs font-black text-rose-600 hover:text-rose-700 bg-white/90 hover:bg-white px-5 py-2.5 rounded-full border border-pink-200 shadow-md transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <Heart className="w-4 h-4 fill-rose-500 text-rose-500 animate-pulse" />
              <span>
                Touch &amp; Fill the Eternal Heart (Joseph &amp; Ritu, infinity) ✨
              </span>
            </button>

            <p className="text-center text-xs text-[#8a685e] font-bold mt-2">
              (Packed with love letters, couple memories, vouchers, and surprises from Jojo boy)
            </p>
          </div>
        )}

        {/* Flap Guide */}
        {!isBoxFullyOpened && (
          <div className="mt-4 text-center">
            <button
              onClick={handleBoxClick}
              className="text-xs font-bold text-pink-600 hover:text-pink-700 bg-white/70 px-4 py-1.5 rounded-full border border-pink-200 transition-all shadow-xs"
            >
              👆 Tap box ({4 - flapsOpened} flaps left to open)
            </button>
          </div>
        )}

        {/* Next Button */}
        <div className="mt-8 flex flex-col items-center">
          <button
            onClick={() => {
              playSparkleChime();
              onNavigateToMemories();
            }}
            className="group flex items-center justify-center gap-2.5 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:to-rose-600 text-white font-black text-sm sm:text-base px-8 py-3.5 rounded-full shadow-xl shadow-pink-300/40 transition-all transform hover:scale-105 active:scale-95 ring-4 ring-pink-200/60"
          >
            <span>Next</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <span className="text-[11px] text-[#8a685e] font-bold mt-1.5">
            (Showcase our funniest photos &amp; final surprise 💕)
          </span>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full max-w-md text-center py-2 text-xs text-[#8a685e] font-semibold">
        <span>From Jojo boy to his sweet girl Ritu ❤️ • Always and forever</span>
      </footer>

      {/* Letters and Gifts Modal */}
      {isLetterModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-[#fffdfa] rounded-3xl w-full max-w-4xl max-h-[92vh] shadow-2xl border-4 border-pink-200 overflow-hidden flex flex-col animate-in zoom-in-95 duration-200 my-auto">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white p-4 sm:p-5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Mail className="w-6 h-6 fill-white text-pink-500" />
                <div>
                  <h2 className="text-lg sm:text-xl font-black">
                    Jojo boy's Love Letters for Ritu ❤️
                  </h2>
                  <p className="text-xs text-pink-100 font-medium">
                    Every word written straight from the heart
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsLetterModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Navigation Tabs */}
            <div className="flex items-center gap-2 p-3 bg-pink-50/70 border-b border-pink-100 overflow-x-auto scrollbar-none">
              {[
                { id: 'main', label: 'Dear Ritu ❤️ (Letter & Heart)' },
                { id: 'heart', label: 'Touch & Hold Heart 💖' },
                { id: 'reasons', label: '10 Reasons Why I Love You 💖' },
                { id: 'vouchers', label: 'Love Vouchers 🎟️' },
                { id: 'gifts', label: 'Unwrap Gifts 🎁' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    playBubblePop();
                    setActiveLetterTab(tab.id as any);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                    activeLetterTab === tab.id
                      ? 'bg-pink-500 text-white shadow-md shadow-pink-200'
                      : 'bg-white text-[#7d564b] hover:bg-pink-100/60'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Modal Content */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-[#4a352c] text-sm leading-relaxed">
              {activeLetterTab === 'main' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center font-['Nunito',sans-serif]">
                  {/* Love Letter */}
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex items-center justify-between text-xs text-pink-600 font-bold border-b border-pink-100 pb-2">
                      <span>Date: Today &amp; Forever</span>
                      <span>To: My Sweetest Ritu ❤️</span>
                    </div>

                    <p className="font-['Playfair_Display',serif] text-base sm:text-lg italic text-[#5a3625] leading-relaxed">
                      "My sweetest Ritu ❤️,
                    </p>

                    <p>
                      I made this entire little world for you because seeing you sad or bored hurts my heart, and making you smile is genuinely my favorite thing in the universe.
                    </p>

                    <p>
                      Whenever the day feels heavy, when people or work overwhelm you, or when you just feel a little alone on that bench—I want you to come here and remember that you have me. You have someone whose day brightens the second you say hello.
                    </p>

                    <p>
                      You are so beautiful, so capable, and so wonderfully gentle. Please don't be hard on yourself today. Take a deep breath, eat your favorite comfort food, rest your pretty head, and know that your boy is loving you every single second.
                    </p>

                    <div className="pt-3 border-t border-pink-100 flex flex-col items-end">
                      <p className="font-['Sacramento',cursive] text-2xl text-pink-600">
                        With all my love,
                      </p>
                      <p className="font-extrabold text-[#4a352c] text-sm">
                        Your Jojo boy 🧸❤️
                      </p>
                    </div>
                  </div>

                  {/* Interactive Heart */}
                  <div className="lg:col-span-5 bg-gradient-to-b from-pink-50/60 to-rose-50/50 rounded-3xl p-4 border-2 border-pink-200/80 shadow-inner flex flex-col items-center justify-center">
                    <EternalHeart />
                  </div>
                </div>
              )}

              {activeLetterTab === 'heart' && (
                <div className="py-2 flex flex-col items-center justify-center">
                  <EternalHeart />
                </div>
              )}

              {activeLetterTab === 'reasons' && (
                <div className="space-y-3">
                  <h3 className="text-sm font-black text-pink-600 uppercase tracking-wider mb-2">
                    Why Ritu ❤️ Means The Entire World To Jojo:
                  </h3>
                  {[
                    '1. The adorable way your eyes sparkle when you smile.',
                    '2. How you make even boring ordinary moments feel magical.',
                    '3. Your pure, caring heart that always thinks of others.',
                    "4. How cute you look when you're sleepy or cozy in your sweaters.",
                    "5. Your laugh—it's my favorite soundtrack in the whole world.",
                    "6. The comfort of knowing you're in my life.",
                    '7. How smart, capable, and hardworking you are, even when you doubt yourself.',
                    '8. The way you make me feel safe, loved, and wanted.',
                    '9. Your little pouts and facial expressions that melt me instantly.',
                    '10. Simply because you are Ritu, my girl, my happiness, my home.',
                  ].map((reason, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-pink-50/70 rounded-xl border border-pink-100 font-bold text-xs sm:text-sm text-[#593b32] flex items-center gap-2"
                    >
                      <span className="text-base">💖</span>
                      <span>{reason}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeLetterTab === 'vouchers' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { title: 'Unlimited Bear Hugs 🫂', desc: 'Redeemable anytime Ritu feels tired or sad. Never expires!' },
                    { title: 'Sweet Dessert & Snack Date 🍦', desc: 'Jojo buys your favorite cravings without questions.' },
                    { title: '10,000 Forehead Kisses 💋', desc: 'Valid for whenever you need instant comfort.' },
                    { title: 'Late Night Movie & Cuddle 🎬', desc: 'You pick whatever movie, Jojo brings blankets & hugs.' },
                    { title: 'Win Any Argument Pass 👑', desc: 'You are automatically right because you are the princess!' },
                    { title: 'Listen & Vent Session ☕', desc: 'Jojo listens attentively and rubs your back.' },
                  ].map((v, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 bg-gradient-to-br from-amber-50 to-pink-50 rounded-2xl border-2 border-dashed border-pink-300 relative shadow-xs"
                    >
                      <div className="text-xs font-black text-pink-600 flex items-center justify-between mb-1">
                        <span>OFFICIAL COUPON</span>
                        <span>🎟️</span>
                      </div>
                      <h4 className="font-extrabold text-sm text-[#4a352c]">
                        {v.title}
                      </h4>
                      <p className="text-xs text-[#8a685e] mt-1">{v.desc}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeLetterTab === 'gifts' && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    {
                      id: 'g1',
                      box: '🎁 Mint Green Gift',
                      inside:
                        '🧸 Fluffy Teddy Bear with Jojo\'s scent and a recorded "I love you Ritu!" voice note',
                    },
                    {
                      id: 'g2',
                      box: '🎁 Lavender Gift',
                      inside: '🍫 Box of sweet chocolates and heart shaped candies',
                    },
                    {
                      id: 'g3',
                      box: '🎁 Peach Gift',
                      inside:
                        '✨ Promise ring necklace to keep close to your heart forever',
                    },
                  ].map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleUnwrapGift(item.id)}
                      className="p-4 rounded-2xl bg-pink-50/60 border border-pink-200 text-center cursor-pointer transition-all hover:scale-105 active:scale-95 shadow-xs"
                    >
                      {!unwrappedGifts[item.id] ? (
                        <div className="py-4">
                          <span className="text-4xl animate-bounce duration-700">
                            🎁
                          </span>
                          <p className="text-xs font-black text-[#593b32] mt-2">
                            {item.box}
                          </p>
                          <span className="text-[10px] text-pink-600 font-extrabold underline mt-1 inline-block">
                            Tap to unwrap!
                          </span>
                        </div>
                      ) : (
                        <div className="py-2 animate-in zoom-in-95 duration-200">
                          <span className="text-3xl">✨🎉</span>
                          <p className="text-xs font-black text-pink-600 mt-2">
                            Unwrapped!
                          </p>
                          <p className="text-xs font-bold text-[#593b32] mt-1">
                            {item.inside}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-3.5 bg-stone-50 border-t border-pink-100 flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs text-stone-500 font-semibold">
                Ritu ❤️ &amp; Jojo boy
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsLetterModalOpen(false)}
                  className="px-4 py-2 rounded-full text-xs font-bold text-stone-600 hover:bg-stone-200/60"
                >
                  Close Letters 💌
                </button>

                <button
                  onClick={() => {
                    setIsLetterModalOpen(false);
                    playSparkleChime();
                    onNavigateToMemories();
                  }}
                  className="flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-black bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-md shadow-pink-200 transition-transform hover:scale-105 active:scale-95"
                >
                  <span>Next: Our Funniest Photos</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
