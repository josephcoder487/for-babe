import React, { useState, useRef, useEffect } from 'react';
import { Heart, Sparkles, Infinity as InfinityIcon, RotateCw } from 'lucide-react';
import { playHeartbeat, playCelebration, playSparkleChime } from '../utils/audio';

interface EternalHeartProps {
  onFulfilled?: () => void;
}

export const EternalHeart: React.FC<EternalHeartProps> = ({ onFulfilled }) => {
  const [fillProgress, setFillProgress] = useState<number>(0);
  const [isHolding, setIsHolding] = useState<boolean>(false);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [isFulfilled, setIsFulfilled] = useState<boolean>(false);
  const holdIntervalRef = useRef<number | null>(null);

  const startTouching = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (isFulfilled) return;

    setIsHolding(true);
    playHeartbeat();

    // Subtle vibration on mobile devices
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate([60, 40, 60]);
      } catch {}
    }

    let progress = fillProgress;
    holdIntervalRef.current = window.setInterval(() => {
      progress = Math.min(100, progress + 3);
      setFillProgress(progress);

      if (progress % 20 === 0) {
        playHeartbeat();
      }

      if (progress >= 100) {
        if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
        setIsHolding(false);
        setIsFulfilled(true);
        playCelebration();
        playSparkleChime();

        // Trigger 3D flip after brief pause for full heart glow
        setTimeout(() => {
          setIsFlipped(true);
          if (onFulfilled) onFulfilled();
        }, 500);
      }
    }, 45);
  };

  const stopTouching = () => {
    if (holdIntervalRef.current) {
      clearInterval(holdIntervalRef.current);
      holdIntervalRef.current = null;
    }
    setIsHolding(false);
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    stopTouching();
    setIsFlipped(false);
    setIsFulfilled(false);
    setFillProgress(0);
    playSparkleChime();
  };

  const toggleFlip = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFulfilled) {
      playSparkleChime();
      setIsFlipped((prev) => !prev);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center p-4">
      {/* Instructions header */}
      <div className="text-center mb-3">
        <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-pink-600 bg-pink-100/80 px-3 py-1 rounded-full mb-1">
          <Sparkles className="w-3.5 h-3.5 animate-spin" />
          <span>Interactive Eternal Heart</span>
          <Sparkles className="w-3.5 h-3.5 animate-spin" />
        </div>
        <p className="text-xs sm:text-sm font-bold text-[#593b32]">
          {!isFulfilled
            ? 'Touch & keep holding the heart to fill it with our love! 💖'
            : 'Our love has fulfilled the heart! ✨ Tap to flip it anytime.'}
        </p>
      </div>

      {/* 3D Flip Card Container */}
      <div
        className="relative w-64 h-64 sm:w-72 sm:h-72 select-none"
        style={{ perspective: '1200px' }}
      >
        <div
          onClick={toggleFlip}
          className="relative w-full h-full transition-transform duration-1000 transform-gpu cursor-pointer"
          style={{
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          {/* FRONT FACE: TOUCH TO FILL HEART */}
          <div
            onMouseDown={startTouching}
            onMouseUp={stopTouching}
            onMouseLeave={stopTouching}
            onTouchStart={startTouching}
            onTouchEnd={stopTouching}
            className={`absolute inset-0 rounded-3xl bg-gradient-to-br from-[#fff7f5] via-[#ffeff0] to-[#ffe5e8] border-4 p-4 shadow-xl flex flex-col items-center justify-center transition-all ${
              isHolding
                ? 'border-pink-400 shadow-pink-300 scale-102 ring-4 ring-pink-200'
                : 'border-pink-200 shadow-stone-200'
            }`}
            style={{ backfaceVisibility: 'hidden' }}
          >
            {/* Pulsing Aura Behind Heart */}
            <div
              className={`absolute inset-8 rounded-full blur-xl transition-all duration-300 pointer-events-none ${
                isHolding
                  ? 'bg-rose-400/40 scale-110'
                  : 'bg-pink-300/20 scale-95'
              }`}
            />

            {/* Heart SVG with dynamic liquid fill */}
            <div className="relative w-40 h-40 flex items-center justify-center">
              <svg
                viewBox="0 0 100 90"
                className={`w-full h-full filter drop-shadow-md transition-transform duration-200 ${
                  isHolding ? 'scale-105' : 'scale-100'
                }`}
              >
                <defs>
                  {/* Clip path matching heart shape */}
                  <clipPath id="heartClip">
                    <path d="M50,85 C20,60 0,40 0,22 C0,10 10,0 25,0 C36,0 45,7 50,15 C55,7 64,0 75,0 C90,0 100,10 100,22 C100,40 80,60 50,85 Z" />
                  </clipPath>

                  {/* Gradient for heart fill */}
                  <linearGradient id="heartGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#f43f5e" />
                    <stop offset="50%" stopColor="#ec4899" />
                    <stop offset="100%" stopColor="#fb7185" />
                  </linearGradient>
                </defs>

                {/* Empty Heart Outline Background */}
                <path
                  d="M50,85 C20,60 0,40 0,22 C0,10 10,0 25,0 C36,0 45,7 50,15 C55,7 64,0 75,0 C90,0 100,10 100,22 C100,40 80,60 50,85 Z"
                  fill="#fdf2f4"
                  stroke="#fda4af"
                  strokeWidth="3"
                />

                {/* Filled Heart Portion (Controlled by fillProgress %) */}
                <g clipPath="url(#heartClip)">
                  <rect
                    x="0"
                    y={`${100 - fillProgress}%`}
                    width="100%"
                    height="100%"
                    fill="url(#heartGradient)"
                    className="transition-all duration-75 ease-out"
                  />
                  {/* Shimmer wave effect */}
                  {fillProgress > 0 && fillProgress < 100 && (
                    <circle
                      cx="50"
                      cy={`${100 - fillProgress}%`}
                      r="20"
                      fill="#ffffff"
                      opacity="0.3"
                      className="animate-ping"
                    />
                  )}
                </g>

                {/* Heart Border Overlay */}
                <path
                  d="M50,85 C20,60 0,40 0,22 C0,10 10,0 25,0 C36,0 45,7 50,15 C55,7 64,0 75,0 C90,0 100,10 100,22 C100,40 80,60 50,85 Z"
                  fill="none"
                  stroke="#e11d48"
                  strokeWidth="2.5"
                />
              </svg>

              {/* Heartbeat pulse icon in center */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-white">
                <span
                  className={`text-sm sm:text-base font-black filter drop-shadow-md ${
                    fillProgress > 45 ? 'text-white' : 'text-rose-600'
                  }`}
                >
                  {fillProgress}%
                </span>
                {isHolding && (
                  <span className="text-[10px] font-black uppercase tracking-wider animate-pulse text-white drop-shadow">
                    Filling...
                  </span>
                )}
              </div>
            </div>

            {/* Hold prompt pill */}
            <div className="mt-3 bg-white/90 px-4 py-1.5 rounded-full border border-pink-200 shadow-xs text-xs font-black text-pink-600 flex items-center gap-1.5">
              <Heart className={`w-3.5 h-3.5 fill-pink-500 ${isHolding ? 'animate-ping' : 'animate-bounce'}`} />
              <span>{isHolding ? 'Keep holding tight...' : 'Touch & Hold Here 👇'}</span>
            </div>
          </div>

          {/* BACK FACE: FLIPPED FULLFILLED HEART WITH "Joseph & Ritu, infinity" */}
          <div
            className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#fff1f2] via-[#ffe4e6] to-[#fecdd3] border-4 border-amber-300 p-5 shadow-2xl flex flex-col items-center justify-between text-center overflow-hidden"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            {/* Shimmering Golden Background Pattern */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-200/50 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-pink-300/40 rounded-full blur-2xl pointer-events-none" />

            {/* Top Badge */}
            <div className="flex items-center gap-1 text-[11px] font-black uppercase tracking-widest text-amber-700 bg-amber-100/90 border border-amber-300/60 px-3 py-1 rounded-full shadow-xs">
              <Sparkles className="w-3.5 h-3.5 fill-amber-500 text-amber-600" />
              <span>Fulfilled With Pure Love</span>
              <Sparkles className="w-3.5 h-3.5 fill-amber-500 text-amber-600" />
            </div>

            {/* Glowing Golden / Rose Heart Emblem with Infinity Symbol */}
            <div className="relative my-auto flex flex-col items-center justify-center">
              <div className="relative">
                {/* Radiant Glow */}
                <div className="absolute -inset-4 bg-gradient-to-r from-rose-400 via-amber-300 to-pink-500 rounded-full blur-lg opacity-70 animate-pulse" />

                <div className="relative w-28 h-28 bg-gradient-to-tr from-rose-500 via-pink-500 to-rose-400 rounded-full shadow-xl border-4 border-amber-200 flex flex-col items-center justify-center p-2 text-white">
                  {/* Infinity Symbol Icon */}
                  <InfinityIcon className="w-12 h-12 text-amber-100 stroke-[2.5] filter drop-shadow animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-amber-100 mt-0.5">
                    INFINITY
                  </span>
                </div>
              </div>

              {/* Exact Requested Wording: Joseph & Ritu, infinity */}
              <div className="mt-3 text-center">
                <h3 className="text-xl sm:text-2xl font-black text-[#4a2e22] tracking-wide font-['Playfair_Display',serif]">
                  Joseph & Ritu
                </h3>
                <p className="text-sm font-extrabold text-pink-600 tracking-widest uppercase flex items-center justify-center gap-1.5 mt-0.5">
                  <span>infinity</span>
                  <Heart className="w-3.5 h-3.5 fill-pink-600" />
                </p>
                <p className="text-[11px] text-[#8a5b4c] font-semibold italic mt-0.5">
                  "Beyond time, beyond worlds, forever yours."
                </p>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleFlip}
                className="text-[11px] font-bold text-pink-700 bg-white/80 hover:bg-white px-3 py-1 rounded-full border border-pink-200 shadow-xs transition-transform hover:scale-105"
              >
                Tap to flip again 🔄
              </button>
              <button
                onClick={handleReset}
                title="Fill heart again"
                className="text-[11px] font-bold text-stone-500 hover:text-stone-700 bg-white/60 hover:bg-white px-2.5 py-1 rounded-full border border-stone-200 shadow-xs"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
