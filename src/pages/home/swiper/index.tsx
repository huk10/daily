import * as React from 'react';
import { StyleSheet, TouchableOpacity, Text, Image, View, Dimensions } from 'react-native';
// import Swiper from 'react-native-swiper';
import { Actions } from 'react-native-router-flux';
import Carousel from 'react-native-snap-carousel';

interface IHomeSwiperProps {
  data: any[];
}

export const HomeSwiper = ( props: IHomeSwiperProps ) => {
  const Press = ( item: any ) => {
    Actions.Article( { param: { 'id': item.id, type: 'Home' } } )
  }
  return (
    <View style={styles.wrapper} >
      <Carousel data={props.data}
                useScrollView={true}
                apparitionDelay={0}
                loop={true}
                layout={'default'}
                lockScrollWhileSnapping={true}
                autoplayDelay={5000}
                autoplayInterval={3000}
                autoplay={true}
                renderItem={( { item, index }: any ) => {
                  return (
                    <TouchableOpacity style={styles.clickArea} activeOpacity={1} key={index} onPress={() => Press( item )} >
                      <Image source={{ uri: item.image || '' }} style={{ flex: 1 }} ></Image >
                      <View style={styles.text_container} >
                        <Text style={styles.text} >{item.title}</Text >
                      </View >
                    </TouchableOpacity >
                  );
                }}
                sliderWidth={Dimensions.get( 'window' ).width}
                itemWidth={Dimensions.get( 'window' ).width}
      />
    </View >
  )
}

// export const HomeSwiper = ( props ) => {
//   const Press = () => {
//     Actions.Article({ param: { 'id': item.id, type: 'Home' } })
//   }
//   return (
//     <Swiper style={styles.wrapper}
//             removeClippedSubviews={false}
//             paginationStyle={styles.dot}
//             loop={true}
//             showsButtons={false}
//             autoplay={true}
//             automaticallyAdjustContentInsets={true}
//             autoplayTimeout={4}>
//       {
//         props.data.map(( item, index ) => {
//           return (
//             <TouchableOpacity style={styles.clickArea} activeOpacity={1} key={index} onPress={Press}>
//               <Image source={{ uri: item.image || '' }} style={styles.backgroundImage}></Image>
//               <Text style={styles.text}>{item.title}</Text>
//             </TouchableOpacity>
//           )
//
//         })
//       }
//     </Swiper>
//   )
// }

const styles = StyleSheet.create( {
  wrapper: {
    flex: 1,
    height: 275
  },
  backgroundImage: {
    position: 'relative',
    top: 0,
    left: 0,
    flex: 1
  },
  dot: {
    bottom: 3,
  },
  clickArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  text: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 15,
    paddingLeft: 20,
    paddingRight: 20,
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    shadowColor: 'rgba(0,0,0,.8)',
    shadowRadius: 20,
    shadowOpacity: 0.8,
  },
  text_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    backgroundColor: 'rgba(0,0,0,.3)'
  }
} )