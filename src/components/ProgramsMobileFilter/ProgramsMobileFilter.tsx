import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { faClose } from '@fortawesome/free-solid-svg-icons/faClose';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';
import ClearFilterButton from '../ClearFilterButton/ClearFilterButton';
import ProgramsFilter, {
  ProgramsFilterProps,
} from '../ProgramsFilter/ProgramsFilter';
import './ProgramsMobileFilter.css';

const ProgramsMobileFilter = forwardRef<
  ProgramsMobileFilterRef,
  ProgramsMobileFilterProps
>(({ onReset, ...props }, ref) => {
  const { t } = useTranslation();
  const DialogRef = useRef<HTMLDialogElement>(null);
  useImperativeHandle(ref, () => ({
    open: () => {
      DialogRef.current?.showModal();
    },
  }));

  const handleDialogClose = () => {
    DialogRef.current?.close();
  };

  return (
    <dialog ref={DialogRef} className="programs-mobile-filter">
      <div>
        <div className="filter">
          <ProgramsFilter
            {...props}
            topRightContent={
              <button className="close-button" onClick={handleDialogClose}>
                <FontAwesomeIcon className="fa-xl" icon={faClose} />
              </button>
            }
          />
        </div>
        <div className="action-row">
          {!!onReset && <ClearFilterButton onClick={onReset} />}
          <button className="apply-button" onClick={handleDialogClose}>
            {t('common:apply')}
          </button>
        </div>
      </div>
    </dialog>
  );
});

export interface ProgramsMobileFilterProps extends ProgramsFilterProps {}

export type ProgramsMobileFilterRef = {
  open: () => void;
};

export default ProgramsMobileFilter;
