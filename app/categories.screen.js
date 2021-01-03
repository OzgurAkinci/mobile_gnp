import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, TouchableOpacity} from 'react-native';
import {
  Divider,
  Icon,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import CategoriesListComponent from './components/categories-list-component';
import {ThemeContext} from '../theme-context';
const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

export const CategoriesScreen = ({navigation}) => {
  const themeContext = React.useContext(ThemeContext);

  const navigateBack = () => {
    navigation.goBack();
  };

  const renderSettingsAction = () => (
    <TouchableOpacity onPress={themeContext.toggleTheme} activeOpacity={0.5}>
      <Text>
        <Icon style={{width: 32, height: 32}} fill="orange" name="moon" />
      </Text>
    </TouchableOpacity>
  );

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <TopNavigation
        title="Game News Plus"
        alignment="center"
        accessoryRight={renderSettingsAction}
      />
      <Divider />
      <CategoriesListComponent />
    </SafeAreaView>
  );
};
