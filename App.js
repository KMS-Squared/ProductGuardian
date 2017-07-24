import React from 'react';
import {
  AppRegistry,
  AsyncStorage,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  Button,
  Image,
  View
} from 'react-native';
import _ from 'lodash';
import BarcodeScanner from './android/components/BarcodeScanner';
import Profile from './android/components/Profile';
import GreenLight from './android/components/GreenLight';
import { TabNavigator } from 'react-navigation';
import ActionButton from 'react-native-action-button';
import Ionicons from 'react-native-vector-icons/Ionicons';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (<View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#F5FCFF'
              }}>
              <Image source={{
                uri: 'http://ec2-13-59-47-157.us-east-2.compute.amazonaws.com:8080/assests/PG_logo.png'}}
                style={{
                  width: 200,
                  height: 219
                }} />
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
  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: '#F5FCFF',
  // },
  welcome: {
    fontSize: 35,
    textAlign: 'center',
    color: '#ba0d0d',
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


