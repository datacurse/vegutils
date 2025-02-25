"use client"

import { store } from "@/stores/store"
import { cn } from "@udecode/cn"
import { useSnapshot } from "valtio"

export default function Hamburger() {
  const snap = useSnapshot(store)
  return (
    <div
      className={cn(
        snap.hamburger && 'bg-red-500'
      )}
      onClick={store.toggleHamburger}
    >
      Hamburger
    </div>
  )
}
