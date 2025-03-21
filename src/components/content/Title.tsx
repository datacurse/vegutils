'use client';

import { sidebarStructure } from "@/sidebarStructure";
import { getUrlSlugs, findItemByPath } from "@/utils";
import { useRouter_UNSTABLE as useRouter } from 'waku';

export default function Title() {
  const router = useRouter();
  const slugs = getUrlSlugs(router.path);

  // Find the current page item
  const currentItem = findItemByPath(sidebarStructure, slugs);

  // Get the title, fallback to the last slug if item not found
  const pageTitle = currentItem?.title || slugs[slugs.length - 1];

  return (
    <div className="text-4xl font-bold flex items-center gap-4">
      {currentItem?.icon && (
        <currentItem.icon className="w-9 h-9 text-icon" />
      )}
      {pageTitle}
    </div>
  );
}

