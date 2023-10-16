
import { View, Text, Image, FlatList, StyleSheet, Pressable } from 'react-native';
import { roundTwoDecimals } from '../utils';



const Menu = ({ navigation, menuItems }) => {


    const renderMenu = ({ item }) => {

        const getImagePath = (image) => {
            switch (image) {

                case 'greekSalad.jpg':
                    return require('../assets/images/greekSalad.png');
                case 'bruschetta.jpg':
                    return require('../assets/images/bruschetta.png');
                case 'grilledFish.jpg':
                    return require('../assets/images/grilledFish.png');
                case 'pasta.jpg':
                    return require('../assets/images/pasta.png');
                case 'lemonDessert.jpg':
                    return require('../assets/images/lemonDessert.png');
                default:
                    return null;
            }
        }

        const imagePath = getImagePath(item.image);

        return (
            <Pressable
                style={styles.menuItem}
            >
                <Image
                    source={imagePath}
                    style={styles.menuItemImage}
                />
                <View style={styles.menuItemTextContainer}>
                    <Text style={styles.menuItemTitle}>{item.name}</Text>
                    <Text style={styles.menuItemDescription}>{item.description}</Text>
                    <Text style={styles.menuItemPrice}>
                        ${roundTwoDecimals(item.price)}
                    </Text>
                </View>
            </Pressable>
        )
    }


    return (
        <View style={styles.container}>
            <FlatList
                data={menuItems}
                renderItem={renderMenu}
                keyExtractor={item => item.name}
            />
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 0.5,
        backgroundColor: '#fff',
        paddingHorizontal: 15,
    },
    menuItem: {
        flexDirection: 'row',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#EDEFEE',
    },
    menuItemImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginRight: 10,
        resizeMode: 'cover',
    },
    menuItemTextContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    menuItemTitle: {
        fontFamily: 'Karla',
        fontSize: 18,
        fontWeight: 'bold',
    },
    menuItemDescription: {
        fontFamily: 'Karla',
        fontSize: 16,
        color: '#495E57',
    },
    menuItemPrice: {
        fontFamily: 'Karla',
        fontSize: 16,
        color: '#495E57',
        fontWeight: 'bold',
    }
})

export default Menu;