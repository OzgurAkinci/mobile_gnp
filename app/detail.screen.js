import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  View,
  useWindowDimensions,
  ScrollView,
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
      <View style={{height: '100%', backgroundColor: '#fff', padding: 10}}>
        <View>{<AvatarView post={post} />}</View>
        <View>
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
        <View>
          <ScrollView style={{flex: 1}}>
            <HTML
              source={{
                html: UtilFunctions.replaceSpecialCharacters(
                  post.content.rendered,
                ),
              }}
              contentWidth={contentWidth}
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
      shape="rounded"
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
    <Text style={styles.author}>{' ' + post._embedded.author[0].name}</Text>
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
    height: 240,
    width: '100%',
    borderRadius: 3,
  },
  author: {
    fontSize: 12,
    marginTop: 3,
    fontWeight: 'bold',
    color: '#555',
  },
  avatar: {
    margin: 0,
    width: 40,
    height: 40,
  },
});
