'use client'

import { useEffect } from 'react';
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
    <div className="">
      {/* Filters and Sorting Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-end gap-2">
            <div className="text-2xl font-bold">Discord Servers</div>
            <div className="">
              {snap.filteredServers.length} servers
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search by name or description"
            value={snap.searchQuery}
            onChange={(e) => discordServersStore.setSearchQuery(e.target.value)}
            className="px-3 w-64 py-1 border border-border rounded outline-border"
          />
          <div className='flex flex-row items-center space-x-2'>
            <div className="">Sort by</div>
            <div
              className={cn('border border-border px-2 py-1 rounded-md hover:bg-bt-hover cursor-pointer select-none',
                snap.sortKey === 'members' && 'bg-bt')}
              onClick={() => discordServersStore.setSortKey('members')}
            >
              Members
            </div>
            <div
              className={cn('border border-border px-2 py-1 rounded-md hover:bg-bt-hover cursor-pointer select-none',
                snap.sortKey === 'name' && 'bg-bt')}
              onClick={() => discordServersStore.setSortKey('name')}
            >
              Name
            </div>
          </div>
        </div>
      </div>

      {/* Servers Grid */}
      <section className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {snap.filteredServers.map((server: DiscordServer, index: number) => (
          <div
            key={index}
            className="border border-border rounded-lg p-4 transition-shadow flex flex-col h-full bg-card"
          >
            <div className="flex-1">
              <div className="flex items-center gap-4">
                <img
                  src={server.iconSrc}
                  alt={server.title}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div className="text-xl font-semibold">
                  {server.title}
                </div>
              </div>
              <div className="mt-2 line-clamp-4">
                {server.description}
              </div>
            </div>

            <div className="mt-4">
              <div className="flex justify-between items-center">
                <div className="text-sm">
                  {server.members.toLocaleString()} members
                </div>
                <div className="flex gap-3">
                  <div
                    className="text-text-green hover:underline cursor-pointer"
                    onClick={() => navigator.clipboard.writeText(server.inviteLink)}
                  >
                    Copy
                  </div>
                  <a
                    href={server.inviteLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-green hover:underline"
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
