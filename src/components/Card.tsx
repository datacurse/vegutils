import { IServerCard } from "@/interfaces";
import React from "react";

export function Card({ card }: { card: IServerCard }) {
  const handleClick = (e: React.MouseEvent) => {
    const selection = window.getSelection();
    if (!selection || selection.toString().length === 0) {
      if (card.inviteLink) {
        window.location.href = card.inviteLink;
      }
    }
  };

  // Create array of active attributes
  const attributes = [
    { key: 'verification', label: 'verification', value: card.verification },
    { key: 'adultsOnly', label: 'adults only', value: card.adultsOnly },
    { key: 'nsfw', label: 'nsfw', value: card.nsfw },
  ].filter(attr => attr.value);

  return (
    <div
      onClick={handleClick}
      className="relative col-span-4 w-full overflow-hidden rounded-md p-4 bg-bg2 flex flex-col space-y-4 hover:outline hover:outline-2 hover:outline-bg3 cursor-pointer"
    >
      <div className="flex flex-row space-x-4">
        <div className="relative overflow-hidden rounded-md h-[80px] w-[80px]" style={{ width: 80, height: 80 }}>
          <img
            alt={`${card.title} server icon`}
            loading="lazy"
            decoding="async"
            data-nimg="fill"
            className="absolute h-full w-full inset-0"
            src={card.iconSrc}
          />
        </div>
        <div className="flex flex-col justify-between">
          <div className="text-2xl">{card.title}</div>
          <div className="flex flex-row space-x-2 w-full">
            <div>{card.members}</div>
            <div className="text-text-shadow">members</div>
          </div>

        </div>
      </div>
      <div className="min-h-[60px]">
        <p className="!leading-5 line-clamp-3">{card.description}</p>
      </div>
    </div>
  );
}
