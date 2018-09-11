export const util = {
  zero( num: number ) {
    return num < 10 ? '0' + num : num + '';
  },
  timestampToTime( timestamp: number ) {
    const date = new Date( timestamp * 1000 );
    const M = this.zero( date.getMonth() + 1 ) + '-';
    const D = this.zero( date.getDate() ) + ' ';
    const h = this.zero( date.getHours() ) + ':';
    const m = this.zero( date.getMinutes() ) + ':';
    const s = this.zero( date.getSeconds() );
    return M + D + h + m + s;
  },
  timeToWeek( t: string | any) {
    const now = new Date();
    const date = new Date( t.substring( 0, 4 ) + '-' + t.substring( 4, 6 ) + '-' + t.substring( 6 ) );
    const week = [ '日', '一', '二', '三', '四', '五', '六', '日' ];
    const weekDate = t.substring( 4, 6 ) + '月' + t.substring( 6 ) + '日' + ' ' + '星期' + week[ date.getDay() ];
    const boole = now.getDate() === date.getDate() && now.getMonth() === date.getMonth();
    return boole ? '今日热闻' : weekDate;
  },
  getBefterDate( befter: number ) {
    return new Date().setDate( new Date().getDate() - befter );
  },
  getDateToString( onDate?: any ): string {
    const date = onDate || new Date();
    const M = this.zero( date.getMonth() + 1 ) + '-';
    const D = this.zero( date.getDate() ) + ' ';
    const h = this.zero( date.getHours() ) + ':';
    const m = this.zero( date.getMinutes() ) + ':';
    const s = this.zero( date.getSeconds() );
    return M + D + h + m + s;
  },
  dateToYMD( date: number | Date ) {
    date = new Date( date );
    const y = date.getFullYear();
    const m = this.zero( date.getMonth() + 1 );
    const d = this.zero( date.getDate() );
    return y + '' + m + '' + d;
  }
};
