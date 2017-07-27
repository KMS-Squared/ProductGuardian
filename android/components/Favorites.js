import React, {component} from 'react';
import { View, StyleSheet, Text, Button, FlatList, TouchableHighlight } from 'react-native';
import {Icon} from 'react-native-elements';


const mockData = [
  {title: "Cambell's Chicken Noodle Soup", avoidable: "whey"},
  {title: "LaCroix Grapefruit Sparkling Water", avoidable: "aspartame"},
  {title: "Nature Valley Nut Bar", avoidable: "aspartame"},
  {title: "Dentyne Fire Gum", avoidable: "whey"}];


export default class Favorites extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      favorites: mockData
    };
    this.deleteFavorite = this.deleteFavorite.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
  }

  renderHeader

  componentDidMount() {
    fetch('http://ec2-13-59-228-147.us-east-2.compute.amazonaws.com:8080/favorites')
      .then(response => response.json())
      .then(favorites => {
        favorites.sort((obj1, obj2) => {
          obj1.name - obj2.name
        });
      })
      .then (this.setState({favorites})
      .catch((error) => {
        console.error(error);
      });
  }

  renderHeader () {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Add to Shopping List</Text>
        <Text style={styles.headerText}>Delete</Text>
      </View>
      );
  }

  deleteFavorite (item) {
        //delete request to server
      //send item title
            //server match item title and send back data again
    //rerender page without item
    // let title = item.title;
    // fetch('http://ec2-13-59-228-147.us-east-2.compute.amazonaws.com:8080/favorites/' + {title}), {
    //   method: 'DELETE',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //   }
    // }
    // .then((response) => response.json())
    // .then((returnedFavorites) => {
    //   this.setState({favorites: returnedFavorites});
    // })
    // .catch((error) => {
    //   console.error(error);
    // });
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
          <Icon color='#F89E3A' name='delete-forever' style={styles.deleteButton} onPress={() => this.deleteFavorite(item)}/>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View >
        <FlatList
          ListHeaderComponent={this.renderHeader}
          data={this.state.favorites}
          renderItem={this.renderItem}
          keyExtractor={item => item.title}
        />
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

