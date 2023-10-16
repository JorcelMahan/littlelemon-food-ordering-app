import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('little_lemon');

export async function createTableMenuItems() {
    return new Promise((resolve, reject) => {
        const sql = 'CREATE TABLE IF NOT EXISTS menuitems (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, description TEXT NOT NULL, price REAL NOT NULL, image TEXT NOT NULL, category TEXT NOT NULL);'

        // execute the sql and log a message of success or failure
        db.transaction(tx => {
            tx.executeSql(sql, [], () => {
                resolve('table created');
            }, (_, error) => {
                reject(error);
            });
        });
    })
}

export async function getMenuItems() {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql('select * from menuitems', [], (_, { rows }) => {
                resolve(rows._array);
            });
        })
    })
}

export function saveMenuItems(menuItems) {
    db.transaction(tx => {
        const placeholders = menuItems.map(() => '(?, ?, ?, ?, ?)').join(', ');
        const values = menuItems.map(menuItem => [
            menuItem.name,
            menuItem.description,
            menuItem.price,
            menuItem.image,
            menuItem.category,
        ]).flat();

        const sql = `INSERT INTO menuitems (name, description, price, image, category) VALUES ${placeholders}`;

        tx.executeSql(sql, values, (_, { rows }) => {
            console.log('success');
        }, (_, error) => {
            console.log('error', error);
        });
    });
}


export async function filterByQueryAndCategories(query, activeCategories) {
    return new Promise((resolve, reject) => {

        db.transaction(
            (tx) => {

                const likePattern = `%${query}%`;
                const inValues = activeCategories.map(() => '?').join(',');
                const sql = 'SELECT * FROM menuitems WHERE name LIKE ? AND category IN (' + inValues + ')';
                const params = [likePattern, ...activeCategories];

                tx.executeSql(sql, params, (_, { rows }) => {
                    resolve(rows._array);
                });

            },
            reject,
            resolve
        );
    });
}
