import React, { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import BestSellerMark from '../BestSellerMark/BestSellerMark';
import { Program } from '../../interfaces/Program';
import { ReadonlyProps } from '../../interfaces/Common';
import './ProgramCard.css';

const ProgramCard: FC<ProgramCardProps> = ({ program }) => {
  const { bestseller, learningFormats, title, topic } = program;
  const { t } = useTranslation();
  const learningFormatStr = useMemo(() => {
    return learningFormats
      .map((key) => t(`program:learningFormat.${key}`, key))
      .join(' • ');
  }, [learningFormats, t]);

  return (
    <div className="program-card">
      <div className="title-row">
        <h2>{title}</h2>
        {bestseller && <BestSellerMark />}
      </div>
      <hr />
      <div className="detail-row">
        <span className="topic">{t(`program:topic.${topic}`, topic)}</span>
        <span className="learning-formats">{learningFormatStr}</span>
      </div>
    </div>
  );
};

export interface ProgramCardProps {
  program: ReadonlyProps<Program>;
}

export default ProgramCard;
