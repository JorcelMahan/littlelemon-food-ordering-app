import { useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const Hero = ({ query, handleSearchChange }) => {

    const [active, setActive] = useState(false);

    return (
        <View style={styles.container}>

            <Text style={styles.title}>
                Little Lemon
            </Text>
            <Text style={styles.subtitle}>Chicago</Text>

            <View style={styles.innerContainer}>
                <Text style={styles.paragraph}>
                    We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
                </Text>

                <Image
                    source={require('../assets/images/Hero-image.png')}
                    style={styles.heroImage}
                />
            </View>
            <Pressable
                style={[styles.search, active && styles.searchActive]}
                onPress={() =>
                    setActive(!active)
                }>
                <TextInput
                    placeholder="Search"
                    style={[styles.textSearch, active && styles.textSearchActive]}
                    value={query}
                    onChangeText={handleSearchChange}
                />
                <FontAwesome
                    name="search"
                    size={20}
                    color="black"
                />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 0.40,
        backgroundColor: '#495e57',
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    title: {
        fontFamily: 'Markazi',
        fontSize: 50,
        fontWeight: '400',
        color: '#f4ce14',
    },
    subtitle: {
        fontFamily: 'Markazi',
        fontSize: 30,
        fontWeight: '400',
        color: '#edefee',
        marginTop: -20,
        marginBottom: 20,
    },
    innerContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    paragraph: {
        flex: 0.6,
        fontFamily: 'Karla',
        fontSize: 16,
        color: '#edefee',
        textAlign: 'left',
        marginRight: 5,
    },
    heroImage: {
        flex: 0.4,
        width: 60,
        height: 160,
        borderRadius: 25,
        resizeMode: 'cover',
    },
    search: {
        backgroundColor: '#EDEFEE',
        borderRadius: 50,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
    },
    searchActive: {
        flexDirection: 'row',
        width: 150,
        justifyContent: 'space-around',
    },
    textSearch: {
        display: 'none',
    },
    textSearchActive: {
        display: 'flex',
        width: 60,
    }
})

export default Hero;