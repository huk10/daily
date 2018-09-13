import * as React from 'react';
import { FlatList, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Icon } from '../../../components/icon';
import { getNewsThemes } from '../../../api/index';
import { Actions } from 'react-native-router-flux';
import { Loading } from '../../../components/Loading';
import { observer, inject } from 'mobx-react';
import { ColorConfig } from '../../../config/config.color';
import { getThemeStyle } from '../../../Theme';

interface INavigatorState {
  themes: any[];
  currentTheme: number | null;
}

@inject( 'store' )
@observer
export class Navigator extends React.Component<any, INavigatorState> {
  store: any;

  constructor( props: any ) {
    super( props );
    this.state = {
      themes: [],
      currentTheme: props.store.Store.ThemeId,
    };
    this.store = props.store.Store;
  }

  componentDidMount() {
    getNewsThemes().then( res => {
      this.setState( {
        themes: res.others
      } );
    } );
  }

  _toHome() {
    this.store.setThemeId( null );
    this.setState( {
      currentTheme: null,
      themes: [ ...this.state.themes ]
    } );

    Actions.home();
  }

  handlerClick( id: number ) {
    this.store.setThemeId( id );
    this.setState( {
      currentTheme: id,
      themes: [ ...this.state.themes ]
    } );

    Actions.Themes();
    Actions.drawerClose();
  }

  render() {
    const { themes = [], currentTheme } = this.state;
    const themeStyle = getThemeStyle( this.store.ThemeType );

    const SideNavigatorHome = ( props: any ) => {
      const { text, onPress, style } = props;
      const itemStyle:any[] = [styles.item];
      if (style) {
        itemStyle.push(themeStyle.SideItemOnContainer);
      }
      return (
        <TouchableOpacity
          style={itemStyle}
          activeOpacity={.8}
          onPress={() => onPress()}>
          <Icon name='home' size={18} color={ColorConfig.header_color}/>
          <Text style={[ styles.itemText, styles.itemText_home]}>{text}</Text>
        </TouchableOpacity>
      );
    };

    const SideNavigatorItem = ( props: any ) => {
      const { style, onPress, text } = props;
      const itemStyle:any[] = [styles.item];
      if (style) {
        itemStyle.push(themeStyle.SideItemOnContainer);
      }
      return (
        <TouchableOpacity
          style={itemStyle}
          activeOpacity={.8}
          onPress={() => onPress()}>
          <Text style={[styles.itemText, themeStyle.SideItemText]}>{text}</Text>
          <Icon style={styles.itemIcon} name='add' size={14} color={'#999'}/>
        </TouchableOpacity>
      );
    };

    const sideBg = themeStyle.SideContainer;

    return (
      <View style={[ { flex: 1 }, sideBg ]}>
        <SideNavigatorHome
          onPress={() => this._toHome()}
          text='首页'
          style={!currentTheme}/>
        <View style={{ flex: 1 }}>
          <Loading visible={themes.length === 0}/>
          <FlatList
            data={themes}
            style={[ styles.container, sideBg ]}
            renderItem={( { item }: any ) => (
              <SideNavigatorItem
                style={currentTheme === item.id }
                text={item.name}
                onPress={() => this.handlerClick( item.id )}/>
            )}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create( {
  container: {
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
    height: 45,
    alignItems: 'center',
  },
  itemText_home: {
    marginLeft: 5,
    color: ColorConfig.header_color
  },
  itemText: {
    marginRight: 'auto',
    color: 'black'
  },
  itemIcon: {
    marginLeft: 'auto',
    marginRight: 20,
  }
} );
