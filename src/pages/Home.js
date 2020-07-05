import { View } from 'react-native';
import React, { useState, useEffect } from 'react';
import List from '../components/List.js';
import SQLite from 'react-native-sqlite-storage';
import {Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';

function Home ({navigation}) {

    const [flatListItems, setFlatListItems] = useState('');

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate("Add Domain")}>
                    <Icon name="add" size={30} style={{padding:20}}/>
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          // The screen is focused
            SQLite.DEBUG = true;
            CreateTable();
            LoadAllData();
        });
    
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);
    
    

    const ExecuteQuery = (sql, params = []) => new Promise((resolve, reject) => {
        db.transaction((trans) => {
            trans.executeSql(sql, params, (trans, results) => {
                resolve(results);
            },
            (error) => {
              reject(error);
            });
        });
    });
    
    // Create Table
    const CreateTable = async() => {
        await ExecuteQuery("CREATE TABLE IF NOT EXISTS table_domain(id INTEGER PRIMARY KEY AUTOINCREMENT, domain_name VARCHAR(30), price INTEGER(10))",[])
            .then(result => {
                //console.log(result);
            })
            .catch(error => {
                console.log(error);
            });
    }
    
    const LoadAllData = async() =>{
        await ExecuteQuery("SELECT * FROM table_domain",[])
            .then(result => {
                let temp = [];
                for (let i=0; i<result.rows.length; i++) {
                    temp.push(result.rows.item(i))
                }
                setFlatListItems(temp);
            })
            .catch(error => {
                console.log(error);
            });
    }

    const deleteData = async function (id){
        await ExecuteQuery('DELETE FROM table_domain WHERE id = ?', [id])
        .then((result) => {
            console.log(result);
            Alert.alert(
                'Success',
                'Data deleted successfully',
                [
                  {
                    text: 'Ok',
                    onPress : () => LoadAllData()
                  },
                ],
                { cancelable: false }
            );
        })
        .catch(error => {
            console.log(error);
        });
    };

    return (
        <View style={{flex:1}}>
            <List data={flatListItems} onPress={(item) => {navigation.navigate('Template1', item)}} onDelete={(id) => deleteData(id) }/>
        </View>
    );
}

export default Home;