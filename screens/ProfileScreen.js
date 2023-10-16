import { View, Text, TextInput, StyleSheet, Pressable, Image } from 'react-native';


const ProfileScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile</Text>
            <View style={styles.profileContainer}>
                <Image
                    source={require('../assets/images/profile.png')}
                    style={styles.profileImage}
                />
                <Text style={styles.profileName}>John Doe</Text>
            </View>
            <View style={styles.formContainer}>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="John Doe"
                    />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                    />
                </View>
            </View>
            <Pressable
                style={styles.button}
                onPress={() => console.log('Pressed')}>
                <Text style={styles.buttonText}>Save</Text>
            </Pressable>
        </View>
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
        fontSize: 40,
        fontWeight: '400',
        color: '#f4ce14',
        marginBottom: 20,
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
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
        backgroundColor: '#f4ce14',
        paddingVertical: 10,
        borderRadius: 5,
    },
    buttonText: {
        fontFamily: 'Markazi',
        fontSize: 20,
        fontWeight: '400',
        color: '#495e57',
        textAlign: 'center',
    },
})

export default ProfileScreen;
