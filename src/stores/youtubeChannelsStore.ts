import Papa from "papaparse";
import { proxy } from "valtio";

export interface YoutubeChannel {
  id: string;
  title: string;
  description: string;
  handle: string;
  publishedAt: string;
  thumbnailUrl: string;
  country: string;
  viewCount: number;
  subscriberCount: number;
  videoCount: number;
}

interface YoutubeChannelsStore {
  channels: YoutubeChannel[];
  filteredChannels: YoutubeChannel[];
  searchQuery: string;
  sortKey: 'title' | 'subscriberCount';
  isLoading: boolean;
  loadChannels: () => Promise<void>;
  setSearchQuery: (query: string) => void;
  setSortKey: (key: 'subscriberCount' | 'title') => void;
  applyFiltersAndSorting: () => void;
}

export const youtubeChannelsStore = proxy<YoutubeChannelsStore>({
  channels: [],
  filteredChannels: [],
  searchQuery: '',
  sortKey: 'subscriberCount',
  isLoading: false,

  async loadChannels() {
    this.isLoading = true;
    try {
      const response = await fetch('/csv/youtube-channels.csv');
      const csvText = await response.text();
      Papa.parse(csvText, {
        header: true,
        complete: (results) => {
          const parsedChannels = (results.data as YoutubeChannel[]).map((row) => ({
            id: row.id ?? '',
            title: row.title ?? '',
            description: row.description ?? '',
            handle: row.handle ?? '',
            publishedAt: row.publishedAt ?? '',
            thumbnailUrl: row.thumbnailUrl ?? '',
            country: row.country ?? '',
            viewCount: Number(row.viewCount) ?? 0,
            subscriberCount: Number(row.subscriberCount) ?? 0,
            videoCount: Number(row.videoCount) ?? 0,
          }));
          this.channels = parsedChannels;
          this.applyFiltersAndSorting();
          this.isLoading = false;
        },
      });
    } catch (error) {
      this.isLoading = false;
    }
  },

  setSearchQuery(query) {
    this.searchQuery = query;
    this.applyFiltersAndSorting();
  },

  setSortKey(key) {
    this.sortKey = key;
    this.applyFiltersAndSorting();
  },

  applyFiltersAndSorting() {
    let filtered = [...this.channels];

    // Search by query
    if (this.searchQuery) {
      filtered = filtered.filter(
        (channel) =>
          channel.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          channel.description.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    // Sort in descending order
    filtered.sort((a, b) => {
      if (this.sortKey === 'title') {
        return b.title.localeCompare(a.title); // Descending order for strings
      } else { // subscriberCount
        return b.subscriberCount - a.subscriberCount; // Descending order for numbers
      }
    });

    this.filteredChannels = filtered;
  }
});
