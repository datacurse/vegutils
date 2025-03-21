'use client'

import React, { useEffect } from 'react'
import { useSnapshot } from 'valtio'
import { cn } from '@udecode/cn'
import * as Switch from '@radix-ui/react-switch';
import { YoutubeChannel, youtubeChannelsStore } from '@/stores/youtubeChannelsStore'

export default function YoutubeChannels() {
  const snap = useSnapshot(youtubeChannelsStore)

  useEffect(() => {
    youtubeChannelsStore.loadChannels();
  }, []);

  return (
    <div className="">
      {/* Filters and Sorting Section */}
      <div className="space-y-4">
        <div className="flex justify-between">
          <div className="flex items-end gap-2">
            <h1 className="text-2xl font-bold">Youtube Channels</h1>
            <span className="">
              {snap.filteredChannels.length} channels
            </span>
          </div>
          <div className="hover:underline flex items-end">
            <a href="https://github.com/datacurse/vegutils/blob/main/public/csv/youtube-channels.csv" target="_blank" >
              Add or edit channels
            </a>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search by name or description"
            value={snap.searchQuery}
            onChange={(e) => youtubeChannelsStore.setSearchQuery(e.target.value)}
            className="px-3 w-64 py-1 border border-border rounded outline-border"
          />
          <div className='flex flex-row items-center space-x-2'>
            <div className="">Sort by</div>
            <div
              className={cn('border border-border px-2 py-1 rounded-md hover:bg-bt-hover cursor-pointer select-none',
                snap.sortKey === 'subscriberCount' && 'bg-bt')}
              onClick={() => youtubeChannelsStore.setSortKey('subscriberCount')}
            >
              Subscribers
            </div>
            <div
              className={cn('border border-border px-2 py-1 rounded-md hover:bg-bt-hover cursor-pointer select-none',
                snap.sortKey === 'title' && 'bg-bt')}
              onClick={() => youtubeChannelsStore.setSortKey('title')}
            >
              Title
            </div>
          </div>
        </div>
      </div>

      {/* Servers Grid */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {snap.filteredChannels.map((channel: YoutubeChannel, index: number) => (
          <div
            key={index}
            className="border border-border rounded-lg p-4 flex flex-col h-full bg-card"
          >
            <div className="flex-1">
              <div className="flex items-center gap-4">
                <img
                  src={channel.thumbnailUrl}
                  alt={channel.title}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <h2 className="text-xl font-semibold">{channel.title}</h2>
              </div>
              <p className="mt-2 line-clamp-3 lg:line-clamp-4">
                {channel.description}
              </p>
            </div>

            <div className="mt-4">
              <div className="flex flex-wrap gap-1">
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">
                  {channel.subscriberCount.toLocaleString()} subscribers
                </span>
                <div className="flex gap-3">
                  <button
                    className="text-text-green hover:underline"
                    onClick={() => navigator.clipboard.writeText(`https://www.youtube.com/@${channel.handle}`)}
                  >
                    Copy
                  </button>
                  <a
                    href={`https://www.youtube.com/@${channel.handle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-green hover:underline"
                  >
                    Open
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div >
  )
}
