import { baseApi } from "@/redux/api/baseApi";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAvailableSlots: builder.query({
      query: () => ({
        url: "/slots/availability",
        method: "GET",
      }),
    }),
    getUsersBookings: builder.query({
      query: () => ({
        url: "/my-bookings",
        method: "GET",
      }),
    }),
    createBooking: builder.mutation({
      query: (bookingInfo) => ({
        url: "/bookings",
        method: "POST",
        body: bookingInfo,
      }),
    }),
  }),
});

export const {
  useGetAvailableSlotsQuery,
  useGetUsersBookingsQuery,
  useCreateBookingMutation,
} = bookingApi;
