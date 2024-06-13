import { IActivityResponse } from '../../types/activityTypes';
import { fetchAllActivities } from '../repos/activityRepo';

export const getAllActivitiesUseCase = async (): Promise<IActivityResponse[]> => {
  return await fetchAllActivities();
};
