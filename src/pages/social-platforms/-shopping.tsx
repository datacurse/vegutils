"use client";

import React, { useEffect } from "react";
import { useSnapshot } from "valtio";
import * as Switch from "@radix-ui/react-switch";
import { cn } from "@udecode/cn";
import { FaIndustry, FaStore, FaGlobe } from 'react-icons/fa';
import { storesStore } from "@/stores/storesStore"; // Adjust path as needed

// Function to get flag PNG path from country code
const getFlagImagePath = (countryCode: string) => {
  if (!countryCode || countryCode.length !== 2) return '';
  return `/images/flags/${countryCode.toLowerCase()}.png`;
};

// Mapping of store types to icons
const storeTypeIcons = {
  manufacturer: <FaIndustry className="text-gray-600" />,
  reseller: <FaStore className="text-gray-600" />,
  marketplace: <FaGlobe className="text-gray-600" />,
};

export default function Shopping() {
  const snap = useSnapshot(storesStore);

  // Load store data on mount
  useEffect(() => {
    storesStore.loadStores();
  }, []);

  // Unique countries, tags, and store types for filter buttons
  const uniqueCountries = Array.from(
    new Set(snap.stores.map((store) => store.country))
  ).filter((country) => country && country.length > 0);
  const uniqueTags = Array.from(
    new Set(snap.stores.flatMap((store) => store.tags))
  ).filter((tag) => tag && tag.length > 0);
  const uniqueStoreTypes = Array.from(
    new Set(snap.stores.map((store) => store.store_type))
  ).filter((type) => type && type.length > 0);

  return (
    <div className="py-6">
      {/* Filters and Sorting Section */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-end gap-2">
            <h1 className="text-2xl font-bold">Shops</h1>
            <span className="text-gray-600">
              {snap.filteredStores.length} shops
            </span>
          </div>
          <div className="flex items-center gap-4">
            <AndOrToggle
              isAndMode={snap.isAndMode}
              onToggle={() => storesStore.toggleAndMode()}
            />
            <button
              className="px-3 py-1 rounded border border-[#18816a] text-[#18816a] bg-white hover:bg-[#e6f7f4] transition-colors shadow-sm"
              onClick={() => storesStore.clearFilters()}
            >
              Clear All
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search stores by name..."
          value={snap.searchQuery}
          onChange={(e) => storesStore.setSearchQuery(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18816a] bg-white shadow-sm"
        />

        {/* Country Filters */}
        <div className="flex flex-wrap gap-2">
          <span className="text-gray-700 mr-2">Countries:</span>
          {uniqueCountries.map((country) => (
            <FilterSortButton
              key={country}
              label={`${country.toUpperCase()}`} // Removed emoji, keeping text only for consistency
              active={snap.selectedCountries.includes(country)}
              onClick={() => storesStore.toggleCountry(country)}
            />
          ))}
        </div>

        {/* Tag Filters */}
        <div className="flex flex-wrap gap-2">
          <span className="text-gray-700 mr-2">Tags:</span>
          {uniqueTags.map((tag) => (
            <FilterSortButton
              key={tag}
              label={tag}
              active={snap.selectedTags.includes(tag)}
              onClick={() => storesStore.toggleTag(tag)}
            />
          ))}
        </div>

        {/* Store Type Filters */}
        <div className="flex flex-wrap gap-2">
          <span className="text-gray-700 mr-2">Store Types:</span>
          {uniqueStoreTypes.map((storeType) => (
            <FilterSortButton
              key={storeType}
              label={storeType}
              active={snap.selectedStoreTypes.includes(storeType)}
              onClick={() => storesStore.toggleStoreType(storeType)}
            />
          ))}
        </div>
      </section>

      {/* Stores Grid */}
      <section className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {snap.filteredStores.map((store, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white hover:shadow-md transition-shadow flex flex-col h-full"
          >
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900">{store.name}</h2>
              <div className="mt-2 flex flex-wrap gap-1">
                {store.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-2 py-1 border border-gray-300 rounded-md text-xs font-medium text-gray-700 bg-white"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <img
                  src={getFlagImagePath(store.country)}
                  alt={`${store.country} flag`}
                  className="w-6 h-4 object-cover" // Adjust size as needed
                />
                {storeTypeIcons[store.store_type]}
              </div>
              <div className="flex gap-3">
                <button
                  className="text-[#18816a] hover:underline"
                  onClick={() => navigator.clipboard.writeText(store.website)}
                >
                  Copy
                </button>
                <a
                  href={store.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#18816a] hover:underline"
                >
                  Open
                </a>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

// Utility Components
function AndOrToggle({
  isAndMode,
  onToggle,
}: {
  isAndMode: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-gray-900">OR Mode</span>
      <Switch.Root
        className="relative h-[25px] w-[42px] cursor-default rounded-full bg-gray-200 outline-none data-[state=checked]:bg-[#18816a]"
        checked={isAndMode}
        onCheckedChange={onToggle}
      >
        <Switch.Thumb
          className="block size-[21px] translate-x-0.5 rounded-full bg-white transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[19px]"
        />
      </Switch.Root>
    </div>
  );
}

const FilterSortButton: React.FC<{
  label: string;
  active: boolean;
  onClick: () => void;
}> = ({ label, active, onClick }) => (
  <button
    className={cn(
      "px-2 py-1 border border-gray-300 rounded bg-white shadow-sm transition-colors",
      active
        ? "bg-[#e6f7f4] text-[#18816a]"
        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
    )}
    onClick={onClick}
  >
    {label}
  </button>
);
