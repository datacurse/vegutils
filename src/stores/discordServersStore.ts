import { proxy } from 'valtio';

interface DiscordServer {
  title: string;
  inviteLink: string;
  iconSrc: string;
  members: number;
  tags: string;
  description: string;
}

interface DiscordServersStore {
  servers: DiscordServer[];
  filteredServers: DiscordServer[]; // Holds the filtered and sorted servers
  filters: string[];
  searchQuery: string;
  sortKey: 'name' | 'members';
  isDescending: boolean;
  isAndMode: boolean;

  // Actions
  setSearchQuery: (query: string) => void;
  toggleFilter: (filter: string) => void;
  setSortKey: (key: 'name' | 'members') => void;
  toggleDescending: () => void;
  toggleAndMode: () => void;
  clearFilters: () => void;
  applyFiltersAndSorting: () => void;
}

// Valtio store definition
export const discordServersStore = proxy<DiscordServersStore>({
  servers: [],
  filteredServers: [],
  filters: [],
  searchQuery: '',
  sortKey: 'members',
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
    this.sortKey = key;
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
    this.sortKey = 'name';
    this.isDescending = false;
    this.isAndMode = false;
    this.applyFiltersAndSorting();
  },

  applyFiltersAndSorting() {
    let filtered = [...this.servers];

    // Search by query
    if (this.searchQuery) {
      filtered = filtered.filter(
        (server) =>
          server.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          server.description.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    // Filter by tags
    if (this.filters.length > 0) {
      filtered = filtered.filter((server) => {
        const serverTags = server.tags.split(',').map((tag) => tag.trim());
        return this.isAndMode
          ? this.filters.every((filter) => serverTags.includes(filter))
          : this.filters.some((filter) => serverTags.includes(filter));
      });
    }

    // Sort
    if (this.sortKey === 'members') {
      filtered.sort((a, b) => b.members - a.members); // Always descending
    } else if (this.sortKey === 'name') {
      filtered.sort((a, b) => {
        const aValue = a.title.toLowerCase();
        const bValue = b.title.toLowerCase();
        if (aValue < bValue) return this.isDescending ? 1 : -1;
        if (aValue > bValue) return this.isDescending ? -1 : 1;
        return 0;
      });
    }

    this.filteredServers = filtered;
  }
});

