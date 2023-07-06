export default () => {
  const env = process.env.NODE_ENV ? process.env.NODE_ENV.trim() : null;

  const mongoURL = 'mongodb://localhost:27017/nest';

  return {
    env,
    prod: env === 'production',
    mongo: mongoURL,
  };
};
