'use client'

import React from 'react'
import { useSnapshot } from 'valtio'
import Papa from 'papaparse'
import { discordServersStore } from '@/discordServersStore'
import FiltersAndSorting from '@/components/content/FiltersAndSorting'

export default function Home(): React.ReactNode {
  const snap = useSnapshot(discordServersStore)

  React.useEffect(() => {
    Papa.parse('/csv/discord-servers.csv', {
      download: true,
      header: true,
      complete: (results) => {
        const parsed = (results.data as any[]).map((row) => ({
          title: row.title ?? '',
          inviteLink: row.inviteLink ?? '',
          iconSrc: row.iconSrc ?? '',
          members: Number(row.members) || 0,
          tags: row.tags ?? '',
          description: row.description ?? '',
        })).filter((server) => server.title && server.inviteLink)

        // Set servers and then apply the initial filters & sorting
        console.log(parsed)
        discordServersStore.servers = parsed
        discordServersStore.applyFiltersAndSorting()
      },
    })
  }, [])

  return (
    <div className="container py-6">
      <FiltersAndSorting />
      <div className="mt-12 grid grid-cols-3 gap-6">
        {snap.filteredServers.map((server, i) => (
          <div
            key={i}
            className="col border border-solid border-gray-100 rounded-lg p-4 flex flex-col justify-between shadow-[0px_0px_12px_2px_rgba(0,0,0,0.1)] h-full"
          >
            <div>
              <div className="flex flex-row items-center gap-4">
                <img
                  src={server.iconSrc}
                  alt={server.title}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div className="text-xl font-semibold">{server.title}</div>
              </div>
              <div className="line-clamp-4 mt-2">{server.description}</div>
            </div>

            <div className="mt-4">
              <div className="flex flex-wrap gap-2">
                {server.tags.length > 0 &&
                  server.tags.split(',').map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 border-solid border border-gray-300 rounded-md text-xs font-medium"
                    >
                      {tag.trim()}
                    </span>
                  ))}
              </div>
              <div className="mt-4 flex flex-row justify-between items-center">
                <div className="text-sm">{server.members} members</div>
                <div className="flex flex-row gap-2">
                  <div
                    onClick={() =>
                      navigator.clipboard.writeText(server.inviteLink)
                    }
                    className="cursor-pointer select-none hover:underline"
                  >
                    Copy
                  </div>
                  <a
                    href={server.inviteLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Join
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

