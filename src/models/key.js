import mongoose from 'mongoose';

const keySchema = new mongoose.Schema({
  keyData: {
    type: String,
    required: false,
  },
  key: {
    type: String,
    unique: true,
    required: true,
    dropDups: true
  },
  TTL: {
    type: Number,
  }
}, { timestamps: true });

const Key = mongoose.model('Key', keySchema);

export default Key;
