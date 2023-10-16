import { Image, Pressable, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import Logo from '../assets/images/logo.png';

const Stack = createNativeStackNavigator();


const RootNavigator = () => {
    return (
        <Stack.Navigator>
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
                    // a button to navigate to the Profile screen
                    headerRight: () => (
                        <Pressable
                            onPress={() => navigation.navigate('Profile')}
                            title="Profile"
                            color="#f4ce14"
                        >
                            <Text>Profile</Text>
                        </Pressable>
                    ),
                })}
            />
            <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
    )
}

export default RootNavigator;