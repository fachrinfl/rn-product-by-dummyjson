import {
  UseQueryResult,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';
import {
  Product,
  ProductByIdResponse,
  ProductParams,
  ProductResponse,
} from '../types/product';
import {ConfigInfiniteQuery, getQueryKey} from '../types/query';
import {
  productByIdServices,
  productServices,
} from '../services/ProductServices';

export const useProducts = (
  params: ProductParams,
  config?: ConfigInfiniteQuery<ProductResponse, Product>,
) =>
  useInfiniteQuery({
    ...config,
    queryKey: getQueryKey('products', params),
    queryFn: ({pageParam}) =>
      productServices({
        ...params,
        skip: params.limit * (pageParam - 1),
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, AllPages) => {
      const totalPage = Math.ceil(lastPage.total / params.limit);
      const currentPage = AllPages.length;
      const morePageExist = currentPage < totalPage;
      if (!morePageExist) {
        return undefined;
      }

      return AllPages.length + 1;
    },
    select: data => ({
      ...data,
      pages: data.pages.flatMap(page => page.products),
    }),
  });

export const useProductById = (
  id: string,
): UseQueryResult<ProductByIdResponse, Error> =>
  useQuery({
    queryKey: getQueryKey('productById'),
    queryFn: () => productByIdServices(id),
  });
