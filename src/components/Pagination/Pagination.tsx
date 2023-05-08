import React, { FC, useMemo } from 'react';
import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons/faAnglesLeft';
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons/faAnglesRight';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';
import PaginationEdgeButton from '../PaginationEdgeButton/PaginationEdgeButton';
import PaginationNumberButton from '../PaginationNumberButton/PaginationNumberButton';
import { paginationGetPageOptions } from '../../helpers/pagination/pagination';
import './Pagination.css';

const MAX_PAGE_LIMIT = 6;

const Pagination: FC<PaginationProps> = ({
  currentPage,
  limit,
  total,
  onCurrentPageChange,
}) => {
  const { t } = useTranslation();
  const totalPages = useMemo(() => {
    if (limit <= 0) {
      return 0;
    }
    return Math.ceil(total / limit);
  }, [limit, total]);
  const isFirstPage = useMemo(() => {
    return currentPage === 0;
  }, [currentPage]);
  const isLastPage = useMemo(() => {
    return currentPage >= totalPages - 1;
  }, [currentPage, totalPages]);
  const pageOptions = useMemo(() => {
    return paginationGetPageOptions(currentPage, totalPages, MAX_PAGE_LIMIT);
  }, [currentPage, totalPages]);

  const handleMovePage = (delta: -1 | 1) => {
    onCurrentPageChange((page) => page + delta);
  };

  const handleSelectPage = (value: number) => {
    onCurrentPageChange(value);
  };

  return (
    <div className="pagination">
      <PaginationEdgeButton
        disabled={isFirstPage}
        hideOnDesktop
        icon={<FontAwesomeIcon icon={faAnglesLeft} />}
        variant="narrow"
        onClick={() => handleSelectPage(0)}
      />
      <PaginationEdgeButton
        disabled={isFirstPage}
        icon={<FontAwesomeIcon icon={faChevronLeft} />}
        onClick={() => handleMovePage(-1)}
      />
      <div className="current-page-number" data-testid="current-page-number">
        {t('common:pageValue', {
          page: currentPage + 1,
          defaultValue: `Page ${currentPage + 1}`,
        })}
      </div>
      <div className="page-buttons-row" data-testid="page-buttons-row">
        {pageOptions.map((value, index) => {
          if (value === 'separator') {
            return <span key={index}>...</span>;
          }
          const isSelected = value === currentPage;
          return (
            <PaginationNumberButton
              key={index}
              pageNumber={value + 1}
              selected={isSelected}
              onClick={() => handleSelectPage(value)}
            />
          );
        })}
      </div>
      <PaginationEdgeButton
        disabled={isLastPage}
        icon={<FontAwesomeIcon icon={faChevronRight} />}
        onClick={() => handleMovePage(1)}
      />
      <PaginationEdgeButton
        disabled={isLastPage}
        hideOnDesktop
        icon={<FontAwesomeIcon icon={faAnglesRight} />}
        variant="narrow"
        onClick={() => handleSelectPage(totalPages - 1)}
      />
    </div>
  );
};

export interface PaginationProps {
  currentPage: number;
  limit: number;
  total: number;
  onCurrentPageChange: React.Dispatch<React.SetStateAction<number>>;
}

export default Pagination;
