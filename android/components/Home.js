import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  Dimensions,
  Button,
  Image,
  View
} from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';
import Profile from './Profile';
import Favorites from './Favorites';
import Shopping from './ShoppingList';
import ActionButton from 'react-native-action-button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FAIcons from 'react-native-vector-icons/FontAwesome';
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default class HomeScreen extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.mainContainer}>
    {/*****Background Image*******/}
        <View style={styles.bgContainer}>
            <Image
            source={require('../app/src/grocery_bg.jpg')}
            style={styles.bg}
            blurRadius={0}>
            </Image>
        </View>
    {/*******OVERLAY*******/}
        <View style={styles.overlay}>
          <Image source={require('../app/src/pg_home.png')}
            style={styles.logo} />
          <Text style={styles.welcome}>
          ProductGuardian
          </Text>
          <Text style={styles.instructions}>
            To get started, open the camera and begin scanning product barcodes.
          </Text>

          <ActionButton buttonColor="rgba(231,76,60,1)"
            icon={<Ionicons name="md-more" style={styles.actionButtonIcon} />}
            offsetX={15}
            offsetY={10}
            degrees={90}>
            <ActionButton.Item buttonColor='#339966' title="Profile" onPress={() => {navigate('Profile', this.props.screenProps)}}>
              <FAIcons name="user" style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item buttonColor='#f0c420' title="Favorites" onPress={() => navigate('Favorites', this.props.screenProps)}>
              <FAIcons name="star" style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item buttonColor='#0a86ff' title="Shopping List" onPress={() => navigate('Shopping', this.props.screenProps)}>
              <FAIcons name="shopping-cart" style={styles.actionButtonIcon} />
            </ActionButton.Item>
          </ActionButton>
        </View>

    </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F4F4F4'
  },
  bgContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    padding: 0,
    height: "100%",
    width: Dimensions.get('window').width,
  },
  bg: {
    flex: 1,
    width: Dimensions.get('window').width,
    resizeMode: 'cover',
  },
  overlay: {
    width: Dimensions.get('window').width,
    height: "100%",
    justifyContent: 'flex-start',
    alignSelf: 'center'
  },
  logo: {
    width: 220,
    height: 144,
    marginBottom: 10,
    marginTop: 50,
    alignSelf: 'center'
  },
  welcome: {
    fontSize: 35,
    fontWeight: ("bold"),
    textAlign: 'center',
    color: '#F89E3A',
    margin: 5,
  },
  instructions: {
    fontSize: 15,
    textAlign: 'center',
    color: '#777777',
    paddingTop: "5%",
    marginBottom: 5,
    paddingLeft: 30,
    paddingRight: 30
  },
  disclaimer: {
    fontSize: 10
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});
