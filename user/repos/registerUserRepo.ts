import { IUserAuth, IUserBody } from '../../types/userTypes';
import { ObjectID } from '../../utils/objectIdParser';
import userAuthModel from '../models/userAuthModel';
import usersModel from '../models/userModel';

export const checkUserExist = async (
  userName: string,
  mobileNumber: number,
): Promise<{ _id: string } | null> => {
  return await usersModel
    .findOne({ $or: [{ userName }, { mobileNumber }] })
    .select({ _id: 1 })
    .lean();
};

export const createUser = async (data: IUserBody, otp: string): Promise<boolean> => {
  await usersModel.create({ ...data, otp });
  return true;
};

export const verifyOtp = async (
  mobileNumber: number,
  otp: string,
): Promise<{ _id: string } | null> => {
  return await usersModel
    .findOne({ mobileNumber, otp, isDeleted: false })
    .select({ _id: 1 })
    .lean();
};

export const setUserVerified = async (id: string): Promise<{ _id: string } | null> => {
  const _id = ObjectID(id);
  return await usersModel.findOneAndUpdate(
    { _id, isDeleted: false },
    { mobileNumberVerified: true, otp: '' },
    { new: true },
  );
};

export const saveUserToken = async (
  userId: string,
  deviceId: string,
  deviceType: string,
  authToken: string,
): Promise<Partial<IUserAuth> | null> => {
  return await userAuthModel.create({ userId, deviceId, deviceType, authToken });
};
export const uploadAvatar = async (
  id: string,
  imageUrl: string,
): Promise<{ _id: string } | null> => {
  const _id = ObjectID(id);
  return await usersModel.findOneAndUpdate(
    { _id, isDeleted: false },
    { avatar: imageUrl },
    { new: true },
  );
};
