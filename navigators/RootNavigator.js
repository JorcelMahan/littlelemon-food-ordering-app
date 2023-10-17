import { useState, createContext, useEffect } from "react";
import { Image, Pressable } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import Onboarding from "../screens/Onboarding";
import Logo from '../assets/images/logo.png';


export const AuthContext = createContext();
const Stack = createNativeStackNavigator();



const RootNavigator = () => {


    const [isLogged, setIsLogged] = useState(false);



    const login = () => {
        setIsLogged(true);
    }

    const logout = () => {
        setIsLogged(false);
    }



    return (
        <AuthContext.Provider value={{ isLogged, login, logout }}>

            <Stack.Navigator>
                {
                    isLogged ? (
                        <>
                            <Stack.Screen
                                name="Home"
                                component={HomeScreen}
                                options={({ navigation }) => ({
                                    headerTitle: () =>
                                        <Image source={Logo}
                                            style={{ width: 150, height: 50 }}
                                            resizeMode="contain"
                                        />,
                                    headerTitleAlign: 'center',
                                    headerRight: () => (
                                        <Pressable
                                            onPress={() => navigation.navigate('Profile')}
                                            title="Profile"
                                            color="#f4ce14"
                                        >
                                            <Image
                                                source={require('../assets/images/profile.png')}
                                                style={{ width: 50, height: 50 }}
                                                resizeMode="contain"
                                            />
                                        </Pressable>
                                    ),
                                })}
                            />
                            <Stack.Screen
                                name="Profile"
                                component={ProfileScreen}
                                options={({ navigation }) => ({
                                    headerTitle: () =>
                                        <Pressable
                                            onPress={() => navigation.navigate('Home')}
                                        >
                                            <Image source={Logo}
                                                style={{ width: 150, height: 50 }}
                                                resizeMode="contain"
                                            />
                                        </Pressable>,
                                    headerTitleAlign: 'center',
                                    headerRight: () => (
                                        <Pressable
                                            onPress={() => navigation.navigate('Profile')}
                                        >
                                            <Image
                                                source={require('../assets/images/profile.png')}
                                                style={{ width: 50, height: 50 }}
                                                resizeMode="contain"
                                            />
                                        </Pressable>
                                    ),
                                    headerBackVisible: false,
                                    headerLeft: () => (
                                        <Pressable
                                            onPress={() => navigation.goBack()}
                                        >
                                            <Ionicons name="arrow-back-circle" size={40} color="#495e57" />
                                        </Pressable>
                                    ),
                                })}
                            />
                        </>
                    ) : (
                        <Stack.Screen
                            name="Onboarding"
                            component={Onboarding}
                            options={{
                                headerShown: false,
                            }}
                        />
                    )
                }

            </Stack.Navigator>
        </AuthContext.Provider>
    )
}

export default RootNavigator;