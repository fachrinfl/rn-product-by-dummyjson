/* eslint-disable react/no-unstable-nested-components */
import {useRoute, useTheme} from '@react-navigation/native';
import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Text,
} from 'react-native';
import {ProductDetailRouteProp} from '../navigations/navigation';
import {useProductById} from '../api/hooks/useProducts';
import Carousel from 'react-native-reanimated-carousel';
import {FONTS_FAMILIES, SIZES} from '../constants/theme';
import FastImage from 'react-native-fast-image';
import {Theme} from '../constants/types/theme';
import {getPriceDetails} from '../utils/Helpers';
import {HoldableText} from '../components';
import {useTranslation} from 'react-i18next';

const ProductDetail: React.FC = () => {
  const {t} = useTranslation();
  const theme = useTheme() as Theme;
  const styles = createStyles(theme);
  const route = useRoute<ProductDetailRouteProp>();
  const {productId} = route.params;
  const {data, refetch, isLoading} = useProductById(productId);
  const {discountedPrice, hasDiscount, originalPrice} = getPriceDetails(
    data?.price || 0,
    data?.discountPercentage || 0,
  );

  const ProductInfo = (label: string, info: string) => {
    return (
      <View style={styles.productInfoContainer}>
        <Text style={styles.productInfoLabel}>{label}</Text>
        <Text style={styles.productInfo}>{info}</Text>
      </View>
    );
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        styles.screenContainer,
        isLoading && styles.centerContent,
      ]}
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={refetch}
          colors={[theme.colors.primary]}
        />
      }>
      {isLoading && (
        <ActivityIndicator size="large" color={theme.colors.primary} />
      )}
      {!isLoading && (
        <>
          <View>
            <Carousel
              width={SIZES.width}
              height={400}
              enabled={data!.images.length > 1}
              data={data?.images || []}
              renderItem={({item}) => (
                <FastImage
                  style={styles.image}
                  source={{
                    uri: item,
                    priority: FastImage.priority.normal,
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                />
              )}
            />
          </View>
          <View style={styles.detailContainer}>
            <View style={styles.priceContainer}>
              {!hasDiscount && (
                <Text style={styles.price}>{originalPrice}</Text>
              )}
              {hasDiscount && (
                <Text style={styles.price}>${discountedPrice}</Text>
              )}
              {hasDiscount && (
                <Text style={styles.discountPrice}>${originalPrice}</Text>
              )}
              {hasDiscount && (
                <Text style={styles.discountPercentage}>
                  {data?.discountPercentage}%
                </Text>
              )}
            </View>
            <Text style={styles.name}>{data?.title}</Text>
            <Text style={styles.productDetail}>Product Detail</Text>
            {ProductInfo(t('category') as string, data?.category || '')}
            {ProductInfo(t('brand') as string, data?.brand || '')}
            {ProductInfo(t('sku') as string, data?.sku || '')}
            {ProductInfo(
              t('minOrder') as string,
              String(data?.minimumOrderQuantity) || '',
            )}
            {ProductInfo(t('stock') as string, String(data?.stock) || '')}
            <Text style={styles.productDetail}>
              {t('productDescription') as string}
            </Text>
            <HoldableText text={data?.description || ''} />
          </View>
        </>
      )}
    </ScrollView>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    screenContainer: {
      flexGrow: 1,
    },
    centerContent: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      height: 400,
      backgroundColor: theme.colors.border,
    },
    price: {
      fontFamily: FONTS_FAMILIES.semiBold,
      fontSize: 24,
      color: theme.colors.headerText,
    },
    discountPrice: {
      fontFamily: FONTS_FAMILIES.regular,
      fontSize: 18,
      color: theme.colors.headerText,
      marginLeft: 5,
      textDecorationLine: 'line-through',
    },
    discountPercentage: {
      fontFamily: FONTS_FAMILIES.semiBold,
      fontSize: SIZES.fontLg,
      color: theme.colors.primary,
      marginLeft: 5,
    },
    name: {
      fontFamily: FONTS_FAMILIES.regular,
      fontSize: SIZES.fontLg,
      color: theme.colors.headerText,
      marginTop: 15,
    },
    detailContainer: {
      padding: 20,
    },
    priceContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    productDetail: {
      fontFamily: FONTS_FAMILIES.semiBold,
      fontSize: SIZES.fontLg,
      color: theme.colors.headerText,
      marginTop: 15,
    },
    productInfoContainer: {
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderColor: theme.colors.border,
      flexDirection: 'row',
      alignItems: 'center',
    },
    productInfoLabel: {
      fontFamily: FONTS_FAMILIES.regular,
      fontSize: SIZES.font,
      color: theme.colors.placeHolder,
      width: 100,
    },
    productInfo: {
      fontFamily: FONTS_FAMILIES.semiBold,
      fontSize: SIZES.font,
      color: theme.colors.headerText,
    },
  });

export default ProductDetail;
