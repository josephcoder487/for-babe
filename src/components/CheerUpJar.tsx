import React, { useState, useEffect } from 'react';
import { Sparkles, Heart, Plus, RefreshCw, BookmarkCheck, Gift, MessageCircleHeart, Coffee } from 'lucide-react';
import { LoveNote } from '../types';
import { playSparkleChime, playBubblePop } from '../utils/audio';

const DEFAULT_NOTES: LoveNote[] = [
  {
    id: '1',
    category: 'comfort',
    message: "Take a deep breath, sweet girl. You don't have to have everything figured out right now. You are doing so much better than you realize, and I am so proud of you.",
    icon: '🫂',
  },
  {
    id: '2',
    category: 'love',
    message: "Even on days when you feel like a messy cloud, to me you are still the brightest, warmest sunshine in the sky.",
    icon: '☀️',
  },
  {
    id: '3',
    category: 'voucher',
    message: "🎟️ OFFICIAL VOUCHER: Redeemable for unlimited warm tight cuddles, zero questions asked, valid forever and ever.",
    icon: '🎟️',
  },
  {
    id: '4',
    category: 'compliment',
    message: "Your laugh is genuinely the cutest sound in the entire world. When your eyes scrunch up when you smile, my heart melts every single time.",
    icon: '✨',
  },
  {
    id: '5',
    category: 'voucher',
    message: "🎟️ COMFORT COUPON: Your favorite snack, a warm drink, and your boyfriend watching whatever show you want tonight.",
    icon: '☕',
  },
  {
    id: '6',
    category: 'love',
    message: "If I had to choose between breathing and loving you, I would use my last breath to tell you how completely precious you are to me.",
    icon: '💖',
  },
  {
    id: '7',
    category: 'comfort',
    message: "It's totally okay to feel sad, tired, or drained today. Rest your shoulders, unclench your jaw. You are safe with me.",
    icon: '🧸',
  },
  {
    id: '8',
    category: 'compliment',
    message: "You have the kindest heart and the sweetest soul. The world is so much softer and happier simply because you exist in it.",
    icon: '🌸',
  },
  {
    id: '9',
    category: 'voucher',
    message: "🎟️ VOUCHER FOR 1,000 KISSES: Distributable anywhere (forehead, nose, cheeks, hands). Non-transferable, non-expiring!",
    icon: '💋',
  },
  {
    id: '10',
    category: 'love',
    message: "I love you not just when you're happy and energetic, but equally when you're quiet, sleepy, moody, or bored. All of you is my favorite.",
    icon: '🌙',
  },
];

interface CheerUpJarProps {
  girlfriendName: string;
  boyfriendName: string;
}

