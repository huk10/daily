import { observable, action, computed } from 'mobx';
import { AppStorage } from '../AsyncStorage';

export interface ActrcleItem {
  id: number;
  isRead: boolean;
}

export interface ThemeActrcleItem {
  themeId: number;
  isRead: boolean;
  id: number;
}


class MyStore {
  // 主题id 用于获取数据
  @observable ThemeId: number | null;

  // 首页日报的日期, 用于回溯前一天的日报
  @observable newsDate: number | string;

  // 用于记录阅读记录
  @observable ActrcleLists: Map<number | string, ActrcleItem>;
  @observable ThemeActrcles: Map<number | string, Map<number | string, ThemeActrcleItem>>;

  // 用于 快速切换上下文章
  @observable ThemeList: Map<number | string, string[] | number[]>;
  @observable ActrcleList: string[] | number[];

  constructor() {
    this.newsDate = 0;
    this.ThemeId = null;
    this.ActrcleLists = new Map();
    this.ThemeActrcles = new Map();
    this.ThemeList = new Map();
    this.ActrcleList = [];

    AppStorage.getData( 'ReadActionList' ).then( res => {
      if ( res ) {
        this.ActrcleLists = new Map( JSON.parse( res ) );
      }
    } );

    AppStorage.getData( 'ThemeActrcles' ).then( res => {
      if ( res ) {
        this.ThemeActrcles = new Map( JSON.parse( res ) );
      }
    } );
  }

  // 添加阅读记录
  @action appendReadActrcleList( list: ActrcleItem[] ) {
    list.forEach( item => {
      if ( !this.ActrcleLists.has( item.id ) ) {
        this.ActrcleLists.set( item.id, item );
      }
    } );
    AppStorage.setData( 'ReadActionList', this.ActrcleLists );
  }

  // 修改阅读记录
  @action FixActrcleList( key: string | number, value: ActrcleItem ) {
    if ( this.ActrcleLists.has( key ) ) {
      this.ActrcleLists.set( key, value );
    }
    AppStorage.setData( 'ReadActionList', this.ActrcleLists );
  }

  // 添加主题日报阅读记录
  @action appendReadThemeActrcleList( themeId: string | number, list: ThemeActrcleItem[] ) {
    list.forEach( item => {
      if ( this.ThemeActrcles.has( themeId ) ) {
        const Themes = this.ThemeActrcles.get( themeId );
        if ( Themes && Themes.has( item.id ) ) {
          Themes.set( item.id, item );
        }
      } else {
        this.ThemeActrcles.set( themeId, new Map().set( item.id, item ) );
      }
    } );
    AppStorage.setData( 'ThemeActrcles', this.ThemeActrcles );
  }

  // 修改主题日报阅读记录
  @action FixThemeActrcleList( ThemeId: string | number, key: string | number, value: ThemeActrcleItem ) {
    if ( this.ThemeActrcles.has( ThemeId ) ) {
      const Themes = this.ThemeActrcles.get( ThemeId );
      if ( Themes && Themes.has( key ) ) {
        Themes.set( key, value );
      }
    } else {
      this.ThemeActrcles.set( ThemeId, new Map().set( key, value ) );
    }
    AppStorage.setData( 'ThemeActrcles', this.ThemeActrcles );
  }

  // 设置主题id
  @action setThemeId( conut: number ) {
    this.ThemeId = conut;
  }

  // 设置一个新的日期
  @action setNewsDate( date: number | string ) {
    this.newsDate = date;
  }

  // 添加日报列表
  @action appendActrcleList( item: string[] | number[] ) {
    const has = this.ActrcleList.find( value => value === item );
    if ( !has ) {
      this.ActrcleList.push( item );
    }
  }

  // 获取下一篇 日报
  @action getAfterActicle( id: string | number ): number | null {
    const index = this.ActrcleList.indexOf( id );
    if ( index !== -1 ) {
      return index >= 0 ? index - 1 : null;
    } else {
      return null;
    }
  }

  // 获取上一篇日报
  @action getBeforeActrcle( id: string | number ): number {
    const index = this.ActrcleList.indexOf( id );
    if ( index !== -1 ) {
      let len = this.ActrcleList.length;
      return index <= len ? index + 1 : null;
    } else {
      return null;
    }
  }

  // 添加主题日报列表
  @action appendThemeActrcleList( themeId: string | number, item: string | number ) {
    if ( this.ThemeList.has( themeId ) ) {
      const Theme = this.ThemeList.get( themeId );
      const has = Theme.find( value => value === item );
      if ( !has ) {
        Theme.push( item );
      }
    } else {
      this.ThemeList.set( themeId, [ item ] );
    }
  }
}

const Store = new MyStore();

export { Store };

