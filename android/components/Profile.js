import React, { Component } from 'react';
import t from 'tcomb-form-native';
import {
  AppRegistry,
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableHighlight
} from 'react-native';
import FAIcons from 'react-native-vector-icons/FontAwesome';

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
    AsyncStorage.getItem('userInfo').then((err, userInfo) => {
      console.log('user data to be updated', userInfo);
      var user = JSON.parse(userInfo);
      var avoidables = user.avoidables.join(',');
      this.setState({UserData: {
        first_name: user.first_name,
        last_name: user.last_name,
        avoidables: avoidables,
        user_id: user.user_id,
        avatar: user.avatar
      }});
      console.log('user state', this.state.UserData);
    }).catch((error) => {console.log(error)});
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
    const link = this.state.UserData.avatar;
    return (
      <View style={styles.container}>
        {this.state.UserData.avatar ?
          <View style={styles.bgContainer}>
              <Image
              source={{uri: link}}
              style={styles.avatarBG}
              blurRadius={0}>
              </Image>
          </View>
        :
          <View style={styles.bgContainer}>
            <Image source={require('../app/src/user_icon.png')}
                style={styles.avatar2} />
          </View>
        }
        <View style={styles.form}>
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
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    padding: 30,
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
  },
  avatarContainer: {
    backgroundColor: '#ffffff'
  },
  form: {
    marginTop: 210,
    justifyContent: 'flex-start',
    alignSelf: 'center',
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 10,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
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
  avatarBG: {
    width: Dimensions.get('window').width,
    height: 250,
    alignSelf: 'center',
    marginBottom: 20,
    marginTop: 0,
    resizeMode: 'cover',
  },
  avatar2: {
    marginTop: 10,
    width: 200,
    height: 200,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  avatarName: {
    color: 'white',
    fontSize: 30,
    alignSelf: 'center',
    marginTop: 30
  },
});
