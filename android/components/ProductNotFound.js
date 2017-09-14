import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, StyleSheet, View, Button } from 'react-native';
import CardView from 'react-native-cardview';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class ProductNotFound extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: true
    };
  }

  setModalVisible(bool) {
    this.setState({ modalVisible: bool });
  }

  render() {
    return (
      <Modal
        animationType={'slide'}
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          console.log('modal closed');
        }}
      >
        <CardView cardElevation={5} cardMaxElevation={0} cornerRadius={25} style={styles.popup}>
          <TouchableHighlight
            style={styles.close}
            onPress={() => {
              this.setModalVisible(false);
              this.props.revertCamera();
            }}
            underlayColor="#99d9f4"
          >
            <Ionicons name="md-close-circle" style={styles.closeIcon} />
          </TouchableHighlight>
          <Text style={styles.title}>Product not found</Text>
          <Text style={styles.info}>
            We're sorry, no information could be found about this product. Please try another item.
          </Text>

          {/*<Button
                color='grey'
                title="Hide Alert"
                style={styles.button}
                onPress={() => {
                this.setModalVisible(false);
                this.props.revertCamera();
              }}/>*/}
        </CardView>
      </Modal>
    );
  }
}
const styles = StyleSheet.create({
  popup: {
    backgroundColor: 'rgba(60, 134, 183, 0.9)',
    height: '80%',
    marginTop: '35%',
    marginBottom: '60%',
    marginRight: '5%',
    marginLeft: '5%',
    justifyContent: 'flex-start',
    overflow: 'visible',
    flex: 1,
    padding: 10,
    paddingTop: 40
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
    color: '#fff'
  }
});
