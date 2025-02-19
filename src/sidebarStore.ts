import { proxy } from 'valtio';
import type { IconType } from 'react-icons';
import { FaBolt, FaRocket } from 'react-icons/fa6';

export type SidebarItem = SidebarDocItem | SidebarLinkItem | SidebarCategoryItem;

export interface SidebarDocItem {
  type: 'doc';
  title: string;
  icon?: IconType;
  slug: string;
}

export interface SidebarLinkItem {
  type: 'link';
  title: string;
  icon?: IconType;
  href: string;
}

export interface SidebarCategoryItem {
  type: 'category';
  title: string;
  icon?: IconType;
  slug?: string;
  collapsed: boolean;
  children: SidebarItem[];
}


export const sidebarStore = proxy<{ items: SidebarItem[] }>({
  items: [
    {
      type: 'category',
      title: 'Getting Started',
      icon: FaRocket,
      collapsed: false,
      children: [
        {
          type: 'doc',
          title: 'Introduction',
          slug: 'introduction'
        },
        {
          type: 'link',
          title: 'GitHub Repository',
          href: 'https://github.com/your/repo'
        }
      ]
    },
    {
      type: 'doc',
      title: 'Quickstart Guide',
      icon: FaBolt,
      slug: 'quickstart'
    }
  ]
});

