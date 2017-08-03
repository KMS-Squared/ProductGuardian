import React, {component} from 'react';
import { View, StyleSheet, Text, Button, FlatList, TouchableHighlight, AsyncStorage, Dimensions, ScrollView } from 'react-native';
import {Icon} from 'react-native-elements';
import ProductDetail from './ProductDetail';
import CardView from 'react-native-cardview'

let winSize = Dimensions.get('window');

export default class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: [],
      UserId: '',
      showProductDetail: false,
      productInfo: {}
    };
    this.deleteFavorite = this.deleteFavorite.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.hideProductDetail = this.hideProductDetail.bind(this);
    this.addShoppingList = this.addShoppingList.bind(this);
  }

  hideProductDetail () {
    this.setState({showProductDetail: false});
  }

  renderHeader () {
    return (
      <CardView
          cardElevation={5}
          cardMaxElevation={3}
          cornerRadius={0}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Favorites</Text>
          </View>
      </CardView>

    );
  }

  addShoppingList (item) {
    console.log('addShoppingList', item);
    fetch('http://ec2-13-59-228-147.us-east-2.compute.amazonaws.com:8080/shoppingList',
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: this.props.UserId,
          product_id: this.props.productInfo._id
        })
      })
    .then((response) => {
      var productData = {
        user_id: this.props.UserId,
        title: this.props.productInfo.title,
        image: this.props.productInfo.image,
        ingredients: this.props.productInfo.ingredients
      };
      this.props.updateFavorites(productData);
      return response.json();
    })
    .then(() => this.props.revertCamera())
    .catch((error) => {
      console.error(error);
    });
  }

  deleteFavorite(item) {
    const {state} = this.props.navigation;

    fetch(`http://ec2-13-59-228-147.us-east-2.compute.amazonaws.com:8080/favorites`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: state.params.user_id,
        _id: item._id
      })
    })
    .then((response) => response.json())
    .then(() => this.getFavorites())
    .then((returnedFavorites) => {
      state.params.favorites = returnedFavorites;
    })
    .catch((error) => {
      console.error(error);
    });
  }

  renderSeparator () {
    return (
      <View
        style={{
          height: 2,
          width: Dimensions.get('window').width,
          backgroundColor: "#CED0CE",
        }}
      />
    );
  }

  renderItem({item}) {
    const title = `${item.title}`;
    return (
      <ScrollView>
      <View style={styles.row}>
        <View>
          <Icon name='add-shopping-cart' color='#339966' style={styles.shoppingCart} onPress={() => this.addShoppingList(item)}/>
        </View>
        <TouchableHighlight onPress={() => this.setState({showProductDetail: true, productInfo: item})}>
          <Text style={styles.title}>{title}</Text>
        </TouchableHighlight>
        <View>
          <Icon color='#F89E3A' name='delete-forever' style={styles.deleteButton} onPress={() => this.deleteFavorite(item)}/>
        </View>
      </View>
      </ScrollView>
    );
  }

  render() {
    const {state} = this.props.navigation;
    return (

      <View>
        <FlatList
          ListHeaderComponent={this.renderHeader}
          data={state.params.favorites}
          renderItem={this.renderItem}
          keyExtractor={item => item.title}
          ItemSeparatorComponent={this.renderSeparator}
        />
        {this.state.showProductDetail ? <ProductDetail hideProductDetail={this.hideProductDetail} productInfo={this.state.productInfo} UserId={state.params.user_id} deleteFavorite={this.deleteFavorite}/> : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    height: 50,
    paddingLeft: 20,
    paddingRight: 15,
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    backgroundColor: '#339966',
    alignItems: 'center'
  },
  headerText: {
    fontSize: 19,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 0,

  },
  row: {
    elevation: 1,
    flex: 1,
    flexDirection: 'row', //main axis
    justifyContent: 'space-between',
    paddingTop: 10
  },
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
  },
  title: {
    marginLeft: 5,
    fontSize: 16,
    width: winSize.width * .75,
    textAlign: 'left'
  },
  deleteButton: {
    height: 28,
    marginRight: 15
  },
  shoppingCart: {
    marginLeft: 15
  }

});