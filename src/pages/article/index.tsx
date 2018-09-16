import * as React from 'react';
import { StyleSheet, View, WebView, FlatList, Platform, PanResponder } from 'react-native';
import { ActicleFooterNavigatorIOS } from '../../platform/IOS_compontents/articleNavigatorIOS';
import { setArticleHtml } from './articleHtml';
import { getNewsBody, getNewsStoryExtra } from '../../api/index';
import { Loading } from '../../components/Loading';
import { SectionFooter } from './articleFooter';
import { ArticleHeader } from './articleHeader';
import { ActicleHeaderNavigatorAndroid } from '../../platform/Android_component/ActicleHeaderNavigatorAndroid';
import { observer, inject } from 'mobx-react/custom';
import { Actions } from 'react-native-router-flux';

export interface IArticleProps {
  param: any;
}


export interface IArticleState {
  height: number;
  loading: boolean;
  showHeader: boolean;
  article: any;
  storyExtra: any;
  type: string;
  id: string | number;
  afterLoading: boolean;
  getAfterconditionsIsOk: boolean;
  beforLoading: boolean;
  getBeforconditionsIsOk: boolean;
  htmlText: string;
}

@inject( 'store' )
@observer
export class Article extends React.Component<IArticleProps, IArticleState> {
  insert: string;
  webView: any;
  store: any;
  list: any;

  constructor( props: any ) {
    super( props );
    this.state = {
      height: 0,
      loading: false,
      showHeader: true,
      type: 'Home',
      storyExtra: {},
      id: '',
      afterLoading: false,
      article: {
        css: [],
        js: []
      },
      getAfterconditionsIsOk: false,
      beforLoading: false,
      getBeforconditionsIsOk: false,
      htmlText: ''
    };
    this.list = null;
    this.store = props.store.Store;
    this.insert = 'window.postMessage(JSON.stringify({type: \'setHeight\',height: document.documentElement.clientHeight}))';
    this.webView = null;
  }

  componentDidMount() {
    this.getArticleBody();
  }

  async getArticleBody() {
    const { id, type } = this.props.param;
    if ( type === 'Home' ) {
      this.store.FixActrcleList( id, { id, isRead: true } );
    } else {
      this.store.FixThemeActrcleList( id, { id, isRead: true } );
    }
    await this.getNewData( type, id );
  }

  onMessage( data: string ) {
    const action: any = JSON.parse( data );
    if ( action.type === 'setHeight' && action.height > 0 ) {
      this.setState( {
        height: action.height,
        loading: false
      } );
    }
  }

  handlerScroll( nativeEvent: any ) {
    const { contentSize, layoutMeasurement, contentOffset } = nativeEvent;
    if ( contentOffset.y - ( contentSize.height - layoutMeasurement.height ) >= 100 ) {
      if ( !this.state.beforLoading ) {
        this.setState( {
          getBeforconditionsIsOk: true,
        } );
      }

    } else if ( contentOffset.y < -100 ) {
      if ( !this.state.afterLoading ) {
        this.setState( {
          getAfterconditionsIsOk: true
        } );
      }
    }
  }

  handlerRefreshStart( ev: any ) {
    const { contentSize, layoutMeasurement, contentOffset } = ev.nativeEvent;
    const {
      getAfterconditionsIsOk,
      afterLoading,
      getBeforconditionsIsOk,
      beforLoading,
      loading
    } = this.state;

    if ( contentOffset.y < -100 && getAfterconditionsIsOk && !afterLoading && !loading && !beforLoading ) {
      this.setState( {
        getAfterconditionsIsOk: false,
        afterLoading: true,
        htmlText: '',
        height: 0
      } );
      this.handlerAfterActrcle();
    }
    const bool = contentOffset.y - ( contentSize.height - layoutMeasurement.height ) >= 100;
    if ( bool && !beforLoading && getBeforconditionsIsOk && !loading && !afterLoading ) {
      this.setState( {
        getBeforconditionsIsOk: false,
        beforLoading: true,
        htmlText: '',
        height: 0
      } );
      this.handlerRefresh();
    }
  }

