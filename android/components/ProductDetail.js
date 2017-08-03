import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, StyleSheet, View, Image, Dimensions, ScrollView} from 'react-native';
import { Icon } from 'react-native-elements';
import CardView from 'react-native-cardview'

let winSize = Dimensions.get('window');

export default class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: true,
      productInfo: {},
      UserId: ''
    };
  }

  setModalVisible(bool) {
    this.setState({modalVisible: bool});
    this.props.hideProductDetail();
  }

  render () {
    let ingredientList = this.props.productInfo.ingredients;
    console.log('ingredientList', ingredientList);
    let ingredients = ingredientList.reduce((label, ingredient) => {
      if (ingredient === ',') {
        return label += (ingredient + ' ');
      } else {
        return label += ingredient;
      }
    }, '');
    return (
      <Modal
        visible={this.state.modalVisible}
        transparent={false}
        animationType={'slide'}
        onRequestClose={() => {}}
      >
          <View style={styles.popup}>
            <CardView
              cardElevation={3}
              cardMaxElevation={0}
              cornerRadius={0}
              style={{backgroundColor: '#FFFFFF'}}>
            <Text style={styles.title}>{this.props.productInfo.title}</Text>

            <Image
              style={{width: winSize.width/2, height: 150, alignSelf: 'center', resizeMode: 'contain', marginBottom: 10}}
              source={{uri: this.props.productInfo.image}}/>
            </CardView>
            <ScrollView>
              <Text style={{marginLeft: 20, marginTop: 10, fontSize: 20}}>Ingredients</Text>
              <Text style={styles.ingredients}>{ingredients}</Text>
              <TouchableHighlight style={styles.button} onPress={() => this.setModalVisible(false)} underlayColor='#99d9f4'>
                <View>
                  <Icon color='white' name='done' />
                </View>
              </TouchableHighlight>
            </ScrollView>
          </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  popup: {
    backgroundColor:'#FFFFFF',
    justifyContent: 'center',
    overflow: 'visible',
    flex: 1
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    color: '#7a7a7a',
    fontWeight: 'bold',
    alignSelf: 'center',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    marginTop: 20
  },
  button: {
    width: "80%",
    height: 40,
    backgroundColor: '#339966',
    borderColor: '#339966',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 20,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  ingredients: {
    justifyContent: 'center',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 10
  }
});