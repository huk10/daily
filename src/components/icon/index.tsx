import createIconSet from 'react-native-vector-icons/lib/create-icon-set';
import iconfontJson from './iconfont.json';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
const Icon = createIconSet( iconfontJson, 'iconfont', 'iconfont.ttf' );

export { Icon ,FeatherIcon, MaterialCommunityIcon};
