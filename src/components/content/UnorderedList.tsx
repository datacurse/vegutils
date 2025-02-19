import React, { ReactElement, ReactNode } from 'react';

export const UnorderedList = ({ children }: { children: ReactNode }) => {
  const listItems = React.Children.toArray(children).filter(
    (child): child is ReactElement<{ children: ReactNode }> =>
      React.isValidElement(child) &&
      child.type === 'div'
  );

  return (
    <div className="space-y-2">
      {listItems.map((item, index) => (
        <div key={index} className="flex items-start flex-row gap-2">
          <div className='pt-2 px-[3px]'>
            <div className="w-1.5 h-1.5 rounded-full bg-text-muted" />
          </div>
          <div className="flex-1">{item.props.children}</div>
        </div>
      ))}
    </div>
  );
};

