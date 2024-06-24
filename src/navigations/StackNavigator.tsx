/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {StatusBar} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootNavigatorParamList} from './navigation';
import {useTheme} from '@react-navigation/native';
import useNavigationScreenOptions from './useNavigationScreenOptions';
import {Theme} from '../constants/types/theme';

const Stack = createNativeStackNavigator<RootNavigatorParamList>();

import ProductScreen from '../features/ProductScreen';
import ProductDetailScreen from '../features/ProductDetailScreen';
import SettingScreen from '../features/SettingScreen';

import {useTranslation} from 'react-i18next';
import SettingHeader from '../components/SettingHeader';

const StackNavigator: React.FC = () => {
  const theme = useTheme() as Theme;
  const screenOptions = useNavigationScreenOptions();
  const {t} = useTranslation();

  return (
    <>
      <StatusBar
        backgroundColor={theme.colors.background}
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
      />
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen
          name="Product"
          component={ProductScreen}
          options={{
            headerLeft: () => null,
            title: t('product'),
            headerRight: () => <SettingHeader />,
          }}
        />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetailScreen}
          options={{
            title: '',
          }}
        />
        <Stack.Screen
          name="Setting"
          component={SettingScreen}
          options={{
            title: t('setting'),
          }}
        />
      </Stack.Navigator>
    </>
  );
};

export default StackNavigator;
