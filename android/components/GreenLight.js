import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, StyleSheet, View, Button } from 'react-native';

export default class GreenLight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: true,
    };
    this.sendToFavorites = this.sendToFavorites.bind(this);
  }

  setModalVisible(bool) {
    this.setState({modalVisible: bool});
  }

  sendToFavorites() {
    console.log(this.props.productInfo, 'Product Info');
    fetch('http://ec2-13-59-228-147.us-east-2.compute.amazonaws.com:8080/favorites',
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: this.props.UserId,
          product_id: this.props.productInfo._id
        })
      })
    .then((response) => {
      var productData = {
        user_id: this.props.UserId,
        title: this.props.productInfo.title,
        image: this.props.productInfo.image,
        _id: this.props.productInfo._id,
        ingredients: this.props.productInfo.ingredients
      };
      this.props.updateFavorites(productData);
      return response.json();
    })
    .then(() => this.props.revertCamera())
    .catch((error) => {
      console.error(error);
    });
  }

  render() {
    return (
        <Modal
          animationType={"slide"}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {}}
          >
          <View style={styles.popup}>

            <Text style={{color: 'white', textAlign: 'center', fontSize: 20, fontWeight: 'bold'}}>Hooray!</Text>
            <Text style={{color: 'white', textAlign: 'center', fontSize: 20, margin: 25}}>Looks like {this.props.productInfo.title} does not contain any of the allergens you'd like to avoid. Enjoy!</Text>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Button
              color='grey'
              title="Hide Alert"
              onPress={() => {
                this.setModalVisible(false);
                this.props.revertCamera();
              }}
            />
          {/*This view creates space between the buttons on this popup*/}
            <View style={{width: 10}}></View>
            <Button
              color='grey'
              title="Save item to Favorites"
              onPress={() => {
                this.sendToFavorites();
                console.log('Favorites button clicked');
            }}/>
            </View>
         </View>
        </Modal>
    );
  }
}
const styles = StyleSheet.create({
  popup: {
    backgroundColor: 'rgba(0,128,0, 0.8)',
    borderColor: '#d6d7da',
    borderWidth: 3,
    borderRadius: 20,
    justifyContent: 'center',
    overflow: 'visible',
    flex: 1
  }
});