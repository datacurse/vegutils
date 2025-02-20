'use client'

import React, { useEffect } from 'react'
import { useSnapshot } from 'valtio'
import Papa from 'papaparse'
import { cn } from '@udecode/cn'
import { discordServersStore } from '@/discordServersStore'

// Types
interface DiscordServer {
  title: string
  inviteLink: string
  iconSrc: string
  members: number
  tags: string
  description: string
}

// Utility Components
const AndOrToggle: React.FC<{
  isAndMode: boolean
  onToggle: () => void
}> = ({ isAndMode, onToggle }) => (
  <div className="flex items-center gap-3">
    <span className="text-sm font-medium text-gray-900">
      {isAndMode ? 'AND Mode' : 'OR Mode'}
    </span>
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={isAndMode}
        onChange={onToggle}
      />
      <div className="w-12 h-6 rounded-full transition-colors bg-gray-200 peer-checked:bg-[#18816a]" />
      <div className="absolute top-[2px] left-[2px] w-5 h-5 bg-white rounded-full border border-gray-300 transition-all peer-checked:left-[26px]" />
    </label>
  </div>
)

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

// Main Component
const DiscordServers: React.FC = () => {
  const snap = useSnapshot(discordServersStore)

  // Load CSV data
  useEffect(() => {
    Papa.parse('/csv/discord-servers.csv', {
      download: true,
      header: true,
      complete: (results) => {
        const parsedServers = (results.data as any[])
          .map((row) => ({
            title: row.title ?? '',
            inviteLink: row.inviteLink ?? '',
            iconSrc: row.iconSrc ?? '',
            members: Number(row.members) || 0,
            tags: row.tags ?? '',
            description: row.description ?? '',
          }))
          .filter((server) => server.title && server.inviteLink)

        discordServersStore.servers = parsedServers
        discordServersStore.applyFiltersAndSorting()
      },
    })
  }, [])

  return (
    <div className="container py-6">
      {/* Filters and Sorting Section */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-end gap-2">
            <h1 className="text-2xl font-bold">Discord Servers</h1>
            <span className="text-gray-600">
              {snap.filteredServers.length} servers
            </span>
          </div>
          <div className="flex items-center gap-4">
            <AndOrToggle
              isAndMode={snap.isAndMode}
              onToggle={discordServersStore.toggleAndMode}
            />
            <button
              className="px-3 py-1 rounded border border-[#18816a] text-[#18816a] hover:bg-[#e6f7f4] transition-colors"
              onClick={discordServersStore.clearFilters}
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
                onClick={() => discordServersStore.toggleFilter(filter)}
              />
            )
          )}
        </div>

        <div className="flex items-center justify-between gap-4">
          <input
            type="text"
            placeholder="Search by title or description..."
            className="w-1/3 px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#18816a]"
            value={snap.searchQuery}
            onChange={(e) => discordServersStore.setSearchQuery(e.target.value)}
          />
          <div className="flex items-center gap-4">
            <span className="text-gray-700">Sort by</span>
            <FilterSortButton
              label="Members"
              active={snap.sortKey === 'members'}
              onClick={() => discordServersStore.setSortKey('members')}
            />
            <FilterSortButton
              label="Name"
              active={snap.sortKey === 'name'}
              onClick={() => discordServersStore.setSortKey('name')}
            />
          </div>
        </div>
      </section>

      {/* Servers Grid */}
      <section className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {snap.filteredServers.map((server: DiscordServer, index: number) => (
          <div
            key={index}
            className="border border-gray-100 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow flex flex-col h-full"
          >
            <div className="flex-1">
              <div className="flex items-center gap-4">
                <img
                  src={server.iconSrc}
                  alt={server.title}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <h2 className="text-xl font-semibold">{server.title}</h2>
              </div>
              <p className="mt-2 text-gray-600 line-clamp-4">
                {server.description}
              </p>
            </div>

            <div className="mt-4">
              <div className="flex flex-wrap gap-2">
                {server.tags.split(',').map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 border border-gray-300 rounded-md text-xs font-medium text-gray-700"
                  >
                    {tag.trim()}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  {server.members.toLocaleString()} members
                </span>
                <div className="flex gap-3">
                  <button
                    className="text-[#18816a] hover:underline"
                    onClick={() => navigator.clipboard.writeText(server.inviteLink)}
                  >
                    Copy
                  </button>
                  <a
                    href={server.inviteLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#18816a] hover:underline"
                  >
                    Join
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

export default DiscordServers
