import { observable, action, computed } from 'mobx';
import { AppStorage } from '../AsyncStorage';

export interface ActrcleItem {
  id: number;
  isRead: boolean;
}



class MyStore {
  // 主题id 用于获取数据
  @observable ThemeId: number ;

  // 首页日报的日期, 用于回溯前一天的日报
  @observable newsDate: number | string;

  // 用于记录阅读记录
  @observable ActrcleLists: Map<number | string, ActrcleItem>;
  @observable ThemeActrcles: Map<number | string, Map<number | string, ActrcleItem>>;

  // 用于 快速切换上下文章
  @observable ThemeList: Map<number | string, number[]>;
  @observable ActrcleList: number[];

  @observable ThemeType: 'night' | 'daytime';


  constructor() {
    this.newsDate = 0;
    this.ThemeId = 0;
    this.ActrcleLists = new Map();
    this.ThemeActrcles = new Map();
    this.ThemeList = new Map();
    this.ActrcleList = [];

    this.ThemeType = 'daytime';

    AppStorage.getData( 'ThemeType' ).then( res => {
      if ( res && res.match( 'night' ) ) {
        this.ThemeType = 'night';
      } else {
        this.ThemeType = 'daytime';
      }
    } );

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

  // 设置 主题颜色

  @action setThemeType( type: 'night' | 'daytime' ) {
    this.ThemeType = type;
    AppStorage.setData( 'ThemeType', type );
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
  @action appendReadThemeActrcleList( themeId: string | number, list: ActrcleItem[] ) {
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
  @action FixThemeActrcleList( key: string | number, value: ActrcleItem ) {
    if ( this.ThemeActrcles.has( this.ThemeId ) ) {
      const Themes = this.ThemeActrcles.get( this.ThemeId );
      if ( Themes && Themes.has( key ) ) {
        Themes.set( key, value );
      }
    } else {
      this.ThemeActrcles.set( this.ThemeId, new Map().set( key, value ) );
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
  @action appendActrcleList( list: number[] ) {
    list.forEach( ( item: number ) => {
      if ( !this.ActrcleList.find( ( val: number ) => val === item ) ) {
        this.ActrcleList.push( item );
      }
    } );
  }

  // 获取下一篇 日报
  @action getAfterActicle( id: number ): number | null {
    const index = this.ActrcleList.indexOf( id );
    if ( index !== -1 ) {
      return index >= 0 ? this.ActrcleList[index - 1] : null;
    } else {
      return null;
    }
  }

  // 获取上一篇日报
  @action getBeforeActrcle( id: number ): number | null {
    const index: number = this.ActrcleList.indexOf( id );
    if ( index !== -1 ) {
      const len = this.ActrcleList.length;
      return index <= len ? this.ActrcleList[index + 1] : null;
    } else {
      return null;
    }
  }

  // 添加主题日报列表
  @action appendThemeActrcleList( themeId: string | number, items: number[] ) {
    if ( this.ThemeList.has( themeId ) ) {
      const theme: any = this.ThemeList.get( themeId );

      items.forEach( item => {
        if ( theme.indexOf( item ) !== -1 ) {
          theme.push( item );
        }
      } );

      this.ThemeList.set( themeId, theme );

    } else {
      this.ThemeList.set( themeId, items );
    }
  }

  // 上一篇主题日报
  @action getBeforThemeActrc( themeid: string | number, id: number ) {
    if ( this.ThemeList.has( themeid ) ) {
      const theme: any = this.ThemeList.get( themeid );
      const index = theme.indexOf( id );
      return index > 0 ? theme[index - 1] : null;
    } else {
      return null;
    }
  }

  // 下一篇主题日报
  @action getAfterThemeActrc( themeid: string | number, id: number ) {
    if ( this.ThemeList.has( themeid ) ) {
      const theme: any = this.ThemeList.get( themeid );
      const index = theme.indexOf( id );
      return index < theme.length - 1 ? theme[index + 1] : null;
    } else {
      return null;
    }
  }
}

const Store = new MyStore();

export { Store };
