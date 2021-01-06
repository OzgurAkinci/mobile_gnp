import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Linking,
  PixelRatio,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {
  Avatar,
  Divider,
  Icon,
  Text,
  TopNavigationAction,
  Button,
} from '@ui-kitten/components';
import {UtilFunctions} from './util/util.functions';
import Moment from 'moment';
import {ThemeContext} from '../theme-context';

const BackIcon = (props) => (
  <Icon
    {...props}
    style={{width: 25, height: 25}}
    fill="grey"
    name="arrow-back"
  />
);
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
        <Icon style={{width: 32, height: 32}} fill="orange" name="star" />
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

  const html_top =
    '<!DOCTYPE html>' +
    '<html><head>' +
    "<script async src='https://platform.twitter.com/widgets.js' charset='utf-8'></script>" +
    '<style>' +
    'body{font-size: 1.1em}' +
    '</style>' +
    '</head><body>';
  const html_bottom = '</body></html>';
  return (
    <SafeAreaView style={{flex: 1}}>
      {/*      <TopNavigation
        title="Game News Plus"
        alignment="center"
        accessoryLeft={BackAction}
        accessoryRight={renderSettingsAction}
      />*/}
      <Divider />
      <View style={{height: '100%', backgroundColor: '#fff', padding: 0}}>
        <View style={{padding: 10, paddingBottom: 0}}>
          {<AvatarView post={post} ba={BackAction} />}
        </View>
        <View style={{padding: 10, paddingBottom: 5}}>
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
          {/*<ScrollView>*/}
          <WebView
            scalesPageToFit={false}
            scrollEnabled={false}
            bounces={false}
            javaScriptEnabled={true}
            style={{height: 450, resizeMode: 'cover', flex: 1}}
            source={{
              html:
                html_top +
                post?.content?.rendered.replace(
                  '<div class="mace-youtube" data-mace-video',
                  '<iframe frameborder="0" style="height:100%;width:100%; left:0; right:0; position:absolute;" class="youtube" src',
                ) +
                html_bottom,
            }}
            automaticallyAdjustContentInsets={true}
          />
          {/*
          </ScrollView>
*/}
        </View>
      </View>
    </SafeAreaView>
  );
};

const AvatarView = ({post, ba}) => (
  <View
    style={{
      flexDirection: 'row',
      borderBottomColor: '#ddd',
      borderBottomWidth: 0.5,
    }}>
    <Button
      style={styles.button}
      appearance="ghost"
      status="danger"
      accessoryLeft={ba}
    />
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
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'CrimsonText-Bold',
  },
  postImg: {
    height: 110,
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
  button: {
    height: 32,
    width: 32,
  },
  avatar: {
    margin: 0,
    width: 32,
    height: 32,
  },
});
