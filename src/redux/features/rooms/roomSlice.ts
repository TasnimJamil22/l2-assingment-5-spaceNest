import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// interface SearchRoomAction {
//   search: string; // Payload of the action
// }

type TRoom = {
  _id: string;
  name: string;
  roomNo: number;
  floorNo: number;
  capacity: number;
  pricePerSlot: number;
  amenities: string[];
  isDeleted: boolean;
};
type RoomState = {
  room: TRoom | null;
  loading: boolean;
};
const initialState: RoomState = {
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
    setRoom(state, action: PayloadAction<TRoom>) {
      state.room = action.payload;
    },
  },
});
export const { getRoomById, setRoom } = roomSlice.actions;
export default roomSlice.reducer;
