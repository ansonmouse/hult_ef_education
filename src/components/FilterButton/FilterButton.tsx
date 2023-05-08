import React, { FC, HTMLAttributes } from 'react';
import { faSliders } from '@fortawesome/free-solid-svg-icons/faSliders';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';
import './FilterButton.css';

const FilterButton: FC<FilterButtonProps> = (props) => {
  const { t } = useTranslation();

  return (
    <button {...props} className="filter-button">
      <FontAwesomeIcon icon={faSliders} />
      <span>{t('common:filter')}</span>
    </button>
  );
};

export interface FilterButtonProps extends HTMLAttributes<HTMLButtonElement> {}

export default FilterButton;
