import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface IRow {
  id: string
  fullName: string
  address: string
  phoneNumber: string
  [key: string]: any
}

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://task-5-production.up.railway.app/api'
  }),
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    getFakeData: builder.query<IRow[], { region: string; seed: number; errors: number; count: number }>({
      query: ({ region, seed, errors, count }) =>
        `fake-data?region=${region}&seed=${seed}&errors=${errors}&count=${count}`
    })
  })
})

export const { useGetFakeDataQuery } = usersApi
