import React, {useEffect, useState} from 'react';
import {SafeAreaView, TouchableOpacity, Text} from 'react-native';
import {Divider, TopNavigation, Icon} from '@ui-kitten/components';
import PostListComponent from './components/post-list-component';
import {ThemeContext} from './../theme-context';

export const HomeScreen = ({navigation}) => {
  const themeContext = React.useContext(ThemeContext);

  const navigatePostDetail = (post) => {
    navigation.navigate('Detail', {post: post});
  };
  useEffect(() => {});

  const renderSettingsAction = () => (
    <TouchableOpacity onPress={themeContext.toggleTheme} activeOpacity={0.5}>
      <Text>
        <Icon style={{width: 32, height: 32}} fill="orange" name="sun" />
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <TopNavigation
        title="Game News Plus"
        alignment="center"
        accessoryRight={renderSettingsAction}
      />
      <Divider />

      <PostListComponent navigatePostDetail={navigatePostDetail} />
    </SafeAreaView>
  );
};
