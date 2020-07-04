import { View } from 'react-native';
import React from 'react';
import List from '../components/List.js';
import data from '../data.json';
import Fab from '../components/Fab.js';
import SQLite from 'react-native-sqlite-storage';

export default class Home extends React.Component {

    constructor() {
        super();
        SQLite.DEBUG = true;
    }

    state ={ FlatListItems : ''}

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
    
    // Create Table
    CreateTable = async() => {
        await this.ExecuteQuery("CREATE TABLE IF NOT EXISTS table_domain(id INTEGER PRIMARY KEY AUTOINCREMENT, domain_name VARCHAR(30), price INTEGER(10))",[])
            .then(result => {
                //console.log(result);
            })
            .catch(error => {
                console.log(error);
            });
    }
    
    LoadAllData = async() =>{
        await this.ExecuteQuery("SELECT * FROM table_domain",[])
            .then(result => {
                let temp = [];
                for (let i=0; i<result.rows.length; i++) {
                    temp.push(result.rows.item(i))
                }
                this.setState({FlatListItems : temp});
            })
            .catch(error => {
                console.log(error);
            });
    }

    componentDidMount() {
        this.CreateTable();
        this.LoadAllData();
    }
    render() {
        return (
            <View style={{flex:1}}>
                <List data={this.state.FlatListItems} navigation={this.props.navigation}/>
                <Fab onPress={()=> this.props.navigation.navigate('Add Domain')}/>
            </View>
        );
    }
}