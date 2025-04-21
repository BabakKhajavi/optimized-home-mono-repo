import { fetchBaseQuery } from '@reduxjs/toolkit/query';

export const baseQuery = fetchBaseQuery({
  baseUrl: 'https://optimizedhome.ca/api',
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as { authReducer: { token: string } };
    const token = state.authReducer.token;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});
