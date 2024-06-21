import { Schema, model } from 'mongoose';
import { IUsers } from '../../types/userTypes';

const usersSchema = new Schema<IUsers>(
  {
    userName: { type: String, required: true },
    mobileNumber: { type: Number, required: true },
    dob: { type: String, required: true },
    userType: { type: String, enum: ['child', 'teenager', 'adult'], required: true },
    gender: { type: String, required: true },
    email: { type: String },
    parentName: { type: String },
    parentDob: { type: String },
    avatar: { type: String, default: '' },
    otp: { type: String },
    mobileNumberVerified: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const usersModel = model<IUsers>('Users', usersSchema);
export default usersModel;
