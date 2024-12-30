"use server";
import { parseServerCards } from "@/actions/parseServerCard";
import { readCsvFile } from "@/actions/readCsvFile";
import { Search } from "@/components/filter/Search";
import { ServerGrid } from "@/components/ServerGrid";
import { Sort } from "@/components/filter/Sorting";
import { Filters } from "@/components/filter/Filters";
import { Navigation } from "@/components/Navigation";

export default async function HomePage() {
  const serverCardsRaw = await readCsvFile("servers.csv");

  return (
    <body>
      <div className="flex min-h-screen flex-col bg-bg1 text-text">
        <div>
          <header className="flex h-20 w-full items-center border-transparent border-b bg-transparent transition duration-200 ease-in">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <nav className="flex items-center justify-between">
                <div className="text-4xl text-text">Vegan Discord Servers</div>
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
                  <ServerGrid />
                </section>
              </div>
            </main>
          </div>
        </div>
      </div>
    </body>
  );
}
