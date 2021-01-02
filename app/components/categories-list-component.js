import React, {Component} from 'react';
import {View, StyleSheet, FlatList, TouchableHighlight} from 'react-native';
import {Card, Text, Layout, Icon} from '@ui-kitten/components';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';

export default class CategoriesListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      page: 1,
      dataSource: [],
      themes_: ['primary', 'success', 'info', 'warning', 'danger', 'basic'],
    };
  }

  componentDidMount() {
    this.getCategories();
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Spinner
          visible={this.state.loading}
          textContent={'Loading..'}
          textStyle={styles.spinnerTextStyle}
        />
        <FlatList
          style={styles.flatList}
          data={this.state.dataSource}
          numColumns={2}
          onEndReached={this.getCategories}
          onEndReachedThreshold={0.7}
          renderItem={({item}) => {
            return this._renderRow(item);
          }}
          keyExtractor={(item, index) => item.id + '-' + index}
        />
      </View>
    );
  }

  _renderRow(category) {
    return (
      <Card
        style={styles.card}
        status={this.state.themes_[this.getRndInteger(0, 5)]}>
        <TouchableHighlight
          onPress={() => {
            console.log('ID: ' + category.id);
          }}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Icon style={styles.icon} fill="#333" name="star" />
            <Text style={styles.text}>{_renderPostText(category.name)}</Text>
          </View>
        </TouchableHighlight>
      </Card>
    );
  }

  // Functions
  getCategories = () => {
    console.log('Running => getCategories');
    this.setState({
      loading: true,
    });
    axios
      .get(
        'https://gamenewsplus.net/wp-json/wp/v2/categories?per_page=20&page=' +
          this.state.page,
      )
      .then((response) => {
        this.setState({
          dataSource: this.state.dataSource.concat(response.data),
          page: this.state.page + 1,
          loading: false,
        });
      })
      .catch((error) => {
        this.setState({
          loading: false,
        });
        console.log('Error (getCategories): ' + JSON.stringify(error));
      });
  };

  getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
}

const _renderPostText = (text) => {
  if (text) {
    return <Text style={{fontFamily: null}}>{text}</Text>;
  } else {
    return <View />;
  }
};

const styles = StyleSheet.create({
  flatList: {
    padding: 15,
  },
  text: {
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
  },
  spinnerTextStyle: {
    color: '#fff',
    fontWeight: 'bold',
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: '100%',
  },
  card: {
    margin: 2,
    width: '50%',
  },
  icon: {
    width: 32,
    height: 32,
  },
});
