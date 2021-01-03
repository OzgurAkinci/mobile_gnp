import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Card, Text, Avatar, Icon} from '@ui-kitten/components';
import Spinner from 'react-native-loading-spinner-overlay';
import {ApiService} from '../service/api.service';
import {UtilFunctions} from '../util/util.functions';
import Moment from 'moment';

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
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <Spinner
          visible={this.state.loading}
          textContent={'Loading..'}
          textStyle={styles.spinnerTextStyle}
        />
        <FlatList
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
    if (index === 0) {
      return (
        <View style={{flex: 1}}>
          <TouchableOpacity
            onPress={() => {
              this.handleNavigatePostDetail(post);
            }}>
            <AccentFirst post={post} index={index} />
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View
          style={{flex: 1, borderBottomWidth: 1, borderBottomColor: '#e7e7e7'}}>
          <TouchableOpacity
            onPress={() => {
              this.handleNavigatePostDetail(post);
            }}>
            <Accent post={post} index={index} />
          </TouchableOpacity>
        </View>
      );
    }
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
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          padding: 5,
          borderBottomRightRadius: 10,
          borderTopLeftRadius: 10,
          opacity: 0.9,
          backgroundColor: '#333',
        }}>
        <Text style={styles.createdDate}>
          {Moment(post.date).format('h:mm')}
        </Text>
      </View>
    </View>
    <View style={styles.itemRight}>
      <View style={{flex: 1, paddingLeft: 10, paddingRight: 10}}>
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
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  firstView: {
    flex: 1,
    padding: 10,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#333',
    opacity: 0.8,
  },
  createdDate: {
    fontSize: 11,
    marginTop: 0,
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'OpenSans-Regular',
  },
  card: {
    flex: 1,
    borderWidth: 0.3,
  },
  itemLeft: {
    width: '30%',
  },
  itemRight: {
    width: '70%',
    padding: 5,
  },
  footerContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  footerControl: {
    marginHorizontal: 2,
  },
  firstPostImg: {
    height: 280,
    width: '100%',
    borderRadius: 0,
  },
  postImg: {
    height: '100%',
    width: 120,
    borderRadius: 10,
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
    fontFamily: 'OpenSans-Regular',
  },
  icon: {
    width: 20,
    height: 20,
  },
  text: {
    padding: 0,
    fontSize: 17,
    fontWeight: 'normal',
    fontFamily: 'CrimsonText-Bold',
  },
  firstText: {
    padding: 0,
    fontSize: 20,
    color: '#ffffff',
    fontFamily: 'CrimsonText-Bold',
  },
  firstAuthor: {
    fontSize: 11,
    marginTop: 1,
    fontWeight: 'bold',
    color: '#ffffff',
    fontFamily: 'OpenSans-Regular',
  },
  spinnerTextStyle: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});
