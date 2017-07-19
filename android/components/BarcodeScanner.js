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
      showGreenLight: false
    };
    this.hideWarning = this.hideWarning.bind(this);
    this.hideGreenLight = this.hideGreenLight.bind(this);
  }

  hideWarning() {
    this.setState({showWarning: false});
  }

  hideGreenLight() {
    this.setState({showGreenLight: false});
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
            if (event.data.toString() === '0042272009244') {
              console.log('Amy\'s Pad Thai -- UPC = ', event.data);
              this.setState({showGreenLight: true});
            } else if (event.data.toString() === '0013562300921') {
              console.log('Annie\'s Mac & Cheese -- UPC = ', event.data);
              this.setState({showWarning: true});
            }
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
        {this.state.showWarning ? <Warning revertCamera={this.hideWarning}/> : null}
        {this.state.showGreenLight ? <GreenLight revertCamera={this.hideGreenLight}/> : null}
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

