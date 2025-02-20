'use client'

import React, { useEffect } from 'react'
import { proxy, useSnapshot } from 'valtio'
import Papa from 'papaparse'
import { cn } from '@udecode/cn'
import * as Switch from '@radix-ui/react-switch';


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

interface YoutubeChannel {
  id: string
  title: string
  description: string
  handle: string
  publishedAt: string
  thumbnail: string
  country: string
  viewCount: number
  subscriberCount: number
  videoCount: number
}

export default function YoutubeChannels() {
  const snap = useSnapshot(youtubeChannelsStore)

  useEffect(() => {
    Papa.parse('/csv/youtube-channels.csv', {
      download: true,
      header: true,
      complete: (results) => {
        const parsedServers = (results.data as YoutubeChannel[])
          .map((row) => ({
            id: row.id ?? '',
            title: row.title ?? '',
            description: row.description ?? '',
            handle: row.handle ?? '',
            publishedAt: row.publishedAt ?? '',
            thumbnail: row.thumbnail ?? '',
            country: row.country ?? '',
            viewCount: Number(row.viewCount) ?? 0,
            subscriberCount: Number(row.subscriberCount) ?? 0,
            videoCount: Number(row.videoCount) ?? 0
          }))
        youtubeChannelsStore.channels = parsedServers
        youtubeChannelsStore.applyFiltersAndSorting()
      },
    })
  }, [])

  return (
    <div className="container py-6">
      {/* Filters and Sorting Section */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-end gap-2">
            <h1 className="text-2xl font-bold">Youtube Channels</h1>
            <span className="text-gray-600">
              {snap.filteredChannels.length} servers
            </span>
          </div>
          <div className="flex items-center gap-4">
            <AndOrToggle
              isAndMode={snap.isAndMode}
              onToggle={() => youtubeChannelsStore.toggleAndMode()}
            />
            <button
              className="px-3 py-1 rounded border border-[#18816a] text-[#18816a] hover:bg-[#e6f7f4] transition-colors"
              onClick={() => youtubeChannelsStore.clearFilters()}
            >
              Clear All
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {['activism', 'education', 'social', 'philosophy', 'debating', 'cooking'].map(
            (filter) => (
              <FilterSortButton
                key={filter}
                label={filter}
                active={snap.filters.includes(filter)}
                onClick={() => youtubeChannelsStore.toggleFilter(filter)}
              />
            )
          )}
        </div>

        <div className="flex items-center gap-4">
          <span className="text-gray-700">Sort by</span>
          <button
            className={snap.sortKey === 'title' ? 'font-bold' : ''}
            onClick={() => youtubeChannelsStore.setSortKey('members')}
          >
            Title
          </button>
          <button
            className={snap.sortKey === 'subscriberCount' ? 'font-bold' : ''}
            onClick={() => youtubeChannelsStore.setSortKey('name')}
          >
            Subscriber Count
          </button>
          {snap.sortKey === 'title' && (
            <button
              className="px-2 py-1 border border-gray-300 rounded"
              onClick={() => youtubeChannelsStore.toggleDescending()}
            >
              {snap.isDescending ? 'Z → A' : 'A → Z'}
            </button>
          )}
        </div>
      </section>

      {/* Servers Grid */}
      <section className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {snap.filteredChannels.map((channel: YoutubeChannel, index: number) => (
          <div
            key={index}
            className="border border-gray-100 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow flex flex-col h-full"
          >
            <div className="flex-1">
              <div className="flex items-center gap-4">
                <img
                  src={channel.thumbnail}
                  alt={channel.title}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <h2 className="text-xl font-semibold">{channel.title}</h2>
              </div>
              <p className="mt-2 text-gray-600 line-clamp-4">
                {channel.description}
              </p>
            </div>

            <div className="mt-4">
              <div className="flex flex-wrap gap-1">
              </div>              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  {channel.subscriberCount.toLocaleString()} subscribers
                </span>
                <div className="flex gap-3">
                  <button
                    className="text-[#18816a] hover:underline"
                    onClick={() => navigator.clipboard.writeText(channel.handle)}
                  >
                    Copy
                  </button>
                  <a
                    href={channel.handle}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#18816a] hover:underline"
                  >
                    Open
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  )
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
      {/* Label to indicate the current mode */}
      <span className="text-sm font-medium text-gray-900">
        {isAndMode ? 'AND Mode' : 'OR Mode'}
      </span>

      {/* Radix UI Switch */}
      <Switch.Root
        className="relative h-[25px] w-[42px] cursor-default rounded-full bg-gray-200  outline-none  data-[state=checked]:bg-[#18816a]"
        checked={isAndMode}
        onCheckedChange={onToggle}
      >
        <Switch.Thumb
          className="block size-[21px] translate-x-0.5 rounded-full bg-white  transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[19px]"
        />
      </Switch.Root>
    </div>
  );
}

const FilterSortButton: React.FC<{
  label: string
  active: boolean
  onClick: () => void
}> = ({ label, active, onClick }) => (
  <button
    className={cn(
      'px-2 py-1 border border-gray-300 rounded transition-colors',
      active ? 'bg-[#e6f7f4] text-[#18816a]' : 'text-gray-700 hover:bg-gray-100'
    )}
    onClick={onClick}
  >
    {label}
  </button>
)

