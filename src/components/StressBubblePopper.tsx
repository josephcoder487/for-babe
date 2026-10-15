import React, { useState } from 'react';
import { Sparkles, Smile, RefreshCw, Trophy } from 'lucide-react';
import { BubbleItem } from '../types';
import { playBubblePop, playSparkleChime } from '../utils/audio';

const INITIAL_BUBBLES: BubbleItem[] = [
  { id: 'b1', text: 'Overthinking 💭', reward: 'Your mind is safe with me. You can let go now. 🌸', color: 'from-pink-200 to-rose-200 text-rose-800', x: 12, y: 15, popped: false },
  { id: 'b2', text: 'Tiredness 😴', reward: 'Go cozy up under the blankets, you worked so hard today! 🛌', color: 'from-indigo-100 to-purple-200 text-purple-800', x: 65, y: 18, popped: false },
  { id: 'b3', text: 'Sad Vibes 🥺', reward: 'Here is a 1000W dose of love and a huge bear hug! 🫂', color: 'from-blue-100 to-cyan-200 text-cyan-800', x: 25, y: 55, popped: false },
  { id: 'b4', text: 'Work & School Stress 📚', reward: 'You are so much more than any grades, work, or tasks. Proud of you! ⭐', color: 'from-amber-100 to-orange-200 text-amber-800', x: 72, y: 58, popped: false },
  { id: 'b5', text: 'Loneliness ☁️', reward: 'I am always right here in your corner cheering for you. 💕', color: 'from-rose-100 to-pink-200 text-pink-800', x: 42, y: 35, popped: false },
  { id: 'b6', text: 'Self-Doubt 💔', reward: 'You are capable, radiant, and undeniably brilliant. Look at you shine! ✨', color: 'from-emerald-100 to-teal-200 text-teal-800', x: 80, y: 32, popped: false },
  { id: 'b7', text: 'Grumpy Mood 😾', reward: 'Your favorite snack and cuddles are on their way! 🍦', color: 'from-violet-100 to-fuchsia-200 text-fuchsia-800', x: 15, y: 80, popped: false },
];

export const StressBubblePopper: React.FC<{ girlfriendName: string }> = ({ girlfriendName }) => {
  const [bubbles, setBubbles] = useState<BubbleItem[]>(INITIAL_BUBBLES);
  const [revealedRewards, setRevealedRewards] = useState<string[]>([]);

  const handlePop = (id: string, reward: string) => {
    playBubblePop();
    setBubbles((prev) =>
      prev.map((b) => (b.id === id ? { ...b, popped: true } : b))
    );
    setRevealedRewards((prev) => [reward, ...prev]);

    // Check if all popped
    const remaining = bubbles.filter((b) => b.id !== id && !b.popped).length;
    if (remaining === 0) {
      setTimeout(() => {
        playSparkleChime();
      }, 300);
    }
  };

  const handleReset = () => {
    playSparkleChime();
    setBubbles(INITIAL_BUBBLES.map((b) => ({ ...b, popped: false })));
    setRevealedRewards([]);
  };

  const poppedCount = bubbles.filter((b) => b.popped).length;
  const allPopped = poppedCount === bubbles.length;

  return (
    <div className="w-full max-w-4xl mx-auto bg-white/90 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-xl border border-pink-100">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2 text-pink-500 font-extrabold text-xs uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Interactive Mood Booster</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#4a352c] mt-1">
            Pop Away All Bad Vibes 🫧
          </h2>
          <p className="text-sm text-[#8a685e]">
            Tap each stress bubble to pop it and release a wholesome secret reward!
          </p>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 bg-pink-100 hover:bg-pink-200 text-pink-700 px-4 py-2 rounded-full text-xs font-bold transition-all hover:scale-105 active:scale-95"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Blow New Bubbles</span>
        </button>
      </div>

      {/* Bubble Playground Container */}
      <div className="relative w-full h-[360px] sm:h-[400px] bg-gradient-to-b from-blue-50/40 via-pink-50/30 to-amber-50/30 rounded-2xl border-2 border-dashed border-pink-200 overflow-hidden p-4">
        {/* Floating clouds background */}
        <div className="absolute top-4 left-6 text-2xl opacity-30 pointer-events-none animate-pulse">☁️</div>
        <div className="absolute bottom-6 right-8 text-3xl opacity-30 pointer-events-none animate-pulse">☁️</div>

        {allPopped ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center text-3xl mb-3 shadow-inner">
              👑
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-pink-600 mb-1">
              All Bad Vibes Destroyed!
            </h3>
            <p className="text-sm text-[#6d4d42] max-w-md font-semibold mb-4">
              {girlfriendName || 'My cutie'}, you are now 100% protected by an indestructible shield of love, warmth, and cozy happiness!
            </p>
            <button
              onClick={handleReset}
              className="bg-pink-500 hover:bg-pink-600 text-white font-extrabold px-6 py-2.5 rounded-full shadow-md text-xs sm:text-sm transition-transform hover:scale-105"
            >
              Play Again 🫧
            </button>
          </div>
        ) : (
          bubbles.map((bubble) => {
            if (bubble.popped) return null;
            return (
              <div
                key={bubble.id}
                onClick={() => handlePop(bubble.id, bubble.reward)}
                className={`absolute cursor-pointer select-none bg-gradient-to-br ${bubble.color} rounded-full p-4 sm:p-5 shadow-lg border-2 border-white/80 backdrop-blur-xs flex items-center justify-center text-center font-black text-xs sm:text-sm transition-all transform hover:scale-110 active:scale-90 animate-bounce duration-1000`}
                style={{
                  left: `${bubble.x}%`,
                  top: `${bubble.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <span>{bubble.text}</span>
              </div>
            );
          })
        )}
      </div>

      {/* Rewards Log */}
      {revealedRewards.length > 0 && (
        <div className="mt-5 space-y-2">
          <h4 className="text-xs font-black uppercase tracking-wider text-pink-600 flex items-center gap-1.5">
            <Smile className="w-4 h-4" />
            <span>Unlocked Sweet Perks ({poppedCount}/{bubbles.length})</span>
          </h4>
          <div className="flex flex-col gap-2 max-h-36 overflow-y-auto pr-1">
            {revealedRewards.map((reward, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-pink-50/80 border border-pink-100 text-xs font-bold text-[#5c3e34] flex items-center gap-2 animate-in slide-in-from-top-1"
              >
                <span className="text-base">🎁</span>
                <span>{reward}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
