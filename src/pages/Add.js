import { View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Alert, TextInput } from 'react-native';
import SQLite from 'react-native-sqlite-storage';

function Add ({navigation}) {

    const [domainName, setDomainName] = useState('');
    const [price, setPrice ] = useState('');

    useEffect(() => {
        SQLite.DEBUG = true;
    }, [])

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

    const InsertQuery = async() => {
        // single insert query 
        await ExecuteQuery("INSERT INTO table_domain (domain_name, price) VALUES (?,?)", [domainName, price])
            .then(result => {
                Alert.alert(
                    'Success',
                    'New data added successfully',
                    [
                      {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel'
                      },
                      { text: 'OK', onPress: ()=> navigation.navigate('Home') }
                    ],
                    { cancelable: false }
                );
                console.log(result);
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <View style={styles.container}>
            <View style={styles.textInput} >
                <TextInput
                    placeholder = 'Domain Name'
                    onChangeText={text => setDomainName(text)}
                    value={domainName}
                />
                <TextInput
                    placeholder = 'Price'
                    onChangeText={text => setPrice(text)}
                    value={price}
                    keyboardType='numeric'
                />
            </View>
            <View style={styles.button}>
                <Button
                    title="Save"
                    onPress={InsertQuery}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        justifyContent : 'space-between'
    },
    textInput : {
        padding : 20,
    },
    button : {
        padding : 20,
        flex :1
    }
})

export default Add;