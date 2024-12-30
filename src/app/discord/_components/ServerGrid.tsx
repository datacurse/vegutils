"use client"
import { useEffect } from "react";
import { useSnapshot } from 'valtio';
import { state, actions } from '../_store';
import { Card } from "./Card";

export function ServerGrid() {
  const snap = useSnapshot(state);

  useEffect(() => {
    actions.fetchServers();
  }, [actions.fetchServers]);

  if (snap.isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="grid grid-cols-4 gap-5 md:grid-cols-8 xl:grid-cols-12">
      {snap.filteredServers.map((_, i) => (
        <Card card={state.filteredServers[i]!} />
      ))}
    </div>
  );
}
