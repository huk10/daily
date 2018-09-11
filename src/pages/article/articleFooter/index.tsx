import * as React from 'react';
import { View, Text, Image, StyleSheet, Platform } from 'react-native';
import { Icon } from '../../../components/icon/index';


export interface ISectionFooterProps {
  section: any;
  loading: boolean;
}

export const SectionFooter = ( props: ISectionFooterProps ) => {
  const { section, loading } = props;
  const container = [];
  container.push( styles.section_footer );
  Platform.OS === 'ios' && container.push( { marginBottom: 60 } );
  const Footer = (
    <View style={container}>
      <Image style={styles.section_footer_thumbnail} source={{ uri: section.thumbnail || '' }}/>
      <Text style={styles.section_footer_text}>本文来自: {section.name} · 合集</Text>
      <Icon style={styles.section_footer_icon} name='info' size={16} color='white'/>
    </View>
  );

  return loading ? null : Footer;
};
const styles = StyleSheet.create( {
  section_footer: {
    marginLeft: 20,
    marginRight: 20,
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#f5f5f5'
  },
  section_footer_thumbnail: {
    width: 50,
    height: 50,
  },
  section_footer_text: {
    marginLeft: 10,
    fontSize: 14,
  },
  section_footer_icon: {
    marginLeft: 'auto',
    marginRight: 5
  },
} );
