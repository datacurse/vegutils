'use client';
import { useSnapshot } from "valtio";
import { youtubeStore } from "../_store";
import { Card } from "./Card";

export function Grid() {
  const snap = useSnapshot(youtubeStore);

  return (
    <div className="grid grid-cols-4 gap-5 md:grid-cols-8 xl:grid-cols-12">
      {snap.channels.map((channel) => (
        <Card key={channel.id} channel={channel} />
      ))}
    </div>
  );
}
