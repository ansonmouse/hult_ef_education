import React, { FC, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import CheckboxFilter, {
  CheckboxFilterProps,
} from '../CheckboxFilter/CheckboxFilter';
import ClearFilterButton from '../ClearFilterButton/ClearFilterButton';
import './ProgramsFilter.css';

const ProgramsFilter: FC<ProgramsFilterProps> = ({
  learningFormatOptions,
  topicOptions,
  selectedLearningFormats,
  selectedTopics,
  topRightContent,
  onLearningFormatsSelect,
  onTopicsSelect,
  onReset,
}) => {
  const { t } = useTranslation();

  return (
    <div className="programs-filter">
      <div className="title-row">
        <span className="title">{t('common:filter')}</span>
        {topRightContent}
      </div>
      <CheckboxFilter
        label={t('program:topics')}
        optionTranslationPrefix="program:topic"
        options={topicOptions}
        selected={selectedTopics}
        onSelect={onTopicsSelect}
      />
      <CheckboxFilter
        label={t('program:learningFormats')}
        optionTranslationPrefix="program:learningFormat"
        options={learningFormatOptions}
        selected={selectedLearningFormats}
        onSelect={onLearningFormatsSelect}
      />
      {!!onReset && <ClearFilterButton onClick={onReset} />}
    </div>
  );
};

export interface ProgramsFilterProps {
  readonly learningFormatOptions: CheckboxFilterProps['options'];
  readonly topicOptions: CheckboxFilterProps['options'];
  readonly selectedLearningFormats: CheckboxFilterProps['selected'];
  readonly selectedTopics: CheckboxFilterProps['selected'];
  readonly topRightContent?: ReactNode;
  readonly onLearningFormatsSelect: CheckboxFilterProps['onSelect'];
  readonly onTopicsSelect: CheckboxFilterProps['onSelect'];
  readonly onReset?: () => void;
}

export default ProgramsFilter;
