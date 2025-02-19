import React, { ReactElement, ReactNode } from 'react';

interface OrderedListProps {
  children: ReactNode;
}

const OrderedList: React.FC<OrderedListProps> = ({ children }) => {
  const listItems = React.Children.toArray(children).filter(
    (child): child is ReactElement<{ children: ReactNode }> =>
      React.isValidElement(child) &&
      child.type === 'div'
  );

  return (
    <div className="space-y-2">
      {listItems.map((item, index) => (
        <div key={index} className="flex items-start flex-row">
          <div className="mr-2 font-medium text-text-muted">{index + 1}.</div>
          <div>{item.props.children}</div>
        </div>
      ))}
    </div>
  );
};

export default OrderedList;

