import React, { FC, HTMLAttributes, ReactNode, useEffect, useRef } from 'react';
import './DropdownMenuButton.css';

const DropdownMenuButton: FC<DropdownMenuButtonProps> = ({
  buttonContent,
  dialogProps,
  items,
  selected,
  onChange,
  onToggleOpen,
}) => {
  const ButtonRef = useRef<HTMLButtonElement>(null);
  const ContainerRef = useRef<HTMLDivElement>(null);
  const DialogRef = useRef<HTMLDialogElement>(null);
  const OpenRef = useRef(false);
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      // @ts-ignore
      if (!ContainerRef.current?.contains(event.target) && OpenRef.current) {
        handleToggleOpen();
      }
    };
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, []);

  const handleSelect = (value: string) => {
    onChange(value);
    handleToggleOpen();
  };

  const handleToggleOpen = () => {
    if (!OpenRef || !DialogRef) {
      return;
    }
    if (!OpenRef.current) {
      DialogRef.current?.show();
      OpenRef.current = true;
    } else {
      DialogRef.current?.close();
      OpenRef.current = false;
    }
    if (!!onToggleOpen) {
      onToggleOpen(OpenRef.current);
    }
  };

  return (
    <div ref={ContainerRef} className="dropdown-menu-button">
      <button
        ref={ButtonRef}
        className="toggle-button"
        data-testid="toggle-button"
        onClick={handleToggleOpen}
      >
        {buttonContent}
      </button>
      <dialog ref={DialogRef} {...dialogProps}>
        <div>
          {items.map(({ text, value }) => {
            const isSelected = value === selected;
            return (
              <button
                key={value}
                data-testid={`option_${value}`}
                onClick={() => handleSelect(value)}
                {...(isSelected && {
                  className: 'selected',
                })}
              >
                {text}
              </button>
            );
          })}
        </div>
      </dialog>
    </div>
  );
};

export interface DropdownMenuButtonItem {
  readonly text: string;
  readonly value: string;
}

export interface DropdownMenuButtonProps {
  readonly buttonContent: ReactNode;
  readonly dialogProps?: HTMLAttributes<HTMLDialogElement>;
  readonly items: DropdownMenuButtonItem[];
  readonly selected: string;
  readonly onChange: (value: string) => void;
  readonly onToggleOpen?: (
    open: boolean,
  ) => void | React.Dispatch<React.SetStateAction<boolean>>;
}

export default DropdownMenuButton;
