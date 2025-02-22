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
        {
          type: 'doc',
          title: 'Stores',
          slug: 'stores'
        },
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

    {
      type: 'category',
      title: 'Guides',
      slug: 'guides',
      collapsed: false,
      children: [
        {
          type: 'doc',
          title: 'Pages',
          slug: 'pages'
        },
        {
          type: 'category',
          title: 'Docs',
          slug: 'docs',
          collapsed: false,
          children: [
            {
              type: 'doc',
              title: 'Create a doc',
              slug: 'create-a-doc'
            },
            {
              type: 'category',
              title: 'Sidebar',
              slug: 'sidebar',
              collapsed: false,
              children: [
                {
                  type: 'doc',
                  title: 'Sidebar items',
                  slug: 'sidebar-items'
                },
                {
                  type: 'doc',
                  title: 'Autogenerated',
                  slug: 'autogenerated'
                },
                {
                  type: 'doc',
                  title: 'Using multiple sidebars',
                  slug: 'using-multiple-sidebars'
                },
              ]
            },
            {
              type: 'doc',
              title: 'Versioning',
              slug: 'versioning'
            },
          ]
        },
        {
          type: 'doc',
          title: 'Blog',
          slug: 'blog'
        },
      ]
    },
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

