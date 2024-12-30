"use client"
import { useEffect } from "react";
import { useSnapshot } from "valtio";
import { Card } from "./_components/Card";
import { Search } from "./_components/Search";
import { Sort } from "./_components/Sort";
import { Navigation } from "@/components/Navigation";
import { youtubeActions, youtubeStore } from "./_store";

export default function HomePage() {
  const snap = useSnapshot(youtubeStore);

  useEffect(() => {
    youtubeActions.fetchChannels();
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-bg1 text-text">
      <header className="flex h-20 w-full items-center border-transparent border-b bg-transparent transition duration-200 ease-in">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between">
            <div className="text-4xl text-text">Vegan Youtube Channels</div>
            <Navigation />
          </nav>
        </div>
      </header>
      <div className="container mx-auto mb-10 flex-1 px-4 sm:px-6 lg:px-8">
        <main>
          <Search />
          <div className="flex flex-row justify-between mt-4">
            <Sort />
          </div>
          <div className="my-12 space-y-10">
            <section className="space-y-5">
              <div className="grid grid-cols-4 gap-5 md:grid-cols-8 xl:grid-cols-12">
                {snap.isLoading ? (
                  <div></div>
                ) : (
                  snap.filteredChannels.map((channel) => (
                    <Card key={channel.id} channel={channel} />
                  ))
                )}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
