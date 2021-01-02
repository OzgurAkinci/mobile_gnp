import React from 'react';
import {SafeAreaView} from 'react-native';
import {Button, Divider, Layout, TopNavigation} from '@ui-kitten/components';
import PostListComponent from './components/post-list-component';

export const HomeScreen = ({navigation}) => {
  const navigateCategories = () => {
    navigation.navigate('Categories');
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <TopNavigation title="GameNewsPlus+" alignment="center" />
      <Divider />
      <PostListComponent />
    </SafeAreaView>
  );
};
