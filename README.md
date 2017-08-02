# ProductGuardian

> Keeping you safe from food allergens, one scan at a time

## Team

  - __Product Owner__: Kenneth Marshall
  - __Scrum Master__: Semie Rodgers
  - __Development Team Members__: Sheena Ramirez, Mark Suyat

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

Use the Auth0 login screen to open the ProductGuardian interface, then press the red button on the right side of the screen to head to the "profile" view, where you can list any allergens or ingredients you're trying to avoid in products that you will be scanning. Click save on your profile to head back to the ProductGuardian home screen.

When you're ready to start scanning items, click the green barcode icon on the bottom right side of your phone screen to open the barcode scanner. Focus the camera on a product barcode, and ProductGuardian will return a red alert for items that include ingredients you'd like to avoid or a green alert for items that don't appear to have those ingredients. For items that appear to be safe, you can use the alert to save a product to your favorites, which you can view by clicking the red navigation button on the home screen. Within favorites, you can view detailed information about each product you've saved and choose to add items to a shopping list of items you'd like to buy during your next shopping trip.

## Requirements

- auth0-lock ^10.19.0
- lodash ^4.17.4
- react 16.0.0-alpha.12
- react-native 0.46.4
- react-native-action-button ^2.7.2
- react-native-auth0 ^1.0.3
- react-native-camera 
- react-native-elements 0.15.0
- react-native-lock ^0.6.0
- react-native-svg ^5.3.2
- react-native-swipeout ^2.2.1
- react-native-vector-icons ^4.2.0
- react-navigation ^1.0.0-beta.11

## Development

###Running the Android app on your phone

Within the root directory:

```sh
react-native run-android
```

You'll need to add a logo within the Android build files to make react-native-lock work correctly.

### Installing Dependencies

From within the root directory:

```sh
npm install
```

If you run into build issues after running npm install, you might need to run npm install --save react-native-svg after doing a general npm install

### Roadmap

View the project roadmap [here](LINK_TO_PROJECT_ISSUES)


## Contributing

See [CONTRIBUTING.md](_CONTRIBUTING.md) for contribution guidelines.
