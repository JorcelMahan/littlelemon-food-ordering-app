import { useContext, useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { AuthContext } from '../navigators/RootNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { validateEmail } from '../utils';

const Onboarding = () => {

    const { login } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const storeData = async () => {
        const namePair = ['namePair', name];
        const emailPair = ['emailPair', email];
        try {
            await AsyncStorage.multiSet([namePair, emailPair]);
        } catch (error) {
            console.log('Onboarding', error);
        }
    }

    const getData = async () => {
        try {
            const namePair = await AsyncStorage.getItem('namePair');
            const emailPair = await AsyncStorage.getItem('emailPair');

            if (namePair !== null && emailPair !== null) {
                setName(namePair);
                setEmail(emailPair);
            }

        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        getData();
    }, []);



    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <Image
                source={require('../assets/images/logo.png')}
                style={styles.image}
            />
            <View style={styles.formContainer}>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>First Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Name"
                        value={name}
                        onChangeText={text => setName(text)}
                    />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        keyboardType='email-address'
                        value={email}
                        onChangeText={text => setEmail(text)}
                    />
                </View>

                <Pressable
                    onPress={() => {
                        storeData();
                        login();
                    }}
                    style={[
                        styles.button,
                        name === '' || !validateEmail(email) ? styles.disabled : null
                    ]}
                    disabled={name === '' || !validateEmail(email)}
                >
                    <Text style={styles.text}>Next</Text>
                </Pressable>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 300,
        height: 300,
        resizeMode: 'contain',
    },
    formContainer: {
        width: '100%',
        paddingHorizontal: 20,
    },
    formGroup: {
        width: '100%',
        marginBottom: 20,
    },
    label: {
        color: '#333333',
        fontSize: 16,
        marginBottom: 10,
    },
    input: {
        height: 40,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#333333',
        borderRadius: 20,
    },
    button: {
        backgroundColor: '#f4ce14',
        paddingVertical: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    text: {
        color: '#333333',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    disabled: {
        backgroundColor: '#f4ce14',
        paddingVertical: 10,
        borderRadius: 5,
        marginTop: 20,
        opacity: 0.5,
    },
});

export default Onboarding;