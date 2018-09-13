import * as React from 'react';
import { StyleSheet, View, WebView, FlatList, RefreshControl, Platform, PanResponder, TouchableWithoutFeedback } from 'react-native';
import { ActicleFooterNavigatorIOS } from '../../platform/IOS_compontents/articleNavigatorIOS';
import { setArticleHtml } from './articleHtml';
import { getNewsBody, getNewsStoryExtra } from '../../api/index';
import { Loading } from '../../components/Loading';
import { SectionFooter } from './articleFooter';
import { ArticleHeader } from './articleHeader';
import { ActicleHeaderNavigatorAndroid } from '../../platform/Android_component/ActicleHeaderNavigatorAndroid';
import { observer, inject } from 'mobx-react/custom';

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
}

@inject( 'store' )
@observer
export class Article extends React.Component<IArticleProps, IArticleState> {
  insert: string;
  webView: any;
  _panResponder: any;
  store: any;
  list: any;

  constructor( props: any ) {
    super( props );
    this.state = {
      height: 0,
      loading: true,
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

    };
    this.list = null;
    this.store = props.store.Store;
    this.insert = 'window.postMessage(JSON.stringify({type: \'setHeight\',height: document.documentElement.clientHeight}))';
    this.webView = null;
    this._panResponder = PanResponder.create( {
      // 要求成为响应者：
      onStartShouldSetPanResponder: ( evt, gestureState ) => true,
      onStartShouldSetPanResponderCapture: ( evt, gestureState ) => true,
      onMoveShouldSetPanResponder: ( evt, gestureState ) => true,
      onMoveShouldSetPanResponderCapture: ( evt, gestureState ) => true,

      onPanResponderGrant: ( evt, gestureState ) => {
        // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！

        console.warn( gestureState );

        // gestureState.{x,y} 现在会被设置为0
      },
      onPanResponderMove: ( evt, gestureState ) => {
        // 最近一次的移动距离为gestureState.move{X,Y}
        console.warn( gestureState );

        // 从成为响应者开始时的累计手势移动距离为gestureState.d{x,y}
      },
      onPanResponderTerminationRequest: ( evt, gestureState ) => true,
      onPanResponderRelease: ( evt, gestureState ) => {
        // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
        console.warn( 'over ==== get' );
        // 一般来说这意味着一个手势操作已经成功完成。
      },
      onPanResponderTerminate: ( evt, gestureState ) => {
        // 另一个组件已经成为了新的响应者，所以当前手势将被取消。
      },
      onShouldBlockNativeResponder: ( evt, gestureState ) => {
        // 返回一个布尔值，决定当前组件是否应该阻止原生组件成为JS响应者
        // 默认返回true。目前暂时只支持android。
        return true;
      },
    } );
  }

  componentDidMount() {
    this.getArticleBody();
  }

  getArticleBody() {
    const { id, type } = this.props.param;
    if ( type === 'Home' ) {
      this.store.FixActrcleList( id, { id, isRead: true } );
    } else {
      this.store.FixThemeActrcleList( id, { id, isRead: true } );
    }
    this.getNewData( type, id );
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
    const { getAfterconditionsIsOk, afterLoading, getBeforconditionsIsOk, beforLoading } = this.state;
    if ( contentOffset.y < -100 && getAfterconditionsIsOk && !afterLoading ) {
      this.setState( {
        getAfterconditionsIsOk: false,
        afterLoading: true
      } );
      this.handlerAfterActrcle();
    }
    const bool = contentOffset.y - ( contentSize.height - layoutMeasurement.height ) >= 100;
    if ( bool && !beforLoading && getBeforconditionsIsOk ) {
      this.setState( {
        getBeforconditionsIsOk: false,
        beforLoading: true
      } );
      this.handlerRefresh();
    }
  }

  async getNewData( type: string, id: number ) {
    const [ article_body, article_storyExtra ] = await Promise.all( [
      getNewsBody( id ),
      getNewsStoryExtra( id )
    ] );
    await this.setState( {
      article: article_body,
      showHeader: type === 'Home',
      storyExtra: article_storyExtra,
      type: type === 'Home' ? 'Home' : 'Other',
      id: id
    } );
  }

  async handlerRefresh() {
    const { type, id } = this.state;
    if ( type === 'Home' ) {
      const beforId = this.store.getBeforeActrcle( id );
      if ( beforId ) {
        await this.getNewData( type, beforId );
      }
    } else {
      const beforId = this.store.getBeforThemeActrc( id );
      console.log( beforId );
      if ( beforId ) {
        await this.getNewData( type, beforId );
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
        alert( '已经是第一篇了' );
      }
    } else {
      const AfterId = this.store.getAfterThemeActrc( id );
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

    const { article, height, loading, showHeader, storyExtra, afterLoading } = this.state;

    const { css, js, body, title, image, image_source } = article;

    const htmlText = setArticleHtml( css, js, body );

    // {...this._panResponder.panHandlers}
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
              <View style={{ flex: 1, marginBottom: 60 }}>
                <Loading
                  top={-180}
                  visible={loading}
                  size={45}
                  type={1}
                  color='#aaa'/>
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
