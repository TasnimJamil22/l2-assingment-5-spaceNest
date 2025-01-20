import { baseApi } from "@/redux/api/baseApi";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAvailableSlots: builder.query({
      query: () => ({
        url: `/slots/availability`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAvailableSlotsQuery } = bookingApi;
