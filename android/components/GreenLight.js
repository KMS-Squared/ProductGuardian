import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, StyleSheet, View, Button } from 'react-native';
import CardView from 'react-native-cardview';

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
          <CardView
              cardElevation={5}
              cardMaxElevation={0}
              cornerRadius={25}
              style={styles.popup}>
            <Text style={styles.title}>Hooray!</Text>
            <Text style={styles.info}>Looks like {this.props.productInfo.title} does not contain any of the allergens you'd like to avoid. Enjoy!</Text>
            <View style={{flexDirection: 'column', justifyContent: 'center'}}>

            <CardView
              cardElevation={2}
              cornerRadius={5}
              style={styles.buttonCard}>
            <TouchableHighlight
              style={styles.button}
              onPress={() => {
                this.setModalVisible(false);
                this.props.revertCamera();
              }}
              underlayColor='#99d9f4'>
                <Text style={styles.buttonText}>Hide Alert</Text>
              </TouchableHighlight>
              </CardView>
            {/*<Button
              color='grey'
              title="Hide Alert"
              style={styles.button}
              onPress={() => {
                this.setModalVisible(false);
                this.props.revertCamera();
              }}
            />*/}
            <CardView
              cardElevation={2}
              cornerRadius={5}
              style={styles.buttonCard}>
            <TouchableHighlight
              style={styles.button}
              onPress={() => {
                this.sendToFavorites();
                console.log('Favorites button clicked');
              }}
              underlayColor='#99d9f4'>
                <Text style={styles.buttonText}>Save item to Favorites</Text>
              </TouchableHighlight>
              </CardView>
            {/*<Button
              color='grey'
              title="Save item to Favorites"
              style={styles.button}
              onPress={() => {
                this.sendToFavorites();
                console.log('Favorites button clicked');
            }}/>*/}
            </View>
         </CardView>
        </Modal>
    );
  }
}
const styles = StyleSheet.create({
  popup: {
    backgroundColor: 'rgba(0,128,0, 0.8)',
    height: "80%",
    marginTop: 100,
    marginBottom: 100,
    marginRight: 20,
    marginLeft: 20,
    justifyContent: 'flex-start',
    overflow: 'visible',
    flex: 1,
    padding: 30,
    paddingTop: 40,
  },
  title: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  },
  info: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    margin: 25
  },
  buttonCard: {
    marginTop: 20,
    alignSelf: 'center',
    backgroundColor: '#eeeeee',
    paddingLeft: 20,
    paddingRight: 20
  },
  button: {
    backgroundColor: '#eeeeee',
    paddingTop: 0,
    marginBottom: 8,
    height: 40,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 15,
    color: '#777777',
    alignSelf: 'center'
  },
});