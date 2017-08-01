import React, { Component } from 'react';
import t from 'tcomb-form-native';
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

let Form = t.form.Form;
let User = t.struct({
  // username: t.String,
  first_name: t.String,
  last_name: t.String,
  avoidables: t.String,
  // password: t.String
});

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
      avoidableList: [],
      addItem: '',
    }
  }

  onPress () {
    // call getValue() to get the values of the form // if validation fails, value will be null
    console.log('body =====', JSON.stringify({
        user_id: this.state.UserData.user_id,
        first_name: this.state.UserData.first_name,
        last_name: this.state.UserData.last_name,
        avoidables: this.state.avoidableList
      }));
    fetch('http://ec2-13-59-228-147.us-east-2.compute.amazonaws.com:8080/edit-profile', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: this.state.UserData.user_id,
        first_name: this.state.UserData.first_name,
        last_name: this.state.UserData.last_name,
        avoidables: this.state.avoidableList
      })
    }).then((response) => {
      response.json().then((modifiedUser) => {
        console.log('modified user', modifiedUser);
        AsyncStorage.setItem('userInfo', JSON.stringify(modifiedUser));
      }).catch((error) => {console.log('error modifying profile', error)});
    }).catch((error) => {console.log('error saving profile', error)});
    this.props.navigation.goBack();
  }

  deleteItem(index) {
    this.state.avoidableList.splice(index, 1);
    this.setState({
      avoidableList: this.state.avoidableList
    });
  }

  addAvoidable() {
<<<<<<< HEAD
    console.log(this.props)
    console.log('additem', this.state.addItem)
    // this.state.avoidableList.push(this.state.addItem);
    // // console.log('avoidable list after push', this.state.avoidableList)
    // this.setState({
    //   avoidableList: this.state.avoidableList
    // });
=======
    this.state.avoidableList.push(this.state.addItem);
    let index = this.state.avoidableList.length;
    this.state.avoidableList.splice(index-1, 1, this.state.addItem)
    this._textInput.setNativeProps({text: ''});
    let prev = this.state.avoidableList.slice(0);
    // prev.push(this.state.addItem)
    this.setState(() => ({
      avoidableList: prev
    }));

>>>>>>> Finished rendering after adding item
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
    return (
      <ScrollView>
        {this.state.UserData.avatar ?
          <View>
            <View style={styles.bgContainer}>
                <Image
                source={{uri: this.state.UserData.avatar}}
                style={styles.avatarBG}
                blurRadius={5}>
                <Text style={styles.userInfo}>{`${this.state.UserData.first_name} ${this.state.UserData.last_name}`}</Text>
                </Image>
            </View>
            <View style={styles.overlay}>
              <Image
                source={{uri: this.state.UserData.avatar}}
                style={styles.avatar} />

            </View>
          </View>
        :
          <View>
            <View style={styles.bgContainer}>
                <Text style={styles.userInfo}>{`${this.state.UserData.first_name} ${this.state.UserData.last_name}`}</Text>
            </View>
            <View style={styles.overlay}>
              <Image source={require('../app/src/user_icon.png')}
                style={styles.avatar2} />
            </View>
          </View>
        }
        <View style={styles.avoidableList}>
          <Text style={{marginBottom: 10, fontSize: 20, alignSelf: 'center'}}>Allergen List</Text>
          <FlatList
            data={this.state.avoidableList}
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
            <TouchableHighlight style={{width: 50}}onPress={this.addAvoidable.bind(this)} underlayColor='#99d9f4'>
            <Text style={{fontSize: 20, alignSelf: 'center', justifyContent:'center'}}>+</Text>
            </TouchableHighlight>
          </View>
          <TouchableHighlight style={styles.button} onPress={this.onPress.bind(this)} underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableHighlight>

        </View>
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    padding: 0,
    height: Dimensions.get('window').height,
    backgroundColor: '#ffffff',
  },
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
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 40,
    backgroundColor: '#339966',
    borderColor: '#339966',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  avoidable: {
    fontSize: 12,
    paddingTop: 10,
    paddingBottom: 10,
    alignSelf: 'center'
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
});