export const CheerUpJar: React.FC<CheerUpJarProps> = ({ girlfriendName, boyfriendName }) => {
  const [notes, setNotes] = useState<LoveNote[]>(() => {
    try {
      const saved = localStorage.getItem('cheer_up_notes');
      return saved ? JSON.parse(saved) : DEFAULT_NOTES;
    } catch {
      return DEFAULT_NOTES;
    }
  });

  const [activeTab, setActiveTab] = useState<'all' | 'comfort' | 'love' | 'voucher' | 'compliment'>('all');
  const [currentNote, setCurrentNote] = useState<LoveNote | null>(DEFAULT_NOTES[0]);
  const [isOpening, setIsOpening] = useState(false);
  const [newNoteText, setNewNoteText] = useState('');
  const [newCategory, setNewCategory] = useState<'comfort' | 'love' | 'voucher' | 'compliment'>('love');
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('cheer_up_notes', JSON.stringify(notes));
    } catch (e) {
      console.warn('Could not save notes to localStorage', e);
    }
  }, [notes]);

  const filteredNotes = activeTab === 'all' ? notes : notes.filter((n) => n.category === activeTab);

  const drawRandomNote = () => {
    playSparkleChime();
    setIsOpening(true);

    const pool = filteredNotes.length > 0 ? filteredNotes : notes;
    const randomIndex = Math.floor(Math.random() * pool.length);

    setTimeout(() => {
      setCurrentNote(pool[randomIndex]);
      setIsOpening(false);
    }, 350);
  };

  const handleAddCustomNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;

    playBubblePop();
    const newNote: LoveNote = {
      id: Date.now().toString(),
      category: newCategory,
      message: newNoteText.trim(),
      author: boyfriendName || 'Your Love',
      icon: newCategory === 'voucher' ? '🎟️' : newCategory === 'comfort' ? '🫂' : newCategory === 'compliment' ? '✨' : '💖',
    };

    setNotes([newNote, ...notes]);
    setCurrentNote(newNote);
    setNewNoteText('');
    setShowAddModal(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white/90 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-xl border border-pink-100 transition-all">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-pink-500 font-extrabold text-xs uppercase tracking-wider">
            <Gift className="w-4 h-4" />
            <span>Magical Jar of Smiles</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#4a352c] mt-1">
            Pick a Little Reason to Smile
          </h2>
          <p className="text-sm text-[#8a685e]">
            Whenever {girlfriendName || 'she'} needs a reminder of how deeply cherished she is.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-pink-100 hover:bg-pink-200 text-pink-700 px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all transform hover:scale-105 active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Add a Custom Note</span>
        </button>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        {[
          { key: 'all', label: 'All Smiles ✨' },
          { key: 'comfort', label: 'Warm Comfort 🫂' },
          { key: 'love', label: 'Reasons I Love You 💖' },
          { key: 'voucher', label: 'Love Vouchers 🎟️' },
          { key: 'compliment', label: 'Cute Compliments 🌸' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => {
              playBubblePop();
              setActiveTab(tab.key as any);
            }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeTab === tab.key
                ? 'bg-pink-500 text-white shadow-md shadow-pink-200'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-600'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Center Jar Display & Note Card */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Interactive Glowing Jar Graphic */}
        <div className="md:col-span-5 flex flex-col items-center justify-center p-4 bg-gradient-to-b from-pink-50/50 to-rose-50/40 rounded-2xl border border-pink-100">
          <div className="relative group cursor-pointer" onClick={drawRandomNote}>
            {/* Soft Jar Glow */}
            <div className="absolute -inset-2 bg-gradient-to-r from-amber-200 via-pink-200 to-rose-200 rounded-full blur-xl opacity-60 group-hover:opacity-100 transition-opacity" />

            <div className="relative w-44 h-52 bg-gradient-to-b from-white/90 via-pink-50/70 to-rose-100/80 rounded-[2.5rem] border-4 border-pink-200/90 shadow-inner flex flex-col items-center justify-between p-4 overflow-hidden transform group-hover:scale-105 transition-transform">
              {/* Jar Lid with Ribbon */}
              <div className="w-28 h-6 bg-amber-200 rounded-full border-2 border-amber-300 shadow-sm flex items-center justify-center">
                <span className="text-[10px] font-black uppercase text-amber-800 tracking-wider">
                  Love Notes
                </span>
              </div>

              {/* Floating Origami Stars / Hearts inside jar */}
              <div className="relative w-full h-28 flex flex-wrap items-center justify-center gap-2 p-2">
                <span className="text-xl animate-bounce duration-700">⭐</span>
                <span className="text-xl animate-pulse">💖</span>
                <span className="text-lg animate-bounce duration-1000">🌸</span>
                <span className="text-xl animate-pulse">💌</span>
                <span className="text-lg animate-bounce duration-500">⭐</span>
                <span className="text-lg animate-pulse">🎀</span>
              </div>

              <div className="text-[11px] font-extrabold text-pink-600 bg-white/80 px-3 py-1 rounded-full shadow-sm">
                {filteredNotes.length} notes inside
              </div>
            </div>
          </div>

          <button
            onClick={drawRandomNote}
            disabled={isOpening}
            className="mt-4 flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white font-extrabold px-5 py-2.5 rounded-full shadow-md shadow-pink-200 text-xs sm:text-sm transition-all transform hover:scale-105 active:scale-95"
          >
            <RefreshCw className={`w-4 h-4 ${isOpening ? 'animate-spin' : ''}`} />
            <span>Draw a New Note</span>
          </button>
        </div>

        {/* Revealed Note Letter */}
        <div className="md:col-span-7">
          {currentNote ? (
            <div className="relative bg-[#fffdf9] rounded-2xl p-6 sm:p-7 shadow-lg border-2 border-pink-200/80 min-h-[220px] flex flex-col justify-between transition-all">
              {/* Cute Washi Tape Decor */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-pink-200/70 border border-pink-300/60 rotate-[-1.5deg] shadow-xs flex items-center justify-center text-[10px] font-bold text-pink-700">
                FOREVER YOURS
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-bold text-pink-500 mb-3">
                  <span className="capitalize px-2.5 py-0.5 bg-pink-50 rounded-full border border-pink-200 flex items-center gap-1">
                    <span>{currentNote.icon || '💌'}</span>
                    <span>{currentNote.category}</span>
                  </span>
                  <span className="text-stone-400 font-medium">To: {girlfriendName || 'My Girl'}</span>
                </div>

                <p className="text-[#4a352c] text-base sm:text-lg font-bold leading-relaxed italic font-['Playfair_Display',serif]">
                  "{currentNote.message}"
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-pink-100 flex items-center justify-between text-xs text-[#8a685e]">
                <span className="font-semibold">
                  From: {currentNote.author || boyfriendName || 'Your Boyfriend'}
                </span>
                <span className="flex items-center gap-1 text-pink-500 font-extrabold">
                  <Heart className="w-3.5 h-3.5 fill-pink-500" /> Made for your heart
                </span>
              </div>
            </div>
          ) : (
            <div className="text-center p-8 bg-stone-50 rounded-2xl border border-dashed border-stone-200">
              <p className="text-stone-500 text-sm">Tap "Draw a New Note" to uncover a smile!</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Custom Note Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl border border-pink-200 animate-in zoom-in-95 duration-200">
            <h3 className="text-xl font-extrabold text-[#4a352c] mb-1">
              Add a Special Love Note 💌
            </h3>
            <p className="text-xs text-[#8a685e] mb-4">
              Write something genuine, cute, or funny to brighten {girlfriendName || 'her'} day!
            </p>

            <form onSubmit={handleAddCustomNote} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-600 mb-1">
                  Choose Note Category
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    { id: 'love', label: 'Love Note 💖' },
                    { id: 'comfort', label: 'Warm Comfort 🫂' },
                    { id: 'voucher', label: 'Love Voucher 🎟️' },
                    { id: 'compliment', label: 'Compliment ✨' },
                  ].map((cat) => (
                    <button
                      type="button"
                      key={cat.id}
                      onClick={() => setNewCategory(cat.id as any)}
                      className={`p-2 rounded-xl font-bold border transition-all ${
                        newCategory === cat.id
                          ? 'border-pink-500 bg-pink-50 text-pink-700'
                          : 'border-stone-200 hover:bg-stone-50 text-stone-600'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-600 mb-1">
                  Your Message
                </label>
                <textarea
                  required
                  rows={4}
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  placeholder="e.g. You look breathtaking in that oversized sweater, and I can't wait to hold your hand..."
                  className="w-full rounded-2xl border border-pink-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 bg-pink-50/20"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-full text-xs font-bold text-stone-500 hover:bg-stone-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full text-xs font-extrabold bg-pink-500 hover:bg-pink-600 text-white shadow-md shadow-pink-200"
                >
                  Drop Into Jar ✨
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
