import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Heart, RotateCcw, Volume2, VolumeX, ChevronRight } from 'lucide-react';
import { playSparkleChime, toggleMusicBox } from '../utils/audio';
import sadBenchImage from '../assets/images/girl_bench_sad_1792085229754.jpg';
import smilingStandingImage from '../assets/images/girl_smiling_standing_1792085230106.jpg';

interface Particle {
  id: number;
  x: number;
  y: number;
  emoji: string;
  angle: number;
  speed: number;
  size: number;
  rotation: number;
}

interface BenchSceneProps {
  girlfriendName: string;
  boyfriendName: string;
  onExploreMore: () => void;
}

export const BenchScene: React.FC<BenchSceneProps> = ({
  girlfriendName,
  boyfriendName,
  onExploreMore,
}) => {
  const [isSmiling, setIsSmiling] = useState<boolean>(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [clickCount, setClickCount] = useState<number>(0);
  const [isPlayingMusic, setIsPlayingMusic] = useState<boolean>(false);
  const [dialogueIndex, setDialogueIndex] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const sweetDialogues = [
    `Yay! You're here, Jojo boy! 🥰 Ritu was so bored and sad sitting alone, but your touch makes everything bright again!`,
    `Did you know, Jojo? Even thinking about your smile makes Ritu's heart do a little happy hop! 🌸`,
    `You are my favorite person in the entire world, Jojo boy! Don't you ever forget it! 💖`,
    `Every time you tap the screen, Ritu feels all your warm love reaching her! ✨`,
    `Look below! Jojo boy has a special surprise box prepared just for Ritu ❤️! 🎁`,
  ];

  const handleScreenClick = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    // Determine click position
    let clientX = window.innerWidth / 2;
    let clientY = window.innerHeight / 2;

    if ('clientX' in e) {
      clientX = e.clientX;
      clientY = e.clientY;
    } else if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    }

    // Play sparkling chime
    playSparkleChime();

    // Trigger smiling and getting up
    if (!isSmiling) {
      setIsSmiling(true);
    } else {
      setDialogueIndex((prev) => (prev + 1) % sweetDialogues.length);
    }

    setClickCount((prev) => prev + 1);

    // Create burst of sparkles and hearts
    const emojis = ['💖', '✨', '🌸', '🌷', '⭐', '🥰', '💕', '🎀'];
    const newParticles: Particle[] = Array.from({ length: 14 }).map((_, i) => ({
      id: Date.now() + i,
      x: clientX,
      y: clientY,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      angle: (i / 14) * 2 * Math.PI + (Math.random() - 0.5),
      speed: 2 + Math.random() * 5,
      size: 18 + Math.floor(Math.random() * 16),
      rotation: Math.random() * 360,
    }));

    setParticles((prev) => [...prev.slice(-30), ...newParticles]);
  };

  // Particle cleanup timer
  useEffect(() => {
    if (particles.length === 0) return;
    const timer = setTimeout(() => {
      setParticles([]);
    }, 1200);
    return () => clearTimeout(timer);
  }, [particles]);

  const handleToggleMusic = (e: React.MouseEvent) => {
    e.stopPropagation();
    const state = toggleMusicBox((playing) => setIsPlayingMusic(playing));
    setIsPlayingMusic(state);
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSmiling(false);
  };

  return (
    <div
      ref={containerRef}
      onClick={handleScreenClick}
      className="relative w-full min-h-screen bg-gradient-to-b from-[#fff5f2] via-[#fef2ee] to-[#fcebe6] flex flex-col items-center justify-between overflow-hidden cursor-pointer select-none p-4 md:p-6"
    >
      {/* Background Floating Autumn / Blossom Petals */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-10 left-[10%] w-5 h-5 bg-[#ffccd5]/60 rounded-full blur-[1px] animate-bounce duration-1000" />
        <div className="absolute top-[20%] right-[12%] text-2xl animate-pulse opacity-40">🌸</div>
        <div className="absolute top-[45%] left-[8%] text-xl animate-pulse opacity-30">✨</div>
        <div className="absolute top-[15%] left-[40%] text-sm animate-bounce opacity-40">🍂</div>
        <div className="absolute top-[60%] right-[18%] text-2xl animate-pulse opacity-40">🌷</div>
        <div className="absolute -bottom-10 right-[30%] w-64 h-64 bg-pink-200/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -top-10 -left-10 w-72 h-72 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Top Bar with Music Box & Sweet Status */}
      <header className="relative z-20 w-full max-w-4xl flex items-center justify-between pt-2 px-2">
        <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-sm border border-pink-100 text-xs sm:text-sm font-semibold text-[#8b5e54]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Made with ❤️ for {girlfriendName || 'My Love'}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleToggleMusic}
            title={isPlayingMusic ? 'Pause cozy music box' : 'Play cozy music box melody'}
            className="flex items-center gap-1.5 bg-white/90 hover:bg-white text-[#8b5e54] px-3.5 py-1.5 rounded-full shadow-sm border border-pink-100 text-xs sm:text-sm font-semibold transition-all transform hover:scale-105 active:scale-95"
          >
            {isPlayingMusic ? (
              <>
                <Volume2 className="w-4 h-4 text-pink-500 animate-pulse" />
                <span className="hidden sm:inline">Cozy Music Box: Playing 🎵</span>
                <span className="sm:hidden">🎵</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-stone-400" />
                <span className="hidden sm:inline">Cozy Music Box: Paused</span>
                <span className="sm:hidden">Music</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Center Interactive Character Area */}
      <main className="relative z-10 w-full max-w-2xl flex flex-col items-center justify-center my-auto py-4">
        {/* Thought / Speech Bubble */}
        <div className="relative mb-4 sm:mb-6 w-full max-w-md px-4 transition-all duration-500 transform">
          {!isSmiling ? (
            <div className="bg-white/90 backdrop-blur-md border border-[#f3d9d3] rounded-3xl p-4 sm:p-5 shadow-lg text-center relative animate-pulse">
              <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-5 h-5 bg-white rotate-45 border-r border-b border-[#f3d9d3]" />
              <p className="text-[#6d5045] font-semibold text-sm sm:text-base leading-relaxed">
                "Haaah... today feels so slow and a little lonely on this bench..." 🍂
              </p>
              <div className="mt-2 flex items-center justify-center gap-1.5 text-xs font-bold text-pink-500 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 animate-spin" />
                <span>Tap anywhere on the screen to cheer her up!</span>
                <Sparkles className="w-3.5 h-3.5 animate-spin" />
              </div>
            </div>
          ) : (
            <div className="bg-white/95 backdrop-blur-md border-2 border-pink-300 rounded-3xl p-4 sm:p-6 shadow-xl text-center relative transition-all animate-in fade-in duration-300">
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-white rotate-45 border-r-2 border-b-2 border-pink-300" />
              <div className="flex items-center justify-center gap-1 mb-1 text-pink-500 text-xs font-black uppercase tracking-wider">
                <Heart className="w-3.5 h-3.5 fill-pink-500 animate-bounce" />
                <span>Cheered up with your magic touch!</span>
                <Heart className="w-3.5 h-3.5 fill-pink-500 animate-bounce" />
              </div>
              <p className="text-[#593b32] font-extrabold text-base sm:text-lg leading-relaxed">
                {sweetDialogues[dialogueIndex]}
              </p>
              <p className="text-xs text-[#a3796d] mt-2">
                (Tap anywhere again for another sweet message! ✨)
              </p>
            </div>
          )}
        </div>

        {/* Character Card / Art Frame */}
        <div className="relative group">
          {/* Soft Glow Halo */}
          <div
            className={`absolute -inset-4 rounded-full blur-2xl transition-all duration-700 pointer-events-none ${
              isSmiling
                ? 'bg-gradient-to-r from-pink-300 via-amber-200 to-rose-300 opacity-70 scale-105'
                : 'bg-stone-300/40 opacity-40 scale-95'
            }`}
          />

          <div
            className={`relative w-72 h-72 sm:w-88 sm:h-88 md:w-96 md:h-96 rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 border-4 ${
              isSmiling
                ? 'border-pink-300 scale-100 shadow-pink-200/60 ring-8 ring-pink-100/60'
                : 'border-white/80 scale-95 shadow-stone-300/60 hover:scale-[0.98]'
            } bg-white`}
          >
            {/* Sad Bored Girl sitting on bench */}
            <img
              src={sadBenchImage}
              alt="Girl sitting sad and bored on park bench"
              referrerPolicy="no-referrer"
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                isSmiling
                  ? 'opacity-0 scale-95 pointer-events-none'
                  : 'opacity-100 scale-100'
              }`}
            />

            {/* Smiling standing girl getting up */}
            <img
              src={smilingStandingImage}
              alt="Girl smiling brightly and standing up with joy"
              referrerPolicy="no-referrer"
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                isSmiling
                  ? 'opacity-100 scale-100'
                  : 'opacity-0 scale-105 pointer-events-none'
              }`}
            />

            {/* Tap indicator pill when sad */}
            {!isSmiling && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-md border border-pink-200 text-xs font-bold text-[#8b5e54] flex items-center gap-2 animate-bounce">
                <span className="text-base">👆</span>
                <span>Click me to wake up my smile!</span>
              </div>
            )}
          </div>
        </div>

        {/* Action Controls & Sweet Counters */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {isSmiling ? (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onExploreMore();
                }}
                className="group flex items-center gap-2.5 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:to-rose-600 text-white font-extrabold px-7 py-3.5 rounded-full shadow-xl shadow-pink-400/40 transition-all transform hover:scale-105 active:scale-95 text-sm sm:text-base ring-4 ring-pink-200/60 animate-bounce duration-1000"
              >
                <Heart className="w-5 h-5 fill-white group-hover:scale-110 transition-transform" />
                <span>Do you wanna open your boyfriend's gift? 🎁</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={handleReset}
                title="Watch her cheer up again"
                className="flex items-center gap-1.5 bg-white/80 hover:bg-white text-[#7d564b] px-4 py-3 rounded-full shadow border border-pink-100 text-xs sm:text-sm font-semibold transition-all hover:scale-105 active:scale-95"
              >
                <RotateCcw className="w-4 h-4 text-stone-500" />
                <span>Sit Down Again</span>
              </button>
            </>
          ) : (
            <div className="text-center">
              <p className="text-xs text-[#a07468] font-medium bg-white/60 px-4 py-1.5 rounded-full border border-pink-100 inline-block">
                ✨ Anywhere you tap or click on the screen will cheer her up instantly!
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Floating Particles generated by clicking */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="fixed pointer-events-none select-none z-50 font-bold transition-transform duration-1000 ease-out"
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            fontSize: `${p.size}px`,
            transform: `translate(${Math.cos(p.angle) * p.speed * 28}px, ${
              Math.sin(p.angle) * p.speed * 28 - 45
            }px) rotate(${p.rotation}deg)`,
            opacity: 0,
            transition: 'transform 0.9s cubic-bezier(0.1, 0.8, 0.3, 1), opacity 0.9s ease-out',
          }}
        >
          {p.emoji}
        </div>
      ))}
    </div>
  );
};
