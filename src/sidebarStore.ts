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
      slug: 'getting-started',
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
          title: 'Advanced Setup',
          slug: 'advanced-setup',
          icon: FaRocket,
          iconProps: { size: 20 },
          collapsed: true, // This nested category starts collapsed
          children: [
            {
              type: 'doc',
              title: 'Configuration',
              slug: 'configuration'
            },
            {
              type: 'link',
              title: 'API Documentation',
              href: 'https://github.com/datacurse/wakusaurus/docs'
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

// Helper function to find and toggle a category's collapsed state by title (useful for external control)
export function toggleCategoryByTitle(title: string) {
  const toggleInItems = (items: SidebarItem[]): boolean => {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.type === 'category') {
        if (item.title === title) {
          item.collapsed = !item.collapsed;
          return true;
        }
        if (toggleInItems(item.children)) {
          return true;
        }
      }
    }
    return false;
  };

  toggleInItems(sidebarStore.items);
}

