import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Router, Stack, Scene, Drawer } from 'react-native-router-flux';
import { Home } from '../pages/home';
import { Login } from '../pages/login';
import { Article } from '../pages/article';
import { Comment } from '../pages/comment';
import { Thems } from '../pages/themes';
import { WriteComment } from '../pages/writeComment';
import { Editors } from '../pages/editors';
import { Side } from '../containers/side';
import { Icon } from '../components/icon';

export class Route extends React.Component {
  render() {
    return (
      <Router >
        <Stack key='Root' hideNavBar={true} >
          <Drawer key='home_drawer'
                  hideNavBar={true}
                  drawerIcon={() => ( <Icon name='list-row' size={18} color='white' style={styles.leftButton} /> )}
                  contentComponent={Side}
                  drawerWidth={300}
                  drawerPosition={'left'} >
            <Scene initial hideNavBar={true} component={Home} key='home' />
            <Scene hideNavBar={true} component={Thems} key='Themes' />
          </Drawer >
          <Scene component={Editors} key='Editors' />
          <Scene component={Article} hideNavBar={true} key='Article' />
          <Scene component={Comment} hideNavBar={true} key='Comment' />
          <Scene component={WriteComment} hideNavBar={true} key='WriteComment' />
          <Scene component={Login} hideNavBar={false} back={true} key='Login' title='登录' />
        </Stack >
      </Router >
    );
  }
}

const styles = StyleSheet.create( {
  leftButton: {
    marginLeft: 8,
    height: 50,
    width: 50
  }
} );
