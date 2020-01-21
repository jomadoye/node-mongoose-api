import mongoose from 'mongoose';

import Key from './key';

const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL);
};

const models = { Key };

export { connectDb };

export default models;
