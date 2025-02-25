import { proxy } from 'valtio';
import Papa from 'papaparse';

interface DiscordServer {
  title: string;
  inviteLink: string;
  iconSrc: string;
  members: number;
  description: string;
}

interface DiscordServersStore {
  servers: DiscordServer[];
  filteredServers: DiscordServer[];
  searchQuery: string;
  sortKey: 'name' | 'members';
  isLoading: boolean;

  setSearchQuery: (query: string) => void;
  setSortKey: (key: 'name' | 'members') => void;
  applyFiltersAndSorting: () => void;
  loadServers: () => Promise<void>;
}

export const discordServersStore = proxy<DiscordServersStore>({
  servers: [],
  filteredServers: [],
  searchQuery: '',
  sortKey: 'members',
  isLoading: false,

  setSearchQuery(query) {
    this.searchQuery = query;
    this.applyFiltersAndSorting();
  },

  setSortKey(key) {
    this.sortKey = key;
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

    // Sort
    if (this.sortKey === 'members') {
      filtered.sort((a, b) => b.members - a.members); // Always descending
    } else if (this.sortKey === 'name') {
      filtered.sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase())); // Always A to Z
    }

    this.filteredServers = filtered;
  },

  async loadServers() {
    this.isLoading = true;
    try {
      const response = await fetch('/csv/discord-servers.csv');
      const csvText = await response.text();
      Papa.parse(csvText, {
        header: true,
        complete: (results) => {
          const parsedServers = (results.data as any[]).map((row) => ({
            title: row.title ?? '',
            inviteLink: row.inviteLink ?? '',
            iconSrc: row.iconSrc ?? '',
            members: Number(row.members) || 0,
            description: row.description ?? '',
          })).filter((server) => server.title && server.inviteLink);
          this.servers = parsedServers;
          this.applyFiltersAndSorting();
          this.isLoading = false;
        },
      });
    } catch (error) {
      this.isLoading = false;
    }
  },
});
