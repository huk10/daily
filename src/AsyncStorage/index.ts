import { AsyncStorage } from 'react-native';

class Storage {

  async getData( type: string ) {
    try {
      const value = await AsyncStorage.getItem( type );
      return value;
    } catch ( error ) {
      return null;
    }
  }

  async setData( key: string, value: any ) {
    try {
      await AsyncStorage.setItem( key, JSON.stringify(value) );
      return true;
    } catch ( error ) {
      return false;
    }
  }

  async removeItem( key: string ) {
    await AsyncStorage.removeItem( key );
  }

}

export const AppStorage = new Storage();
