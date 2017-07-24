import React, {component} from 'react';
import { View, ListView, StyleSheet, Text } from 'react-native';

import Row from './RowFavorites';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
});

export default class Favorites extends React.Component {
  /*
   * Removed for brevity
   */
  render() {
    return (
      <ListView
        style={styles.container}
        dataSource={this.state.dataSource}
        renderRow={(data) => <Row {...data} />}
      />
    );
  }
}

