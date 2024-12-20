import mongoose, { Schema } from 'mongoose';
import validator from 'validator';
import { userDocument } from '../../data/data';

const userSchema = new Schema<userDocument>({
  name: { type: String, required: true },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: (props: { value: string }) =>
        `${props.value} is not a valid email address!`,
    },
  },
  password: { type: String, required: true },
  avatarUrl: {
    type: String,
    default:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4mYGiDHOtUVcSxuzNfeds4xWXNOpQ-lIMPA&s',
  },
  role: { type: String, enum: ['USER', 'ADMIN'], default: 'USER' },
});
const User = mongoose.model('User', userSchema);

export default User;
