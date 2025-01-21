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
    deleteSlot: builder.mutation({
      query: (id) => ({
        url: `/slots/${id}`,
        method: "DELETE",
      }),
    }),
    updateSlot: builder.mutation({
      query: (updatedSlot) => ({
        url: `/slots/${updatedSlot._id}`,
        method: "PUT",
        body: updatedSlot,
      }),
    }),
  }),
});

export const { useCreateSlotMutation, useDeleteSlotMutation,useUpdateSlotMutation } = slotApi;