  async getNewData( type: string, id: number ) {
    const [ article_body, article_storyExtra ] = await Promise.all( [
      getNewsBody( id ),
      getNewsStoryExtra( id )
    ] );

    const { css, js, body } = article_body;

    await this.setState( {
      article: article_body,
      showHeader: type === 'Home',
      storyExtra: article_storyExtra,
      type: type === 'Home' ? 'Home' : 'Other',
      id: id,
      htmlText: setArticleHtml(css, js, body, type !== 'Home')
    } );
  }

  async handlerRefresh() {
    const { type, id } = this.state;
    if ( type === 'Home' ) {
      const beforId = this.store.getBeforeActrcle( id );
      if ( beforId ) {
        await this.getNewData( type, beforId );
        this.setState( {
          beforLoading: false
        } );
      } else {
        this.setState( {
          beforLoading: false
        } );
      }
    } else {
      const beforId = this.store.getBeforThemeActrc( this.store.ThemeId, id );
      if ( beforId ) {
        await this.getNewData( type, beforId );
        this.setState( {
          beforLoading: false
        } );
      } else {
        this.setState( {
          beforLoading: false
        } );
      }
    }
  }

  async handlerAfterActrcle() {
    const { type, id } = this.state;
    if ( type === 'Home' ) {
      const AfterId = this.store.getAfterActicle( id );
      if ( AfterId ) {
        await this.getNewData( type, AfterId );
        this.setState( {
          afterLoading: false
        } );
      } else {
        await this.setState( {
          afterLoading: false
        } );
      }
    } else {
      const AfterId = this.store.getAfterThemeActrc( this.store.ThemeId, id );
      if ( AfterId ) {
        await this.getNewData( type, AfterId );
        this.setState( {
          afterLoading: false
        } );
      } else {
        await this.setState( {
          afterLoading: false
        } );
        alert( '已经是第一篇了' );
      }
    }
  }

  render() {

    const {
      article,
      height,
      loading,
      showHeader,
      storyExtra,
      htmlText,
      afterLoading,
      beforLoading
    } = this.state;

    const {title, image, image_source } = article;

    const ActicleLoading = (
      <Loading top={-180}
               visible={true}
               size={45}
               type={1}
               color='#aaa'/>
    );

    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <ActicleHeaderNavigatorAndroid context={storyExtra} id={article.id}/>
        {!article.body ? <Loading size={45} type={1} color='#aaa'/> : (
          <FlatList
            data={[ { key: '1' } ]}
            style={{ flex: 1 }}
            ListHeaderComponent={
              <ArticleHeader
                visible={showHeader}
                title={title}
                image={image}
                image_source={image_source}/>
            }
            ref={( ref: any ) => this.list = ref}
            onScroll={( event: any ) => this.handlerScroll( event.nativeEvent )}
            onScrollEndDrag={( event: any ) => this.handlerRefreshStart( event )}
            ListFooterComponent={<SectionFooter loading={true} section={article}/>}
            renderItem={() => (
              <View style={{ flex: 1, marginBottom: Platform.OS === 'ios' ? 60 : 0 }}>
                {
                  ( afterLoading || beforLoading || loading ) ? ActicleLoading : (
                    <WebView
                      automaticallyAdjustContentInsets={false}
                      javaScriptEnabled={true}
                      domStorageEnabled={true}
                      ref={( ref: any ) => this.webView = ref}
                      onLoadEnd={() => this.webView.injectJavaScript( this.insert )}
                      onMessage={( event ) => this.onMessage( event.nativeEvent.data )}
                      style={{ height }}
                      source={{ html: htmlText, baseUrl: '' }}
                    />
                  )
                }
              </View>
            )}
          />
        )}
        <ActicleFooterNavigatorIOS context={storyExtra} id={article.id}/>
      </View>
    );
  }
}

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    borderColor: 'red',
    borderWidth: 1,
    borderStyle: 'solid'
  }
} );
