import * as React from 'react';
import {
  StyleSheet, View, Text, FlatList, TouchableOpacity, Platform, Image
} from 'react-native';
import { TitleNavigator } from '../../components/Navigator';

export class Editors extends React.PureComponent<any, {}> {
  render() {
    const IOSStyke = Platform.OS === 'ios' ? { paddingTop: 17 } : {};
    const { param = [] } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <TitleNavigator title='主编' back={true} titleColor='white'/>
        <FlatList
          data={param}
          style={{ flex: 1 }}
          renderItem={( { item, index }: any ) => {
            return (
              <View style={styles.item_container} key={index}>
                <Image style={styles.item_pic} source={{ uri: item.avatar }}></Image>
                <View style={styles.item_info}>
                  <Text style={styles.item_name}>{item.name}</Text>
                  <Text style={styles.item_doc}>{item.bio}</Text>
                </View>
              </View>
            );
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create( {
  item_container: {
    height: 60,
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center'
  },
  item_pic: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
  },
  item_info: {
    flexDirection: 'column',
    marginLeft: 10
  },
  item_name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333'
  },
  item_doc: {
    marginTop: 10,
    fontSize: 14,
    color: '#666'
  }
} );
