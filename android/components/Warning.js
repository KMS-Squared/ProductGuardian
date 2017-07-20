import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, StyleSheet, View } from 'react-native';

export default class Warning extends Component {
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
            <Text style={{color: 'white', textAlign: 'center', fontSize: 25, fontWeight: 'bold'}}>Warning!</Text>
            <Text style={{color: 'white', textAlign: 'center', fontSize: 25}}>This food contains ingredients that you may want to avoid!</Text>

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
    backgroundColor: 'crimson',
    borderColor: '#d6d7da',
    borderWidth: 3,
    height: 250,
    width: 250,
    borderRadius: 20,
    justifyContent: 'center',
    overflow: 'visible'
  }
});