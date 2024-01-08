import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import Home from '../pages/HomePage/Homepage'
import Profile from '../pages/ProfilePage/ProfilePage'
import { Feather, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { MovieStack } from './PrivateRouter'
import { Props } from '../../types/Props'

const Tab = createBottomTabNavigator()

const Navbar = ({ handleLogin }: Props) => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="Home"
                screenOptions={{
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: "red",
                    tabBarInactiveTintColor: "white",
                    tabBarActiveBackgroundColor: "#474545",
                    tabBarInactiveBackgroundColor: "#474545",
                    headerShown: false,
                    tabBarStyle: { borderTopWidth: 0 }
                }}
            >
                <Tab.Screen
                    name="Home"
                    component={Home}
                    options={{
                        tabBarIcon: ({ color }) => <Feather name="home" size={24} color={color} />
                    }}
                />
                <Tab.Screen
                    name="Movie Stack"
                    component={MovieStack}
                    options={{
                        tabBarIcon: ({ color }) => <MaterialIcons name="movie" size={24} color={color} />
                    }}
                />
                <Tab.Screen
                    name="Profile"
                    options={{
                        tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color} />
                    }}
                    children={(props) => <Profile {...props} handleLogin={handleLogin} />}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default Navbar
