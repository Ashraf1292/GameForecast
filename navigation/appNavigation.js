import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Welcome from '../src/screen/Welcome';
import Login from '../src/screen/Login';
import Signup from '../src/screen/Signup';
import Home from '../src/screen/Home';
import Search from '../src/screen/SearchPage';
import Profile from '../src/screen/Profile';
import Settings from '../src/screen/Settings';
import Rating from '../src/screen/Rating';
import { HomeIcon, UserCircleIcon, CogIcon, StarIcon, PuzzlePieceIcon } from 'react-native-heroicons/solid'; // Import heroicons
import { View } from 'react-native'; // Import View from react-native
import Game from '../src/screen/Game';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconComponent;

          if (route.name === 'Home') {
            iconComponent = focused ? <HomeIcon size={size} color={color} /> : <HomeIcon size={size} color={color} />;
          } else if (route.name === 'Profile') {
            iconComponent = focused ? <UserCircleIcon size={size} color={color} /> : <UserCircleIcon size={size} color={color} />;
          } else if (route.name === 'Settings') {
            iconComponent = focused ? <CogIcon size={size} color={color} /> : <CogIcon size={size} color={color} />;
          } else if (route.name === 'Review') {
            iconComponent = focused ? <StarIcon size={size} color={color} /> : <StarIcon size={size} color={color} />;
          } else if (route.name === 'Game') {
            iconComponent = focused ? <PuzzlePieceIcon size={size} color={color} /> : <PuzzlePieceIcon size={size} color={color} />;
          }


          return <View style={{ alignItems: 'center', justifyContent: 'center' }}>{iconComponent}</View>;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'blue', // Change the active icon color
        inactiveTintColor: 'gray', // Change the inactive icon color
        labelStyle: { fontSize: 12 }, // Change the label font size
        style: { backgroundColor: 'white' }, // Change the background color of the tab bar
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Settings" component={Settings} />
      <Tab.Screen name="Review" component={Rating} />
      <Tab.Screen name="Game" component={Game} />
    </Tab.Navigator>
  );
}

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcome'>
        <Stack.Screen name="Welcome" options={{ headerShown: false }} component={Welcome} />
        <Stack.Screen name="Login" options={{ headerShown: true }} component={Login} />
        <Stack.Screen name="Signup" options={{ headerShown: true }} component={Signup} />
        <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeTabs} />
        <Stack.Screen name="Search" options={{ headerShown: true }} component={Search} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
