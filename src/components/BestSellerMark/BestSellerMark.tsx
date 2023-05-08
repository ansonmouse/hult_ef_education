import React, { FC } from 'react';
import { faStar } from '@fortawesome/free-solid-svg-icons/faStar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';
import './BestSellerMark.css';

const BestSellerMark: FC<BestSellerMarkProps> = (_props) => {
  const { t } = useTranslation();

  return (
    <div className="best-seller-mark">
      <FontAwesomeIcon icon={faStar} />
      <span className="label">{t('program:bestseller')}</span>
    </div>
  );
};

export interface BestSellerMarkProps {}

export default BestSellerMark;
