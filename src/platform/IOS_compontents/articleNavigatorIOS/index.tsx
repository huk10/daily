import * as React from 'react';
import { Dimensions, StyleSheet, View, Text, TouchableOpacity, Platform ,PixelRatio} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Icon } from '../../../components/icon/index';
import { ColorConfig } from '../../../config/config.color';


interface IActicleFooterNavigatorIOSPropsContext {
  popularity: number;
  comments: number;
}

interface IActicleFooterNavigatorIOSProps {
  context: IActicleFooterNavigatorIOSPropsContext;
  id: number;
}

interface INavigatorClickItem {
  icon: string;
  count?: number;
  textStyle?: any;
  click?: () => void;
}

interface IClickItemProps {
  item: INavigatorClickItem;
}


export const ActicleFooterNavigatorIOS = ( props: IActicleFooterNavigatorIOSProps ) => {

  const defaultContext = {
    popularity: 0,
    comments: 0
  };

  const { context = defaultContext, id } = props;

  const Navlist: INavigatorClickItem[] = [
    {
      icon: 'return',
      click: () => {
        Actions.pop();
      }
    },
    {
      icon: 'stars'
    },
    {
      icon: 'good',
      count: context.popularity,
      textStyle: styles.good
    },
    {
      icon: 'share'
    },
    {
      icon: 'comment',
      count: context.comments,
      textStyle: styles.comment,
      click: () => {
        Actions.push( 'Comment', { id } );
      }
    },
  ];

  const ClickItem = ( props: IClickItemProps ) => {
    const { item } = props;
    return (
      <TouchableOpacity activeOpacity={1} onPress={() => item.click && item.click()} >
        <View >
          <Text style={[ styles.text, item.textStyle ]} >
            {item.count}
          </Text >
          <Icon name={item.icon} size={18} color='#666' />
        </View >
      </TouchableOpacity >
    );
  };

  const NavigatorIOS = (
    <View style={styles.container} >
      {
        Navlist.map( ( item: INavigatorClickItem, index: number ) => {
          return ( <ClickItem item={item} key={index} /> );
        } )
      }
    </View >
  );
  return Platform.OS === 'ios' ? NavigatorIOS : null;
};

const styles = StyleSheet.create( {
  container: {
    position: 'absolute',
    top: Dimensions.get( 'window' ).height - 55,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 12345,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 55,
    backgroundColor: 'white',
    borderTopWidth: 1 / PixelRatio.get(),
    borderColor: 'gray',
    borderStyle: 'solid'
  },
  good: {
    left: 4,
  },
  text: {
    position: 'relative',
    top: 5,
    marginLeft: 12,
    fontSize: 10,
  },
  comment: {
    paddingBottom: 1,
    paddingLeft: 5,
    paddingRight: 5,
    color: 'white',
    backgroundColor: ColorConfig.header_color
  }
} );
