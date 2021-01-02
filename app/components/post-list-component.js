import React, {Component} from 'react';
import {View, StyleSheet, FlatList, Image} from 'react-native';
import {Card, Text, Avatar} from '@ui-kitten/components';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';
import * as Util from '../util/Util';

export default class PostListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      page: 1,
      dataSource: [],
    };
  }

  componentDidMount() {
    this.getPosts();
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
          onEndReached={this.getPosts}
          onEndReachedThreshold={0.7}
          renderItem={({item, index}) => {
            return this._renderRow(item, index);
          }}
          keyExtractor={(item, index) => item.id + '-' + index}
        />
      </View>
    );
  }

  _renderRow(post, index) {
    return (
      <View>
        <React.Fragment>
          <Card
            style={styles.card}
            accent={(props) =>
              index === 0 ? (
                <AccentFirst {...props} post={post} index={index} />
              ) : (
                <Accent {...props} post={post} index={index} />
              )
            }
          />
        </React.Fragment>
      </View>
    );
  }

  // Functions
  getPosts = () => {
    console.log('Running => getPosts, pageNumber =>  ' + this.state.page);
    this.setState({
      loading: true,
    });
    axios
      .get(
        'https://gamenewsplus.net/wp-json/wp/v2/posts?_embed&per_page=10&page=' +
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
        console.log('Error (getPosts): ' + JSON.stringify(error));
      });
  };
}

const AccentFirst = ({post, index}) => (
  <View>
    <Image
      style={styles.firstPostImg}
      source={{
        uri: post ? post._embedded['wp:featuredmedia'][0].source_url : '',
      }}
    />
    <View
      style={{
        flex: 1,
        padding: 10,
        width: '100%',
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#111',
        opacity: 0.9,
      }}>
      <Text style={styles.firstText}>
        {Util.replaceSpecialCharacters(post.title.rendered)}
      </Text>
      {<AvatarView post={post} index={index} />}
    </View>
  </View>
);

const Accent = ({post, index}) => (
  <View style={[styles.footerContainer]}>
    <Image
      style={styles.postImg}
      source={{
        uri: post ? post._embedded['wp:featuredmedia'][0].source_url : '',
      }}
    />
    <View style={{flex: 1, padding: 10}}>
      <Text style={styles.text}>
        {Util.replaceSpecialCharacters(post.title.rendered)}
      </Text>
      {<AvatarView post={post} index={index} />}
    </View>
  </View>
);

const AvatarView = ({post, index}) => (
  <View style={{flexDirection: 'row'}}>
    <Avatar
      style={styles.avatar}
      shape="medium"
      source={
        post && post._embedded.author[0].avatar_urls['24'] !== undefined
          ? {
              uri: post._embedded.author[0].avatar_urls['24'].replace(
                '//www.gravatar.com',
                'https://www.gravatar.com',
              ),
            }
          : require('../../img/avatars/boy.jpg')
      }
    />
    <Text style={index === 0 ? styles.firstAuthor : styles.author}>
      {' ' + post._embedded.author[0].name}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flatList: {
    padding: 5,
  },
  card: {
    flex: 1,
    margin: 0,
  },
  footerContainer: {
    flexDirection: 'row',
    paddingLeft: 0,
    paddingRight: 2,
    paddingTop: 2,
    paddingBottom: 2,
  },
  footerControl: {
    marginHorizontal: 2,
  },
  firstPostImg: {
    height: 240,
    width: '100%',
  },
  postImg: {
    //height: 140,
    width: 120,
  },
  avatar: {
    margin: 0,
    width: 24,
    height: 24,
  },
  author: {
    fontSize: 11,
    marginTop: 5,
    color: '#333333',
  },
  text: {
    padding: 0,
    fontSize: 18,
    fontWeight: 'bold',
  },
  firstText: {
    padding: 0,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  firstAuthor: {
    fontSize: 11,
    marginTop: 5,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  spinnerTextStyle: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});
