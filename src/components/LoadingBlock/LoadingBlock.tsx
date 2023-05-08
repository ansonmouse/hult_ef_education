import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import './LoadingBlock.css';

const LoadingBlock: FC<LoadingBlockProps> = (_props) => {
  const { t } = useTranslation();

  return (
    <div className="loading-block">
      <p>{t('common:loading')}</p>
    </div>
  );
};

export interface LoadingBlockProps {}

export default LoadingBlock;
