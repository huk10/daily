import * as React from 'react';
import { Dimensions, Platform, StyleSheet, View } from 'react-native';
import Spinner from 'react-native-spinkit';
import { ColorConfig } from '../../config/config.color';

export const Loading = ( props: any ) => {
  const types = [ 'ThreeBounce', 'Circle', 'FadingCircle', 'FadingCircleAlt', 'Arc' ];
  const {
    type = Platform.OS === 'ios' ? 2 : 1,
    size = 80,
    visible = true,
    color = ColorConfig.header_color,
    top = 0,
    bottom = 0,
    height = Dimensions.get( 'window' ).height,
    left = 0,
    right = 0
  } = props;
  const Load = (
    <View style={[ styles.spinner_box, { top, bottom, left, right, height } ]} >
      <Spinner isVisible={visible}
               size={size}
               type={types[ type ]}
               color={color} />
    </View >
  );
  return visible ? Load : null;
};


const styles = StyleSheet.create( {
  spinner_box: {
    position: 'absolute',
    zIndex: 11111,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
  }
} );