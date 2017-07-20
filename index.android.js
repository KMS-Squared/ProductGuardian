import './App';
import Auth0 from 'react-native-auth0';
import Key from './config/AuthKey';
const auth0 = new Auth0(Key);

auth0
  .webAuth
  .authorize({scope: 'openid email', audience: 'https://kmssquared.auth0.com/userinfo'})
  .then(credentials =>
    console.log(credentials)
    // Successfully authenticated
    // Store the accessToken
  )
  .catch(error => console.log(error));