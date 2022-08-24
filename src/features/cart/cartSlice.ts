import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import cartItems from "../../cartItems";
import { CartItemType } from "../../types";

type InitialState = {
  cartItems: CartItemType[];
  amount: number;
  total: number;
  isLoading: boolean;
  error: string;
};

const url = "https://course-api.com/react-useReducer-cart-project";

const getTotal = (cartItems: CartItemType[]) => {
  const total = cartItems.reduce(
    (acc, item) => acc + parseFloat(item.price) * item.amount,
    0
  );
  return parseFloat(total.toFixed(2));
};

export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async (name, thunkAPI) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);

const initialState: InitialState = {
  cartItems: [],
  amount: 0,
  total: 0,
  isLoading: true,
  error: "",
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
    // calculateTotal: (state) => {
    //   let amount = 0;
    //   let total = 0;
    //   state.cartItems.forEach((item) => {
    //     amount += item.amount;
    //     total += parseFloat(item.price) * item.amount;
    //   }
    //   );
    //   state.amount = amount;
    //   state.total = parseFloat(total.toFixed(2));
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(getCartItems.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(
        getCartItems.fulfilled,
        (state, action: PayloadAction<CartItemType[]>) => {
          state.cartItems = action.payload;
          state.amount = action.payload.length;
          state.total = getTotal(action.payload);
          state.isLoading = false;
        }
      ),
      builder.addCase(
        getCartItems.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.error = action.payload || "Something went wrong";
        }
      );
  },
});

export const {
  clearCart,
  removeItem,
  increaseItem,
  decreaseItem,
  // calculateTotal,
} = cartSlice.actions;

export default cartSlice.reducer;
