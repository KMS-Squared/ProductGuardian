import React, { Component } from 'react';
import {
  AppRegistry,
  AsyncStorage,
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  ScrollView,
  Image,
  Dimensions,
  TouchableHighlight
} from 'react-native';
import FAIcons from 'react-native-vector-icons/FontAwesome';
import Swipeout from 'react-native-swipeout';
import CardView from 'react-native-cardview'
import RNRestart from 'react-native-restart';

export default class Profile extends React.Component {
  static navigationOptions = {
    title: 'Profile',
  };

  constructor(props) {
    super(props);
    this.options = {}; // optional rendering options (see documentation)
    // here we are: define your domain model
    this.state = {
      UserData: {},
      avoidableList: null,
      addItem: '',
    }
  }

  onPress () {
    // call getValue() to get the values of the form // if validation fails, value will be null
    const {state} = this.props.navigation;
    console.log('body =====', JSON.stringify({
        user_id: state.params.user_id,
        first_name: state.params.first_name,
        last_name: state.params.last_name,
        avoidables: this.state.avoidableList
      }));
    fetch('http://ec2-13-59-228-147.us-east-2.compute.amazonaws.com:8080/edit-profile', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: state.params.user_id,
        first_name: state.params.first_name,
        last_name: state.params.last_name,
        avoidables: state.params.avoidables.join(',')
      })
    }).then((response) => {
      response.json().then((modifiedUser) => {
        console.log('modified user', modifiedUser);
        state.params.first_name = modifiedUser.first_name;
        state.params.last_name = modifiedUser.last_name;
        state.params.avoidables = modifiedUser.avoidables;
        this.setState({avoidableList: modifiedUser.avoidables});
      }).catch((error) => {console.log('error modifying profile', error)});
    }).catch((error) => {console.log('error saving profile', error)});
    this.props.navigation.goBack();
  }

  logout () {

    let keys = ['user', 'token'];
    AsyncStorage.multiRemove(keys)
    .then(() => {
      RNRestart.Restart();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  deleteItem(index) {
    const {state} = this.props.navigation;
    state.params.avoidables.splice(index, 1);
    this.setState({
      avoidableList: state.params.avoidables
    });
  }

  addAvoidable() {
    const {state} = this.props.navigation;
    if (this.state.addItem.length !== 0) {
      state.params.avoidables.push(this.state.addItem);
      this._textInput.setNativeProps({text: ''});
      let prev = state.params.avoidables.slice();
      this.setState({avoidableList: prev});
    }
  }

  renderSeparator () {
    return (
      <View
        style={{
          height: 1,
          width: Dimensions.get('window').width,
          backgroundColor: "#CED0CE",
        }}
      />
    );
  }

  renderItem(item) {
    let swipeBtns = [{
      text: 'Delete',
      backgroundColor: '#F89E3A',
      onPress: this.deleteItem.bind(this, item.index)
    }];
    return (
      <Swipeout
        style={styles.swipe}
        right={swipeBtns}
        autoClose={true}
        >
        <View>
          <Text style={styles.avoidable}>{item.item.toUpperCase()}</Text>
        </View>
      </Swipeout>
    )
  }

  renderSeparator () {
    return (
      <View
        style={{
          height: 1,
          width: Dimensions.get('window').width,
          backgroundColor: "#CED0CE",
        }}
      />
    );
  }

  render () {
    const {state} = this.props.navigation;
    return (
      <ScrollView>
       <CardView
              cardElevation={5}
              cardMaxElevation={0}
              cornerRadius={0}>
        {state.params.avatar ?

          <View>
            <View style={styles.bgContainer}>
                <Image
                source={{uri: state.params.avatar}}
                style={styles.avatarBG}
                blurRadius={5}>
                <Text style={styles.userInfo}>{`${state.params.first_name} ${state.params.last_name}`}</Text>
                </Image>
            </View>
            <View style={styles.overlay}>
              <Image
                source={{uri: state.params.avatar}}
                style={styles.avatar} />

            </View>
          </View>
        :
          <View>
            <View style={styles.bgContainer}>
                <Text style={styles.userInfo}>{`${state.params.first_name} ${state.params.last_name}`}</Text>
            </View>
            <View style={styles.overlay}>
              <Image source={require('../app/src/user_icon.png')}
                style={styles.avatar2} />
            </View>
          </View>
        }
        </CardView>
        <View style={styles.avoidableList}>
          <Text style={{marginBottom: 10, fontSize: 20, alignSelf: 'center'}}>Allergen List</Text>
          <FlatList
            data={this.state.avoidableList || state.params.avoidables}
            renderItem={this.renderItem.bind(this)}
            ItemSeparatorComponent={this.renderSeparator}
          />

          <View style={{padding: 10, flexDirection: 'row',justifyContent: 'center'}}>
            <TextInput
              style={{height: 40, width: "75%", alignSelf: 'center'}}
              ref={component => this._textInput = component}
              placeholder="Add other allergens"
              onChangeText={(addItem) => {this.setState({addItem: addItem})}}

             />
            <TouchableHighlight style={{width: 50}} onPress={this.addAvoidable.bind(this)} underlayColor='#99d9f4'>
            <Text style={{fontSize: 20, alignSelf: 'center', justifyContent:'center'}}>+</Text>
            </TouchableHighlight>
          </View>
          <View style={{marginTop: 5}}>
            <CardView
                cardElevation={2}
                cardMaxElevation={1}
                cornerRadius={10}>
              <TouchableHighlight style={styles.saveButton} onPress={this.onPress.bind(this)} underlayColor='#99d9f4'>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableHighlight>
            </CardView>
          </View>
          <View style={{marginTop: 10}}>
            <CardView
                cardElevation={2}
                cardMaxElevation={1}
                cornerRadius={10}>
              <TouchableHighlight style={styles.logoutButton} onPress={this.logout.bind(this)} underlayColor='#99d9f4'>
                <Text style={styles.buttonText}>Logout</Text>
              </TouchableHighlight>
            </CardView>
          </View>

        </View>
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  bgContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#F89E3A',
    padding: 0,
    height: "100%",
    width: Dimensions.get('window').width,
  },
  overlay: {
    width: Dimensions.get('window').width,
    height: 250,
  },
  avatarBG: {
    width: Dimensions.get('window').width,
    height: 250,
  },
  avatar: {
    marginTop: 30,
    width: 150,
    height: 150,
    alignSelf: 'center',
    borderRadius: 75,
    borderWidth: 5,
    borderColor: '#ffffff',
    justifyContent: 'center',
  },
  avatar2: {
    marginTop: 45,
    width: 150,
    height: 150,
    alignSelf: 'center',
    justifyContent: 'center',
  },
   userInfo: {
    fontSize: 25,
    color: '#ffffff',
    alignSelf: 'center',
    marginTop: 180
  },
  avatarName: {
    color: 'white',
    fontSize: 30,
    alignSelf: 'center',
    marginTop: 30
  },
  avoidableList: {
    alignSelf: 'center',
    paddingLeft: 50,
    paddingRight: 50,
    paddingTop: 20,
    width: Dimensions.get('window').width,
    backgroundColor: '#ffffff',
    paddingBottom: 20,
  },
  swipe: {
    backgroundColor: '#ffffff'
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
  avoidable: {
    fontSize: 12,
    paddingTop: 10,
    paddingBottom: 10,
    alignSelf: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  saveButton: {
    height: 50,
    backgroundColor: '#339966',
    marginBottom: 8,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  logoutButton: {
    height: 50,
    backgroundColor: '#d64c4c',
    marginBottom: 8,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
});