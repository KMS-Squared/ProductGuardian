import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, StyleSheet, View, Image} from 'react-native';
import { Button } from 'react-native-elements';

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
    return (
      <Modal
        visible={this.state.modalVisible}
        transparent={false}
        animationType={"slide"}
        onRequestClose={() => {}}
      >
        <View style={styles.popup}>
          <Text style={styles.title}>{this.props.productInfo.title}</Text>
          <Image
            style={{width: 100, height: 200}}
            source={{uri: this.props.productInfo.image}}/>
          <Text>INGREDIENTS GO HERE</Text>
          <Button
            large
            icon={{name: 'done'}}
            title='LARGE WITH RIGHT ICON'
            color='#339966'
            onPress={() => this.setModalVisible(false)}
            >DONE</Button>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  popup: {
    backgroundColor:'white',
    borderColor: '#d6d7da',
    borderWidth: 3,
    borderRadius: 20,
    justifyContent: 'center',
    overflow: 'visible',
    flex: 1
  },
  title: {
    fontSize: 19,
    color: 'black'
  }
});