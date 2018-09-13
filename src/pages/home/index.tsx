import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, SectionList, Platform, Image } from 'react-native';
import { getNewsLatest, befterNews } from '../../api/index';
import { observer, inject } from 'mobx-react/custom';
import { HomeSwiper } from './swiper';
import { util } from '../../utils';
import { NavigatorTitle } from '../../containers/navigator';
import { Actions } from 'react-native-router-flux';
import { ActrcleItem } from '../../mobx/store';
import SplashScreen from 'react-native-splash-screen';
import { getThemeStyle } from '../../Theme';

export interface IHomeState {
  news: any;
  isLoading: boolean;
  opacity: number;
  isLoadingEndReached: boolean;
  befterDate: number;
  sectionList: any[];
  title: string;
}

@inject( 'store' )
@observer
export class Home extends Component<any, IHomeState> {
  store: any;

  constructor( props: any ) {
    super( props );
    this.state = {
      news: {
        date: '',
        stories: [],
        top_stories: []
      },
      isLoadingEndReached: false,
      isLoading: true,
      opacity: 0,
      befterDate: 0,
      sectionList: [],
      title: '今日热闻',
    };
    this.store = props.store.Store;
  }

  componentDidMount() {
    ( async () => {
      await this.getData();
      if ( Platform.OS === 'android' && SplashScreen ) {
        SplashScreen.hide();
      }
    } )();
  }

  async getData() {
    await this.setState( { isLoading: true } );
    try {
      const res = await getNewsLatest();
      if ( res ) {
        this.setState( {
          news: res,
          sectionList: [ { key: res.date, data: res.stories } ],
          isLoading: false,
          title: util.timeToWeek( res.date )
        } );
        this.store.setNewsDate( res.date );
        const newActrcleLists: ActrcleItem[ ] = [];

        res.stories.forEach( ( item: any ) => {
          newActrcleLists.push( { id: item.id, isRead: false } );
        } );

        this.store.appendReadActrcleList( newActrcleLists );
        this.store.appendActrcleList( newActrcleLists.map( item => item.id ) );

      }
    } catch ( err ) {
      console.error( err.message );
    }
  }

  renderSectionTitle( item: any, textStyle: any ) {
    const title = util.timeToWeek( item.section.key );
    return (
      <View style={styles.sectionTitle}>
        <Text style={textStyle}>{title}</Text>
      </View>
    );
  }

  handlerScroll( eventNative: any ) {
    const { contentSize, layoutMeasurement, contentOffset } = eventNative;


    if ( contentSize.height - layoutMeasurement.height - contentOffset.y <= 200 ) {
      if ( !this.state.isLoadingEndReached ) {
        this.handlerReached();
      }
    }


    if ( contentOffset.y > 0 ) {
      this.setState( {
        opacity: Math.floor( contentOffset.y / 220 * 100 ) / 100 - .1
      } );
    }
  }

  handlerReached() {
    const { sectionList, befterDate } = this.state;
    this.setState( {
      isLoadingEndReached: true
    } );
    befterNews( this.store.newsDate || util.dateToYMD( util.getBefterDate( -1 ) ) )
      .then( res => {
        sectionList.push( {
          key: util.dateToYMD( util.getBefterDate( befterDate + 1 ) ),
          data: res.stories
        } );
        this.setState( {
          isLoadingEndReached: false,
          befterDate: befterDate + 1
        } );
        this.store.setNewsDate( util.dateToYMD( util.getBefterDate( befterDate ) ) );
        const newActrcleLists: ActrcleItem[ ] = [];
        res.stories.forEach( ( item: any ) => {
          newActrcleLists.push( { id: item.id, isRead: false } );
        } );
        this.store.appendReadActrcleList( newActrcleLists );
        this.store.appendActrcleList( newActrcleLists.map( item => item.id ) );

      } )
      .catch( err => {
        console.error( err.message );
      } );
  }

  handlerHasIsReadActrcle( id: string | number ): boolean {
    const isReadMap = this.store.ActrcleLists;
    return isReadMap.has( id ) && isReadMap.get( id ).isRead;
  }


  render() {
    const { news, opacity, isLoading, sectionList, title } = this.state;
    const { top_stories } = news;
    const themeStyle = getThemeStyle( this.store.ThemeType );
    return (
      <View style={[ { flex: 1 }, themeStyle.mianBg ]}>
        <NavigatorTitle opacity={opacity} title={title}/>
        <SectionList
          sections={sectionList}
          refreshing={isLoading}
          keyExtractor={( { id } ) => id}
          onRefresh={() => this.getData()}
          onScroll={( event: any ) => this.handlerScroll( event.nativeEvent )}
          stickySectionHeadersEnabled={false}
          ItemSeparatorComponent={() => <View style={styles.itemGap}></View>}
          ListHeaderComponent={<HomeSwiper data={top_stories}/>}
          renderSectionHeader={( item: any ) => this.renderSectionTitle( item, themeStyle.ItemSectionTitle )}
          renderItem={( { item }: any ) => {
            const ItemContainerStyle = [ styles.listItemContainer, themeStyle.ItemContainer ];
            const ItemTextStyle = [ styles.item, themeStyle.ItemText ];
            if ( this.handlerHasIsReadActrcle( item.id ) ) {
              ItemContainerStyle.push( themeStyle.ItemOnContainer );
              ItemTextStyle.push( themeStyle.ItemOnText );
            }
            return (
              <TouchableOpacity
                style={ItemContainerStyle}
                activeOpacity={0.7}
                onPress={() => Actions.Article( { param: { 'id': item.id, type: 'Home' } } )}>
                <Text style={ItemTextStyle} numberOfLines={3}>{item.title}</Text>
                <Image style={styles.image} source={{ uri: item.images ? item.images[ 0 ] : '' }}/>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create( {
  container: {
    flex: 1
  },
  sectionTitle: {
    padding: 12,
  },
  itemGap: {
    height: 8
  },
  listItemContainer: {
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
    flex: 1,
    flexDirection: 'row',
    height: 80,
    borderRadius: 5,
    backgroundColor: 'white'
  },
  image: {
    width: 70
  },
  item: {
    marginRight: 10,
    flex: 1,
    textAlignVertical: 'auto',
    color: '#5C5C5C',
    fontSize: 15
  }
} );
