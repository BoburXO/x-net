import { rootApi } from './rootApi';

import { Banner } from '@/types';

export const bannerApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getBanners: builder.query<Banner[], null>({
      query: () => '/banners/',
    }),
  }),
});

export const { useGetBannersQuery } = bannerApi;
