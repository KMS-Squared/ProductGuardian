import React from 'react';
import { AppRegistry, AsyncStorage, Dimensions, StyleSheet, Image, View } from 'react-native';
import _ from 'lodash';
import Favorites from './android/components/Favorites';
import HomeScreen from './android/components/Home';
import Shopping from './android/components/ShoppingList';
import BarcodeScanner from './android/components/BarcodeScanner';
import GreenLight from './android/components/GreenLight';
import Profile from './android/components/Profile';
import { TabNavigator, StackNavigator } from 'react-navigation';
import Auth0 from 'react-native-auth0';
import Key from './config/AuthKey';
var Auth0Lock = require('react-native-lock');
const auth0 = new Auth0(Key);
const lock = new Auth0Lock(Key);
const server = 'http://ec2-13-59-228-147.us-east-2.compute.amazonaws.com:8080/';

console.disableYellowBox = true;

class ProductGuardian extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {}
    };
  }

  render() {
    return <App screenProps={this.state.userData} />;
  }

  _checkUserSignedIn(callback) {
    let keys = ['user', 'token'];
    AsyncStorage.multiGet(keys)
      .then(values => {
        callback(values);
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentWillMount() {
    this._checkUserSignedIn(userLoginInfo => {
      console.log(userLoginInfo);
      //If there's no userId set or no token for the user
      if (userLoginInfo[0][1] === null || userLoginInfo[1][1] === null) {
        lock.show({}, (err, profile, token) => {
          console.log('profile ', profile);
          console.log('token ', token);
          fetch(server + 'login', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              user_id: profile.userId
            })
          })
            .then(response => {
              response.json().then(userData => {
                if (!userData) {
                  /*if the user id was not found in our database */ fetch(server + 'signup', {
                    method: 'POST',
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                      user_id: profile.userId,
                      first_name: profile.given_name,
                      last_name: profile.family_name,
                      email: profile.email,
                      avatar: profile.picture
                    })
                  }).then(newUser => {
                    newUser
                      .json()
                      .then(userData => {
                        console.log('new user data ', userData);
                        this.setState({ userData: userData });
                        AsyncStorage.multiSet([['user', userData.user_id], ['token', token.accessToken]])
                          .then(() => {
                            console.log('tokens set');
                          })
                          .catch(err => {
                            console.log(err);
                          });
                      })
                      .catch(err => {
                        console.log(err);
                      });
                  });
                } else {
                  /*if the user was found in our database */ console.log('existing user data ', userData);
                  this.setState({ userData: userData });
                  AsyncStorage.multiSet([['user', userData.user_id], ['token', token.accessToken]])
                    .then(() => {
                      console.log('tokens set');
                    })
                    .catch(err => {
                      console.log(err);
                    });
                }
              });
            })
            .catch(err => {
              console.log(err);
            });
        });
      } else {
        /*If the user had a token saved in AsyncStorage already, send them into the app */ fetch(server + 'login', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user_id: userLoginInfo[0][1]
          })
        })
          .then(response => {
            response.json().then(userData => {
              console.log('existing user data ', userData);
              this.setState({ userData: userData });
            });
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
  }
}

const SubScreens = TabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({ tintColor }) => <Image source={require('./android/app/src/home_icon.png')} style={styles.icon} />
      }
    },
    Camera: {
      screen: BarcodeScanner,
      navigationOptions: {
        tabBarLabel: 'Scan',
        tabBarIcon: ({ tintColor }) => (
          <Image source={require('./android/app/src/barcode_scanner.png')} style={styles.icon} />
        )
      }
    }
  },
  {
    tabBarPosition: 'bottom',
    tabBarOptions: {
      style: {
        backgroundColor: '#339966',
        padding: 0
      },
      showIcon: true,
      showLabel: false,
      tabStyle: {
        padding: 5,
        height: 60,
        width: Dimensions.get('window').width / 2
      }
    }
  }
);

const App = StackNavigator(
  {
    SubScreens: {
      screen: SubScreens
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        title: 'Profile'
      }
    },
    Favorites: {
      screen: Favorites,
      navigationOptions: {
        title: 'Favorites'
      }
    },
    Shopping: {
      screen: Shopping,
      navigationOptions: {
        title: 'Shopping'
      }
    },
    GreenLight: {
      screen: GreenLight,
      navigationOptions: {
        title: 'GreenLight'
      }
    }
  },
  {
    headerMode: 'none',
    mode: 'modal'
  }
);

const styles = StyleSheet.create({
  icon: {
    height: 25,
    width: 25
  }
});

AppRegistry.registerComponent('ProductGuardian', () => ProductGuardian);
