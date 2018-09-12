import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Navigator } from './navigatior';
import { SideHeader } from './side_header';
import { Icon, MaterialCommunityIcon } from '../../components/icon';
import { observer, inject } from 'mobx-react';


@inject( 'store' )
@observer
export class Side extends React.Component<any, any> {
  store: any;

  constructor( props: any ) {
    super( props );
    this.state = {
      themeText: '夜间'
    };
    this.store = props.store.Store;
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
    return (
      <View style={styles.container}>
        <SideHeader/>
        <Navigator/>
        <View style={styles.footer}>
          <View style={styles.footer_item}>
            <Icon name='download' size={18} color='#666'></Icon>
            <Text style={styles.footer_item_text}>离线</Text>
          </View>
          <View style={styles.footer_item}>
            {/*white-balance-sunny*/}
            <MaterialCommunityIcon name='weather-night' size={18} color='#666'/>
            <Text style={styles.footer_item_text} onPress={() => this.handlerSetThemeType()}>{themeText}</Text>
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
