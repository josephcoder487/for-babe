import React, { useState } from 'react';
import { Heart, X, Check, Sparkles } from 'lucide-react';
import { playSparkleChime } from '../utils/audio';

interface PersonalizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  girlfriendName: string;
  boyfriendName: string;
  onSave: (gfName: string, bfName: string) => void;
}

export const PersonalizeModal: React.FC<PersonalizeModalProps> = ({
  isOpen,
  onClose,
  girlfriendName,
  boyfriendName,
  onSave,
}) => {
  const [gf, setGf] = useState(girlfriendName);
  const [bf, setBf] = useState(boyfriendName);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playSparkleChime();
    onSave(gf.trim() || 'My Love', bf.trim() || 'Your Boyfriend');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-md shadow-2xl border border-pink-200 animate-in zoom-in-95 duration-200 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-600 rounded-full hover:bg-stone-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-pink-500 font-extrabold text-xs uppercase tracking-wider mb-1">
          <Heart className="w-4 h-4 fill-pink-500" />
          <span>Personalize With Love</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-black text-[#4a352c] mb-2">
          Make It Just For You Two 💕
        </h3>
        <p className="text-xs text-[#8a685e] mb-6">
          Change the names used throughout the cheer-up notes, greetings, and cute messages!
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Girlfriend's Name or Pet Name
            </label>
            <input
              type="text"
              value={gf}
              onChange={(e) => setGf(e.target.value)}
              placeholder="e.g. My Princess, Sweetheart, Emma"
              className="w-full rounded-2xl border border-pink-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 bg-pink-50/20 text-[#4a352c] font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Your Name or Pet Name
            </label>
            <input
              type="text"
              value={bf}
              onChange={(e) => setBf(e.target.value)}
              placeholder="e.g. Your Boo, Noah, Your Boy"
              className="w-full rounded-2xl border border-pink-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 bg-pink-50/20 text-[#4a352c] font-bold"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full text-xs font-bold text-stone-500 hover:bg-stone-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-6 py-2.5 rounded-full text-xs font-extrabold bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white shadow-md shadow-pink-200"
            >
              <Check className="w-4 h-4" />
              <span>Save & Apply Names</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
