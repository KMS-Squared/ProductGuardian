import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, StyleSheet, View, Button } from 'react-native';
import CardView from 'react-native-cardview';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MIcons from 'react-native-vector-icons/MaterialIcons';

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

            <TouchableHighlight
            style={styles.close}
            onPress={() => {
              this.setModalVisible(false);
              this.props.revertCamera();
            }}
            underlayColor='#99d9f4'>
             <Ionicons name="md-close-circle" style={styles.closeIcon} />
            </TouchableHighlight>

            <Text style={styles.title}>Hooray!</Text>
            <Text style={styles.info}>Looks like {this.props.productInfo.title} does not contain any of the allergens you'd like to avoid. Enjoy!</Text>
            <View style={{flexDirection: 'column', justifyContent: 'center'}}>

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
              <View style={{flexDirection: 'row'}}>
                <MIcons name="favorite" style={styles.favButton} />
                <Text style={styles.buttonText}>
                Save item to Favorites</Text>
                </View>
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
    backgroundColor: 'rgba(109, 191, 109, 0.9)',
    height: "80%",
    marginTop: "25%",
    marginBottom: "50%",
    marginRight: "5%",
    marginLeft: "5%",
    justifyContent: 'flex-start',
    overflow: 'visible',
    flex: 1,
    padding: 20,
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
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 15,
    color: '#777777',
    alignSelf: 'center'
  },
  close: {
    position: 'absolute',
    right: 20,
    top: 20,
    width: 20,
    height: 20,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  closeIcon: {
    fontSize: 20,
    color: '#fff',
  },
  favButton: {
    fontSize: 15,
    color: '#777777',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingRight: 10
  }
});