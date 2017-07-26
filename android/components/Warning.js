import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, StyleSheet, View, Button } from 'react-native';

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
          onRequestClose={() => {console.log('modal closed')}}
          >
         <View style={styles.popup}>
          <View>
            <Text style={{color: 'white', textAlign: 'center', fontSize: 25, fontWeight: 'bold'}}>Warning!</Text>
            <Text style={{color: 'white', textAlign: 'center', fontSize: 25}}>This food contains ingredients that you may want to avoid!</Text>

            <Button
              color='grey'
              title='Hide Alert'
              onPress={() => {
              this.setModalVisible(false);
              this.props.revertCamera();
            }}/>


          </View>
         </View>
        </Modal>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  popup: {
    backgroundColor:'rgba(204,0,0, 0.8)',
    borderColor: '#d6d7da',
    borderWidth: 3,
    borderRadius: 20,
    justifyContent: 'center',
    overflow: 'visible',
    flex: 1
  }
});