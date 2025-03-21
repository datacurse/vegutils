import { store } from '@/stores/store';
import { cn } from '@udecode/cn';
import { useEffect } from 'react';
import { useSnapshot } from 'valtio';
import { MdOutlineLightMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";

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
      className={cn(
        'hover:bg-bt-hover p-2 flex items-center justify-center rounded-sm border border-border',
      )}
    >
      {snap.isDarkTheme ?
        <MdOutlineDarkMode size={24} />
        : <MdOutlineLightMode size={24} />}
    </button>
  );
};
