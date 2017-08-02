import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, StyleSheet, View, Image} from 'react-native';
import { Icon } from 'react-native-elements';

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
          <Text style={styles.title}>{this.props.productInfo.title}</Text>
          <Image
            style={{width: 150, height: 300, alignSelf: 'center'}}
            source={{uri: this.props.productInfo.image}}/>
          <Text style={styles.ingredients}>{ingredients}</Text>
          <TouchableHighlight style={styles.button} onPress={() => this.setModalVisible(false)} underlayColor='#99d9f4'>
            <View>
              <Icon color='white' name='done' />
            </View>
          </TouchableHighlight>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  popup: {
    backgroundColor:'white',
    justifyContent: 'center',
    overflow: 'visible',
    flex: 1
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    color: 'black',
    alignSelf: 'center',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    marginTop: 10
  },
  button: {
    height: 40,
    backgroundColor: '#339966',
    borderColor: '#339966',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 40,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  ingredients: {
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10
  }
});