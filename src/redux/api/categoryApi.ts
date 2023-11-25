import { Category } from '@/types';
import { rootApi } from './rootApi';

export const categoryApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], null>({
      query: () => '/categories/',
    }),
  }),
});

export const { useGetCategoriesQuery } = categoryApi;
