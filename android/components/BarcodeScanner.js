import React, { Component } from 'react';
import {
  AppRegistry,
  AsyncStorage,
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
import ProductNotFound from './ProductNotFound';

export default class BarcodeScanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //UserId: props.screenProps.user_id,
      showWarning: false,
      showGreenLight: false,
      showProductNotFound: false,
      //Use once to make sure that the API is only called one scan at a time
      readBarCode: _.once(this.scanBarCode.bind(this)),
      productInfo: {},
      foundAvoidables: []
    };
    this.hideWarning = this.hideWarning.bind(this);
    this.hideGreenLight = this.hideGreenLight.bind(this);
    this.hideProductNotFound = this.hideProductNotFound.bind(this);
    this.updateFavorites = this.updateFavorites.bind(this);
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

  hideProductNotFound() {
    this.setState({showProductNotFound: false});
    //Reset the readBarCode state so that it can be triggered for a new scan
    this.setState({readBarCode: _.once(this.scanBarCode.bind(this))});
  }

  updateFavorites(itemInfo) {
    this.props.screenProps.favorites.push(itemInfo);
  }

  scanBarCode(event) {
    console.log('props', this.props.screenProps);
    console.log('upc', event.data);
    var upc;
    if (event.data.length > 12) {
      upc = event.data.slice(1, 13);
      console.log('upc sliced', upc);
    } else {
      upc = event.data;
    }
    fetch(`http://ec2-13-59-228-147.us-east-2.compute.amazonaws.com:8080/status?user_id=${this.props.screenProps.user_id}&upc=${upc}`)
    .then((data) => {
      return data.json();
    })
    .then((response) => {
      console.log(response);
      if (response.status === 'OK') {
        this.setState({showGreenLight: true});
        this.setState({productInfo: response.productInfo});
      } else if (response.status === 'DANGER') {
        this.setState({showWarning: true});
        this.setState({productInfo: response.productInfo});
        this.setState({foundAvoidables: response.avoidables});
      } else if (response.status === 'NOTFOUND') {
        this.setState({showProductNotFound: true});
      }
    }).catch((error) => {console.log(error);});

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
        {this.state.showWarning ? <Warning productInfo={this.state.productInfo} avoidables={this.state.foundAvoidables} revertCamera={this.hideWarning} style={styles.popup}/> : null}
        {this.state.showGreenLight ? <GreenLight UserId={this.props.screenProps.user_id} productInfo={this.state.productInfo} revertCamera={this.hideGreenLight} updateFavorites={this.updateFavorites} style={styles.popup}/> : null}
        {this.state.showProductNotFound ? <ProductNotFound productInfo={this.state.productInfo} revertCamera={this.hideProductNotFound} style={styles.popup}/> : null}
      </View>
    );
  }
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