import * as React from 'react';
import {
  Dimensions, StyleSheet, View, Text, FlatList, PixelRatio, Image, Modal, TouchableOpacity, Platform
} from 'react-native';
import { getNewsLongComments, getNewsShortComments } from '../../api/index';
import { Icon, MaterialCommunityIcon, FeatherIcon } from '../../components/icon';
import { util } from '../../utils';
import { observer, inject } from 'mobx-react/custom';
import { Actions } from 'react-native-router-flux';
import { ColorConfig } from '../../config/config.color';
import { getThemeStyle } from '../../Theme';

export interface ICommentState {
  short_comments: any[];
  long_comments: any[];
  short_comments_switch: boolean;
  modalVisible: boolean;
  themeStyle: any;
}

@inject( 'store' )
@observer
export class Comment extends React.Component<any, ICommentState> {
  list: any;

  constructor( props: any ) {
    super( props );
    this.state = {
      short_comments: [],
      long_comments: [],
      short_comments_switch: false,
      modalVisible: false,
      themeStyle: getThemeStyle(props.store.Store.ThemeType)
    };
    this.list = null;
  }

  componentDidMount() {
    this.getCommentsData();
  }

  async getCommentsData() {
    const { id } = this.props.navigation.state.params;
    const [ short_comments, long_comments ] = await Promise.all( [
      getNewsShortComments( id ),
      getNewsLongComments( id )
    ] );
    await this.setState( {
      short_comments: short_comments.comments,
      long_comments: long_comments.comments
    } );
  }

  openModal() {
    this.setState( {
      modalVisible: true
    } );
  }


  closeModal() {
    this.setState( {
      modalVisible: false
    } );
  }

