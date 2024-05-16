import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

type SushiItem = {
  category: number;
  composition: string;
  id: string;
  imageUrl: string;
  price: number;
  raiting: number;
  size: string[];
  title: string;
  width: number;
};

type SushisSliceState = {
  items: SushiItem[];
  status: 'loading' | 'success' | 'error';
};

export type SushiSliceArgs = {
  order: string;
  sortBy: string;
  category: string;
  search: string;
  pageCurrent: number;
};

export const getSushis = createAsyncThunk<SushiItem[], SushiSliceArgs>(
  'sushi/getSuhsisStatus',
  async (params) => {
    const { order, sortBy, category, search, pageCurrent } = params;
    const { data } = await axios.get<SushiItem[]>(
      `https://646ca3e17b42c06c3b2bb0e7.mockapi.io/items?p=${pageCurrent}&l=4&sortBy=${sortBy}&order=${order}&${category}${search}`,
    );

    return data;
  },
);

const initialState: SushisSliceState = {
  items: [],
  status: 'loading',
};

const sushisSlice = createSlice({
  name: 'sushi',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<SushiItem[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSushis.pending, (state) => {
        state.status = 'loading';
        state.items = [];
      })
      .addCase(getSushis.fulfilled, (state, action) => {
        state.status = 'success';
        state.items = action.payload;
      })
      .addCase(getSushis.rejected, (state) => {
        state.status = 'error';
        state.items = [];
      });
  },
});

export const sushiSelector = (state: RootState) => state.sushi;

export const { setItems } = sushisSlice.actions;
export default sushisSlice.reducer;
