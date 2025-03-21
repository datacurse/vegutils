"use client"

import { store } from "@/stores/store"
import { cn } from "@udecode/cn"
import { useSnapshot } from "valtio"
import { RxHamburgerMenu } from "react-icons/rx";

export default function Hamburger() {
  const snap = useSnapshot(store)
  return (
    <div
      className={cn(
        'hover:bg-bt-hover p-3 flex items-center justify-center rounded-sm border border-border',
        snap.hamburger && 'bg-bt'
      )}
      onClick={store.toggleHamburger}
    >
      <RxHamburgerMenu />
    </div>
  )
}
