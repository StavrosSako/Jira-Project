import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT || 3001;
const jwtSecret = process.env.JWT_SECRET;
const nodeEnv = process.env.NODE_ENV || 'development';

const config = {
  port,
  jwtSecret,
  nodeEnv
};

export { port, jwtSecret, nodeEnv };
export default config;

