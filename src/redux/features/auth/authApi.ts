import { baseApi } from "@/redux/api/baseApi";
 

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),
    getUsers: builder.query({
      query: () => ({
        url: "/auth/users",
        method: "GET",
      }),
    }),
  }),
});

export const { useLoginMutation, useGetUsersQuery } = authApi;
