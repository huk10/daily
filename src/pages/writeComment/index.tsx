import * as React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Platform
} from 'react-native';
import { Icon } from '../../components/icon';
import { Actions } from 'react-native-router-flux';
import { ColorConfig } from '../../config/config.color';

export class WriteComment extends React.PureComponent {
  render() {
    const defaultText = '不友善言论会被删除,深度讨论将会优先展示。';
    const headerStyle = [];
    headerStyle.push( styles.header );
    Platform.OS === 'ios' && headerStyle.push( { paddingTop: 17 } );
    return (
      <View style={styles.container}>
        <View style={headerStyle}>
          <TouchableOpacity activeOpacity={.8} onPress={Actions.pop}>
            <Icon name='return' size={18} color='white'></Icon>
          </TouchableOpacity>
          <Text style={styles.header_text}>写点评</Text>
          <Text style={styles.header_text}>发布</Text>
        </View>
        <TextInput autoFocus={true}
                   multiline={true}
                   placeholder={defaultText}
                   placeholderTextColor='#999'
                   style={styles.comment_content}/>
      </View>
    );
  }
}

const styles = StyleSheet.create( {
  container: {
    flex: 1,
  },
  header: {
    paddingRight: 20,
    paddingLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    backgroundColor: ColorConfig.header_color
  },
  header_item: {
    width: 100
  },
  header_text: {
    fontSize: 18,
    color: 'white'
  },
  comment_content: {
    flex: 1,
    marginTop: 10,
    padding: 20,
    lineHeight: 20,
    fontSize: 18
  }
} );