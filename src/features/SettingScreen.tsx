import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {LanguageSwitch, ThemeSwitch} from '../components';
import {FONTS_FAMILIES, ICONS, SIZES} from '../constants/theme';
import {Theme} from '../constants/types/theme';

const SettingsScreen: React.FC = () => {
  const theme = useTheme() as Theme;
  const {t} = useTranslation();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <SvgXml
          xml={ICONS.icnLanguage(theme.colors.primary)}
          width={24}
          height={24}
        />
        <Text style={styles.itemTitle}>{t('changeLanguage')}</Text>
        <LanguageSwitch />
      </View>
      <View style={styles.itemContainer}>
        <SvgXml
          xml={ICONS.icnLightMode(theme.colors.primary)}
          width={24}
          height={24}
        />
        <Text style={styles.itemTitle}>{t('mode')}</Text>
        <ThemeSwitch />
      </View>
    </View>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 10,
    },
    itemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10,
      padding: 15,
      borderRadius: 12,
      borderWidth: 1,
      justifyContent: 'space-between',
      backgroundColor: theme.colors.background,
      borderColor: theme.colors.primary,
    },
    itemTitle: {
      flex: 1,
      paddingHorizontal: 20,
      color: theme.colors.headerText,
      fontFamily: FONTS_FAMILIES.medium,
      fontSize: SIZES.font,
    },
  });

export default SettingsScreen;
