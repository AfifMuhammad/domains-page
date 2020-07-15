import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Button, StyleSheet, Alert, TouchableOpacity , View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import SQLite from 'react-native-sqlite-storage';
import Input from '../components/Input.js';

function Add ({navigation, route}) {

    const [domainName, setDomainName] = useState(route.params.domain_name);
    const [price, setPrice ] = useState(String(route.params.price));

    useEffect(() => {
        SQLite.DEBUG = true;
    }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={{flexDirection:'row'}}>
                    <TouchableOpacity onPress={() => {navigation.navigate('Template1', route.params)}}>
                        <Icon name="eye-outline" size={30} style={{padding:10}}/>
                    </TouchableOpacity>
                </View>
            ),
        });
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

    const InsertQuery = async() => {
        // single insert query 
        await ExecuteQuery("UPDATE table_domain set domain_name=?, price=? where id=?", [domainName, price, route.params.id])
            .then(result => {
                Alert.alert(
                    'Success',
                    'Data updated successfully',
                    [
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
                <Input
                    title = 'Domain Name'
                    onChangeText = {text => setDomainName(text)}
                    value = {domainName}
                />
                <Input
                    title = 'Price'
                    onChangeText={text => setPrice(text)}
                    value={price}
                    keyboardType='numeric'
                />
            </View>
            <View style={styles.button}>
                <Button
                    title="Apply"
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