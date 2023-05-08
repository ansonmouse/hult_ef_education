import React, { FC, HTMLAttributes } from 'react';
import './PaginationNumberButton.css';

const PaginationNumberButton: FC<PaginationNumberButtonProps> = ({
  pageNumber,
  selected,
  ...props
}) => {
  return (
    <button
      {...props}
      className={`pagination-number-button${selected ? ' selected' : ''}`}
    >
      {pageNumber}
    </button>
  );
};

export interface PaginationNumberButtonProps
  extends HTMLAttributes<HTMLButtonElement> {
  pageNumber: number;
  selected?: boolean;
}

export default PaginationNumberButton;
