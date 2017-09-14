import React, { component } from 'react';
import { View, StyleSheet, Text, Button, FlatList, TouchableHighlight, Dimensions, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import MIcons from 'react-native-vector-icons/MaterialIcons';
import CardView from 'react-native-cardview';

let winSize = Dimensions.get('window');

export default class ShoppingList extends React.Component {
  constructor(props) {
    super(props);
    const { state } = this.props.navigation;
    this.state = {
      listItems: state.params.shopping_list,
      showFavorites: false
    };
    this.deleteItem = this.deleteItem.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.getShoppingList = this.getShoppingList.bind(this);
  }
  renderHeader() {
    return (
      <CardView cardElevation={5} cardMaxElevation={3} cornerRadius={0} style={styles.headerTab}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Shopping List</Text>
        </View>
      </CardView>
    );
  }

  deleteItem(item) {
    const { state } = this.props.navigation;
    console.log('delete pressed');
    fetch(`http://ec2-13-59-228-147.us-east-2.compute.amazonaws.com:8080/shopping-list-item`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: state.params.user_id,
        product_id: item._id
      })
    })
      .then(response => response.json())
      .then(() => this.getShoppingList())
      .then(returnedListItems => {
        console.log(returnedListItems, 'RETURNED LIST ITEMS');
        state.params.shopping_list = returnedListItems;
        this.setState({ listItems: returnedListItems });
      })
      .catch(error => {
        console.error(error);
      });
  }

  deleteAllItems() {
    const { state } = this.props.navigation;
    console.log('delete pressed');
    fetch(`http://ec2-13-59-228-147.us-east-2.compute.amazonaws.com:8080/shopping-list`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: state.params.user_id
      })
    })
      .then(response => response.json())
      .then(() => this.getShoppingList())
      .then(returnedListItems => {
        console.log(returnedListItems);
        state.params.shopping_list = returnedListItems;
        this.setState({ listItems: returnedListItems });
      })
      .catch(error => {
        console.error(error);
      });
  }

  getShoppingList() {
    const { state } = this.props.navigation;
    return fetch(
      `http://ec2-13-59-228-147.us-east-2.compute.amazonaws.com:8080/shopping-list/?user_id=${state.params.user_id}`
    ).then(data => {
      return data.json();
    });
  }

  renderSeparator() {
    return <View style={styles.listSeparator} />;
  }

  renderItem({ item }) {
    const title = `${item.title}`;
    //    const {iconName, iconColor} = item.icon;
    return (
      <View style={styles.row}>
        <Text style={styles.title}>{title}</Text>
        <View>
          <Icon
            color="#F89E3A"
            name="delete-forever"
            style={styles.deleteButton}
            onPress={() => this.deleteItem(item)}
          />
        </View>
      </View>
    );
  }
  render() {
    const { state } = this.props.navigation;
    return (
      <ScrollView>
        <FlatList
          ListHeaderComponent={this.renderHeader}
          data={state.params.shopping_list}
          renderItem={this.renderItem}
          keyExtractor={item => item.title}
          ItemSeparatorComponent={this.renderSeparator}
        />

        <CardView cardElevation={2} cardMaxElevation={1} cornerRadius={10} style={styles.deleteCard}>
          <TouchableHighlight
            style={styles.deleteAllButton}
            onPress={() => this.deleteAllItems()}
            underlayColor="#99d9f4"
          >
            <Text style={styles.buttonText}>Clear shopping list</Text>
          </TouchableHighlight>
        </CardView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 70,
    paddingLeft: 20,
    paddingRight: 25,
    width: Dimensions.get('window').width,
    justifyContent: 'space-between',
    backgroundColor: '#339966',
    alignItems: 'center',
    flexDirection: 'row'
  },
  headerTab: {
    width: '120%',
    left: -7,
    top: -10,
    backgroundColor: '#339966',
    justifyContent: 'space-between'
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
    paddingBottom: 10,
    paddingLeft: 20
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
  deleteCard: {
    marginTop: 20,
    marginLeft: 50,
    marginRight: 50,
    justifyContent: 'center'
  },
  favCard: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 50,
    marginRight: 50,
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  deleteAllButton: {
    height: 50,
    backgroundColor: '#F89E3A',
    marginBottom: 8,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonCard: {
    marginTop: 20,
    alignSelf: 'center',
    backgroundColor: '#eeeeee',
    paddingLeft: 20,
    paddingRight: 20
  },
  favoriteButton: {
    paddingLeft: 50,
    height: 50,
    backgroundColor: '#339966',
    marginBottom: 8,
    justifyContent: 'center'
  },
  favIcon: {
    fontSize: 15,
    color: '#fff',
    alignSelf: 'center',
    paddingRight: 10
  }
});
