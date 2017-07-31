import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
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

  render() {
    const { navigate } = this.props.navigation;
    return (<View style={{
                flex: 1,
                justifyContent: 'flex-start',
                alignItems: 'center',
                backgroundColor: '#F5FCFF'
              }}>
              <Image source={require('../app/src/pg_home.png')}
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
});

