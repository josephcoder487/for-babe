import React, { useState, useEffect } from 'react';
import { BenchScene } from './components/BenchScene';
import { GiftBoxPage } from './components/GiftBoxPage';
import { MemoriesShowcasePage } from './components/MemoriesShowcasePage';
import { toggleMusicBox, getIsMusicBoxPlaying } from './utils/audio';

export default function App() {
  const girlfriendName = 'Ritu ❤️';
  const boyfriendName = 'Jojo boy';

  // Support URL hash routing: #/gift-box, #/memories, or default to bench
  const [currentPage, setCurrentPage] = useState<'bench' | 'gift-box' | 'memories'>(() => {
    if (typeof window !== 'undefined') {
      if (window.location.hash === '#/memories') return 'memories';
      if (window.location.hash === '#/gift-box') return 'gift-box';
    }
    return 'bench';
  });

  const [isMusicPlaying, setIsMusicPlaying] = useState<boolean>(() => getIsMusicBoxPlaying());

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#/memories') {
        setCurrentPage('memories');
      } else if (window.location.hash === '#/gift-box') {
        setCurrentPage('gift-box');
      } else {
        setCurrentPage('bench');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigateToGift = () => {
    window.location.hash = '#/gift-box';
    setCurrentPage('gift-box');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToMemories = () => {
    window.location.hash = '#/memories';
    setCurrentPage('memories');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToBench = () => {
    window.location.hash = '#/';
    setCurrentPage('bench');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleMusic = () => {
    const state = toggleMusicBox((playing) => setIsMusicPlaying(playing));
    setIsMusicPlaying(state);
  };

  return (
    <div className="min-h-screen bg-[#fff9f6] text-[#4a352c] font-['Nunito',sans-serif]">
      {currentPage === 'bench' && (
        // First Page: The park bench with Ritu and Jojo's magic touch
        <BenchScene
          girlfriendName={girlfriendName}
          boyfriendName={boyfriendName}
          onExploreMore={handleNavigateToGift}
        />
      )}

      {currentPage === 'gift-box' && (
        // Second Page: The 4-flap cardboard gift box from top-down perspective
        <GiftBoxPage
          onBackToBench={handleNavigateToBench}
          onNavigateToMemories={handleNavigateToMemories}
          isMusicPlaying={isMusicPlaying}
          onToggleMusic={handleToggleMusic}
        />
      )}

      {currentPage === 'memories' && (
        // Third Page: Funniest photos showcase one by one, leading to ending page & secret restart
        <MemoriesShowcasePage
          girlfriendName={girlfriendName}
          boyfriendName={boyfriendName}
          onRestartToBeginning={handleNavigateToBench}
          onBackToGiftBox={handleNavigateToGift}
          isMusicPlaying={isMusicPlaying}
          onToggleMusic={handleToggleMusic}
        />
      )}
    </div>
  );
}
