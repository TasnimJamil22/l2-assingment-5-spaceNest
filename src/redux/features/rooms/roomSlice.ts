import { createSlice } from "@reduxjs/toolkit";

// interface SearchRoomAction {
//   search: string; // Payload of the action
// }
const initialState = {
  room: null,
  loading: false,
};
const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    getRoomById: (state, action) => {
      state.loading = true;
      state.room = action.payload;
    },
  },
});
export const { getRoomById } = roomSlice.actions;
export default roomSlice.reducer;
