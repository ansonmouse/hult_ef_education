import React, { FC, HTMLAttributes, ReactElement } from 'react';
import './PaginationEdgeButton.css';

const PaginationEdgeButton: FC<PaginationEdgeButtonProps> = ({
  disabled,
  hideOnDesktop,
  icon,
  variant,
  ...props
}) => {
  return (
    <button
      disabled={disabled}
      {...props}
      className={`pagination-edge-button${
        variant === 'narrow' ? ' narrow' : ''
      }${hideOnDesktop ? ' hide-on-desktop' : ''}`}
    >
      {icon}
    </button>
  );
};

export interface PaginationEdgeButtonProps
  extends HTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  hideOnDesktop?: boolean;
  icon: ReactElement;
  variant?: 'normal' | 'narrow';
}

export default PaginationEdgeButton;
