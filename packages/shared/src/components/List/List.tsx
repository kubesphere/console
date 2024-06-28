import React, { PropsWithChildren } from 'react';

interface Props {
  className?: string;
}

function List({ className, children }: PropsWithChildren<Props>) {
  return <div className={className}>{children}</div>;
}

export default List;
