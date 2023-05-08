import React, { FC, HTMLAttributes, PropsWithChildren } from 'react';
import './Container.css';

const Container: FC<ContainerProps> = ({ children, ...props }) => {
  return (
    <div {...props} className={`container ${props.className || ''}`}>
      {children}
    </div>
  );
};

export interface ContainerProps
  extends PropsWithChildren,
    HTMLAttributes<HTMLDivElement> {}

export default Container;
