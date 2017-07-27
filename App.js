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
import Favorites from './android/components/Favorites';
import Shopping from './android/components/ShoppingList'
import BarcodeScanner from './android/components/BarcodeScanner';
import Profile from './android/components/Profile';
import GreenLight from './android/components/GreenLight';
import { TabNavigator, StackNavigator } from 'react-navigation';
import ActionButton from 'react-native-action-button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FAIcons from 'react-native-vector-icons/FontAwesome';
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';

class HomeScreen extends React.Component {

  render() {
    const { navigate } = this.props.navigation;
    return (<View style={{
                flex: 1,
                justifyContent: 'flex-start',
                alignItems: 'center',
                backgroundColor: '#F5FCFF'
              }}>
              <Image source={require('./android/app/src/pg_home.png')}
                style={{
                  width: 220,
                  height: 144,
                  marginBottom: 20,
                  marginTop: 50
                }} />
              <Text style={styles.welcome}>
              ProductGuardian
              </Text>
              <Text style={styles.instructions}>
                To get started, open the camera and begin scanning product barcodes.
              </Text>

              <ActionButton buttonColor="rgba(231,76,60,1)"
                icon={
                  <Ionicons name="md-more" style={styles.actionButtonIcon} />
                }
                offsetX={15}
                offsetY={10}
                degrees={90}
                >
                <ActionButton.Item buttonColor='#339966' title="Profile" onPress={() => navigate('Profile')}>
                  <FAIcons name="user" style={styles.actionButtonIcon} />
                </ActionButton.Item>
                <ActionButton.Item buttonColor='#f0c420' title="Favorites" onPress={() => navigate('Favorites')}>
                  <FAIcons name="star" style={styles.actionButtonIcon} />
                </ActionButton.Item>
                <ActionButton.Item buttonColor='#0a86ff' title="Shopping List" onPress={() => navigate('Shopping')}>
                  <FAIcons name="shopping-cart" style={styles.actionButtonIcon} />
                </ActionButton.Item>
                </ActionButton>

            </View>);
  }
}

const ProductGuardian = TabNavigator({

  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor }) => (
      <Image source={require('./android/app/src/home_icon.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    )}
  },
  Camera: {
    screen: BarcodeScanner,
    navigationOptions: {
      tabBarLabel: 'Scan',
      tabBarIcon: ({ tintColor }) => (
      <Image source={require('./android/app/src/barcode_scanner.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    )}
  },
}, {
  tabBarPosition: 'bottom',
  tabBarOptions: {
    style: {
      backgroundColor: '#339966',
      padding: 0,
    },
    showIcon: true,
    showLabel: false,
    tabStyle: {
      padding: 5,
      height: 60,
      width: Dimensions.get('window').width/2
    }
  },
});

const SubScreens = StackNavigator({
  ProductGuardian: {
    screen: ProductGuardian,
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      title: 'Profile',
    }
  },
  Favorites: {
    screen: Favorites,
    navigationOptions: {
      title: 'Favorites',
    }
  },
  Shopping: {
    screen: Shopping,
    navigationOptions: {
      title: 'Shopping',
    }
  },
}, {
  headerMode: 'none',
});


const styles = StyleSheet.create({
  welcome: {
    fontSize: 35,
    textAlign: 'center',
    color: '#F89E3A',
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
  },
  icon: {
    height: 25,
    width: 25,
    color: 'white'
  }
});

AppRegistry.registerComponent('ProductGuardian', () => SubScreens);