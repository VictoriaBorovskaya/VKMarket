import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { CartType } from 'types';

export const fetchItems = createAsyncThunk('items/fetchItems', async () => {
  const { data } = await axios.get<CartType[]>(
    'https://65f5d24e41d90c1c5e0a3524.mockapi.io/cart',
  );
  return data;
});

enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface ItemsState {
  items: CartType[];
  status: Status;
}

const initialState: ItemsState = {
  items: [],
  status: Status.LOADING,
};

const ItemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload.items;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.items = action.payload;
    });
    builder.addCase(fetchItems.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchItems.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const { setItems } = ItemsSlice.actions;

export default ItemsSlice.reducer;
