import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  View,
  useWindowDimensions,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Linking,
  PixelRatio,
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
import HTML, {domNodeToHTMLString} from 'react-native-render-html';
import Moment from 'moment';
import {ThemeContext} from '../theme-context';
import HTMLView from 'react-native-htmlview';

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;
const IMAGES_MAX_WIDTH = Dimensions.get('window').width - 50;
const CUSTOM_STYLES = {};
const CUSTOM_RENDERERS = {};
const DEFAULT_PROPS = {
  htmlStyles: CUSTOM_STYLES,
  renderers: CUSTOM_RENDERERS,
  imagesMaxWidth: IMAGES_MAX_WIDTH,
  computeEmbeddedMaxWidth(contentWidth) {
    return contentWidth - 40;
  },
  onLinkPress(evt, href) {
    Linking.openURL(href);
  },
  debug: true,
};

export const DetailScreen = ({navigation, route}) => {
  const themeContext = React.useContext(ThemeContext);
  const navigateBack = () => {
    navigation.goBack();
  };
  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );
  const {post} = route.params;

  const renderSettingsAction = () => (
    <TouchableOpacity onPress={themeContext.toggleTheme} activeOpacity={0.5}>
      <Text>
        <Icon style={{width: 32, height: 32}} fill="orange" name="moon" />
      </Text>
    </TouchableOpacity>
  );

  function renderNode(node, index, siblings, parent, defaultRenderer) {
    if (node.name === 'img') {
      const {src, height} = node.attribs;
      const imageHeight = height || 300;
      return (
        <Image
          key={index}
          style={{
            width: Dimensions.get('window') * PixelRatio.get(),
            height: imageHeight * PixelRatio.get(),
          }}
          source={{uri: src}}
        />
      );
    } else if (node.name === 'img') {
      const a = node.attribs;

      return (
        <Image
          key={index}
          source={{uri: a.src}}
          //resizeMode={'stretch'}
          style={{
            flex: 1,
            width: Dimensions.get('window').width,
            height: 200,
          }}
        />
      );
    }
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <TopNavigation
        title="Game News Plus"
        alignment="center"
        accessoryLeft={BackAction}
        accessoryRight={renderSettingsAction}
      />
      <Divider />
      <View style={{height: '100%', backgroundColor: '#fff', padding: 0}}>
        <View style={{padding: 15, paddingBottom: 0}}>
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
          <ScrollView style={{flex: 1}}>
            <HTML
              {...DEFAULT_PROPS}
              source={{html: post?.content?.rendered.replace(/<(\/)?p>/g, '')}}
              //source={{html: post?.content?.rendered}}
              contentWidth={useWindowDimensions.width}
              baseFontStyle={{fontSize: 16}}
            />
            {/*            <HTMLView
              renderNode={renderNode}
              value={post?.content?.rendered.replace(/<(\/)?p>/g, '')}
              stylesheet={styles}
            />*/}
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
  firstText: {
    padding: 0,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'CrimsonText-Bold',
  },
  postImg: {
    height: 150,
    width: '100%',
    borderRadius: 0,
  },
  author: {
    fontSize: 13,
    marginTop: 0,
    fontWeight: 'bold',
    color: '#555',
  },
  createdDate: {
    fontSize: 13,
    marginTop: 0,
    color: '#999',
  },
  avatar: {
    margin: 0,
    width: 32,
    height: 32,
  },
});
