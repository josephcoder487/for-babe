import React, { useState, useRef, useEffect } from 'react';
import { Heart, Sparkles, Flame, ShieldAlert, Award } from 'lucide-react';
import { playHeartbeat, playSparkleChime } from '../utils/audio';

interface VirtualHugProps {
  girlfriendName: string;
  boyfriendName: string;
}

export const VirtualHug: React.FC<VirtualHugProps> = ({ girlfriendName, boyfriendName }) => {
  const [hugCount, setHugCount] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('virtual_hug_count');
      return saved ? parseInt(saved, 10) : 12;
    } catch {
      return 12;
    }
  });

  const [isHolding, setIsHolding] = useState<boolean>(false);
  const [holdProgress, setHoldProgress] = useState<number>(0);
  const [hugDelivered, setHugDelivered] = useState<boolean>(false);
  const holdIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('virtual_hug_count', hugCount.toString());
    } catch (e) {
      console.warn('Failed saving hug count', e);
    }
  }, [hugCount]);

  const startHold = () => {
    setIsHolding(true);
    setHugDelivered(false);
    playHeartbeat();

    // Trigger subtle device vibration if available
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate([100, 50, 100]);
      } catch {}
    }

    let progress = 0;
    holdIntervalRef.current = window.setInterval(() => {
      progress += 5;
      setHoldProgress(progress);

      if (progress % 25 === 0) {
        playHeartbeat();
      }

      if (progress >= 100) {
        if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
        setIsHolding(false);
        setHoldProgress(0);
        setHugDelivered(true);
        setHugCount((prev) => prev + 1);
        playSparkleChime();
      }
    }, 50);
  };

  const endHold = () => {
    if (holdIntervalRef.current) {
      clearInterval(holdIntervalRef.current);
      holdIntervalRef.current = null;
    }
    setIsHolding(false);
    setHoldProgress(0);
  };

  const instantHug = () => {
    playSparkleChime();
    playHeartbeat();
    setHugCount((prev) => prev + 1);
    setHugDelivered(true);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white/90 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-xl border border-pink-100">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Character Portrait holding glowing heart */}
        <div className="md:col-span-5 flex flex-col items-center">
          <div className="relative group">
            {/* Pulsing Aura */}
            <div className="absolute -inset-3 rounded-3xl bg-gradient-to-r from-pink-300 via-rose-300 to-amber-200 blur-xl opacity-60 animate-pulse pointer-events-none" />

            <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-3xl overflow-hidden shadow-xl border-4 border-white">
              <img
                src="/src/assets/images/girl_sending_love_1792085230724.jpg"
                alt="Girl happily holding glowing heart"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transform transition-transform group-hover:scale-105"
              />

              {/* Heart badge */}
              <div className="absolute bottom-3 right-3 bg-pink-500/90 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-black shadow flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 fill-white animate-bounce" />
                <span>Warm Love</span>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 text-xs font-bold text-[#8a685e]">
            <Award className="w-4 h-4 text-pink-500" />
            <span>Total Hugs Sent: <strong className="text-pink-600 text-sm">{hugCount}</strong></span>
          </div>
        </div>

        {/* Interactive Hug Station */}
        <div className="md:col-span-7 flex flex-col justify-center">
          <div className="flex items-center gap-2 text-pink-500 font-extrabold text-xs uppercase tracking-wider mb-1">
            <Heart className="w-4 h-4 fill-pink-500" />
            <span>Virtual Comfort Center</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#4a352c] mb-2">
            Emergency Warm Hug Machine 🫂
          </h2>
          <p className="text-sm text-[#8a685e] mb-6 leading-relaxed">
            Press and hold the button below to receive an authentic, tight, warm virtual hug from{' '}
            <strong className="text-pink-600">{boyfriendName || 'your boyfriend'}</strong>. Feel the heartbeat and let all the stress melt away.
          </p>

          {/* Hold Button */}
          <div className="flex flex-col items-center sm:items-start gap-4">
            <div className="relative w-full max-w-sm">
              <button
                onMouseDown={startHold}
                onMouseUp={endHold}
                onMouseLeave={endHold}
                onTouchStart={startHold}
                onTouchEnd={endHold}
                className={`relative w-full overflow-hidden select-none py-5 px-8 rounded-2xl font-black text-white text-base sm:text-lg shadow-xl transition-all transform active:scale-95 ${
                  isHolding
                    ? 'bg-rose-600 shadow-rose-300 scale-102 ring-4 ring-pink-300'
                    : 'bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:opacity-95 shadow-pink-200'
                }`}
              >
                {/* Hold Progress Bar */}
                <div
                  className="absolute inset-0 bg-white/25 transition-all duration-75 origin-left"
                  style={{ width: `${holdProgress}%` }}
                />

                <span className="relative z-10 flex items-center justify-center gap-3">
                  <Heart className={`w-6 h-6 fill-white ${isHolding ? 'animate-ping' : 'animate-pulse'}`} />
                  <span>{isHolding ? `Holding Tight... ${holdProgress}%` : 'Press & Hold for Hug 🫂'}</span>
                </span>
              </button>

              {/* Progress track */}
              {isHolding && (
                <div className="w-full bg-stone-200 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div
                    className="bg-pink-500 h-full transition-all duration-75"
                    style={{ width: `${holdProgress}%` }}
                  />
                </div>
              )}
            </div>

            <button
              onClick={instantHug}
              className="text-xs font-bold text-pink-600 hover:text-pink-700 underline flex items-center gap-1"
            >
              <span>Or click here for an instant quick squeeze! ✨</span>
            </button>
          </div>

          {/* Hug Delivery Message */}
          {hugDelivered && (
            <div className="mt-5 p-4 rounded-2xl bg-gradient-to-r from-pink-50 via-rose-50 to-amber-50 border border-pink-200 text-[#593b32] animate-in fade-in slide-in-from-bottom-2 duration-300">
              <p className="text-sm font-extrabold flex items-center gap-2">
                <span>💖</span>
                <span>Warm Hug Delivered Successfully!</span>
              </p>
              <p className="text-xs text-[#8a685e] mt-1">
                "Wrap your arms around yourself and squeeze for a second. That's me wrapping you in warmth, whispering that everything is going to be alright, {girlfriendName || 'my sweetheart'}."
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
