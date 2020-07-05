import { View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { TextInput, Button, StyleSheet, Alert } from 'react-native';
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
            <View style={styles.textInput}>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: '100%' }}
                    onChangeText={text => setDomainName(text)}
                    value={domainName}
                    placeholder="Domain Name"
                />
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: '100%', marginTop:'5%'}}
                    onChangeText={text => setPrice(text)}
                    value={price}
                    placeholder="Price"
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
        flex : 3,
        padding : 20,
        alignItems : 'center',
    },
    button : {
        padding : 20,
        flex :1
    }
})

export default Add;