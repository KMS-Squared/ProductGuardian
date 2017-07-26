import React, {component} from 'react';
import { View, StyleSheet, Text, Button, FlatList, TouchableHighlight } from 'react-native';
import {Icon} from 'react-native-elements';


const mockData = [
  {title: "Cambell's Chicken Noodle Soup", avoidable: "whey"},
  {title: "LaCroix Grapefruit Sparkling Water", avoidable: "aspartame"}];


export default class Favorites extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: mockData
    };
    this.deleteFavorite = this.deleteFavorite.bind(this);
    this.renderItem = this.renderItem.bind(this);
  }

  deleteFavorite (item) {
        //delete request to server
      //send item title
            //server match item title and send back data again
    //rerender page without item
    let title = item.title
    fetch('http://ec2-13-59-228-147.us-east-2.compute.amazonaws.com:8080/favorites:' + {title}), {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }
    .then((response) => response.json())
    .then((returnedFavorites) => {
      this.state.data = returnedFavorites;
    })
    .catch((error) => {
      console.error(error);
    });
  }

  renderItem({item}) {
    const title = `${item.title}`;
//    const {iconName, iconColor} = item.icon;
    return (
      <View style={styles.row}>
        <TouchableHighlight onPress={() => console.log('TouchableHighlight')}>
          <Text style={styles.title}>{title}</Text>
        </TouchableHighlight>
        <View>
        <Icon color='red' name='delete-forever' style={styles.deleteButton} onPress={() => this.deleteFavorite(item)}/>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View >
        <FlatList
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={item => item.title}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    elevation: 1,
    borderRadius: 2,
    flex: 1,
    flexDirection: 'row', //main axis
    paddingTop: 10
  },
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
  },
  title: {
    marginLeft: 12,
    fontSize: 19,
    paddingLeft: 5,
    alignSelf: 'flex-start'
  },

  deleteButton: {
    alignItems: 'flex-end',
    height: 22,
    paddingLeft: 5
  }
});

