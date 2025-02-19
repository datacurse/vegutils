'use client';

import { useSnapshot } from 'valtio';
import { sidebarStore, SidebarItem } from '../sidebarStore';
import { Link } from 'waku';
import { FaChevronRight } from "react-icons/fa6";
import { cn } from '@udecode/cn';

export function Sidebar() {
  const snapshot = useSnapshot(sidebarStore);

  return (
    <div className='w-[292px] p-2'>
      {snapshot.items.map((item, idx) => (
        <SidebarItemRenderer key={idx} item={item} path={[idx]} />
      ))}
    </div>
  );
}

function SidebarItemRenderer({ item, path }: { item: SidebarItem; path: number[] }) {
  switch (item.type) {
    case 'doc':
      return <DocItem item={item} />;
    case 'link':
      return <LinkItem item={item} />;
    case 'category':
      return <CategoryItem item={item} path={path} />;
    default:
      return null;
  }
}

function DocItem({ item }: { item: Extract<SidebarItem, { type: 'doc' }> }) {
  const { icon: Icon, iconProps } = item;

  return (
    <div className="flex items-center justify-between hover:bg-[#f2f2f2] rounded-md h-8 pl-4">
      {Icon && (<Icon {...iconProps} />)}
      <Link to={`/${item.slug}`}>{item.title}</Link>
    </div >
  );
}

function LinkItem({ item }: { item: Extract<SidebarItem, { type: 'link' }> }) {
  const { icon: Icon, iconProps } = item;

  return (
    <div className="flex items-center justify-between hover:bg-[#f2f2f2] rounded-md h-8 pl-4">
      {Icon && (<Icon {...iconProps} />)}
      <a href={item.href} target="_blank" rel="noopener noreferrer">
        {item.title}
      </a>
    </div>
  );
}

function CategoryItem({ item, path }: { item: Extract<SidebarItem, { type: 'category' }>; path: number[] }) {
  const { icon: Icon, iconProps } = item;

  const toggleCollapse = () => {
    let current = sidebarStore.items;
    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]].children;
    }
    const lastIndex = path[path.length - 1];
    current[lastIndex].collapsed = !current[lastIndex].collapsed;
  };

  return (
    <div>
      <div
        className="flex items-center justify-between hover:bg-[#f2f2f2] rounded-md"
        onClick={toggleCollapse}
      >
        <div className='flex flex-row items-center gap-2 px-3'>
          {Icon && <Icon {...iconProps} />}
          <div>{item.title}</div>
        </div>
        <div className='px-3 py-[6px] hover:bg-[#e6e6e6] duration-200 rounded-md'>
          <div className='h-5 w-5 flex items-center justify-center'>
            <FaChevronRight
              className={cn(
                'transform transition-transform duration-200 h-4 w-4',
                !item.collapsed && 'rotate-90'
              )}
            />
          </div>
        </div>
      </div>

      <div
        className="grid transition-[grid-template-rows] duration-300 ml-4"
        style={{
          gridTemplateRows: item.collapsed ? '0fr' : '1fr',
        }}
      >
        <div className="overflow-hidden min-h-0">
          {item.children.map((child, idx) => (
            <SidebarItemRenderer key={idx} item={child} path={[...path, idx]} />
          ))}
        </div>
      </div>
    </div>
  );
}
