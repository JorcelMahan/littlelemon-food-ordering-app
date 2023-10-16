import { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';




const Tag = ({ category, handleStatusCategory, index }) => {

    const toggleActive = () => {
        handleStatusCategory(index);
    }

    return (
        <Pressable
            style={[styles.tag, category.status && styles.active]}
            onPress={toggleActive}
        >
            <Text
                style={[styles.tagText, category.status && styles.activeText]}
            >
                {category.name}
            </Text>
        </Pressable>
    )
}





const Category = ({ categories, handleStatusCategory }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>ORDER FOR DELIVERY!</Text>
            <View style={styles.tagContainer}>
                {
                    categories.map((category, index) => (
                        <Tag
                            key={index}
                            category={category}
                            handleStatusCategory={handleStatusCategory}
                            index={index}
                        />
                    ))
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 0.2,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    title: {
        fontFamily: 'Karla',
        fontSize: 20,
        fontWeight: 'bold'
    },
    tagContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#EDEFEE',

    },
    tag: {
        backgroundColor: '#EDEFEE',
        borderRadius: 50,
        paddingVertical: 8,
        paddingHorizontal: 15,
    },
    tagText: {
        color: '#495E57',
        fontWeight: 'bold',
        fontSize: 14,
    },
    active: {
        backgroundColor: '#495E57',
    },
    activeText: {
        color: '#EDEFEE',
    }
})


export default Category;