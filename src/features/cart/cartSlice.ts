import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import cartItems from "../../cartItems";
import { CartItemType } from "../../types";

type InitialState = {
  cartItems: CartItemType[];
  amount: number;
  total: number;
  isLoading: boolean;
};

const getTotal = (cartItems: CartItemType[]) => {
  const total = cartItems.reduce(
    (acc, item) => acc + parseFloat(item.price) * item.amount,
    0
  );
  return parseFloat(total.toFixed(2));
};

const initialState: InitialState = {
  cartItems,
  amount: cartItems.length,
  total: getTotal(cartItems),
  isLoading: true,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
      state.amount = 0;
      state.total = 0;
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
      state.amount = state.cartItems.length;
      state.total = getTotal(state.cartItems);
    },
    increaseItem: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      const item = state.cartItems.find((item) => item.id === itemId);
      if (item) {
        item.amount += 1;
        state.amount += 1;
        state.total = getTotal(state.cartItems);
      }
    },
    decreaseItem: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      const item = state.cartItems.find((item) => item.id === itemId);
      if (item) {
        item.amount -= 1;
        state.amount -= 1;
        state.total = getTotal(state.cartItems);
      }
    },
  },
});

export const {
  clearCart,
  removeItem,
  increaseItem,
  decreaseItem,
} = cartSlice.actions;
export default cartSlice.reducer;
