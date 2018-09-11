import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Icon } from '../icon';
import { ColorConfig } from '../../config/config.color';

export interface INavigatorTitleProps {
  title: string;
  titleColor?: string;
  back?: boolean;
  iconSize?: number;
  iconColor?: string;
  bgColor?: string;
  fixed?: boolean;
}

export class TitleNavigator extends React.PureComponent<INavigatorTitleProps, {}> {
  render() {
    const {
      title,
      titleColor = '#333',
      back = false,
      iconSize = 18,
      iconColor = 'white',
      bgColor = ColorConfig.header_color,
      fixed = false
    } = this.props;

    const IOSStyke = Platform.OS === 'ios' ? { paddingTop: 17 } : {};

    const fixedStyle = fixed ? styles.fixed : {};

    const IconType = back ? 'return' : 'list-row';

    const Press = back ? Actions.pop : Actions.drawerOpen;

    return (
      <View style={[ styles.navigator, IOSStyke, { backgroundColor: bgColor }, fixedStyle ]}>
        <TouchableOpacity style={styles.leftButton} onPress={Press}>
          <Icon name={IconType} size={iconSize} color={iconColor}/>
        </TouchableOpacity>
        <Text style={[ styles.navigatorTitle, { color: titleColor } ]}>{title}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create( {
  navigator: {
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
  navigatorTitle: {
    fontSize: 16,
    marginRight: 'auto',
    marginLeft: 'auto',
    fontWeight: 'bold',
    color: 'white'
  },
  fixed: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 188
  }
} );
