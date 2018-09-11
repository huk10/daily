import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Icon } from "../../../components/icon/index";
import { ColorConfig } from "../../../config/config.color";

interface IContext {
  popularity: number;
  comments: number;
}

interface IActicleHeaderNavigatorAndroidProps {
  context: IContext;
  id: number
}

interface INavlistItem {
  icon: string;
  count?: number;
  click?: () => void;
}

interface IClickItemProps {
  item: INavlistItem;
}

export const ActicleHeaderNavigatorAndroid = ( props: IActicleHeaderNavigatorAndroidProps ) => {
  const defaultContext = {
    popularity: 0,
    comments: 0
  }
  const { context = defaultContext, id } = props;

  const Navlist: INavlistItem[] = [
    {
      icon: 'share'
    },
    {
      icon: 'stars'
    },
    {
      icon: 'comment',
      count: context.comments,
      click: () => {
        Actions.push( 'Comment', { id } )
      }
    },
    {
      icon: 'good',
      count: context.popularity,
    },
  ];

  const ClickItem = ( props: IClickItemProps ) => {
    const { item } = props;
    return (
      <TouchableOpacity activeOpacity={1} onPress={() => item.click && item.click()} >
        <View style={styles.item_container} >
          <Icon name={item.icon} size={18} color='white' />
          <Text style={styles.text} >{item.count}</Text >
        </View >
      </TouchableOpacity >
    );
  }

  const NavigatorContent = (
    <View style={styles.container} >
      <TouchableOpacity activeOpacity={.8} onPress={Actions.pop} >
        <Icon name='return' size={18} color='white' />
      </TouchableOpacity >
      <View style={styles.func} >
        {Navlist.map( ( item: INavlistItem, index: number ) => ( <ClickItem item={item} key={index} /> ) )}
      </View >
    </View >
  );
  return Platform.OS === 'android' ? NavigatorContent : null;

}

const styles = StyleSheet.create( {
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'row',
    height: 55,
    alignItems: 'center',
    backgroundColor: ColorConfig.header_color
  },
  func: {
    marginLeft: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
  },
  item_container: {
    marginLeft: 6,
    marginRight: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    marginLeft: 4,
    marginRight: 4,
  }
} )