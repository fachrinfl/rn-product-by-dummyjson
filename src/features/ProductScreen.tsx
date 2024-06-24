import React from 'react';
import {
  StyleSheet,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {useProducts} from '../api/hooks/useProducts';
import {configs} from '../constants/configs';
import {useTheme} from '@react-navigation/native';
import {Theme} from '../constants/types/theme';
import {ProductItem} from '../components';

const Product: React.FC = () => {
  const theme = useTheme() as Theme;
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    refetch,
  } = useProducts({
    limit: configs.limitPage,
  });

  const footerLoading = isFetchingNextPage ? (
    <ActivityIndicator
      size="large"
      color={theme.colors.primary}
      style={styles.footerLoading}
    />
  ) : null;

  return (
    <FlatList
      data={data?.pages || []}
      keyExtractor={(item, index) => index.toString()}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
      numColumns={2}
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={refetch}
          colors={[theme.colors.primary]}
        />
      }
      renderItem={({item}) => <ProductItem item={item} />}
      onEndReached={() =>
        data?.pages.length && hasNextPage ? fetchNextPage() : null
      }
      refreshing={isLoading}
      onEndReachedThreshold={0.3}
      ListFooterComponent={footerLoading}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 4,
  },
  footerLoading: {
    alignSelf: 'center',
    margin: 20,
  },
});

export default Product;
