import { baseApi } from "@/redux/api/baseApi";

const slotApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSlot: builder.mutation({
      query: (slotInfo) => ({
        url: "/slots",
        method: "POST",
        body: slotInfo,
      }),
    }),
  }),
});

export const { useCreateSlotMutation } = slotApi;
