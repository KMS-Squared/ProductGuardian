import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, StyleSheet, View, Button, FlatList } from 'react-native';
import CardView from 'react-native-cardview';

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
            <Text style={styles.title}>Warning!</Text>
            <Text style={styles.info}>{this.props.productInfo.title} contains ingredients that you may want to avoid, including: </Text>
            <View>
              <FlatList
                data={this.props.avoidables}
                renderItem={({item}) => <Text style={styles.list}>{item}</Text>}
              />
            </View>

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
              title='Hide Alert'
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
    backgroundColor:'rgba(204,0,0, 0.8)',
    height: "80%",
    marginTop: 100,
    marginBottom: 100,
    marginRight: 20,
    marginLeft: 20,
    justifyContent: 'flex-start',
    overflow: 'visible',
    flex: 1,
    padding: 30,
    paddingTop: 40,
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
  list: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 5
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