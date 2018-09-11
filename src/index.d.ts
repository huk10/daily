declare module 'react-native-spinkit' {
  interface ISponkitProps {
    isVisible: boolean;
    size?: number;
    type?: string;
    color?: string;
  }

  function Spinner( props: ISponkitProps ): JSX.Element;

  export = Spinner;
}

declare module 'react-native-snap-carousel' {
  interface ICarouselProps {
    data: any[];
    useScrollView?: boolean;
    apparitionDelay?: number;
    loop?: boolean;
    layout?: string;
    lockScrollWhileSnapping?: boolean;
    autoplayDelay?: number;
    autoplayInterval?: number;
    autoplay?: boolean;
    renderItem?: ( props: any ) => JSX.Element;
    sliderWidth?: number;
    itemWidth?: number;
  }

  function Carousel( props: ICarouselProps ): JSX.Element;

  export = Carousel;
}

declare module 'react-native-vector-icons/lib/create-icon-set' {
  function createIconSet( json: any, fontName: string, fontName_: string ): any;

  export = createIconSet;
}

declare module 'react-native-vector-icons/MaterialCommunityIcons' {
  function createIconSet( json: any, fontName: string, fontName_: string ): any;

  export = createIconSet;
}

declare module 'react-native-vector-icons/Feather' {
  function createIconSet( json: any, fontName: string, fontName_: string ): any;

  export = createIconSet;
}


