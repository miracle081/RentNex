import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Profile } from './Profile';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '../Components/Theme';
import { AppContext } from '../Components/globalVariables';

function Home({ navigation }) {
  const { userUID, setPreloader } = useContext(AppContext);

  console.log(userUID);


  return (
    <View>
      <Text>Homescreen</Text>
    </View>
  )
}
const styles = StyleSheet.create({})


const Tab = createBottomTabNavigator();

export function Homescreen() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          }
          else if (route.name === 'PostProduct') {
            iconName = focused ? 'bag-add' : 'bag-add-outline';
          }
          else if (route.name === 'Cart') {
            iconName = focused ? 'cart' : 'cart-outline';
          }
          else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={25} color={color} />;
        },
        tabBarActiveTintColor: Theme.colors.primary,
        tabBarInactiveTintColor: Theme.colors.gray,
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}