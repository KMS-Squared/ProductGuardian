import './App';
import Auth0 from 'react-native-auth0';
const auth0 = new Auth0({ domain: 'kmssquared.auth0.com', clientId: 'OZC5JTbnOI1eQJ6-XF0rFFMZqgskh6g6' });

auth0
.webAuth
.authorize({scope: 'openid email', audience: 'https://kmssquared.auth0.com/userinfo'})
.then(credentials =>
  console.log(credentials)
  // Successfully authenticated
  // Store the accessToken
)
.catch(error => console.log(error));