import React, {component} from 'react';
import { View, StyleSheet, Text, Button, FlatList, TouchableHighlight, Dimensions } from 'react-native';
import {Icon} from 'react-native-elements';
let winSize = Dimensions.get('window');
export default class ShoppingList extends React.Component {
  constructor(props) {
    super(props);
    const {state} = this.props.navigation;
    this.state = {
      listItems: state.params.shopping_list
    };
    this.deleteItem = this.deleteItem.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.getShoppingList = this.getShoppingList.bind(this);
  }
  renderHeader() {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Shopping List</Text>
        <Text style={styles.headerText} onPress={() => this.deleteAllItems()}>Delete All</Text>
      </View>
    );
  }

  deleteItem (item) {
    const {state} = this.props.navigation;
    console.log('delete pressed')
    fetch(`http://ec2-13-59-228-147.us-east-2.compute.amazonaws.com:8080/shopping-list-item`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: state.params.user_id,
        product_id: item._id
      })
    })
    .then((response) => response.json())
    .then(() => this.getShoppingList())
    .then((returnedListItems) => {
      console.log(returnedListItems, 'RETURNED LIST ITEMS');
      state.params.shopping_list = returnedListItems;
      this.setState({listItems: returnedListItems});
    })
    .catch((error) => {
      console.error(error);
    });
  }

  deleteAllItems () {
    const {state} = this.props.navigation;
    console.log('delete pressed');
    fetch(`http://ec2-13-59-228-147.us-east-2.compute.amazonaws.com:8080/shopping-list`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: state.params.user_id
      })
    })
    .then((response) => response.json())
    .then(() => this.getShoppingList())
    .then((returnedListItems) => {
      console.log(returnedListItems)
      state.params.shopping_list = returnedListItems;
      this.setState({listItems: returnedListItems});
    })
    .catch((error) => {
      console.error(error);
    });
  }

  getShoppingList () {
    const {state} = this.props.navigation;
    return fetch(`http://ec2-13-59-228-147.us-east-2.compute.amazonaws.com:8080/shopping-list/?user_id=${state.params.user_id}`)
      .then((data) => {
        return data.json();
      });
  }

  renderItem({item}) {
    const title = `${item.title}`;
//    const {iconName, iconColor} = item.icon;
    return (
      <View style={styles.row}>
          <Text style={styles.title}>{title}</Text>
        <View>
          <Icon color='#F89E3A' name='delete-forever' style={styles.deleteButton} onPress={() => this.deleteItem(item)}/>
        </View>
      </View>
    );
  }
  render() {
    const {state} = this.props.navigation;
    return (
      <View >
        <FlatList
          ListHeaderComponent={this.renderHeader}
          data={state.params.shopping_list}
          renderItem={this.renderItem}
          keyExtractor={item => item.title}
        />
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
  headerText: {
    fontSize: 19,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 0,
    marginBottom: 10,
  },
  row: {
    flex: 1,
    flexDirection: 'row', //main axis
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 25
  },
  title: {
    fontSize: 16,
    width: winSize.width * .73,
    textAlign: 'left'
  },
  deleteButton: {
    height: 28,
    marginRight: 25
  }
});