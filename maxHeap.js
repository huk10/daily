class MaxHeap {
  constructor ( list ) {
    this.data = list ? list : [];
    this.init();
  }

  init () {
    let len = this.data.length;
    for ( let i = Math.floor( len / 2 ); i >= 0; i-- ) {
      this.heapify( i, len );
    }
    console.log( this.data )
  }

  heapify ( i, length ) {
    let temp = this.data[ i ];
    for ( let k = 2 * i + 1; k < length; k = 2 * k + 1 ) {
      if ( k + 1 < length && this.data[ k ] < this.data[ k + 1 ] ) {
        k++;
      }
      if ( this.data[ k ] > temp ) {
        this.data[ i ] = this.data[ k ];
        i = k;
      }
    }
    this.data[ i ] = temp;
  }

  push ( ele ) {
    this.data.push( ele );
    this.init();
  }

  deleteMaxEle () {
    let temp = this.data.splice( 0, 1 )[ 0 ];
    this.init();
    return temp;
  }

  sort () {
    for ( let i = this.data.length - 1; i >= 0; i-- ) {
      this.swap( 0, i );
      this.heapify( 0, i );
    }
    console.log( this.data )
  }

  swap ( i, j ) {
    let temp = this.data[ i ];
    this.data[ i ] = this.data[ j ];
    this.data[ j ] = temp;
  }

}

let h = new MaxHeap( [ 8, 6, 48, 4, 9, 1, 3 ] );

h.sort();

h.push( 99 );

console.log( h.deleteMaxEle() )
