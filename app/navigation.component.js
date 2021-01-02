import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import {HomeScreen} from './home.component';
import {CategoriesScreen} from './categories.component';
import {Icon} from '@ui-kitten/components';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const {Navigator, Screen} = createBottomTabNavigator();

const HomeNavigator = () => (
  <Navigator headerMode="none">
    <Screen
      name="Home"
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({color, size}) => (
          <Icon style={styles.icon} fill="#8F9BB3" name="home" />
        ),
      }}
      component={HomeScreen}
    />
    <Screen
      name="Categories"
      options={{
        tabBarLabel: 'Categories',
        tabBarIcon: ({color, size}) => (
          <Icon style={styles.icon} fill="#8F9BB3" name="list" />
        ),
      }}
      component={CategoriesScreen}
    />
  </Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <HomeNavigator />
  </NavigationContainer>
);

const styles = StyleSheet.create({
  icon: {
    width: 32,
    height: 32,
  },
});
