import { proxy } from 'valtio';
import type { IconType } from 'react-icons';
import { FaBolt, FaRocket } from 'react-icons/fa6';

export type SidebarItem = SidebarDocItem | SidebarLinkItem | SidebarCategoryItem;

export interface SidebarDocItem {
  type: 'doc';
  title: string;
  icon: IconType | undefined;
  iconProps: object | undefined;
  slug: string;
}


export interface SidebarLinkItem {
  type: 'link';
  title: string;
  icon: IconType | undefined;
  iconProps: object | undefined;
  href: string | undefined;
}

export interface SidebarCategoryItem {
  type: 'category';
  title: string;
  icon: IconType | undefined;
  iconProps: object | undefined;
  slug: string | undefined;
  collapsed: boolean;
  children: SidebarItem[];
}


export const sidebarStore = proxy<{ items: SidebarItem[] }>({
  items: [
    {
      type: 'category',
      title: 'Getting Started',
      icon: FaRocket,
      iconProps: { size: 20 },
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
          href: 'https://github.com/datacurse/wakusaurus'
        },
        {
          type: 'category',
          title: 'Getting Started',
          icon: FaRocket,
          iconProps: { size: 20 },
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
              href: 'https://github.com/datacurse/wakusaurus'
            }
          ]
        },

      ]
    },
    {
      type: 'doc',
      title: 'Quickstart Guide',
      icon: FaBolt,
      iconProps: { size: 20, color: 'orange' },
      slug: 'quickstart'
    }
  ] as SidebarItem[]
});

