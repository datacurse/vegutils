"use client"
import { useSnapshot } from 'valtio';
import { state, actions, sortOptions } from '../_store';
import { Pill } from '@/components/Pill';

export function Sort() {
  const snap = useSnapshot(state);

  return (
    <div className='flex flex-row items-center space-x-4'>
      <div className='text-text text-lg'>sort by</div>
      <div className="flex flex-wrap items-center gap-2">
        {sortOptions.map((option) => (
          <button
            key={option.key}
            onClick={() => actions.handleSort(option)}
            className="focus:outline-none"
          >
            <Pill
              label={option.label}
              active={snap.currentSort.key === option.key}
              direction={snap.currentSort.key === option.key ? snap.currentSort.direction : undefined}
            />
          </button>
        ))}
      </div>
    </div>
  )
}
