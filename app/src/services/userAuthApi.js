import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const userAuthapi = createApi({
  reducerPath: 'userAuthapi',
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8000/api/user/" }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (user) => {
        return {
          url: 'register/',
          method: 'POST',
          body: user,
        }
      }
    }),
    loginUser: builder.mutation({
      query: (user) => {
        return {
          url: 'login/',
          method: 'POST',
          body: JSON.stringify(user),
          headers: {
            'Content-Type': 'application/json',
          }
        }
      }
    }),
    profileUser: builder.query({
      query: (access_token) => {
        return {
          url: 'profile',
          method: 'GET',
          headers: {
            'authorization': `Bearer ${access_token}`,

          }
        }
      }
    })

  }),
})
export const { useRegisterUserMutation, useLoginUserMutation, useProfileUserQuery } = userAuthapi
