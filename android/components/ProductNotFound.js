import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, StyleSheet, View, Button } from 'react-native';
import CardView from 'react-native-cardview';

export default class ProductNotFound extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: true,
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
          onRequestClose={() => {console.log('modal closed')}}>
          <CardView
              cardElevation={5}
              cardMaxElevation={0}
              cornerRadius={25}
              style={styles.popup}>
              <Text style={styles.info}>We're sorry, no information could be found about this product. Please try another item.</Text>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>

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
              }}/>*/}
              </View>
         </CardView>
        </Modal>
    );
  }
}
const styles = StyleSheet.create({
  popup: {
    height: "80%",
    marginTop: 100,
    marginBottom: 100,
    marginRight: 20,
    marginLeft: 20,
    backgroundColor:'rgba(51,51,255, 0.8)',
    justifyContent: 'center',
    overflow: 'visible',
    flex: 1,
    padding: 10,
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