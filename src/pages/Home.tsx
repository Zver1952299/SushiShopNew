/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';

import Items from '../components/Items/Items';
import Categories from '../components/Categories/Categories';
import Sort, { list } from '../components/Sort/Sort';
import Pagination from '../components/Pagination';
import { filterSelector, setCategoryId, setFilters } from '../redux/slices/filterSlice';
import { SushiSliceArgs, getSushis, sushiSelector } from '../redux/slices/sushisSlice';
import { useAppDispatch } from '../redux/store';

const Home: React.FC = () => {
  const { categoryId, sort, currentPage, searchValue } = useSelector(filterSelector);
  const { items, status } = useSelector(sushiSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const fetchSishis = () => {
    const order = sort.sortProp.includes('-') ? 'asc' : 'desc';
    const sortBy = sort.sortProp.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';
    const pageCurrent = currentPage + 1;
    dispatch(getSushis({ order, sortBy, category, search, pageCurrent }));
  };

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sort: sort.sortProp,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }

    isMounted.current = true;
  }, [categoryId, sort, currentPage, navigate]);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as unknown as SushiSliceArgs;
      const sort = list.find((obj) => obj.sortProp === params.sortBy);

      dispatch(
        setFilters({
          searchValue: params.search,
          categoryId: +params.category,
          sort: sort || list[0],
          currentPage: params.pageCurrent,
        }),
      );
      isSearch.current = true;
    }
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      fetchSishis();
    }

    isSearch.current = false;
  }, [categoryId, sort, searchValue, currentPage]);

  const sushisVisible = status === 'success';

  const onClickCategory = useCallback((id: number) => dispatch(setCategoryId(id)), []);

  return (
    <>
      {sushisVisible && (
        <div className="wrapper filters">
          <Categories value={categoryId} onClickCategory={onClickCategory} />
          <Sort />
        </div>
      )}
      <div className="wrapper">
        <Items sushis={items} status={status} />
        {sushisVisible && <Pagination currentPage={currentPage} />}
      </div>
    </>
  );
};

export default Home;
