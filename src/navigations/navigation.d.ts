import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';

export type RootNavigatorParamList = {
  Product: undefined;
  ProductDetail: {
    productId: string;
  };
  Setting: undefined;
};

export type ProductNavigationProp = NativeStackNavigationProp<
  RootNavigatorParamList,
  'Product'
>;

export type ProductDetailRouteProp = RouteProp<
  RootNavigatorParamList,
  'ProductDetail'
>;
