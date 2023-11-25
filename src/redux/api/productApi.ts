import { rootApi } from './rootApi';

import { Product } from '@/types';

export const productApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], null>({
      query: () => '/products/',
    }),
    getProductsSearch: builder.query<Product[], object>({
      query: (params) => ({
        url: '/products/',
        params,
      }),
    }),
    getNewProducts: builder.query<Product[], null>({
      query: () => '/products/news/',
    }),
    getSaleProducts: builder.query<Product[], null>({
      query: () => '/products/sales/',
    }),
  }),
});

export const {
  useGetProductsQuery,
  useLazyGetProductsSearchQuery,
  usePrefetch,
  useGetNewProductsQuery,
  useGetSaleProductsQuery,
  util: { getRunningQueriesThunk },
} = productApi;

export const { getProducts } = productApi.endpoints;
