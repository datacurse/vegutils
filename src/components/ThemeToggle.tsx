// ThemeToggle.jsx - React component for theme toggle
import { store } from '@/stores/store';
import React, { useEffect } from 'react';
import { useSnapshot } from 'valtio';

export default function ThemeToggle() {
  const snap = useSnapshot(store);

  useEffect(() => {
    // Apply/remove dark class on document.documentElement when theme changes
    if (snap.isDarkTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [snap.isDarkTheme]);

  return (
    <button
      onClick={() => store.isDarkTheme = !store.isDarkTheme}
      className="px-4 py-2 rounded-md bg-sf hover:bg-sf-elevated text-text"
    >
      {snap.isDarkTheme ? '☀️ Light' : '🌙 Dark'}
    </button>
  );
};
