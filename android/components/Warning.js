import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, StyleSheet, View, Button, FlatList } from 'react-native';

export default class Warning extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: true,
      sampleProduct: 'Raisins',
      sampleAllergens: ['raisins', 'peanuts', 'whey']
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
            <Text style={{color: 'white', textAlign: 'center', fontSize: 20, fontWeight: 'bold'}}>Warning!</Text>
            <Text style={{color: 'white', textAlign: 'center', fontSize: 20, marginBottom: 5}}>{this.state.sampleProduct} contains ingredients that you may want to avoid, including: </Text>
            <View>
              <FlatList
                data={this.state.sampleAllergens}
                renderItem={({item}) => <Text style={{color: 'white', textAlign: 'center', fontSize: 20, marginBottom: 5}}>{item}</Text>}
              />
            </View>

            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Button
              color='grey'
              title='Hide Alert'
              onPress={() => {
                console.log('click');
              this.setModalVisible(false);
              this.props.revertCamera();
            }}/>
            </View>
         </View>
        </Modal>
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