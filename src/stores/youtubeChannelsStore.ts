import { proxy } from "valtio";

export interface YoutubeChannel {
  id: string
  title: string
  description: string
  handle: string
  publishedAt: string
  thumbnailUrl: string
  country: string
  viewCount: number
  subscriberCount: number
  videoCount: number
}

interface YoutubeChannelsStore {
  channels: YoutubeChannel[];
  filteredChannels: YoutubeChannel[];
  filters: string[];
  searchQuery: string;
  sortKey: 'title' | 'subscriberCount';
  isDescending: boolean;
  isAndMode: boolean;
  setSearchQuery: (query: string) => void;
  toggleFilter: (filter: string) => void;
  setSortKey: (key: 'name' | 'members') => void;
  toggleDescending: () => void;
  toggleAndMode: () => void;
  clearFilters: () => void;
  applyFiltersAndSorting: () => void;
}

export const youtubeChannelsStore = proxy<YoutubeChannelsStore>({
  channels: [],
  filteredChannels: [],
  filters: [],
  searchQuery: '',
  sortKey: 'title',
  isDescending: false,
  isAndMode: false,

  setSearchQuery(query) {
    this.searchQuery = query;
    this.applyFiltersAndSorting();
  },

  toggleFilter(filter) {
    if (this.filters.includes(filter)) {
      this.filters = this.filters.filter((f) => f !== filter);
    } else {
      this.filters.push(filter);
    }
    this.applyFiltersAndSorting();
  },

  setSortKey(key) {
    //this.sortKey = key;
    this.applyFiltersAndSorting();
  },

  toggleDescending() {
    this.isDescending = !this.isDescending;
    this.applyFiltersAndSorting();
  },

  toggleAndMode() {
    this.isAndMode = !this.isAndMode;
    this.applyFiltersAndSorting();
  },

  clearFilters() {
    this.filters = [];
    this.searchQuery = '';
    this.sortKey = 'title';
    this.isDescending = false;
    this.isAndMode = false;
    this.applyFiltersAndSorting();
  },

  applyFiltersAndSorting() {
    let filtered = [...this.channels];

    // Search by query
    if (this.searchQuery) {
      filtered = filtered.filter(
        (server) =>
          server.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          server.description.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    this.filteredChannels = filtered;
  }
})


