import React, { component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
  FlatList,
  TouchableHighlight,
  AsyncStorage,
  Dimensions,
  ScrollView
} from 'react-native';
import { Icon } from 'react-native-elements';
import ProductDetail from './ProductDetail';
import AddedModal from './AddedModal';
import CardView from 'react-native-cardview';
let winSize = Dimensions.get('window');

export default class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: [],
      UserId: '',
      showProductDetail: false,
      productInfo: {},
      showModal: false
    };

    this.deleteFavorite = this.deleteFavorite.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.hideProductDetail = this.hideProductDetail.bind(this);
    this.hideAddedModal = this.hideAddedModal.bind(this);
    this.addShoppingList = this.addShoppingList.bind(this);
  }

  getFavorites() {
    const { state } = this.props.navigation;
    return fetch(
      `http://ec2-13-59-228-147.us-east-2.compute.amazonaws.com:8080/favorites/?user_id=${state.params.user_id}`
    ).then(data => {
      return data.json();
    });
  }

  updateShoppingList(itemInfo) {
    this.props.screenProps.shopping_list.push(itemInfo);
    this.setState({ showModal: true });
  }

  hideProductDetail() {
    this.setState({ showProductDetail: false });
  }

  hideAddedModal() {
    this.setState({ showModal: false });
  }

  renderHeader() {
    return (
      <CardView cardElevation={5} cardMaxElevation={3} cornerRadius={0} style={styles.headerTab}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Favorites</Text>
        </View>
      </CardView>
    );
  }

  addShoppingList(product) {
    const { state } = this.props.navigation;
    console.log('addShoppingList', product);
    fetch('http://ec2-13-59-228-147.us-east-2.compute.amazonaws.com:8080/shopping-list', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: state.params.user_id,
        product_id: product._id
      })
    })
      .then(response => {
        var productData = {
          user_id: state.params.user_id,
          title: product.title,
          image: product.image,
          _id: product._id,
          ingredients: product.ingredients
        };
        this.updateShoppingList(productData);
        return response.json();
      })
      .catch(error => {
        console.error(error);
      });
  }

  deleteFavorite(product) {
    const { state } = this.props.navigation;
    fetch(`http://ec2-13-59-228-147.us-east-2.compute.amazonaws.com:8080/favorite`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: state.params.user_id,
        product_id: product._id
      })
    })
      .then(response => response.json())
      .then(() => this.getFavorites())
      .then(returnedFavorites => {
        state.params.favorites = returnedFavorites;
        this.setState({ favorites: returnedFavorites });
      })
      .catch(error => {
        console.error(error);
      });
  }

  renderSeparator() {
    return <View style={styles.listSeparator} />;
  }

  renderItem({ item }) {
    const title = `${item.title}`;
    return (
      <ScrollView>
        <View style={styles.row}>
          <View>
            <Icon
              name="add-shopping-cart"
              color="#339966"
              style={styles.shoppingCart}
              onPress={() => this.addShoppingList(item)}
            />
          </View>
          <TouchableHighlight onPress={() => this.setState({ showProductDetail: true, productInfo: item })}>
            <Text style={styles.title}>{title}</Text>
          </TouchableHighlight>
          <View>
            <Icon
              color="#F89E3A"
              name="delete-forever"
              style={styles.deleteButton}
              onPress={() => this.deleteFavorite(item)}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
  render() {
    const { state } = this.props.navigation;
    return (
      <View>
        <FlatList
          ListHeaderComponent={this.renderHeader}
          data={state.params.favorites}
          renderItem={this.renderItem}
          keyExtractor={item => item.title}
          ItemSeparatorComponent={this.renderSeparator}
        />
        {this.state.showProductDetail ? (
          <ProductDetail
            hideProductDetail={this.hideProductDetail}
            productInfo={this.state.productInfo}
            UserId={state.params.user_id}
            deleteFavorite={this.deleteFavorite}
          />
        ) : null}
        {this.state.showModal ? <AddedModal hideAddedModal={this.hideAddedModal} info={'Shopping List'} /> : null}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  headerContainer: {
    height: 70,
    paddingLeft: 20,
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    backgroundColor: '#339966',
    alignItems: 'flex-start'
  },
  headerTab: {
    width: '120%',
    left: -7,
    top: -10,
    backgroundColor: '#339966'
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 0,
    marginBottom: 10
  },
  row: {
    flex: 1,
    flexDirection: 'row', //main axis
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 10
  },
  listSeparator: {
    height: 2,
    width: Dimensions.get('window').width,
    backgroundColor: '#CED0CE',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 15,
    width: winSize.width * 0.73,
    textAlign: 'left'
  },
  deleteButton: {
    height: 28,
    marginRight: 25
  },
  shoppingCart: {
    marginLeft: 20,
    marginRight: 15
  }
});
