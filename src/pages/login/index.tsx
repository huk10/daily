import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Icon } from '../../components/icon';
import { ColorConfig } from '../../config/config.color';

export class Login extends React.PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logo_box}>
          <Text style={styles.logo_text}>知乎日报</Text>
        </View>
        <View style={styles.login_box}>
          <TouchableOpacity style={styles.zhihu_login} activeOpacity={.9}>
            <Text style={[ styles.text_color, { fontSize: 18 } ]}>知乎账号登录</Text>
          </TouchableOpacity>
          <Text style={styles.other}>或使用微博登录</Text>
          <View style={styles.other_login}>
            <TouchableOpacity activeOpacity={.9} style={styles.margin}>
              <Icon name='info' size={45} color='red'/>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={.9} style={styles.margin}>
              <Icon name='info' size={45} color='red'/>
            </TouchableOpacity>
          </View>
          <Text style={[ styles.footer_text, styles.text_color ]}>登录即代表你同意《知乎协议》</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    backgroundColor: ColorConfig.header_color_rgba( .3 )
  },
  logo_box: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo_text: {
    fontSize: 22,
    color: 'white',
  },
  login_box: {
    flex: 1,
    alignItems: 'center',
  },
  zhihu_login: {
    marginTop: 55,
    height: 45,
    width: 250,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: 'white'
  },
  text_color: {
    color: ColorConfig.header_color
  },
  footer_text: {
    marginTop: 'auto',
    marginBottom: 10,
    fontSize: 10,
  },
  other: {
    marginTop: 45,
    color: '#888'
  },
  other_login: {
    marginTop: 35,
    flexDirection: 'row',
  },
  margin: {
    margin: 10
  }
} );