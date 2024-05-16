import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';
import { useDispatch } from 'react-redux';
import { setCurrentPage } from '../../redux/slices/filterSlice';
import React from 'react';

type PaginationProps = {
  currentPage: number;
};

const Pagination: React.FC<PaginationProps> = ({ currentPage }) => {
  const dispatch = useDispatch();

  return (
    <ReactPaginate
      className={styles.pagination}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(e) => dispatch(setCurrentPage(e.selected))}
      pageRangeDisplayed={4}
      pageCount={3}
      forcePage={currentPage}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
