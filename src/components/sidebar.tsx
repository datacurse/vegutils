'use client';

import { useSnapshot } from 'valtio';
import { sidebarStore } from '../sidebarStore';
import { Link } from 'waku';

// The main Sidebar component iterates over the items from our Valtio store.
export function Sidebar() {
  const snapshot = useSnapshot(sidebarStore);

  return (
    <div>
      {snapshot.items.map((item, idx) => (
        <SidebarItem key={idx} item={item} />
      ))}
    </div>
  );
}

// This component checks the type of item and renders the corresponding component.
function SidebarItem({ item }: { item: any }) {
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

// Component for a "doc" item (internal link)
function DocItem({ item }: { item: any }) {
  return (
    <div style={{ backgroundColor: 'lightblue', padding: '8px', margin: '4px' }}>
      <Link to={`/${item.slug}`}>{item.title}</Link>
    </div>
  );
}

// Component for a "link" item (external or internal URL)
function LinkItem({ item }: { item: any }) {
  return (
    <div style={{ backgroundColor: 'lightgreen', padding: '8px', margin: '4px' }}>
      <a href={item.href} target="_blank" rel="noopener noreferrer">
        {item.title}
      </a>
    </div>
  );
}

// Component for a "category" item; it simply displays its title and all its children.
function CategoryItem({ item }: { item: any }) {
  return (
    <div style={{ backgroundColor: 'lightcoral', padding: '8px', margin: '4px' }}>
      <div>{item.title}</div>
      <div style={{ marginLeft: '16px' }}>
        {item.children.map((child: any, idx: number) => (
          <SidebarItem key={idx} item={child} />
        ))}
      </div>
    </div>
  );
}

