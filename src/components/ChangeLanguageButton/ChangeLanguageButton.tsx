import React, { FC, useMemo } from 'react';
import { faLanguage } from '@fortawesome/free-solid-svg-icons/faLanguage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';
import DropdownMenuButton from '../DropdownMenuButton/DropdownMenuButton';
import { LanguageKeyItems } from '../../assets/translations/manifest';
import './ChangeLanguageButton.css';

const ChangeLanguageButton: FC<ChangeLanguageButtonProps> = (_props) => {
  const { i18n, t } = useTranslation();
  const languageOptions = useMemo(() => {
    return LanguageKeyItems.map((value) => ({
      value,
      text: t(`common:language.${value}`),
    }));
  }, [t]);

  const handleChangeLanguage = (value: string) => {
    void i18n.changeLanguage(value);
  };

  return (
    <DropdownMenuButton
      buttonContent={<FontAwesomeIcon className="fa-xl" icon={faLanguage} />}
      dialogProps={{
        className: 'change-language-dialog',
      }}
      items={languageOptions}
      selected={i18n.language}
      onChange={handleChangeLanguage}
    />
  );
};

export interface ChangeLanguageButtonProps {}

export default ChangeLanguageButton;
