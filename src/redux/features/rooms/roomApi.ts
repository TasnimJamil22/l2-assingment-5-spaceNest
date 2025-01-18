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
  }),
});

export const { useGetRoomQuery, useGetRoomByIdQuery } = roomApi;
