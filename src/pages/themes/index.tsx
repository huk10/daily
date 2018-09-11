import * as React from 'react';
import { Platform, StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { getNewsThemeBody, getBefterThemeBody } from '../../api/index';
import { observer, inject } from 'mobx-react/custom';
import { Actions } from 'react-native-router-flux';
import { NavigatorTitle } from '../../containers/navigator';
import { ThemeActrcleItem } from '../../mobx/store';

// import { AppStorage } from '../../AsyncStorage';

@inject( 'store' )
@observer
class Thems extends React.Component<any, any> {
  store: any;

  constructor( props: any ) {
    super( props );
    this.state = {
      thems: {
        stories: [],
        editors: [],
      },
      befterNewsId: null
    };
    this.store = props.store.Store;
    this.getData();
  }

  getData() {
    const ThemeId = this.store.ThemeId;
    getNewsThemeBody( ThemeId ).then( res => {
      this.setState( {
        thems: res,
        title: res.name,
        befterNewsId: res.stories[ res.stories.length - 1 ].id
      } );
      const newActrcleLists: ThemeActrcleItem[ ] = [];
      res.stories.forEach( ( item: any ) => {
        newActrcleLists.push( { themeId: ThemeId, id: item.id, isRead: false } );
      } );
      this.store.appendReadThemeActrcleList( ThemeId, newActrcleLists );
    } ).catch( err => {
      console.error( err.message );
    } );
  }

  getBefterData() {
    const { thems, befterNewsId } = this.state;
    getBefterThemeBody( this.store.ThemeId, befterNewsId )
      .then( res => {
        const cloneNewList = JSON.parse( JSON.stringify( thems ) );
        res.stories.forEach( ( item: any ) => {
          cloneNewList.stories.push( item );
        } );
        this.setState( {
          thems: cloneNewList,
          befterNewsId: res.stories[ res.stories.length - 1 ].id
        } );
        // const ThemeMapId = this.store.ThemeMap.get( this.store.ThemeId ) ? this.store.ThemeMap.get( this.store.ThemeId ) : new Map();
        // res.stories.forEach( ( item: any ) => {
        //   if ( !ThemeMapId.has( item.id ) ) {
        //     ThemeMapId.set( item.id, true );
        //   }
        // } );
      } )
      .catch( err => {
        console.error( err.message );
      } );
  }

  _renderItemGap() {
    return ( <View style={styles.itemGap} ></View > );
  }

  componentWillReceiveProps() {
    this.getData();
  }

  _renderHeader( themes: any ) {
    const { description, image, editors } = themes;
    const Content = (
      <View >
        <View >
          <Image source={{ uri: image }} style={styles.backgroundImage} ></Image >
          <Text style={styles.header_text} >{description}</Text >
        </View >
        <View style={styles.themes_news_editors} >
          <Text style={styles.themes_news_editors_name} >主编 </Text >
          {
            editors.map( ( item: any, index: number ) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.themes_news_editors_pic_touch}
                  onPress={() => Actions.push( 'Editors', { param: editors } )}
                  activeOpacity={.9} >
                  <Image style={styles.themes_news_editors_pic}
                         source={{ uri: item.avatar }} />
                </TouchableOpacity >

              );
            } )
          }
        </View >
      </View >
    );
    return editors.length === 0 ? <View /> : Content;
  }

  render() {
    const { stories, name } = this.state.thems;
    this.store.ThemeId; // 取一次值用于激活 mobx 以便响应数据
    return (
      <View style={[ styles.container ]} >
        <NavigatorTitle title={name} opacity={1} />
        <FlatList
          data={stories}
          style={{ flex: 1 }}
          onEndReached={() => this.getBefterData()}
          onEndReachedThreshold={0.2}
          ListHeaderComponent={() => this._renderHeader( this.state.thems )}
          ItemSeparatorComponent={this._renderItemGap}
          renderItem={( { item }: any ) => (
            <TouchableOpacity
              style={styles.listItemContainer}
              activeOpacity={0.7}
              onPress={() => Actions.Article( { param: { 'id': item.id, type: 'Theme' } } )} >
              <Text style={styles.item} numberOfLines={3} >{item.title}</Text >
              {item.images ? <Image style={styles.image} source={{ uri: item.images[ 0 ] }} /> : null}
            </TouchableOpacity >
          )} />
      </View >
    );
  }
}

export { Thems };

const styles = StyleSheet.create( {
  container: {
    flex: 1
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
  itemGap: {
    height: 5
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
  },
  backgroundImage: {
    height: 300
  },
  header_text: {
    position: 'absolute',
    left: 20,
    right: 0,
    bottom: 20,
    fontSize: 18,
    color: 'white'
  },
  themes_news_editors: {
    height: 55,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  themes_news_editors_name: {
    color: '#666'
  },
  themes_news_editors_pic: {
    height: 32,
    width: 32,
    borderRadius: 16
  },
  themes_news_editors_pic_touch: {
    marginLeft: 10
  }
} );
