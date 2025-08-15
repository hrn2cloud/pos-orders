import 'dotenv/config';

export default ({ config }) => {
  return {
    ...config,
    extra: {
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
      CLOVER_API_BASE_URL: process.env.CLOVER_API_BASE_URL,
      STORES_CONFIG: process.env.STORES_CONFIG,
    },
  };
};