import { Document } from 'mongoose';

export interface IUsers extends Document {
  userName: string;
  mobileNumber: number;
  dob: string;
  userType: 'child' | 'teenager' | 'adult';
  email?: string;
  parentName?: string;
  parentDob?: string;
  avatar?: string;
  otp?: string;
  mobileNumberVerified?: boolean;
  isDeleted?: boolean;
  gender: string;
}

export interface IUserAuth extends Document {
  userId: string;
  deviceId: string;
  deviceType: string;
  authToken: string;
  isActive: boolean;
}

export interface IUserBody {
  userName: string;
  mobileNumber: number;
  dob: string;
  userType: 'child' | 'teenager' | 'adult';
  email?: string;
  parentName?: string;
  parentDob?: string;
  gender: string;
}

export interface IOtpBody {
  mobileNumber: number;
  otp: string;
  deviceId: string;
  deviceType: "web" | "mobile";
}
