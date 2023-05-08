import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import FilterButton from '../../components/FilterButton/FilterButton';
import Header from '../../components/Header/Header';
import LoadingBlock from '../../components/LoadingBlock/LoadingBlock';
import NoDataBlock from '../../components/NoDataBlock/NoDataBlock';
import Pagination from '../../components/Pagination/Pagination';
import ProgramCard from '../../components/ProgramCard/ProgramCard';
import ProgramsFilter from '../../components/ProgramsFilter/ProgramsFilter';
import ProgramsMobileFilter, {
  ProgramsMobileFilterRef,
} from '../../components/ProgramsMobileFilter/ProgramsMobileFilter';
import ProgramsSortButton from '../../components/ProgramsSortButton/ProgramsSortButton';
import { programsFetchPrograms } from '../../fetchers/programs';
import {
  PROGRAM_PAGE_LIMIT,
  programsCheckIsSort,
  programsComposeFilteredPrograms,
  programsGetLearningFormatOptions,
  programsGetTopicOptions,
  programsPagePrograms,
} from '../../helpers/programs/programs';
import { ProgramSort, ProgramSortItems } from '../../interfaces/Program';
import './AllPrograms.css';

const AllPrograms: FC<AllProgramsProps> = (_props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedLearningFormats, setSelectedLearningFormats] = useState<
    string[]
  >([]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedSort, setSelectedSort] = useState<ProgramSort>(
    ProgramSortItems[0],
  );
  const MobileFilterRef = useRef<ProgramsMobileFilterRef>(null);
  const { data, isLoading } = useQuery(['programs'], programsFetchPrograms);
  const filteredPrograms = useMemo(() => {
    // Get all the programs based on the filters
    if (!data?.length) {
      return [];
    }
    return programsComposeFilteredPrograms(
      data,
      selectedLearningFormats,
      selectedTopics,
      selectedSort,
    );
  }, [data, selectedLearningFormats, selectedTopics, selectedSort]);
  const programs = useMemo(() => {
    // Get the programs only in the current page
    return programsPagePrograms(filteredPrograms, currentPage);
  }, [currentPage, filteredPrograms]);
  const learningFormatOptions = useMemo(() => {
    if (!data?.length) {
      return [];
    }
    return programsGetLearningFormatOptions(data);
  }, [data]);
  const topicOptions = useMemo(() => {
    if (!data?.length) {
      return [];
    }
    return programsGetTopicOptions(data);
  }, [data]);
  useEffect(() => {
    // Read search params from URL. If any exist, set them as default search filters
    const page = searchParams.get('page');
    if (!!page) {
      setCurrentPage(Math.floor(Number(page)) - 1);
    }
    const sort = searchParams.get('sort');
    if (!!sort && programsCheckIsSort(sort)) {
      setSelectedSort(sort);
    }
    const learningFormats = searchParams.get('learningFormats');
    if (!!learningFormats) {
      setSelectedLearningFormats(learningFormats.split('|'));
    }
    const topics = searchParams.get('topics');
    if (!!topics) {
      setSelectedTopics(topics.split('|'));
    }
  }, []);
  useEffect(() => {
    // Move the page back to top when new set of data is available
    window.scrollTo(0, 0);
  }, [programs]);

  const handleOpenMobileFilter = () => {
    MobileFilterRef.current?.open();
  };

  const handleResetFilter = () => {
    setSelectedLearningFormats([]);
    setSelectedTopics([]);
    updateSearchParams('learningFormats', null);
    updateSearchParams('topics', null);
  };

  const handleSetCurrentPage = (page: number) => {
    setCurrentPage(page);
    updateSearchParams('page', page !== 0 ? (page + 1).toString() : null);
  };

  const handleSelectFilterValue = (
    value: string,
    checked: boolean,
    setFn: React.Dispatch<React.SetStateAction<string[]>>,
    searchKey: string,
  ) => {
    setFn((arr) => {
      const index = arr.indexOf(value);
      if (index >= 0 && !checked) {
        // Remove only if the value exist and unchecked
        arr = [...arr.slice(0, index), ...arr.slice(index + 1)];
      } else if (index < 0 && checked) {
        // Add only if the value not exist and checked
        arr = [...arr, value];
      }
      setTimeout(() => {
        updateSearchParams(searchKey, !!arr.length ? arr.join('|') : null);
        handleSetCurrentPage(0);
      });
      return arr;
    });
  };

  const handleSelectLearningFormat = (value: string, checked: boolean) => {
    handleSelectFilterValue(
      value,
      checked,
      setSelectedLearningFormats,
      'learningFormats',
    );
  };

  const handleSelectTopic = (value: string, checked: boolean) => {
    handleSelectFilterValue(value, checked, setSelectedTopics, 'topics');
  };

  const handleSetSort = (sort: ProgramSort) => {
    setSelectedSort(sort);
    updateSearchParams('sort', sort);
  };

  const updateSearchParams = (key: string, value: string | null) => {
    if (value !== null) {
      searchParams.set(key, value);
    } else {
      searchParams.delete(key);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="all-programs">
      <Header
        title={t('program:title')}
        description={t('program:description')}
      />
      <FilterButton onClick={handleOpenMobileFilter} />
      <ProgramsMobileFilter
        ref={MobileFilterRef}
        learningFormatOptions={learningFormatOptions}
        topicOptions={topicOptions}
        selectedLearningFormats={selectedLearningFormats}
        selectedTopics={selectedTopics}
        onLearningFormatsSelect={handleSelectLearningFormat}
        onTopicsSelect={handleSelectTopic}
        onReset={handleResetFilter}
      />
      <main>
        <aside>
          <ProgramsFilter
            learningFormatOptions={learningFormatOptions}
            topicOptions={topicOptions}
            selectedLearningFormats={selectedLearningFormats}
            selectedTopics={selectedTopics}
            onLearningFormatsSelect={handleSelectLearningFormat}
            onTopicsSelect={handleSelectTopic}
            onReset={handleResetFilter}
          />
        </aside>
        <div className="results-container">
          <div className="info-row">
            <span className="count-label">
              {t('program:listValue', {
                count: data?.length ?? 0,
                currentTotal: programs.length,
              })}
            </span>
            <ProgramsSortButton
              selected={selectedSort}
              onChange={handleSetSort}
            />
          </div>
          {programs.map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))}
          {!isLoading && !programs.length && <NoDataBlock />}
          {isLoading && <LoadingBlock />}
        </div>
      </main>
      <Pagination
        currentPage={currentPage}
        limit={PROGRAM_PAGE_LIMIT}
        total={filteredPrograms.length}
        onCurrentPageChange={handleSetCurrentPage}
      />
    </div>
  );
};

export interface AllProgramsProps {}

export default AllPrograms;
