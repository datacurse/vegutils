"use"

import React from "react";
import { IYoutubeChannel } from "../_interfaces";

export function Card({ channel }: { channel: IYoutubeChannel }) {
  const handleClick = (e: React.MouseEvent) => {
    const selection = window.getSelection();
    if (!selection || selection.toString().length === 0) {
      window.open(`https://www.youtube.com/@${channel.handle}`, '_blank');
    }
  };

  return (
    <div
      onClick={handleClick}
      className="relative col-span-4 w-full overflow-hidden rounded-md p-4 bg-bg2 flex flex-col space-y-4 hover:outline hover:outline-2 hover:outline-bg3"
    >
      <div className="flex flex-row space-x-4">
        <div className="relative overflow-hidden rounded-md h-[80px] w-[80px]" style={{ width: 80, height: 80 }}>
          <img
            alt={`${channel.title} server icon`}
            loading="lazy"
            decoding="async"
            data-nimg="fill"
            className="absolute h-full w-full inset-0"
            src={channel.thumbnailUrl}
          />
        </div>
        <div className="flex flex-col justify-between">
          <div className="text-2xl">{channel.title}</div>
        </div>
      </div>

      <div className="flex flex-row space-x-4">
        <div className="flex flex-row space-x-2 w-full">
          <div>{channel.subscriberCount}</div>
          <div className="text-text-shadow">subscribers</div>
        </div>
        <div className="flex flex-row space-x-2 w-full">
          <div>{channel.videoCount}</div>
          <div className="text-text-shadow">videos</div>
        </div>
      </div>

      <div className="flex flex-row space-x-4">
        <div className="flex flex-row space-x-2 w-full">
          <div>{channel.viewCount}</div>
          <div className="text-text-shadow">views</div>
        </div>
        {channel.country ? (
          <div className="flex flex-row space-x-2 w-full">
            <div>{channel.country}</div>
            <div className="text-text-shadow">country</div>
          </div>
        ) : (
          <div className="flex flex-row space-x-2 w-full">
            <div>?</div>
            <div className="text-text-shadow">country</div>
          </div>
        )}
      </div>

      <div className="min-h-[60px]">
        <p className="!leading-5 line-clamp-3">{channel.description}</p>
      </div>
    </div>
  );
}
