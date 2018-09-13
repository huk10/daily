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
import {observer,inject} from 'mobx-react';
import { getThemeStyle } from '../../Theme';

interface INavigatorTitleProps {
  opacity?: number;
  title: string;
  store?: any;
}

@inject( 'store' )
@observer
export class NavigatorTitle extends React.Component <INavigatorTitleProps ,{}> {
  render () {
    const { opacity = 1, title } = this.props;
    const container: any[] = [styles.Navigator];
    const store = this.props.store.Store;
    const themeStyle = getThemeStyle(store.ThemeType);
    if (store.ThemeType === 'night') {
      container.push(themeStyle.home_header_bg);
    } else if (Platform.OS === 'ios') {
      container.push( {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 188,
        paddingTop: 17,
        backgroundColor: `rgba(0,162,237,${opacity})`
      } );
    } else {
      container.push(themeStyle.home_header_bg);
    }
    return (
      <View style={container} >
        <TouchableOpacity style={styles.leftButton} onPress={Actions.drawerOpen} >
          <Icon name='list-row' size={18} color='white' />
        </TouchableOpacity >
        <Text style={styles.IosNavigatorTitle} >{title}</Text >
      </View >
    );
  }
}

const styles = StyleSheet.create( {
  Navigator: {
    flexDirection: 'row',
    alignItems: 'center',
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
