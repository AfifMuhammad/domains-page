import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../pages/Home.js';
import Template1 from '../templates/Template1.js';
import Add from '../pages/Add.js';
import SQLite from 'react-native-sqlite-storage';

global.db = SQLite.openDatabase(
  {
    name: 'SQLite',
    location: 'default',
    createFromLocation: '~domainDatabase.db',
  },
  () => { },
  error => {
    console.log("ERROR: " + error);
  }
);

const Stack = createStackNavigator();

function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Template1" component={Template1} options={({ route }) => ({ title: route.params.domain })}/>
        <Stack.Screen name="Add Domain" component={Add} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackNavigator;