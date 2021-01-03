import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';
import {HomeScreen} from './home.screen';
import {CategoriesScreen} from './categories.screen';
import {DetailScreen} from './detail.screen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabNav() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: '#414757',
      }}>
      <Tab.Screen
        name="Home"
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Icon style={styles.icon} fill="#8F9BB3" name="home" />
          ),
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name="Categories"
        options={{
          tabBarLabel: 'Categories',
          tabBarIcon: ({color, size}) => (
            <Icon style={styles.icon} fill="#8F9BB3" name="list" />
          ),
        }}
        component={CategoriesScreen}
      />
    </Tab.Navigator>
  );
}

export const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator headerMode="none">
      <Stack.Screen
        name="dashboard"
        component={TabNav}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={({route}) => ({
          post: route.params.post,
        })}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

const styles = StyleSheet.create({
  icon: {
    width: 32,
    height: 32,
  },
});
