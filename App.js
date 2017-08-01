// import React from 'react';
// import {
//   AppRegistry,
//   Dimensions,
//   StyleSheet,
//   Image,
// } from 'react-native';
// import _ from 'lodash';
// import Favorites from './android/components/Favorites';
// import HomeScreen from './android/components/Home';
// import Shopping from './android/components/ShoppingList'
// import BarcodeScanner from './android/components/BarcodeScanner';
// import Profile from './android/components/Profile';
// import { TabNavigator, StackNavigator } from 'react-navigation';

// class App extends React.Component {

//   render() {
//     return (
//         <ProductGuardian />
//       );
//   }
// }

// const ProductGuardian = TabNavigator({

//   Home: {
//     screen: HomeScreen,
//     navigationOptions: {
//       tabBarLabel: 'Home',
//       tabBarIcon: ({ tintColor }) => (
//       <Image source={require('./android/app/src/home_icon.png')}
//         style={styles.icon}
//       />
//     )}
//   },
//   Camera: {
//     screen: BarcodeScanner,
//     navigationOptions: {
//       tabBarLabel: 'Scan',
//       tabBarIcon: ({ tintColor }) => (
//       <Image source={require('./android/app/src/barcode_scanner.png')}
//         style={styles.icon}
//       />
//     )}
//   },
// }, {
//   tabBarPosition: 'bottom',
//   tabBarOptions: {
//     style: {
//       backgroundColor: '#339966',
//       padding: 0,
//     },
//     showIcon: true,
//     showLabel: false,
//     tabStyle: {
//       padding: 5,
//       height: 60,
//       width: Dimensions.get('window').width/2
//     }
//   },
// });

// const SubScreens = StackNavigator({
//   ProductGuardian: {
//     screen: ProductGuardian,
//   },
//   Profile: {
//     screen: Profile,
//     navigationOptions: {
//       title: 'Profile',
//     }
//   },
//   Favorites: {
//     screen: Favorites,
//     navigationOptions: {
//       title: 'Favorites',
//     }
//   },
//   Shopping: {
//     screen: Shopping,
//     navigationOptions: {
//       title: 'Shopping',
//     }
//   },
// }, {
//   headerMode: 'none',
//   mode: 'modal'
// });

// const styles = StyleSheet.create({
//   icon: {
//     height: 25,
//     width: 25,
//   }
// });


const styles = StyleSheet.create({
  welcome: {
    fontSize: 35,
    alignSelf: 'center',
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
    // color: 'white',
  },
  icon: {
    height: 25,
    width: 25,
    // color: 'white'
  }
});

AppRegistry.registerComponent('ProductGuardian', () => SubScreens);

