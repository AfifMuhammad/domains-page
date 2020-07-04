/**
 * @format
 */

import {AppRegistry} from 'react-native';
import StackNavigator from './src/navigator/StackNavigator.js';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => StackNavigator);
