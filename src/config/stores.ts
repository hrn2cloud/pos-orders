import { Store } from '../types';
import Constants from 'expo-constants';

const storesConfigString = Constants.expoConfig?.extra?.STORES_CONFIG;

let stores : Store[]=  [];

if (storesConfigString) {
  try {
    // Attempt to parse the JSON string
    stores = JSON.parse(storesConfigString);
  } catch (error) {
    console.error("Failed to parse stores config from environment variables:", error);
  }
}

export default stores;