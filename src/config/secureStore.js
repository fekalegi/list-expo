import * as SecureStore from 'expo-secure-store'
async function secureStore(key, value) {
    await SecureStore.setItemAsync(key, value);
  }

export default secureStore