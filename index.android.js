import React from 'react';
import Home from './App';
import Profile from './android/components/Profile';
import {
  AsyncStorage
} from 'react-native';
import {NavigationActions} from "react-navigation";
import Auth0 from 'react-native-auth0';
import Key from './config/AuthKey';
var Auth0Lock = require('react-native-lock');
const auth0 = new Auth0(Key);
const lock = new Auth0Lock(Key);
const server = 'http://10.0.0.42:8080/';

lock.show({}, (err, profile, token) => {
  console.log('profile ', profile);
  console.log('token ', token);
  // //Later, we'll set the user's token in Asyncstorage here to decide later on whether they should go to the home page or the lock screen
  fetch(server + 'login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user_id: profile.userId
    })
  }).then((response) => {
    response.json().then((userData) => {
      if (!userData) /*if the user id was not found in our database */{
        fetch(server + 'signup', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user_id: profile.userId,
            first_name: profile.given_name,
            last_name: profile.family_name,
            email: profile.email,
            avatar: profile.picture,
          })
        }).then((newUser) => {
            newUser.json().then((info) => {
              console.log('new user data ', info);
            }).catch((err) => {
              console.log(err);
            });
        });
      } else /*if the user was found in our database */{
        console.log('existing user data ', userData);
        //Render the home page
      }
    });
  }).catch((err) => {
    console.log(err);
  });
});