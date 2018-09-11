import * as React from 'react';
import { Platform, FlatList, View, StyleSheet, Text, Image } from 'react-native';
import { Icon, FeatherIcon } from '../../../components/icon/index';

import { Actions } from 'react-native-router-flux';
import { ColorConfig } from '../../../config/config.color';

export class SideHeader extends React.PureComponent {
  render() {
    const nickNamePic = 'https://pic3.zhimg.com/12a3e52f5b6b384722fe1621c0215495_im.jpg';
    const IOSContainerPadding = { paddingTop: Platform.OS === 'ios' ? 17 : 5 };
    return (
      <View style={[ styles.container, IOSContainerPadding ]}>
        <View style={styles.title}>
          <Image style={styles.image} source={{ uri: nickNamePic }}/>
          <Text style={styles.nickName} onPress={Actions.Login}>请登录</Text>
        </View>
        <View style={styles.setting}>
          <View style={styles.col}>
            <Icon name='stars' size={18} color='white'/>
            <Text style={{ color: 'white', marginTop: 5 }}>收藏</Text>
          </View>
          <View style={styles.col}>
            <Icon name='info' size={18} color='white'/>
            <Text style={{ color: 'white', marginTop: 5 }}>消息</Text>
          </View>
          <View style={styles.col}>
            <FeatherIcon name='settings' size={18} color='white'/>
            <Text style={{ color: 'white', marginTop: 5 }}>设置</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create( {
  container: {
    height: 110,
    backgroundColor: ColorConfig.header_color
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
    color: 'white'
  },
  col: {
    flexDirection: 'column',
    alignItems: 'center',
  },
} );