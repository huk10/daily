import * as React from 'react';
import { Platform, FlatList, View, StyleSheet, Text, Image } from 'react-native';
import { Icon, FeatherIcon } from '../../../components/icon/index';

import { Actions } from 'react-native-router-flux';
import { getThemeStyle } from '../../../Theme';
import { observer, inject } from 'mobx-react';

@inject( 'store' )
@observer
export class SideHeader extends React.Component<any, {}> {
  render() {
    const themeStyle = getThemeStyle( this.props.store.Store.ThemeType );

    const nickNamePic = 'https://pic3.zhimg.com/12a3e52f5b6b384722fe1621c0215495_im.jpg';
    const containerStyle = [ styles.container, { paddingTop: Platform.OS === 'ios' ? 17 : 5 } ];

    containerStyle.push( themeStyle.SideHeaderContainer );
    const textStyle = [ { marginTop: 5 }, themeStyle.SideHeaderText ];

    return (
      <View style={containerStyle}>
        <View style={styles.title}>
          <Image style={styles.image} source={{ uri: nickNamePic }}/>
          <Text style={[ styles.nickName, themeStyle.SideHeaderText ]} onPress={Actions.Login}>请登录</Text>
        </View>
        <View style={styles.setting}>
          <View style={styles.col}>
            <Icon name='stars' size={18} color='white'/>
            <Text style={textStyle}>收藏</Text>
          </View>
          <View style={styles.col}>
            <Icon name='info' size={18} color='white'/>
            <Text style={textStyle}>消息</Text>
          </View>
          <View style={styles.col}>
            <FeatherIcon name='settings' size={18} color='white'/>
            <Text style={textStyle}>设置</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create( {
  container: {
    height: 110,
  },
  title: {
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
  },
  setting: {
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
  },
  image: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
  },
  nickName: {
    marginLeft: 15,
    fontSize: 16,
  },
  col: {
    flexDirection: 'column',
    alignItems: 'center',
  },
} );