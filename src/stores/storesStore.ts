import Papa from "papaparse";
import { proxy } from "valtio";

// Define the Store interface
export interface Store {
  name: string;
  website: string;
  country: string;
  tags: string[];
  store_type: string;
}

// Define the StoresStore interface
interface StoresStore {
  stores: Store[];
  filteredStores: Store[];
  selectedCountries: string[];
  selectedTags: string[];
  selectedStoreTypes: string[];
  searchQuery: string;
  isAndMode: boolean;
  isLoading: boolean;
  loadStores: () => Promise<void>;
  setSearchQuery: (query: string) => void;
  toggleCountry: (country: string) => void;
  toggleTag: (tag: string) => void;
  toggleStoreType: (storeType: string) => void;
  toggleAndMode: () => void;
  clearFilters: () => void;
  applyFiltersAndSorting: () => void;
}

// Create the storesStore using Valtio proxy
export const storesStore = proxy<StoresStore>({
  stores: [],
  filteredStores: [],
  selectedCountries: [],
  selectedTags: [],
  selectedStoreTypes: [],
  searchQuery: "",
  isAndMode: false,
  isLoading: false,

  async loadStores() {
    this.isLoading = true;
    try {
      const response = await fetch("/csv/stores.csv");
      const csvText = await response.text();
      Papa.parse(csvText, {
        header: true,
        complete: (results) => {
          const parsedStores = (results.data as any[])
            .map((row) => ({
              name: row.name?.trim() ?? "",
              website: row.website?.trim() ?? "",
              country: row.country?.trim() ?? "",
              tags: row.tags
                ? row.tags
                  .split(",")
                  .map((tag: string) => tag.trim())
                  .filter((tag: string) => tag && tag.length > 0)
                : [],
              store_type: row.store_type?.trim() ?? "",
            }))
            .filter(
              (store) =>
                store.name && // Ensure name exists
                store.website && // Ensure website exists
                store.country && // Ensure country exists
                store.store_type // Ensure store_type exists
            );
          this.stores = parsedStores;
          this.applyFiltersAndSorting();
          this.isLoading = false;
        },
      });
    } catch (error) {
      console.error("Error loading stores:", error);
      this.isLoading = false;
    }
  },

  setSearchQuery(query) {
    this.searchQuery = query;
    this.applyFiltersAndSorting();
  },

  toggleCountry(country) {
    if (this.selectedCountries.includes(country)) {
      this.selectedCountries = this.selectedCountries.filter((c) => c !== country);
    } else {
      this.selectedCountries.push(country);
    }
    this.applyFiltersAndSorting();
  },

  toggleTag(tag) {
    if (this.selectedTags.includes(tag)) {
      this.selectedTags = this.selectedTags.filter((t) => t !== tag);
    } else {
      this.selectedTags.push(tag);
    }
    this.applyFiltersAndSorting();
  },

  toggleStoreType(storeType) {
    if (this.selectedStoreTypes.includes(storeType)) {
      this.selectedStoreTypes = this.selectedStoreTypes.filter((t) => t !== storeType);
    } else {
      this.selectedStoreTypes.push(storeType);
    }
    this.applyFiltersAndSorting();
  },

  toggleAndMode() {
    this.isAndMode = !this.isAndMode;
    this.applyFiltersAndSorting();
  },

  clearFilters() {
    this.selectedCountries = [];
    this.selectedTags = [];
    this.selectedStoreTypes = [];
    this.searchQuery = "";
    this.isAndMode = false;
    this.applyFiltersAndSorting();
  },

  applyFiltersAndSorting() {
    let filtered = [...this.stores];

    // Filter by selected countries
    if (this.selectedCountries.length > 0) {
      filtered = filtered.filter((store) => this.selectedCountries.includes(store.country));
    }

    // Filter by selected tags (AND/OR logic)
    if (this.selectedTags.length > 0) {
      if (this.isAndMode) {
        // AND mode: store must have all selected tags
        filtered = filtered.filter((store) =>
          this.selectedTags.every((tag) => store.tags.includes(tag))
        );
      } else {
        // OR mode: store must have at least one selected tag
        filtered = filtered.filter((store) =>
          this.selectedTags.some((tag) => store.tags.includes(tag))
        );
      }
    }

    // Filter by selected store types
    if (this.selectedStoreTypes.length > 0) {
      filtered = filtered.filter((store) =>
        this.selectedStoreTypes.includes(store.store_type)
      );
    }

    // Filter by search query on name
    if (this.searchQuery) {
      filtered = filtered.filter((store) =>
        store.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    // Sort by name (always ascending, A→Z)
    filtered.sort((a, b) => {
      const aValue = a.name.toLowerCase();
      const bValue = b.name.toLowerCase();
      if (aValue < bValue) return -1;
      if (aValue > bValue) return 1;
      return 0;
    });

    this.filteredStores = filtered;
  },
});
