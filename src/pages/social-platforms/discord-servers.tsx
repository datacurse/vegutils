'use client'

import React, { useEffect } from 'react'
import { useSnapshot } from 'valtio'
import Papa from 'papaparse'
import { cn } from '@udecode/cn'
import { discordServersStore } from '@/discordServersStore'
import * as Switch from '@radix-ui/react-switch';


// Types
interface DiscordServer {
  title: string
  inviteLink: string
  iconSrc: string
  members: number
  tags: string
  description: string
}

// Main Component
export default function DiscordServers() {
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
              onToggle={() => discordServersStore.toggleAndMode()}
            />
            <button
              className="px-3 py-1 rounded border border-[#18816a] text-[#18816a] hover:bg-[#e6f7f4] transition-colors"
              onClick={() => discordServersStore.clearFilters()}
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

        <div className="flex items-center gap-4">
          <span className="text-gray-700">Sort by</span>
          <button
            className={snap.sortKey === 'members' ? 'font-bold' : ''}
            onClick={() => discordServersStore.setSortKey('members')}
          >
            Members
          </button>
          <button
            className={snap.sortKey === 'name' ? 'font-bold' : ''}
            onClick={() => discordServersStore.setSortKey('name')}
          >
            Name
          </button>
          {snap.sortKey === 'name' && (
            <button
              className="px-2 py-1 border border-gray-300 rounded"
              onClick={() => discordServersStore.toggleDescending()}
            >
              {snap.isDescending ? 'Z → A' : 'A → Z'}
            </button>
          )}
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
              <div className="flex flex-wrap gap-1">
                {server.tags
                  .split(',')
                  .map((tag) => tag.trim())
                  .filter((tag) => tag !== '')
                  .map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 border border-gray-300 rounded-md text-xs font-medium text-gray-700"
                    >
                      {tag}
                    </span>
                  ))}
              </div>              <div className="mt-4 flex justify-between items-center">
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


