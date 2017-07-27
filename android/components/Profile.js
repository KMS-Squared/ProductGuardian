import React, { Component } from 'react';
import t from 'tcomb-form-native';
import {
  AppRegistry,
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

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
      UserData: {}
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('userInfo', (err, userInfo) => {
      console.log('user data to be updated', userInfo);
      var user = JSON.parse(userInfo);
      var avoidables = user.avoidables.join(',');
      this.setState({UserData: {
        first_name: user.first_name,
        last_name: user.last_name,
        avoidables: avoidables,
        user_id: user.user_id
      }});
      console.log('user state', this.state.UserData);
    });
  }

  onPress () {
    // call getValue() to get the values of the form
    var value = this.refs.form.getValue();
    if (value) { // if validation fails, value will be null
      console.log(value);
      console.log('body =====', JSON.stringify({
          user_id: this.state.UserData.user_id,
          first_name: value.first_name,
          last_name: value.last_name,
          avoidables: value.avoidables
        }));
      fetch('http://ec2-13-59-228-147.us-east-2.compute.amazonaws.com:8080/edit-profile', {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: this.state.UserData.user_id,
          first_name: value.first_name,
          last_name: value.last_name,
          avoidables: value.avoidables
        })
      }).then((response) => {
        response.json().then((modifiedUser) => {
          console.log('modified user', modifiedUser);
          AsyncStorage.setItem('userInfo', JSON.stringify(modifiedUser));
        }).catch((error) => {console.log('error modifying profile', error)});
      }).catch((error) => {console.log('error saving profile', error)});
      this.props.navigation.goBack();
    }
  }

  render () {
    return (
      <View style={styles.container}>
        {/* display */}
        <Form
          ref="form"
          type={User}
          value={this.state.UserData}
          options={this.options}
        />
        <TouchableHighlight style={styles.button} onPress={this.onPress.bind(this)} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableHighlight>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
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
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});