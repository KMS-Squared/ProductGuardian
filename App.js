import React from 'react';
import {
  AppRegistry,
  AsyncStorage,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  Button,
  View
} from 'react-native';
import _ from 'lodash';
import BarcodeScanner from './android/components/BarcodeScanner';
import Profile from './android/components/Profile';
import GreenLight from './android/components/GreenLight';
import { TabNavigator } from 'react-navigation';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (<View>
              <Text style={styles.welcome}>
              Welcome to ProductGuardian!
              </Text>
              <Text style={styles.instructions}>
                To get started, open the camera and begin scanning product barcodes.
              </Text>
            </View>);
  }
}

const ProductGuardian = TabNavigator({
  Home: { screen: HomeScreen },
  Camera: {screen: BarcodeScanner},
  Profile: {screen: Profile}
  }, {
    tabBarPosition: 'bottom'
  });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  disclaimer: {
    fontSize: 10
  }
});

AppRegistry.registerComponent('ProductGuardian', () => ProductGuardian);


