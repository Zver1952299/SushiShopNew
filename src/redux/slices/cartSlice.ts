import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import getCartFromLS from '../../utils/getCartFromLS';
import calcTotalPrice from '../../utils/calcTotalPrice';

export type ItemCart = {
  id: string;
  title: string;
  price: number;
  size: number[];
  sizeActive: number;
  imageUrl: string;
  count: number;
};

type CartSliceState = {
  totalPrice: number;
  items: ItemCart[];
};

const { items, totalPrice } = getCartFromLS();

const initialState: CartSliceState = {
  totalPrice,
  items,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<ItemCart>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }

      state.totalPrice = calcTotalPrice(state.items);
    },
    itemMinus(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);

      if (findItem) {
        findItem.count--;
        state.totalPrice -= findItem.price;
      }
    },
    removeProduct(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        state.totalPrice -= findItem.count * findItem.price;
      }

      state.items = state.items.filter((obj) => obj.id !== action.payload);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const cartSelector = (state: RootState) => state.cart;
export const cartSelectorItemById = (id: string) => (state: RootState) =>
  state.cart.items.find((obj) => obj.id === id);

export const { addProduct, itemMinus, removeProduct, clearItems } = cartSlice.actions;
export default cartSlice.reducer;
