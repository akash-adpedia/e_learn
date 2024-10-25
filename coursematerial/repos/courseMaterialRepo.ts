import courseMaterialModel from '../models/courseMaterialModel';
import courseMaterialViewModel from '../models/courseMaterialViewModel';
import {
  ICourseMaterial,
  ITrackCourseMaterialView,
} from '../../types/coursematerial/courseMaterialModel';

export class CourseMaterialRepo {
  async findAllSubCategories(): Promise<ICourseMaterial[]> {
    return await courseMaterialModel
      .find({ isActive: true, isDeleted: false })
      .sort({ sorting: 1 });
  }

  async findSubCategoriesByCategoryId(subCategoryId: string): Promise<ICourseMaterial[]> {
    return await courseMaterialModel
      .find({ subCategoryId, isActive: true, isDeleted: false })
      .sort({ sorting: 1 });
  }
}

export const checkUserCourseIdExist = async (
  userId: string,
  courseMaterialId: string,
): Promise<{ _id: string } | null> => {
  return await courseMaterialViewModel
    .findOne({ userId, courseMaterialId })
    .select({ _id: 1 })
    .lean();
};

export const trackCourseMaterial = async (data: ITrackCourseMaterialView): Promise<boolean> => {
  await courseMaterialViewModel.create({ ...data });
  return true;
};

export const checkCourseMaterialExist = async (
  courseMaterialId: string,
): Promise<{ _id: string } | null> => {
  return await courseMaterialModel.findOne({ _id: courseMaterialId }).select({ _id: 1 }).lean();
};

export const getCourseMaterialTrack = async (
  userId: string,
): Promise<{ totalMaterials: number; viewedMaterials: number; percentageViewed: number }> => {
  const totalMaterials = await courseMaterialModel.countDocuments({
    isActive: true,
    isDeleted: false,
  });
  const viewedMaterials = await courseMaterialViewModel.countDocuments({
    userId: userId,
    isActive: true,
  });
  const percentageViewed =
    totalMaterials > 0 ? Math.round((viewedMaterials / totalMaterials) * 100) : 0;
  return { totalMaterials, viewedMaterials, percentageViewed };
};

export const getCourseMaterialTrackBySubCategory = async (
  userId: string,
  subCategoryId: string,
): Promise<{ totalMaterials: number; viewedMaterials: number; percentageViewed: number }> => {
  const courseMaterials = await courseMaterialModel
    .find({
      subCategoryId,
      isActive: true,
      isDeleted: false,
    })
    .select('_id');
  const courseMaterialIds = courseMaterials.map((material) => material._id);
  const viewedMaterials = await courseMaterialViewModel.countDocuments({
    userId,
    courseMaterialId: { $in: courseMaterialIds },
  });
  const totalMaterials = courseMaterials.length;
  const percentageViewed = totalMaterials > 0 ? (viewedMaterials / totalMaterials) * 100 : 0;
  return { totalMaterials, viewedMaterials, percentageViewed };
};