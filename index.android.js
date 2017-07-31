import React from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Image,
  View
} from 'react-native';
import _ from 'lodash';
import Favorites from './android/components/Favorites';
import HomeScreen from './android/components/Home';
import Shopping from './android/components/ShoppingList';
import BarcodeScanner from './android/components/BarcodeScanner';
import Profile from './android/components/Profile';
import { TabNavigator, StackNavigator } from 'react-navigation';
import Auth0 from 'react-native-auth0';
import Key from './config/AuthKey';
var Auth0Lock = require('react-native-lock');
const auth0 = new Auth0(Key);
const lock = new Auth0Lock(Key);
const server = 'http://10.0.0.42:8080/';

class ProductGuardian extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userData: {}
    };
  }

  render() {
    return (

      <App/>

    );
  }

  componentWillMount() {
    console.log('before mount');
    lock.show({}, (err, profile, token) => {
      console.log('profile ', profile);
      console.log('token ', token);
      //Later, we'll set the user's token in Asyncstorage here to decide later on whether they should go to the home page or the lock screen
      fetch(server + 'login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: profile.userId
        })
      }).then((response) => {
        response.json().then((userData) => {
          if (!userData) /*if the user id was not found in our database */{
            fetch(server + 'signup', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                user_id: profile.userId,
                first_name: profile.given_name,
                last_name: profile.family_name,
                email: profile.email,
                avatar: profile.picture,
              })
            }).then((newUser) => {
                newUser.json().then((userData) => {
                  console.log('new user data ', userData);
                  this.setState({userData: JSON.stringify(userData)});
                }).catch((err) => {
                  console.log(err);
                });
            });
          } else /*if the user was found in our database */{
            console.log('existing user data ', userData);
            this.setState({userData: JSON.stringify(userData)});
            //Render the home page
          }
        });
      }).catch((err) => {
        console.log(err);
      });
    });
  }
}

const SubScreens = StackNavigator({
  ProductGuardian: {
    screen: HomeScreen,
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
  mode: 'modal'
});

const App = TabNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor }) => (
      <Image source={require('./android/app/src/home_icon.png')}
        style={styles.icon}
      />
    )}
  },
  Camera: {
    screen: BarcodeScanner,
    navigationOptions: {
      tabBarLabel: 'Scan',
      tabBarIcon: ({ tintColor }) => (
      <Image source={require('./android/app/src/barcode_scanner.png')}
        style={styles.icon}
      />
    )}
  },
  FloatingButtons: {
    screen: SubScreens,
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

const styles = StyleSheet.create({
  icon: {
    height: 25,
    width: 25,
  }
});

AppRegistry.registerComponent('ProductGuardian', () => ProductGuardian);