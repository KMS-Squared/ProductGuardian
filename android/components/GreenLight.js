import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, StyleSheet, View } from 'react-native';

export default class GreenLight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: true
    };
  }

  setModalVisible(bool) {
    this.setState({modalVisible: bool});
  }

  render() {
    return (
      <View >
        <Modal

          animationType={"slide"}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
         <View style={styles.popup}>
          <View>
            <Text style={{color: 'white', textAlign: 'center', fontSize: 30, fontWeight: 'bold'}}>Hooray!</Text>
            <Text style={{color: 'white', textAlign: 'center', fontSize: 30}}>Looks like this product does not contain any of the allergens you'd like to avoid. Enjoy!</Text>

            <TouchableHighlight style={{backgroundColor: 'grey', width: 200, borderRadius: 20}}onPress={() => {
              this.setModalVisible(false);
              this.props.revertCamera();
            }}>
              <Text style={{textAlign: 'center'}}>Hide Alert</Text>
            </TouchableHighlight>

          </View>
         </View>
        </Modal>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  popup: {
    backgroundColor: 'green',
    borderColor: '#d6d7da',
    borderWidth: 3,
    height: 300,
    width: 300,
    borderRadius: 20,
    justifyContent: 'center',
    overflow: 'visible'
  }
});