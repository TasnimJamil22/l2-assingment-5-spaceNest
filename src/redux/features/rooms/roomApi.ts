import { baseApi } from "@/redux/api/baseApi";

const roomApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRoom: builder.query({
      query: () => ({
        url: "/rooms",
        method: "GET",
      }),
    }),
    getRoomById: builder.query({
      query: (id) => ({
        url: `rooms/${id}`,
        method: "GET",
      }),
    }),
    addRoom: builder.mutation({
      query: (roomInfo) => ({
        url: "/rooms",
        method: "POST",
        body: roomInfo,
      }),
    }),
    deleteRoom: builder.mutation({
      query: (id) => ({
        url: `rooms/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetRoomQuery,
  useGetRoomByIdQuery,
  useAddRoomMutation,
  useDeleteRoomMutation,
} = roomApi;
