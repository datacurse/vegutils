'use client'

import { useEffect } from 'react';
import { useSnapshot } from 'valtio';
import { DiscordServer, discordServersStore } from '@/stores/discordServersStore';

// Map categories to their corresponding icon paths
const CATEGORY_ICONS: Record<DiscordServer['category'], string> = {
  educational: '/images/icons/bar-chart.png',
  casual: '/images/icons/speech-ballon.png',
  brainrot: '/images/icons/monkey.png',
};

// Define the order in which we want to render categories
const CATEGORIES: Array<DiscordServer['category']> = [
  'educational',
  'casual',
  'brainrot',
];

export default function DiscordServers() {
  // Grab a reactive snapshot of the store
  const snap = useSnapshot(discordServersStore);

  // Load the servers once when the component mounts
  useEffect(() => {
    discordServersStore.loadServers();
  }, []);

  return (
    <div className="">
      {/* --- Header ------------------------------------------------------ */}
      <header className="space-y-4">
        <div className="flex justify-between">
          <div className="flex items-end gap-2">
            <h1 className="text-2xl font-bold">Discord Servers</h1>
            <span>{snap.servers.length} servers</span>
          </div>

          <a
            href="https://github.com/datacurse/vegutils/blob/main/public/csv/discord-servers.csv"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline flex items-end"
          >
            Add or edit servers
          </a>
        </div>
      </header>

      {/* --- Servers grouped by category --------------------------------- */}
      {CATEGORIES.map((cat) => {
        const serversInCategory = snap.servers.filter(
          (server) => server.category === cat,
        );
        if (!serversInCategory.length) return null;

        return (
          <div key={cat} className="mt-10 first:mt-6">
            {/* Category label */}
            <h2 className="text-xl font-semibold mb-4 capitalize flex items-center gap-2">
              <img
                src={CATEGORY_ICONS[cat]}
                alt=""
                className="w-6 h-6 object-contain"
              />
              {cat}
            </h2>

            {/* Servers Grid */}
            <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {serversInCategory.map((server) => (
                <div
                  key={server.slug}
                  className="border border-border rounded-lg p-4 flex flex-col bg-card h-full"
                >
                  {/* Top section: icon + title + description */}
                  <div className="flex-1">
                    <div className="flex items-center gap-4">
                      <img
                        src={`/images/server-icons/${server.slug}.webp`}
                        alt={server.title}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <span className="text-xl font-semibold">
                        {server.title}
                      </span>
                    </div>

                    <p className="mt-2 line-clamp-3 lg:line-clamp-4">
                      {server.description}
                    </p>
                  </div>

                  {/* Bottom section: members + actions */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-sm">
                      <span>{server.members.toLocaleString()} members</span>

                      {/* Hide actions for brainrot category */}
                      {server.category !== 'brainrot' && (
                        <div className="flex gap-3">
                          <button
                            type="button"
                            className="text-text-green hover:underline"
                            onClick={() =>
                              navigator.clipboard.writeText(server.inviteLink)
                            }
                          >
                            Copy
                          </button>

                          <a
                            href={server.inviteLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-text-green hover:underline"
                          >
                            Join
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </section>
          </div>
        );
      })}
    </div>
  );
}

