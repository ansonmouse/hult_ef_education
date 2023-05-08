import React, { FC, HTMLAttributes } from 'react';
import { faClose } from '@fortawesome/free-solid-svg-icons/faClose';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';
import './ClearFilterButton.css';

const ClearFilterButton: FC<ClearFilterButtonProps> = (props) => {
  const { t } = useTranslation();

  return (
    <button {...props} className="clear-filter-button">
      <FontAwesomeIcon icon={faClose} />
      <span>{t('common:clearFilter')}</span>
    </button>
  );
};

export interface ClearFilterButtonProps
  extends HTMLAttributes<HTMLButtonElement> {}

export default ClearFilterButton;
