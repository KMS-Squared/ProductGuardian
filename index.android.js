import './App';
import Auth0 from 'react-native-auth0';
import Key from './config/AuthKey';
const auth0 = new Auth0(Key);

auth0
  .webAuth
  .authorize({scope: 'openid profile email', audience: 'https://kmssquared.auth0.com/userinfo'})
  .then((credentials) => {
    auth0.auth.userInfo({token: credentials.accessToken})
    .then((data) => {console.log(data)});
  })
  .catch(error => console.log(error));