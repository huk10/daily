let t = {
  zero( num ) {
    return num < 10 ? '0' + num : num + '';
  },
  timestampToTime( timestamp ) {
    const date = new Date( timestamp );
    const M = this.zero( date.getMonth() + 1 ) + '-';
    const D = this.zero( date.getDate() ) + ' ';
    const h = this.zero( date.getHours() ) + ':';
    const m = this.zero( date.getMinutes() ) + ':';
    const s = this.zero( date.getSeconds() );
    return M + D + h + m + s;
  },
  getBefterDate( num ) {
    const date = new Date().setDate(new Date().getDate() - num);
    return date;
  },
  dateToYMD (date) {
    date = new Date( date );
    const y = date.getFullYear();
    const m = this.zero(date.getMonth() + 1);
    const d = this.zero(date.getDate())
    return y + '' + m + '' + d;
  }
}


console.log(t.dateToYMD(t.getBefterDate(5)))