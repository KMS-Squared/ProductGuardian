import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, StyleSheet, View, Button } from 'react-native';

export default class GreenLight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: true,
      sampleProduct: 'raisins'
    };
  }

  setModalVisible(bool) {
    this.setState({modalVisible: bool});
  }

  render() {
    return (
        <Modal
          animationType={"slide"}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {console.log('modal closed')}}
          >
         <View style={styles.popup}>

            <Text style={{color: 'white', textAlign: 'center', fontSize: 20, fontWeight: 'bold'}}>Hooray!</Text>
            <Text style={{color: 'white', textAlign: 'center', fontSize: 20, margin: 25}}>Looks like {this.state.sampleProduct} does not contain any of the allergens you'd like to avoid. Enjoy!</Text>

            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Button
              color='grey'
              title="Hide Alert"
              onPress={() => {
              this.setModalVisible(false);
              this.props.revertCamera();
            }}/>
          {/*This view creates space between the buttons on this popup*/}
            <View style={{width: 10}}></View>
            <Button
              color='grey'
              title="Save item to Favorites"
              onPress={() => {
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
    backgroundColor:'rgba(0,128,0, 0.8)',
    borderColor: '#d6d7da',
    borderWidth: 3,
    borderRadius: 20,
    justifyContent: 'center',
    overflow: 'visible',
    flex: 1
  }
});