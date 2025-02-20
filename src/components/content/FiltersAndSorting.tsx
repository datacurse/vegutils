'use client'

import React from "react";
import { useSnapshot } from "valtio";
import { cn } from "@udecode/cn";
import { discordServersStore } from "@/discordServersStore";

// AND/OR Toggle Component
function AndOrToggle({
  isAndMode,
  onToggle,
}: {
  isAndMode: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-gray-900">
        {isAndMode ? "AND Mode" : "OR Mode"}
      </span>

      {/* Toggle switch using a Tailwind + peer pattern */}
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={isAndMode}
          onChange={onToggle}
        />
        {/* Track: static classes are combined in one string */}
        <div className="w-12 h-6 rounded-full transition-colors bg-gray-200" />
        {/* Thumb: static classes */}
        <div className="absolute top-[2px] left-[2px] w-5 h-5 bg-white rounded-full border-solid border border-gray-300 transition-all" />
      </label>
    </div>
  );
}

// SortButton Component using dynamic classes via cn
function SortButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className={cn(
        "px-2 py-1 border-solid border border-gray-300 rounded cursor-pointer",
        active ? "bg-[#e6f7f4]" : "text-black"
      )}
      onClick={onClick}
    >
      {label}
    </div>
  );
}

// FilterButton Component using dynamic classes via cn
function FilterButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className={cn(
        "px-2 py-1 border-solid border border-gray-300 rounded cursor-pointer",
        active ? "bg-[#e6f7f4]" : "text-black"
      )}
      onClick={onClick}
    >
      {label}
    </div>
  );
}

// Main Filters and Sorting Component
export default function FiltersAndSorting(): React.ReactNode {
  const snap = useSnapshot(discordServersStore);

  return (
    <div className="flex flex-col gap-4">
      {/* Header: Title, server count, AND/OR toggle, and Clear All action */}
      <div className="flex justify-between items-center">
        <div className="flex flex-row gap-2 items-end">
          <div className="text-2xl font-bold">Filters</div>
          <span>{snap.filteredServers.length} servers</span>
        </div>
        <div className="flex items-center gap-4">
          <AndOrToggle
            isAndMode={snap.isAndMode}
            onToggle={() => discordServersStore.toggleAndMode()}
          />
          <div
            className="px-3 py-1 rounded-md text-[#18816a] border-solid border select-none cursor-pointer"
            onClick={() => discordServersStore.clearFilters()}
          >
            Clear All
          </div>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        {[
          "activism",
          "education",
          "social",
          "philosophy",
          "debating",
          "cooking",
        ].map((filter) => (
          <FilterButton
            key={filter}
            label={filter}
            active={snap.filters.includes(filter)}
            onClick={() => discordServersStore.toggleFilter(filter)}
          />
        ))}
      </div>

      {/* Search Box and Sorting Options */}
      <div className="flex items-center justify-between gap-4">
        {/* Search Box */}
        <div className="w-1/3">
          <input
            type="text"
            placeholder="Search by title or description..."
            className="w-full px-3 py-2 rounded border border-solid border-gray-300"
            value={snap.searchQuery}
            onChange={(e) =>
              discordServersStore.setSearchQuery(e.target.value)
            }
          />
        </div>

        {/* Sorting Options */}
        <div className="flex items-center gap-4">
          <div>Sort by</div>
          <SortButton
            label="Members"
            active={snap.sortKey === "members"}
            onClick={() => discordServersStore.setSortKey("members")}
          />
          <SortButton
            label="Name"
            active={snap.sortKey === "name"}
            onClick={() => discordServersStore.setSortKey("name")}
          />
        </div>
      </div>
    </div>
  );
}

