import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const profileApi = createApi({
    reducerPath: 'profileApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3001/profile'}),
    endpoints: (builder) => ({
        getProfile: builder.query({
            query: (token) => ({
                url: '',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
        })
    })
})

export const { useGetProfileQuery } = profileApi