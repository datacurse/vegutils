import { proxy } from 'valtio';
import type { IconType } from 'react-icons';

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
      type: 'doc',
      title: 'Introduction',
      slug: 'introduction'
    },
    {
      type: 'category',
      title: 'Practicies',
      slug: 'practicies',
      collapsed: false,
      children: [
        {
          type: 'doc',
          title: 'Eyestalk Ablation',
          slug: 'eyestalk-ablation'
        },
      ]
    },
    {
      type: 'category',
      title: 'Social Platforms',
      slug: 'social-platforms',
      collapsed: false,
      children: [
        {
          type: 'doc',
          title: 'Discord Servers',
          slug: 'discord-servers'
        },
        {
          type: 'doc',
          title: 'Youtube Channels',
          slug: 'youtube-channels'
        },
        //{
        //  type: 'doc',
        //  title: 'Shopping',
        //  slug: 'shopping'
        //},
      ]
    },
    {
      type: 'category',
      title: 'Utilities',
      slug: 'utilities',
      collapsed: false,
      children: [
        {
          type: 'doc',
          title: 'Is it vegan?',
          slug: 'is-it-vegan'
        },
      ]
    },
  ] as SidebarItem[]
});
