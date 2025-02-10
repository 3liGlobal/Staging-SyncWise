import { DOTS, usePagination } from '../hooks/usePagination';
import NextIcon from '../../../assets/table-icons/angle-circle-right-icon.svg';
import PreviousIcon from '../../../assets/table-icons/angle-circle-left-icon.svg';

type Props = {
  onPageChange: (selectedItem: number) => void;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
  onNextButtonClick: () => void;
  onPreviousButtonClick: () => void;
};

const Pagination = (props: Props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    onNextButtonClick,
    onPreviousButtonClick,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || (paginationRange && paginationRange.length < 2)) {
    return null;
  }

  const onNext = () => {
    onNextButtonClick();
  };

  const onPrevious = () => {
    onPreviousButtonClick();
  };

  const lastPage =
    paginationRange && paginationRange[paginationRange.length - 1];
  return (
    <ul
      className={`flex list-none items-center border border-gray-300 rounded-md`}
    >
      <li
        className={`select-none flex items-center border-r border-gray-300 justify-center text-center h-10 w-10 hover:bg-secondary-normal/10 rounded-l-md hover:cursor-pointer ${
          currentPage === 1 ? 'disabled' : ''
        }`}
        onClick={onPrevious}
      >
        <img
          className={'fill-red-200'}
          src={PreviousIcon}
          alt={'Previous Button'}
        />
      </li>
      {paginationRange &&
        paginationRange.map((pageNumber: any) => {
          if (String(pageNumber) === DOTS) {
            return (
              <li
                key={pageNumber + Math.random()}
                className="justify-center select-none h-10 w-10 border-r border-gray-300 text-center text-gray-600 flex box-border items-center tracking-tighter leading-snug text-sm min-w-8 hover:bg-transparent cursor-default"
              >
                &#8230;
              </li>
            );
          }

          return (
            <li
              className={`select-none justify-center border-r border-gray-300 w-7 h-7 sm:h-10 sm:w-10 text-center text-gray-600 flex box-border items-center tracking-tighter leading-snug text-sm min-w-8 hover:bg-secondary-normal/10 hover:cursor-pointer ${
                currentPage === pageNumber
                  ? 'bg-secondary-normal/10 h-xx-sm leading-none'
                  : 'p-sm leading-none'
              }`}
              onClick={() => {
                onPageChange(pageNumber - 1);
              }}
              key={pageNumber}
            >
              {pageNumber}
            </li>
          );
        })}
      <li
        className={`select-none flex items-center justify-center text-center h-10 w-10 hover:bg-secondary-normal/10 rounded-r-md hover:cursor-pointer ${
          currentPage === lastPage ? 'pointer-events-none' : ''
        }`}
        onClick={onNext}
      >
        <img src={NextIcon} alt={'Next Button'} />
      </li>
    </ul>
  );
};

export default Pagination;
