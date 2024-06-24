import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {ICONS} from '../constants/theme';
import {Theme} from '../constants/types/theme';
import {useNavigation, useTheme} from '@react-navigation/native';
import {ProductNavigationProp} from '../navigations/navigation';

const SettingHeader: React.FC = () => {
  const theme = useTheme() as Theme;
  const navigation = useNavigation<ProductNavigationProp>();

  const onPressHandler = (): void => navigation.navigate('Setting');

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPressHandler}
      style={styles.button}>
      <SvgXml
        xml={ICONS.icnGear(theme.colors.text)}
        width={24}
        height={24}
        style={styles.buttonIcon}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIcon: {
    marginRight: 10,
  },
});

export default SettingHeader;
