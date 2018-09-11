import * as React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export interface IArticleHeaderProps {
  visible: boolean;
  image: string;
  title: string;
  image_source: string;
}

export const ArticleHeader = ( props: IArticleHeaderProps ) => {
  const { visible = true, image, title = '', image_source = '' } = props;
  const DOM = (
    <View style={styles.article_image}>
      <Image style={styles.image} source={{ uri: image  }}/>
      <View style={styles.text_container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.image_source}>{image_source}</Text>
      </View>
    </View>
  );
  return visible ? DOM : null;
};

const styles = StyleSheet.create( {
  title: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  image_source: {
    position: 'absolute',
    right: 15,
    bottom: 5,
    color: '#eaeaea',
    fontSize: 12,
  },
  article_image: {
    height: 270,
  },
  image: {
    position: 'relative',
    top: 0,
    left: 0,
    flex: 1
  },
  text_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    backgroundColor: 'rgba(0,0,0,.3)'
  }
} );