  renderCommentsContext( item: any ) {
    const {comment_more_bg, comment_more_text} = this.state.themeStyle;

    const ReplyTo = (
      <Text style={styles.reply_to}>
        <Text>{item.reply_to ? `//${item.reply_to.author}: ` : ''}</Text>
        <Text style={styles.reply_to_content}>
          {item.reply_to ? item.reply_to.content : ''}
        </Text>
      </Text>
    );

    return (
      <TouchableOpacity activeOpacity={.8}
                        style={styles.comments_item_container}
                        onPress={() => this.openModal()}>
        <View style={styles.comments_item_left}>
          <Image style={styles.comments_item_author_pic} source={{ uri: item.avatar }}></Image>
        </View>
        <View style={styles.comments_item_right}>
          <View style={styles.comments_item_title}>
            <Text style={styles.comment_author_name}>{item.author}</Text>
            <View style={styles.comments_item_author_good}>
              <Icon name='good' size={14} color='#667'/>
              <Text style={styles.comment_item_good_count}>{item.likes}</Text>
            </View>
          </View>
          <Text style={styles.comment_item_content}>
            {item.content}
          </Text>
          {item.reply_to ? ReplyTo : null}
          <Text style={styles.comment_date}>
            {util.timestampToTime( item.time )}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  switchShowShortComments() {
    const boole = !this.state.short_comments_switch;
    this.setState( {
      short_comments_switch: boole
    } );
    if ( boole ) {
      setTimeout( () => {
        this.list.scrollToOffset( { offset: Dimensions.get( 'window' ).height - 55 - 50 - 75 } );
      }, 100 );
    } else {
      this.list.scrollToOffset( { offset: Dimensions.get( 'window' ).height - 190 } );
    }
  }

  shortCommentTitle( length: number ) {
    return (
      <TouchableOpacity style={[ styles.title_container, { borderTopColor: '#ccc' } ]}
                        activeOpacity={.8}
                        onPress={() => this.switchShowShortComments()}>
        <Text style={styles.comment_item_title_text}>{length}条短评</Text>
        <FeatherIcon
          style={styles.short_comments_title_icon}
          name={!this.state.short_comments_switch ? 'chevrons-down' : 'chevrons-up'}
          size={18} color='#aaa'/>
      </TouchableOpacity>
    );
  }

  longCommentTitle( length: number ) {
    return (
      <View style={styles.title_container}>
        <Text style={styles.comment_item_title_text}>{length}条长评</Text>
      </View>
    );
  }

  renderShortCommentContent( short_comments: any[] ) {
    return (
      <FlatList data={short_comments}
                renderItem={( { item } ) => this.renderCommentsContext( item )}
      />
    );
  }

  renderShortComments( short_comments: any[], short_comments_switch: boolean ) {
    return (
      <View>
        {this.shortCommentTitle( short_comments.length )}
        {short_comments_switch && this.renderShortCommentContent( short_comments )}
      </View>
    );
  }

  renderEmptyLongComments() {
    return (
      <View style={styles.long_comments_empty}>
        <MaterialCommunityIcon name='chair-school' size={80} color='#aaa'/>
        <Text style={styles.long_comments_empty_text}>深度长评虚位以待</Text>
      </View>
    );
  }

  renderModalContent() {
    const modalContent: any[] = [
      {
        text: '赞同',
      },
      {
        text: '举报',
      },
      {
        text: '复制',
      },
      {
        text: '回复',
      },
    ];
    return (
      <TouchableOpacity style={styles.comment_modal_container} activeOpacity={1} onPress={() => this.closeModal()}>
        <View style={styles.comment_modal}>
          {
            modalContent.map( ( item: any, index: number ) => {
              return (
                <TouchableOpacity key={index} style={styles.comment_modal_item} activeOpacity={1}>
                  <Text>{item.text}</Text>
                </TouchableOpacity>
              );
            } )
          }
        </View>
      </TouchableOpacity>
    );
  }

  renderHeader( CommentTitle: string ) {
    const headerStyle = [];
    headerStyle.push( styles.header );
    if ( Platform.OS === 'ios' ) {
      headerStyle.push( { paddingTop: 17 } );
    }
    return (
      <View style={headerStyle}>
        <Text style={styles.header_title}>{CommentTitle}</Text>
      </View>
    );
  }

  render() {
    const { long_comments, short_comments, short_comments_switch, modalVisible } = this.state;
    const count = long_comments.length + short_comments.length;
    const CommentTitle = count === 0 ? '暂无评论' : count + '条点评';
    return (
      <View style={styles.container}>
        {this.renderHeader( CommentTitle )}
        <FlatList
          data={long_comments} ref={( ref ) => this.list = ref}
          ListHeaderComponent={() => this.longCommentTitle( long_comments.length )}
          ListEmptyComponent={() => this.renderEmptyLongComments()}
          ListFooterComponent={() => this.renderShortComments( short_comments, short_comments_switch )}
          renderItem={( { item } ) => this.renderCommentsContext( item )}
        />
        <TouchableOpacity style={styles.footer} onPress={() => Actions.push( 'WriteComment' )} activeOpacity={.9}>
          <TouchableOpacity style={styles.footer_back} activeOpacity={.8} onPress={Actions.pop}>
            <Icon name='return' size={18} color='white'></Icon>
          </TouchableOpacity>
          <FeatherIcon name='edit' size={18} color='white'/>
          <Text style={styles.footer_text}>写点评</Text>
        </TouchableOpacity>
        <Modal visible={modalVisible}
               animationType='slide'
               transparent={true}
               onRequestClose={() => this.closeModal()}>
          {this.renderModalContent()}
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 55,
    backgroundColor: ColorConfig.header_color
  },
  header_title: {
    color: 'white',
    fontSize: 18
  },
  item_separator: {
    height: 1,
    backgroundColor: '#e5e5e5'
  },
  title_container: {
    paddingLeft: 20,
    paddingRight: 20,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderStyle: 'solid',
    borderBottomWidth: 1 / PixelRatio.get(),
    borderTopWidth: 1 / PixelRatio.get(),
    borderTopColor: 'transparent'
  },
  comments_item_container: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: 'white'
  },
  comments_item_author_pic: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
  },
  comments_item_left: {
    paddingTop: 15,
    width: 50,
  },
  comments_item_right: {
    flex: 1,
  },
  comments_item_title: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 35,
  },
  comment_item_title_text: {
    fontSize: 16,
    fontWeight: '500'
  },
  comment_author_name: {
    fontSize: 13,
    color: 'black'
  },
  comments_item_author_good: {
    marginLeft: 'auto',
    flexDirection: 'row',
    alignItems: 'center'
  },
  comment_item_good_count: {
    color: '#667',
    paddingLeft: 5
  },
  comment_item_content: {
    color: '#333',
    lineHeight: 20
  },
  comment_date: {
    color: '#555',
    marginTop: 5,
    fontSize: 12
  },
  reply_to: {
    marginTop: 5,
    color: 'black',
    fontSize: 13
  },
  reply_to_content: {
    color: '#444',
    lineHeight: 20
  },
  long_comments_empty: {
    height: Dimensions.get( 'window' ).height - 55 - 50 - 50 - 50 - 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  long_comments_empty_text: {
    color: '#999'
  },
  footer: {
    height: 50,
    paddingRight: 20,
    paddingLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#999'
  },
  footer_text: {
    color: 'white',
  },
  footer_back: {
    position: 'absolute',
    left: 0,
    paddingTop: 15,
    height: 50,
    width: 80,
    alignItems: 'center',
  },
  short_comments_title_icon: {
    marginLeft: 'auto'
  },
  comment_modal_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,.5)'
  },
  comment_modal: {
    paddingLeft: 20,
    paddingRight: 20,
    width: Dimensions.get( 'window' ).width - 100,
    backgroundColor: 'white',
    borderRadius: 3
  },
  comment_modal_item: {
    justifyContent: 'center',
    height: 45
  }
} );
