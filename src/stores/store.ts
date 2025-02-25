import { proxy } from 'valtio';

interface Store {
  hamburger: boolean;
  isDarkTheme: boolean;
  toggleHamburger: () => void;
  toggleDarkTheme: () => void;
}

export const store = proxy<Store>({
  hamburger: false,
  isDarkTheme: false,
  toggleHamburger: () => {
    store.hamburger = !store.hamburger;
  },
  toggleDarkTheme: () => {
    store.isDarkTheme = !store.isDarkTheme;
  },
});
