import React, { useState } from 'react';
import { Flower2, Sparkles, Trash2, Heart } from 'lucide-react';
import { PlantedFlower } from '../types';
import { playSparkleChime, playBubblePop } from '../utils/audio';

const FLOWER_TYPES = [
  { emoji: '🌸', name: 'Cherry Blossom', compliment: 'For the sweetest gentleness in your touch' },
  { emoji: '🌷', name: 'Pink Tulip', compliment: 'Because your smile is my absolute favorite sight' },
  { emoji: '🌼', name: 'White Daisy', compliment: 'For the innocent pure joy you bring into my life' },
  { emoji: '🌻', name: 'Sunflower', compliment: 'Because you radiate warmth and brighten every dark room' },
  { emoji: '🌹', name: 'Velvet Rose', compliment: 'For my eternal, unconditional love for you' },
  { emoji: '🪻', name: 'Lavender', compliment: 'To soothe your mind and give you peaceful sweet dreams' },
  { emoji: '🌺', name: 'Hibiscus', compliment: 'For your vibrant beauty inside and out' },
];

export const FlowerGarden: React.FC<{ girlfriendName: string }> = ({ girlfriendName }) => {
  const [flowers, setFlowers] = useState<PlantedFlower[]>([
    { id: '1', x: 20, y: 70, type: '🌸', color: '#ffb7c5', note: 'Planted because your laugh is pure sunshine!', createdAt: 1 },
    { id: '2', x: 45, y: 65, type: '🌷', color: '#ff70a6', note: 'Planted for the prettiest girl ever!', createdAt: 2 },
    { id: '3', x: 75, y: 75, type: '🌻', color: '#ffd166', note: 'Planted to keep you warm always!', createdAt: 3 },
  ]);

  const [selectedTypeIndex, setSelectedTypeIndex] = useState(0);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  const handleLawnClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    // Keep planting within lawn area (lower 75%)
    if (y < 25) return;

    playSparkleChime();
    const flowerDef = FLOWER_TYPES[selectedTypeIndex];

    const newFlower: PlantedFlower = {
      id: Date.now().toString(),
      x: Math.max(5, Math.min(95, x)),
      y: Math.max(30, Math.min(90, y)),
      type: flowerDef.emoji,
      color: '#ff85a2',
      note: `${flowerDef.compliment} 💕`,
      createdAt: Date.now(),
    };

    setFlowers((prev) => [...prev, newFlower]);
    setActiveTooltip(newFlower.id);
  };

  const handleClearGarden = (e: React.MouseEvent) => {
    e.stopPropagation();
    playBubblePop();
    setFlowers([]);
    setActiveTooltip(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white/90 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-xl border border-pink-100">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-600 font-extrabold text-xs uppercase tracking-wider">
            <Flower2 className="w-4 h-4" />
            <span>Interactive Flower Meadow</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#4a352c] mt-1">
            Plant A Garden for {girlfriendName || 'My Love'} 🌸
          </h2>
          <p className="text-sm text-[#8a685e]">
            Choose a flower below, then tap anywhere on the grassy meadow to plant it!
          </p>
        </div>

        {flowers.length > 0 && (
          <button
            onClick={handleClearGarden}
            className="flex items-center gap-1.5 text-xs font-bold text-stone-400 hover:text-rose-500 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Replant Garden</span>
          </button>
        )}
      </div>

      {/* Flower Type Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-4 scrollbar-none">
        {FLOWER_TYPES.map((f, idx) => (
          <button
            key={idx}
            onClick={() => {
              playBubblePop();
              setSelectedTypeIndex(idx);
            }}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedTypeIndex === idx
                ? 'bg-emerald-500 text-white shadow-md shadow-emerald-200 scale-105'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            <span className="text-base">{f.emoji}</span>
            <span>{f.name}</span>
          </button>
        ))}
      </div>

      {/* Meadow Interactive Canvas */}
      <div
        onClick={handleLawnClick}
        className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden cursor-pointer select-none border-2 border-emerald-200/80 shadow-inner bg-gradient-to-b from-[#e8f5e9] via-[#c8e6c9] to-[#a5d6a7]"
      >
        {/* Sky / Distant soft hills */}
        <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[#fce4ec]/40 to-transparent pointer-events-none" />
        <div className="absolute top-3 left-6 text-xs font-bold text-emerald-800/60 pointer-events-none flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Tap anywhere on the meadow to plant flowers!</span>
        </div>

        {/* Small Bench in the distance */}
        <div className="absolute top-16 right-12 opacity-40 text-3xl pointer-events-none">
          🪑
        </div>

        {/* Planted Flowers */}
        {flowers.map((fl) => {
          const isSelected = activeTooltip === fl.id;
          return (
            <div
              key={fl.id}
              onClick={(e) => {
                e.stopPropagation();
                playBubblePop();
                setActiveTooltip(isSelected ? null : fl.id);
              }}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform hover:scale-125"
              style={{
                left: `${fl.x}%`,
                top: `${fl.y}%`,
              }}
            >
              {/* Tooltip Note */}
              {isSelected && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-white/95 backdrop-blur-md rounded-xl p-2.5 text-center shadow-xl border border-pink-200 z-30 animate-in fade-in zoom-in-95">
                  <p className="text-[11px] font-bold text-[#4a352c] leading-tight">
                    {fl.note}
                  </p>
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45 border-r border-b border-pink-200" />
                </div>
              )}

              {/* Flower stalk and blossom */}
              <div className="flex flex-col items-center">
                <span className="text-3xl sm:text-4xl filter drop-shadow-md animate-bounce duration-1000">
                  {fl.type}
                </span>
                <div className="w-1 h-3 bg-emerald-700 rounded-full" />
              </div>
            </div>
          );
        })}

        {flowers.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <p className="text-sm font-bold text-emerald-800/70 bg-white/70 px-4 py-2 rounded-full border border-emerald-200">
              🌱 Tap anywhere on the green grass to plant your first flower!
            </p>
          </div>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-[#8a685e]">
        <span>Flowers in bloom: <strong className="text-emerald-700 font-extrabold">{flowers.length}</strong></span>
        <span>Tap any flower to read its love compliment! 💌</span>
      </div>
    </div>
  );
};
