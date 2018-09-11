import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Icon } from "../../components/icon";
import { ColorConfig } from "../../config/config.color";


interface INavigatorTitleProps {
  opacity?: number;
  title: string;
}

export const NavigatorTitle = ( props: INavigatorTitleProps ) => {
  const { opacity = 1, title } = props;
  const container: any[] = [];
  container.push( styles.Navigator );
  Platform.OS === 'ios' && container.push( {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 188,
    paddingTop: 17,
    backgroundColor: ColorConfig.header_color_rgba( opacity )
  } )
  return (
    <View style={container} >
      <TouchableOpacity style={styles.leftButton} onPress={Actions.drawerOpen} >
        <Icon name='list-row' size={18} color='white' />
      </TouchableOpacity >
      <Text style={styles.IosNavigatorTitle} >{title}</Text >
    </View >
  )
}

const styles = StyleSheet.create( {
  Navigator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: ColorConfig.header_color,
    height: 55
  },
  leftButton: {
    position: 'relative',
    left: 15,
    alignItems: 'center',
  },
  IosNavigatorTitle: {
    fontSize: 16,
    marginRight: 'auto',
    marginLeft: 'auto',
    fontWeight: 'bold',
    color: 'white'
  }
} );