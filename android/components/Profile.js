import React, { Component } from 'react';
import t from 'tcomb-form-native';
import {
  AppRegistry,
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
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

          <Text style={{marginBottom: 20}}>Allergens</Text>
          <FlatList
            data={this.state.UserData.avoidables.split(',')}
            renderItem={({item}) =>

              <Text style={styles.avoidable}>{item.toUpperCase()}</Text>

            }

            ItemSeparatorComponent={this.renderSeparator}
          />

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
    width: Dimensions.get('window').width,
  },
  overlay: {
    width: Dimensions.get('window').width,
    height: 250,
  },
  avoidableList: {
    alignSelf: 'center',
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 20,
    width: Dimensions.get('window').width,
    backgroundColor: '#ffffff',
    paddingBottom: 20,
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
    marginLeft: 20,
  },
  avatarBG: {
    width: Dimensions.get('window').width,
    height: 250,
    // alignSelf: 'center',
    // marginBottom: 20,
    // marginTop: 0,
    // resizeMode: 'cover',
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
