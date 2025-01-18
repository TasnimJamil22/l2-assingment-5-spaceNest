import { createSlice } from "@reduxjs/toolkit";

// interface SearchRoomAction {
//   search: string; // Payload of the action
// }
const initialState = {
  room: null,
  loading: false,
};
const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    // addToCart: (state, action) => {
    // },
  },
});
// export const {  } = bookingSlice.actions;
export default bookingSlice.reducer;
