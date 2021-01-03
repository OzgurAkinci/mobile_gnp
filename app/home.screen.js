import React from 'react';
import {SafeAreaView} from 'react-native';
import {Divider, Layout, TopNavigation} from '@ui-kitten/components';
import PostListComponent from './components/post-list-component';

export const HomeScreen = ({navigation}) => {
  const navigatePostDetail = (post) => {
    navigation.navigate('Detail', {post: post});
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <TopNavigation title="GameNewsPlus+" alignment="center" />
      <Divider />
      <PostListComponent navigatePostDetail={navigatePostDetail} />
    </SafeAreaView>
  );
};
