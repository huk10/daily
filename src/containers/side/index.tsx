import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Navigator } from './navigatior';
import { SideHeader } from './side_header';
import { Icon, MaterialCommunityIcon } from '../../components/icon';
import { observer, inject } from 'mobx-react';
import { getThemeStyle } from '../../Theme';


@inject( 'store' )
@observer
export class Side extends React.Component<any, any> {
  store: any;

  constructor( props: any ) {
    super( props );
    this.store = props.store.Store;
    this.state = {
      themeText: this.store.ThemeType === 'night' ? '白天' : '夜间'
    };
  }


  handlerSetThemeType() {
    const { themeText } = this.state;

    if ( themeText === '夜间' ) {
      this.store.setThemeType( 'night' );
      this.setState( {
        themeText: '白天'
      } );
    } else {
      this.store.setThemeType( 'daytime' );
      this.setState( {
        themeText: '夜间'
      } );
    }
  }

  render() {
    const { themeText } = this.state;
    const { ThemeType } = this.store;
    const IconType = ThemeType === 'night' ? 'white-balance-sunny' : 'weather-night';
    const themeStyle = getThemeStyle( ThemeType );
    return (
      <View style={styles.container}>
        <SideHeader/>
        <Navigator/>
        <View style={[ styles.footer, themeStyle.Side_footer_container ]}>
          <View style={styles.footer_item}>
            <Icon name='download' size={18}
                  color={ThemeType === 'night' ? 'white' : '#666'}></Icon>
            <Text style={[ styles.footer_item_text, themeStyle.Side_footer_text ]}>离线</Text>
          </View>
          <View style={styles.footer_item}>
            <MaterialCommunityIcon
              name={IconType}
              size={18}
              color={ThemeType === 'night' ? 'white' : '#666'}/>
            <Text style={[ styles.footer_item_text, themeStyle.Side_footer_text ]}
                  onPress={() => this.handlerSetThemeType()}>
              {themeText}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create( {
  container: {
    flex: 1
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 55
  },
  footer_item: {
    flexDirection: 'row',
  },
  footer_item_text: {
    marginLeft: 5,
    marginRight: 5
  }
} );
