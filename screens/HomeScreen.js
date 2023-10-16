
import { useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import useCustomFonts from '../hooks/useCustomFonts';
import Hero from '../components/Hero';
import Category from '../components/Category';
import Menu from '../components/Menu';
import { createTableMenuItems, getMenuItems, saveMenuItems, filterByQueryAndCategories } from '../database';

const URL = 'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json'

const categories = [
    {
        name: 'Starters',
        status: false
    }, {
        name: 'Mains',
        status: false
    }, {
        name: 'Desserts',
        status: false
    }, {
        name: 'Drinks',
        status: false
    }

]

const HomeScreen = ({ navigation }) => {

    const [menuItems, setMenuItems] = useState([]);
    const [query, setQuery] = useState('');
    const [filteredByCategory, setFilteredByCategory] = useState(categories);

    const handleStatusCategory = (index) => {
        const newCategories = [...filteredByCategory];
        newCategories[index].status = !newCategories[index].status;
        setFilteredByCategory(newCategories);
    }

    const handleSearchChange = (text) => {
        // debounce 500ms   
        setQuery(text);
    }

    const loaded = useCustomFonts();

    const fetchMenu = async () => {
        const response = await fetch(URL);
        const json = await response.json();
        return json.menu;
    }


    useEffect(() => {
        (async () => {
            try {
                const x = await createTableMenuItems();
                console.log('x', x)
                const items = await getMenuItems();
                console.log('items', items)
                if (!items.length) {
                    const items = await fetchMenu();
                    saveMenuItems(items);
                    setMenuItems(items);
                } else {
                    setMenuItems(items);
                }
            } catch (error) {
                Alert.alert(error.message);
            }
        })();
    }, [])

    useEffect(() => {
        (async () => {
            try {
                const activeCategories = filteredByCategory
                    .filter(category => category.status)
                    .map(category => category.name.toLowerCase());
                // console.log('activeCategories', activeCategories);
                // console.log('query', query);
                const items = await filterByQueryAndCategories(query, activeCategories);
                setMenuItems(items);
            } catch (error) {
                Alert.alert(error.message);
            }
        })();
    }, [filteredByCategory, query])





    if (!loaded) return null;

    return (
        <View style={styles.container}>
            <Hero
                query={query}
                handleSearchChange={handleSearchChange}
            />
            <Category
                categories={filteredByCategory}
                handleStatusCategory={handleStatusCategory}
            />
            <Menu
                navigation={navigation}
                menuItems={menuItems}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },

})

export default HomeScreen;