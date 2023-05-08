import React, { FC, useMemo, useState } from 'react';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons/faChevronUp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';
import { ProgramSort, ProgramSortItems } from '../../interfaces/Program';
import './ProgramsSortButton.css';
import DropdownMenuButton from '../DropdownMenuButton/DropdownMenuButton';

const ProgramsSortButton: FC<ProgramsSortButtonProps> = ({
  selected,
  onChange,
}) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const sortOptions = useMemo(() => {
    return ProgramSortItems.map((value) => ({
      value,
      text: t(`program:sort.${value}`),
    }));
  }, [t]);

  const handleSortSelect = (value: ProgramSort) => {
    onChange(value);
  };

  return (
    <DropdownMenuButton
      buttonContent={
        <>
          <span>
            {t('common:sortBy')}
            <strong> {t(`program:sort.${selected}`)}</strong>
          </span>
          <FontAwesomeIcon icon={open ? faChevronDown : faChevronUp} />
        </>
      }
      items={sortOptions}
      selected={selected}
      onChange={handleSortSelect}
      onToggleOpen={setOpen}
    />
  );
};

export interface ProgramsSortButtonProps {
  readonly selected: ProgramSort;
  readonly onChange: React.Dispatch<React.SetStateAction<ProgramSort>>;
}

export default ProgramsSortButton;
