import { proxy } from 'valtio';
import type { IServerCard } from "@/interfaces";
import { readCsvFile } from "@/actions/readCsvFile";
import { parseServerCards } from "@/actions/parseServerCard";

// Define valid sort keys
type SortKey = keyof Pick<IServerCard, 'members' | 'title'>;  // restrict to only the fields we want to sort by

interface SortOption {
  key: SortKey;
  label: string;
  direction: 'desc' | 'asc';
}

export const sortOptions: SortOption[] = [
  { key: 'members', label: 'Members', direction: 'desc' },
  { key: 'title', label: 'Name', direction: 'asc' },
] as const;

export const state = proxy({
  allServers: [] as IServerCard[],
  filteredServers: [] as IServerCard[],
  searchQuery: '',
  isLoading: false,
  currentSort: sortOptions[0]!,
});

export const actions = {
  async fetchServers() {
    state.isLoading = true;
    try {
      const rawData = await readCsvFile('servers.csv');
      state.allServers = parseServerCards(rawData);
      this.applyFilters();
    } catch (error) {
      console.error('Error:', error);
    } finally {
      state.isLoading = false;
    }
  },

  setSearchQuery(query: string) {
    state.searchQuery = query;
    this.applyFilters();
  },

  handleSort(option: SortOption) {
    const newDirection =
      state.currentSort.key === option.key &&
        state.currentSort.direction === 'asc' ? 'desc' : 'asc';

    state.currentSort = {
      ...option,
      direction: newDirection,
    };

    this.applyFilters();
  },

  applyFilters() {
    let filtered = state.allServers.filter(server => {
      const matchesSearch = !state.searchQuery ||
        server.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        server.description.toLowerCase().includes(state.searchQuery.toLowerCase());

      return matchesSearch;
    });

    filtered.sort((a, b) => {
      const valueA = a[state.currentSort.key];
      const valueB = b[state.currentSort.key];

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return (state.currentSort.direction === 'asc' ? 1 : -1) *
          valueA.localeCompare(valueB);
      }

      // For numbers or other comparable types
      return (state.currentSort.direction === 'asc' ? 1 : -1) *
        (valueA > valueB ? 1 : valueA < valueB ? -1 : 0);
    });

    state.filteredServers = filtered;
  }
};
