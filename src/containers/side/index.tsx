import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Navigator } from './navigatior';
import { SideHeader } from './side_header';
import { Icon, MaterialCommunityIcon } from '../../components/icon';

export class Side extends React.PureComponent {
  render() {
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
            <Text style={styles.footer_item_text}>夜间</Text>
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
