import { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Image, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Checkbox, Spinner, HStack } from 'native-base';
import { AuthContext } from '../navigators/RootNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';



const ProfileScreen = () => {

    const { logout } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [emailNotifications, setEmailNotifications] = useState({
        "Order Statues": false,
        "Password changes": false,
        "Special offers": false,
        "Newsletter": false,
    });



    const getData = async () => {
        setLoading(true);
        try {
            const namePair = await AsyncStorage.getItem('namePair');
            const emailPair = await AsyncStorage.getItem('emailPair');
            const lastNamePair = await AsyncStorage.getItem('lastNamePair');
            const phoneNumberPair = await AsyncStorage.getItem('phoneNumberPair');
            const orderStatuses = await AsyncStorage.getItem('Order Statues');
            const passwordChanges = await AsyncStorage.getItem('Password changes');
            const specialOffers = await AsyncStorage.getItem('Special offers');
            const newsletter = await AsyncStorage.getItem('Newsletter');

            if (namePair !== null && emailPair !== null) {
                setName(namePair);
                setEmail(emailPair);
            }
            if (lastNamePair !== null) {
                setLastName(lastNamePair);
            }
            if (phoneNumberPair !== null) {
                setPhoneNumber(phoneNumberPair);
            }
            if (orderStatuses !== null) {
                setEmailNotifications(
                    prevState => ({ ...prevState, "Order Statues": orderStatuses === 'true' })
                );
            }
            if (passwordChanges !== null) {
                setEmailNotifications(
                    prevState => ({ ...prevState, "Password changes": passwordChanges === 'true' })
                );
            }
            if (specialOffers !== null) {
                setEmailNotifications(
                    prevState => ({ ...prevState, "Special offers": specialOffers === 'true' })
                );
            }
            if (newsletter !== null) {
                setEmailNotifications(
                    prevState => ({ ...prevState, "Newsletter": newsletter === 'true' })
                );
            }

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const storeData = async () => {
        setLoading(true);
        const namePair = ['namePair', name];
        const emailPair = ['emailPair', email];
        const lastNamePair = ['lastNamePair', lastName];
        const phoneNumberPair = ['phoneNumberPair', phoneNumber];

        try {
            // parse to string because AsyncStorage only accepts strings
            const emailNotificationsKeyValues = Object.entries(emailNotifications).map(([key, value]) => [key, value.toString()]);

            console.log('emailNotificationsKeyValues', emailNotificationsKeyValues)


            await AsyncStorage.multiSet([namePair, emailPair, lastNamePair, phoneNumberPair, ...emailNotificationsKeyValues]);

        } catch (error) {
            console.log('Onboarding', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    if (loading) return (
        <HStack justifyContent="center" alignItems="center" flex={1}>
            <Spinner color="yellow.500" />
        </HStack>
    )




    return (
        <ScrollView style={styles.container} keyboardDismissMode='on-drag'>
            <Text style={styles.title}>Personal information</Text>
            <View style={styles.profileContainer}>
                <Text style={styles.label}>Avatar</Text>
                <View style={styles.avatarContainer}>
                    <Image
                        source={require('../assets/images/profile.png')}
                        style={styles.profileImage}
                    />
                    <Pressable style={styles.buttonPrimary}>
                        <Text style={styles.textPrimary}>Change</Text>
                    </Pressable>
                    <Pressable style={styles.buttonSecondary}>
                        <Text style={styles.textSecondary}>Remove</Text>
                    </Pressable>
                </View>
            </View>
            <KeyboardAvoidingView
                style={styles.formContainer}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <View style={styles.formGroup}>
                    <Text style={styles.label}>First Name</Text>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={text => setName(text)}
                    />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Last Name</Text>
                    <TextInput
                        style={styles.input}
                        value={lastName}
                        onChangeText={text => setLastName(text)}
                    />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType='email-address'
                        value={email}
                        onChangeText={text => setEmail(text)}
                    />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Phone number</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType='phone-pad'
                        value={phoneNumber}
                        onChangeText={text => setPhoneNumber(text)}
                    />
                </View>
                <View style={styles.checkboxContainer}>
                    <Text style={styles.title}>Email notifications</Text>
                    {/* <View style={styles.checkbox}>
                        <Checkbox isChecked colorScheme="gray">
                            Order statuses
                        </Checkbox>
                    </View> */}
                    {
                        Object.keys(emailNotifications).map((key, index) => {
                            return (
                                <View key={index} style={styles.checkbox}>
                                    <Checkbox
                                        onPress={() => setEmailNotifications(prevState => (
                                            { ...prevState, [key]: !emailNotifications[key] }
                                        ))}
                                        colorScheme="yellow"
                                        isChecked={emailNotifications[key]}

                                    >
                                        {key}
                                    </Checkbox>
                                </View>
                            )
                        })
                    }
                </View>

            </KeyboardAvoidingView>
            <Pressable
                style={styles.button}
                onPress={() => logout()}>
                <Text style={styles.buttonText}>Log out</Text>
            </Pressable>
            <View style={styles.buttonContainer}>
                <Pressable style={styles.buttonSecondary}>
                    <Text style={styles.textSecondary}>Discard changes</Text>
                </Pressable>
                <Pressable
                    onPress={() => storeData()}
                    style={styles.buttonPrimary}
                >
                    <Text style={styles.textPrimary}>Save changes</Text>
                </Pressable>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#edefee',
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    title: {
        fontFamily: 'Markazi',
        fontSize: 28,
        fontWeight: '400',
        marginBottom: 10,
    },
    profileContainer: {
        marginBottom: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginRight: 20,
    },
    profileName: {
        fontFamily: 'Markazi',
        fontSize: 30,
        fontWeight: '400',
        color: '#495e57',
    },
    avatarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    formContainer: {
        marginBottom: 20,
    },
    formGroup: {
        marginBottom: 20,
    },
    label: {
        fontFamily: 'Markazi',
        fontSize: 20,
        fontWeight: '400',
        color: '#495e57',
        marginBottom: 10,
    },
    input: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
    },
    button: {
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: '#f4ce14',
        paddingVertical: 10,
        borderRadius: 5,
    },
    buttonText: {
        fontFamily: 'Markazi',
        fontSize: 18,
        fontWeight: '700',
        textAlign: 'center',
    },
    buttonContainer: {
        marginTop: 20,
        marginBottom: 60,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    buttonPrimary: {
        backgroundColor: '#495e57',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonSecondary: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        borderColor: '#495e57',
        borderWidth: 1,
    },
    textPrimary: {
        fontFamily: 'Markazi',
        fontSize: 18,
        fontWeight: '700',
        textAlign: 'center',
        color: '#edefee',
    },
    textSecondary: {
        fontFamily: 'Markazi',
        fontSize: 18,
        fontWeight: '700',
        textAlign: 'center',
        color: '#495e57',
    },
    checkboxContainer: {
        flexDirection: 'column',
        marginBottom: 10,
    },
    checkbox: {
        marginBottom: 10,
    }
})

export default ProfileScreen;
