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
import ShowResults from './ShowResults.js';

export default class BarcodeScanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
    this.revertCamera = this.revertCamera.bind(this);
  }

  revertCamera() {
    this.setState({showModal: false});
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
          onBarCodeRead={_.once((event) => {
            this.setState({showModal: true});
            console.log('state changed');
          }
          /*_.throttle((event) => {
            var that = this;
            fetch('https://api.upcitemdb.com/prod/trial/lookup?upc=' + event.data)
              .then(function(response) {
              that.setState({showModal: true});
              console.log('=======', that.state.showModal);
            })
          }, 15000)*/)}>
          <Text style={styles.capture} onPress={this.props.closeCamera}>Click to close the camera</Text>
        </Camera>
        {this.state.showModal ? <ShowResults style={{backgroundColor: 'red'}} revertCamera={this.revertCamera}/> : null}
      </View>
    );
  }

  takePicture() {
    const options = {};
    //options.location = ...
    this.camera.capture({metadata: options})
      .then((data) => console.log(data))
      .catch(err => console.error(err));
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
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
  }
});

