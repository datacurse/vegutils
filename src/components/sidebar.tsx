'use client';

import { useSnapshot } from 'valtio';
import { sidebarStore, SidebarItem } from '../sidebarStore';
import { Link, useRouter_UNSTABLE as useRouter } from 'waku';
import { FaChevronRight } from "react-icons/fa6";
import { cn } from '@udecode/cn';

export function Sidebar() {
  const snapshot = useSnapshot(sidebarStore);
  const router = useRouter();

  return (
    <div className='flex flex-col h-full'>
      {snapshot.items.map((item, idx) => (
        <SidebarItemRenderer
          key={idx}
          item={item}
          path={[idx]}
          slugPath={[]}
          currentPath={router.path}
        />
      ))}
    </div>
  );
}

function SidebarItemRenderer({
  item,
  path,
  slugPath = [],
  currentPath
}: {
  item: SidebarItem;
  path: number[];
  slugPath?: string[];
  currentPath: string;
}) {
  switch (item.type) {
    case 'doc':
      return <DocItem item={item} slugPath={slugPath} currentPath={currentPath} />;
    case 'link':
      return <LinkItem item={item} />;
    case 'category':
      return <CategoryItem item={item} path={path} slugPath={slugPath} currentPath={currentPath} />;
    default:
      return null;
  }
}

function DocItem({ item, slugPath, currentPath }: {
  item: Extract<SidebarItem, { type: 'doc' }>;
  slugPath: string[];
  currentPath: string;
}) {
  const fullPath = [...slugPath, item.slug].join('/');
  const isActive = currentPath === `/${fullPath}`;

  return (
    <div className={cn(
      "flex items-center hover:bg-bt-hover rounded-md h-8 pl-4 mt-1",
      isActive && 'bg-bt-blue hover:bg-bt-blue-hover text-text-blue'
    )}>
      <Link to={`/${fullPath}`} className="w-full py-1">
        {item.title}
      </Link>
    </div>
  );
}

function LinkItem({ item }: { item: Extract<SidebarItem, { type: 'link' }> }) {
  return (
    <div className="flex items-center hover:bg-bg rounded-md h-8 pl-4 mt-1">
      <a href={item.href} target="_blank" rel="noopener noreferrer" className="w-full py-1">
        {item.title}
      </a>
    </div>
  );
}

function CategoryItem({ item, path, slugPath = [], currentPath }: {
  item: Extract<SidebarItem, { type: 'category' }>;
  path: number[];
  slugPath?: string[];
  currentPath: string;
}) {
  const newSlugPath = item.slug ? [...slugPath, item.slug] : slugPath;
  const fullPath = newSlugPath.join('/');
  const isActive = currentPath === `/${fullPath}`;

  const toggleCollapse = (e: React.MouseEvent) => {
    e.stopPropagation();
    let current = sidebarStore.items;
    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]].children;
    }
    const lastIndex = path[path.length - 1];
    current[lastIndex].collapsed = !current[lastIndex].collapsed;
  };

  return (
    <div>
      <div className={cn(
        "flex items-center justify-between hover:bg-bt-hover rounded-md mt-1",
        isActive && 'bg-bt-blue hover:bg-bt-blue-hover text-text-blue'
      )}>
        <Link
          to={`/${fullPath}`}
          className="flex flex-row items-center gap-2 px-3 flex-1 py-1"
        >
          {item.icon && <item.icon {...item.iconProps} />}
          <div>{item.title}</div>
        </Link>
        <div
          className='px-3 py-[6px] hover:bg-bt duration-200 rounded-md cursor-pointer'
          onClick={toggleCollapse}
        >
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
        style={{ gridTemplateRows: item.collapsed ? '0fr' : '1fr' }}
      >
        <div className="overflow-hidden min-h-0">
          {item.children.map((child, idx) => (
            <SidebarItemRenderer
              key={idx}
              item={child}
              path={[...path, idx]}
              slugPath={newSlugPath}
              currentPath={currentPath}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
