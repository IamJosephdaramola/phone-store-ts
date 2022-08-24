import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ModalType } from "../../types";

const initialState: ModalType = {
  isModalOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    displayModal: (state, action: PayloadAction<boolean>) => {
      state.isModalOpen = action.payload;
    },
  },
});

export const { displayModal } = modalSlice.actions;
export default modalSlice.reducer;
