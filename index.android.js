import './App';
import Auth0 from 'react-native-auth0';
import Key from './config/AuthKey';
var Auth0Lock = require('react-native-lock');
const auth0 = new Auth0(Key);
const lock = new Auth0Lock(Key);

lock.show({}, (err, profile, token) => {
  console.log('Logged in!');
  console.log('profile ', profile);
  console.log('token ', token)
});

// auth0
//   .webAuth
//   .authorize({scope: 'openid profile email', audience: 'https://kmssquared.auth0.com/userinfo'})
//   .then((credentials) => {
//     auth0.auth.userInfo({token: credentials.accessToken})
//     .then((data) => {console.log(data)});
//   })
//   .catch(error => console.log(error));