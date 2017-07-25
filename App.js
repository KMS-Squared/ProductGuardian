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
import ActionButton from 'react-native-action-button';
import Ionicons from 'react-native-vector-icons/Ionicons';

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

              <ActionButton buttonColor="rgba(231,76,60,1)"
                icon={
                  <Ionicons name="md-more" style={styles.actionButtonIcon} />
                }
                offsetX={15}
                offsetY={5}
                degrees={90}
                >
                <ActionButton.Item buttonColor='#3498db' title="Profile" onPress={() => {}}>
                  <Ionicons name="user" style={styles.actionButtonIcon} />
                </ActionButton.Item>
                <ActionButton.Item buttonColor='#9b59b6' title="Favorites" onPress={() => console.log("notes tapped!")}>
                  <Ionicons name="md-create" style={styles.actionButtonIcon} />
                </ActionButton.Item>
                <ActionButton.Item buttonColor='#1abc9c' title="Quick Search" onPress={() => {}}>
                  <Ionicons name="md-search" style={styles.actionButtonIcon} />
                </ActionButton.Item>
                </ActionButton>


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
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  }
});

AppRegistry.registerComponent('ProductGuardian', () => ProductGuardian);


