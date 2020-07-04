import { View } from 'react-native';
import React from 'react';
import { TextInput, Button, StyleSheet, Alert } from 'react-native';
import SQLite from 'react-native-sqlite-storage';

export default class Add extends React.Component {

    constructor() {
        super();
        SQLite.DEBUG = true;
    }

    state = { domainName: '', price:''}

    ExecuteQuery = (sql, params = []) => new Promise((resolve, reject) => {
        db.transaction((trans) => {
            trans.executeSql(sql, params, (trans, results) => {
                resolve(results);
            },
            (error) => {
              reject(error);
            });
        });
    });

    InsertQuery = async() => {

        // single insert query 
        await this.ExecuteQuery("INSERT INTO table_domain (domain_name, price) VALUES (?,?)", [this.state.domainName, this.state.price])
            .then(result => {
                console.log(result);
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.textInput}>
                    <TextInput
                        style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: '100%' }}
                        onChangeText={text => this.setState({domainName : text})}
                        value={this.state.domainName}
                        placeholder="Domain Name"
                    />
                    <TextInput
                        style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: '100%', marginTop:'5%'}}
                        onChangeText={text => this.setState({price : text})}
                        value={this.state.price}
                        placeholder="Price"
                        keyboardType='numeric'
                    />
                </View>
                <View style={styles.button}>
                    <Button
                        title="Save"
                        onPress={this.InsertQuery}
                    />
                </View>
            </View>
        );
    }
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