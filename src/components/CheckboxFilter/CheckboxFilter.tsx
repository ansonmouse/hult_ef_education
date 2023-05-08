import React, { FC, useState } from 'react';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons/faChevronUp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';
import './CheckboxFilter.css';

const CheckboxFilter: FC<CheckboxFilterProps> = ({
  label,
  optionTranslationPrefix,
  options,
  selected,
  onSelect,
}) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const handleToggleOpen = () => {
    setOpen((open) => !open);
  };

  return (
    <div className="checkbox-filter">
      <button
        data-testid="toggle-button"
        className="toggle-button"
        onClick={handleToggleOpen}
      >
        <div>
          <span>{label}</span>
          <FontAwesomeIcon
            className="fa-lg"
            icon={open ? faChevronUp : faChevronDown}
          />
        </div>
      </button>
      {open && (
        <div className="options">
          {options.map((key) => {
            const id = `${label}_${key}`;
            const isSelected = selected.indexOf(key) >= 0;
            return (
              <label key={key} htmlFor={id} className="option">
                <input
                  id={id}
                  checked={isSelected}
                  data-testid={id}
                  name={id}
                  type="checkbox"
                  value={key}
                  onChange={(event) => onSelect(key, event.target.checked)}
                />
                <span>{t(`${optionTranslationPrefix}.${key}`, key)}</span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
};

export interface CheckboxFilterProps {
  readonly label: string;
  readonly optionTranslationPrefix: string;
  readonly options: string[];
  readonly selected: string[];
  readonly onSelect: (value: string, checked: boolean) => void;
}

export default CheckboxFilter;
