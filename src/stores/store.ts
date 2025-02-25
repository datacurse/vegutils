import { proxy } from 'valtio';

interface Store {
  hamburger: boolean;
  toggleHamburger: () => void;
}

export const store = proxy<Store>({
  hamburger: false,
  toggleHamburger: () => {
    store.hamburger = !store.hamburger;
    console.log(store.hamburger);
  },
});
