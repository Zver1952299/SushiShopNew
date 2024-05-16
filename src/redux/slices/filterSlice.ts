import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export enum SortPropertyEnum {
  RATING_DESC = 'raiting',
  RATING_ASC = '-raiting',
  TITLE_DESC = 'title',
  TITLE_ASC = '-title',
  PRICE_DESC = 'price',
  PRICE_ASC = '-price',
}

export type Sort = {
  name: string;
  sortProp: SortPropertyEnum;
};

export type FilterSliceState = {
  searchValue: string;
  categoryId: number;
  sort: Sort;
  currentPage: number;
};

const initialState: FilterSliceState = {
  searchValue: '',
  categoryId: 0,
  sort: {
    name: 'popular(desc)',
    sortProp: SortPropertyEnum.RATING_DESC,
  },
  currentPage: 0,
};

const filtreSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setSortType(state, action: PayloadAction<Sort>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      state.categoryId = +action.payload.categoryId;
      state.sort = action.payload.sort;
      state.currentPage = +action.payload.currentPage;
    },
  },
});

export const filterSelector = (state: RootState) => state.filter;

export const { setCategoryId, setSortType, setCurrentPage, setFilters, setSearchValue } =
  filtreSlice.actions;
export default filtreSlice.reducer;
