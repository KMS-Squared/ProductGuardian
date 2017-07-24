
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
  },
  text: {
    marginLeft: 12,
    fontSize: 16,
    alignSelf: 'center'
  }
  addButton: {
    color: 'green',
    alignSelf: 'flex-start',
    height: 22,
    width: 22
  }
  deleteButton: {
    color: 'red',
    alignSelf: 'flex-end',
        height: 22,
    width: 22
  }
});

const Row = (props) => (
  <View style={styles.container}>
    <Button style={styles.addButton}
      onPress={addToShoppingList}
    }
    />
    <Text style={styles.text}>
      {`${props.title}`}
    </Text>
    <Button style={styles.deleteButton}
      onPress={deleteFromFavorites}
    }
    />
  </View>
);