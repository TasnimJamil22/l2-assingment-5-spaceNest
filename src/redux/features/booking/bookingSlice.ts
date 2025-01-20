import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// interface SearchRoomAction {
//   search: string; // Payload of the action
// }

type bookingDetails = {
  date?: string;
  room?: string;
  startTime?: string;
  endTime?: string;
};

type TBookingState = {
  bookingDetails: bookingDetails;
  user: null | string;
};
const initialState: TBookingState = {
  bookingDetails: {},
  user: null,
};
const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<bookingDetails>) => {
      state.bookingDetails = action.payload;
      console.log(state.bookingDetails);
    },
  },
});
export const { addToCart } = bookingSlice.actions;
export default bookingSlice.reducer;
