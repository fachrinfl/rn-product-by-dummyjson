/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Product} from '../api/types/product';
import {Theme} from '../constants/types/theme';
import {useTheme} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {FONTS_FAMILIES, SIZES} from '../constants/theme';
import {getPriceDetails} from '../utils/Helpers';
import {useNavigation} from '@react-navigation/native';
import {ProductNavigationProp} from '../navigations/navigation';

type IProps = {
  item: Product;
};

const ProductItem: React.FC<IProps> = ({item}) => {
  const theme = useTheme() as Theme;
  const styles = createStyles(theme);
  const navigation = useNavigation<ProductNavigationProp>();
  const {discountedPrice, hasDiscount, originalPrice} = getPriceDetails(
    item.price,
    item.discountPercentage,
  );

  const onPressHandler = (): void => {
    navigation.navigate('ProductDetail', {
      productId: String(item.id),
    });
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.container}
      onPress={onPressHandler}>
      <FastImage
        style={styles.image}
        source={{
          uri: item.thumbnail,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.contain}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.labelContainer}>
          <View style={styles.typeContainer}>
            <Text style={styles.typeLabel}>{item.category}</Text>
          </View>
        </View>
        <View style={styles.labelContainer}>
          {!hasDiscount && (
            <Text style={styles.priceDiscount}>${originalPrice}</Text>
          )}
          {hasDiscount && (
            <Text style={styles.priceDiscount}>${discountedPrice}</Text>
          )}
          {hasDiscount && (
            <Text
              style={[
                styles.priceDiscount,
                {textDecorationLine: 'line-through'},
              ]}>
              ${originalPrice}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      margin: 8,
      borderRadius: 8,
      backgroundColor: theme.colors.background,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 3.5,
      elevation: 4,
    },
    image: {
      height: 200,
      backgroundColor: theme.colors.border,
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
    },
    title: {
      fontFamily: FONTS_FAMILIES.semiBold,
      fontSize: SIZES.font,
      marginBottom: 5,
      color: theme.colors.headerText,
    },
    content: {
      padding: 8,
    },
    labelContainer: {
      flexDirection: 'row',
      marginTop: 5,
    },
    typeContainer: {
      backgroundColor: 'rgba(18, 153, 218, 0.2)',
      borderRadius: 4,
      paddingHorizontal: 10,
      paddingVertical: 5,
    },
    typeLabel: {
      fontFamily: FONTS_FAMILIES.semiBold,
      fontSize: SIZES.font,
      color: theme.colors.primary,
    },
    priceDiscount: {
      fontFamily: FONTS_FAMILIES.regular,
      fontSize: SIZES.font,
      color: theme.colors.text,
      marginLeft: 4,
    },
  });

export default ProductItem;
