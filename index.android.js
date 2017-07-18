import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  Button,
  View
} from 'react-native';
import _ from 'lodash';
import ShowResults from './android/components/ShowResults';
import BarcodeScanner from './android/components/BarcodeScanner';

export default class ProductGuardian extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCamera: false
    };
    this.closeCamera = this.closeCamera.bind(this);
  }

  switchToCamera() {
    this.setState({'showCamera': true});
  }

  closeCamera() {
    this.setState({'showCamera': false});
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to ProductGuardian!
        </Text>
        <Text style={styles.instructions}>
          To get started, click the "Scan Items" button
        </Text>
        <Button
          onPress={() => {this.switchToCamera()}}
          title="Scan Items"
          color="#841584"
          accessibilityLabel="Scan items for possible product sensitivities"
        />
        {this.state.showCamera ? <BarcodeScanner closeCamera={this.closeCamera}/> : null}
      </View>
    );
  }
}

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
});

AppRegistry.registerComponent('ProductGuardian', () => ProductGuardian);
