import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Card, Text, Avatar} from '@ui-kitten/components';
import Spinner from 'react-native-loading-spinner-overlay';
import {ApiService} from '../service/api.service';
import {UtilFunctions} from '../util/util.functions';

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

  handleNavigatePostDetail = (id) => {
    this.props.navigatePostDetail?.(id);
  };

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
                <TouchableOpacity
                  onPress={() => {
                    this.handleNavigatePostDetail(post);
                  }}>
                  <Accent {...props} post={post} index={index} />
                </TouchableOpacity>
              )
            }
          />
        </React.Fragment>
      </View>
    );
  }

  // Functions
  getPosts = () => {
    this.setState({
      loading: true,
    });
    ApiService.getPosts(this.state.page)
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
    <View style={styles.firstView}>
      <Text style={styles.firstText}>
        {UtilFunctions.replaceSpecialCharacters(post.title.rendered)}
      </Text>
      {<AvatarView post={post} index={index} />}
    </View>
  </View>
);

const Accent = ({post, index}) => (
  <View style={[styles.footerContainer]}>
    <View style={styles.itemLeft}>
      <Image
        style={styles.postImg}
        source={{
          uri: post ? post._embedded['wp:featuredmedia'][0].source_url : '',
        }}
      />
    </View>
    <View style={styles.itemRight}>
      <View style={{flex: 1, padding: 10}}>
        <Text style={styles.text}>
          {UtilFunctions.replaceSpecialCharacters(post.title.rendered)}
        </Text>
        {<AvatarView post={post} index={index} />}
      </View>
    </View>
  </View>
);

const AvatarView = ({post, index}) => (
  <View style={{flexDirection: 'row'}}>
    <Avatar
      style={styles.avatar}
      shape="square"
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
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  flatList: {
    padding: 2,
  },
  firstView: {
    flex: 1,
    padding: 10,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#333',
    opacity: 0.9,
  },
  card: {
    flex: 1,
    margin: 0,
    borderWidth: 0.3,
  },
  itemLeft: {
    width: '30%',
  },
  itemRight: {
    width: '70%',
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
    borderRadius: 3,
  },
  postImg: {
    height: '100%',
    width: 120,
    borderRadius: 3,
  },
  avatar: {
    margin: 0,
    width: 20,
    height: 20,
    borderRadius: 3,
  },
  author: {
    fontSize: 11,
    marginTop: 3,
    color: '#777',
  },
  text: {
    padding: 0,
    fontSize: 16,
    fontWeight: 'bold',
  },
  firstText: {
    padding: 0,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  firstAuthor: {
    fontSize: 11,
    marginTop: 3,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  spinnerTextStyle: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});
