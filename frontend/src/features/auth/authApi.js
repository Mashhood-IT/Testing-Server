import { api } from "../api";

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (body) => ({ url: "/auth/login", method: "POST", body }),
    }),
    me: build.query({
      query: () => "/user/me",
      providesTags: ["Me"],
    }),
    updateMe: build.mutation({
      query: (form) => ({ url: "/user/me", method: "PUT", body: form }),
      invalidatesTags: ["Me"],
    }),
  }),
});

export const { useLoginMutation, useMeQuery, useUpdateMeMutation } = authApi;
