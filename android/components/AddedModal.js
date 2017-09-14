import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, StyleSheet, View } from 'react-native';
import CardView from 'react-native-cardview';

export default class AddedModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: true
    };
  }

  setModalVisible(bool) {
    this.setState({ modalVisible: bool });
    this.props.hideAddedModal();
  }

  render() {
    let info = this.props.info;
    return (
      <Modal visible={this.state.modalVisible} transparent={true} animationType={'slide'} onRequestClose={() => {}}>
        <CardView cardElevation={2} cornerRadius={5} style={styles.popup}>
          <Text style={styles.title} onPress={() => this.setModalVisible(false)}>
            Added item to {info}
          </Text>
        </CardView>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    marginTop: '60%',
    marginBottom: '70%',
    marginRight: '20%',
    marginLeft: '20%'
  },
  popup: {
    backgroundColor: 'rgba(109, 191, 109, 0.9)',
    marginTop: '60%',
    marginBottom: '70%',
    marginRight: '20%',
    marginLeft: '20%',
    justifyContent: 'flex-start',
    flex: 1,
    padding: 20,
    paddingTop: 40
  },
  title: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  }
});
