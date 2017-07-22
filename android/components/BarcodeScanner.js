import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import Camera from 'react-native-camera';
import _ from 'lodash';
import Warning from './Warning';
import GreenLight from './GreenLight';

export default class BarcodeScanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showWarning: false,
      showGreenLight: false,
      //Use once to make sure that the API is only called one scan at a time
      readBarCode: _.once(this.scanBarCode.bind(this))
    };
    this.hideWarning = this.hideWarning.bind(this);
    this.hideGreenLight = this.hideGreenLight.bind(this);
  }

  hideWarning() {
    this.setState({showWarning: false});
    //Reset the readBarCode state so that it can be triggered for a new scan
    this.setState({readBarCode: _.once(this.scanBarCode.bind(this))});
  }

  hideGreenLight() {
    this.setState({showGreenLight: false});
    //Reset the readBarCode state so that it can be triggered for a new scan
    this.setState({readBarCode: _.once(this.scanBarCode.bind(this))});
  }

  scanBarCode(event) {
    fetch('http://ec2-13-59-47-157.us-east-2.compute.amazonaws.com:8080/test').then(function(data) {
      data.text().then(function(text) {
        console.log(text);
        // if (text === 'OK') {
        //   this.setState({showGreenLight: true});
        // } else if (text === 'DANGER') {
        //   this.setState({showWarning: true});
        // } else {
        //   console.log('Item not found');
        // }
      });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}
          playSoundOnCapture={true}
          onBarCodeRead={(event) => {this.state.readBarCode(event)}}>
        </Camera>
        {this.state.showWarning ? <Warning revertCamera={this.hideWarning} style={styles.popup}/> : null}
        {this.state.showGreenLight ? <GreenLight revertCamera={this.hideGreenLight} style={styles.popup}/> : null}
      </View>
    );
  }

  // takePicture() {
  //   const options = {};
  //   //options.location = ...
  //   this.camera.capture({metadata: options})
  //     .then((data) => console.log(data))
  //     .catch(err => console.error(err));
  // }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',

  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: 'lightblue',
    borderRadius: 20,
    color: '#000',
    padding: 10,
    margin: 40
  },
  popup: {
    alignSelf: 'center',
    aspectRatio: 75
  }
});

