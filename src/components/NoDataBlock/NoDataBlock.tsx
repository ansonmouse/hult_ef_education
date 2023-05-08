import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import './NoDataBlock.css';

const NoDataBlock: FC<NoDataBlockProps> = (_props) => {
  const { t } = useTranslation();

  return (
    <div className="loading-block">
      <p>{t('common:noData')}</p>
    </div>
  );
};

export interface NoDataBlockProps {}

export default NoDataBlock;
