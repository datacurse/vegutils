'use client'

import React, { useEffect } from 'react';
import { useSnapshot } from 'valtio';
import { cn } from '@udecode/cn';
import { discordServersStore } from '@/stores/discordServersStore';

interface DiscordServer {
  title: string;
  inviteLink: string;
  iconSrc: string;
  members: number;
  description: string;
}

export default function DiscordServers() {
  const snap = useSnapshot(discordServersStore);

  useEffect(() => {
    discordServersStore.loadServers();
  }, []);

  return (
    <div className="py-6">
      {/* Filters and Sorting Section */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-end gap-2">
            <h1 className="text-2xl font-bold">Discord Servers</h1>
            <span className="text-gray-600">
              {snap.filteredServers.length} servers
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search by name or description"
            value={snap.searchQuery}
            onChange={(e) => discordServersStore.setSearchQuery(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded"
          />
          <span className="text-gray-700">Sort by</span>
          <button
            className={snap.sortKey === 'name' ? 'font-bold' : ''}
            onClick={() => discordServersStore.setSortKey('name')}
          >
            Name
          </button>
          <button
            className={snap.sortKey === 'members' ? 'font-bold' : ''}
            onClick={() => discordServersStore.setSortKey('members')}
          >
            Members
          </button>
        </div>
      </section>

      {/* Servers Grid */}
      <section className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {snap.filteredServers.map((server: DiscordServer, index: number) => (
          <div
            key={index}
            className="border border-border rounded-lg p-4 transition-shadow flex flex-col h-full"
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
              <div className="flex justify-between items-center">
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
  );
}
