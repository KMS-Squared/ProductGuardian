import React, {component} from 'react';
import { View, StyleSheet, Text, Button, FlatList, TouchableHighlight, AsyncStorage } from 'react-native';
import {Icon} from 'react-native-elements';
import ProductDetail from './ProductDetail';

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
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Add to Shopping List</Text>
        <Text style={styles.headerText}>Delete</Text>
      </View>
    );
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

  renderItem({item}) {
    const title = `${item.title}`;
    return (
      <View style={styles.row}>
        <View>
          <Icon name='add-shopping-cart' color='#339966' onPress={() => this.addShoppingList(item)}/>
        </View>
        <TouchableHighlight onPress={() => this.setState({showProductDetail: true, productInfo: item})}>
          <Text style={styles.title}>{title}</Text>
        </TouchableHighlight>
        <View>
          <Icon color='#F89E3A' name='delete-forever' style={styles.deleteButton} onPress={() => this.deleteFavorite(item)}/>
        </View>
      </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#339966',
    alignItems: 'center'
  },
  headerText: {
    fontSize: 19,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 9,
    paddingLeft: 9,
    paddingRight: 6
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
    marginLeft: 9,
    fontSize: 19,
    paddingLeft: 5,
  },
  deleteButton: {
    height: 28,
    paddingRight: 5
  }
});