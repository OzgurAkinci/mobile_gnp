import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  View,
  useWindowDimensions,
  ScrollView,
  Dimensions,
} from 'react-native';
import {
  Avatar,
  Divider,
  Icon,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import {UtilFunctions} from './util/util.functions';
import HTML from 'react-native-render-html';
import Moment from 'moment';

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

export const DetailScreen = ({navigation, route}) => {
  const navigateBack = () => {
    navigation.goBack();
  };
  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );
  const {post} = route.params;
  const contentWidth = useWindowDimensions().width;

  return (
    <SafeAreaView style={{flex: 1}}>
      <TopNavigation
        title="GameNewsPlus+"
        alignment="center"
        accessoryLeft={BackAction}
      />
      <Divider />
      <View style={{height: '100%', backgroundColor: '#fff', padding: 0}}>
        <View style={{padding: 15, paddingBottom: 5}}>
          {<AvatarView post={post} />}
        </View>
        <View style={{padding: 15, paddingBottom: 5}}>
          <Text style={styles.firstText}>
            {UtilFunctions.replaceSpecialCharacters(post.title.rendered)}
          </Text>
        </View>
        <View>
          <Image
            style={styles.postImg}
            source={{
              uri: post ? post._embedded['wp:featuredmedia'][0].source_url : '',
            }}
          />
        </View>
        <View style={{flex: 1, padding: 15, paddingBottom: 5}}>
          <ScrollView>
            <HTML
              tagsStyles={{
                body: {fontSize: 18},
                p: {fontSize: 18, fontWeight: 'normal'},
                strong: {fontSize: 20},
                blockquote: {fontSize: 18},
                a: {fontSize: 18, color: '#000'},
                em: {fontSize: 18},
                img: {height: 250, width: 350},
              }}
              html={post.content.rendered}
              imagesMaxWidth={Dimensions.get('window').width}
              ignoredStyles={['width', 'height', 'video']}
              onLinkPress={(evt, href) => this.onLinkPress(href)}
            />
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const AvatarView = ({post}) => (
  <View style={{flexDirection: 'row'}}>
    <Avatar
      style={styles.avatar}
      shape="round"
      source={
        post && post._embedded.author[0].avatar_urls['24'] !== undefined
          ? {
              uri: post._embedded.author[0].avatar_urls['24'].replace(
                '//www.gravatar.com',
                'https://www.gravatar.com',
              ),
            }
          : require('../img/avatars/boy.jpg')
      }
    />
    <View>
      <Text style={styles.author}>{' ' + post._embedded.author[0].name}</Text>
      <Text style={styles.createdDate}>
        {Moment(post.date).format('MMMM Do YYYY,h:mm')}
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  firstView: {
    flex: 1,
    padding: 10,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#333',
    opacity: 0.9,
  },
  firstText: {
    padding: 0,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  postImg: {
    height: 200,
    width: '100%',
    borderRadius: 3,
  },
  author: {
    fontSize: 13,
    marginTop: 3,
    fontWeight: 'bold',
    color: '#555',
  },
  createdDate: {
    fontSize: 13,
    marginTop: 3,
    color: '#999',
  },
  avatar: {
    margin: 0,
    width: 40,
    height: 40,
  },
});
