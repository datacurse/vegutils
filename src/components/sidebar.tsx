'use client';

import { useSnapshot } from 'valtio';
import { sidebarStore, SidebarItem } from '../sidebarStore';
import { Link } from 'waku';

export function Sidebar() {
  const snapshot = useSnapshot(sidebarStore);

  return (
    <div>
      {snapshot.items.map((item, idx) => (
        <SidebarItemRenderer key={idx} item={item} />
      ))}
    </div>
  );
}

function SidebarItemRenderer({ item }: { item: SidebarItem }) {
  switch (item.type) {
    case 'doc':
      return <DocItem item={item} />;
    case 'link':
      return <LinkItem item={item} />;
    case 'category':
      return <CategoryItem item={item} />;
    default:
      return null;
  }
}

function DocItem({ item }: { item: Extract<SidebarItem, { type: 'doc' }> }) {
  const { icon: Icon, iconProps } = item;

  return (
    <div className='bg-green-500 flex flex-row'>
      {Icon && (<Icon {...iconProps} />)}
      <Link to={`/${item.slug}`}>{item.title}</Link>
    </div>
  );
}

function LinkItem({ item }: { item: Extract<SidebarItem, { type: 'link' }> }) {
  const { icon: Icon, iconProps } = item;

  return (
    <div className='bg-blue-500 flex flex-row'>
      {Icon && (<Icon {...iconProps} />)}
      <a href={item.href} target="_blank" rel="noopener noreferrer">
        {item.title}
      </a>
    </div>
  );
}

function CategoryItem({ item }: { item: Extract<SidebarItem, { type: 'category' }> }) {
  const { icon: Icon, iconProps } = item;

  return (
    <div>
      <div className='bg-red-500 flex flex-row items-center'>
        {Icon && (<Icon {...iconProps} />)}
        <div>{item.title}</div>
      </div>

      <div className='ml-4'>
        {item.children.map((child, idx) => (
          <SidebarItemRenderer key={idx} item={child} />
        ))}
      </div>
    </div>
  );
}

