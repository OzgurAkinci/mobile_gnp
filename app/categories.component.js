import React from 'react';
import {SafeAreaView} from 'react-native';
import {
  Divider,
  Icon,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import CategoriesListComponent from './components/categories-list-component';

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

export const CategoriesScreen = ({navigation}) => {
  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <TopNavigation
        title="GameNewsPlus+"
        alignment="center"
        accessoryLeft={BackAction}
      />
      <Divider />
      <CategoriesListComponent />
    </SafeAreaView>
  );
};
