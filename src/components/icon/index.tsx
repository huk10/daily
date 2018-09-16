import createIconSet from 'react-native-vector-icons/lib/create-icon-set';
import iconfontJson from './iconfont.json';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5Brands from 'react-native-vector-icons/FontAwesome5';

const Icon = createIconSet( iconfontJson, 'iconfont', 'iconfont.ttf' );

export { Icon ,FeatherIcon, MaterialCommunityIcon, FontAwesome5Brands};

