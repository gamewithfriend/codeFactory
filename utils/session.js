import AsyncStorage from '@react-native-async-storage/async-storage';

// session 정보를 확인하는 로직
export async function sessionGet(key) {
    let session = "";
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        session = JSON.parse(value);
      } else {
        session = "";
      }

      return session;
      
    } catch (error) {
        Alert.alert(error);
    }
}

// session 정보를 set하는 로직
export async function sessionSave(key, value) {
    await AsyncStorage.setItem(
        key,
        value,
    );
}