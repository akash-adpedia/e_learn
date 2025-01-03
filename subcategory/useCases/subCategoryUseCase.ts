import AppError from '../../common/appError';
import { HttpStatus } from '../../common/httpStatus';
import { SubCategoryRepo, saveSubCategory, updateSubCategory } from '../repos/subCategoryRepo';
import {
  ISubCategory,
  ISubCategoryWithTracking,
  ISubCategoryBody,
} from '../../types/subcategory/subCategoryModel';
import { getCourseMaterialTrackBySubCategory } from '../../coursematerial/repos/courseMaterialRepo';
import { checkCategoryExists } from '../../category/repos/categoryRepo';

export const getAllSubCategoryUseCase = async (): Promise<ISubCategory[]> => {
  const subCategoryRepo = new SubCategoryRepo();
  const result = await subCategoryRepo.findAllSubCategories();
  if (!result) throw new AppError('No data found', HttpStatus.NOT_FOUND);
  return result;
};

/*
export const getSubCategoriesByCategoryIdUseCase = async (
  categoryId: string,
): Promise<ISubCategory[]> => {
  const subCategoryRepo = new SubCategoryRepo();
  const result = await subCategoryRepo.findSubCategoriesByCategoryId(categoryId);

  if (!result || result.length === 0) {
    throw new AppError('No sub categories found for the given category', HttpStatus.NOT_FOUND);
  }

  return result;
};
*/

export const getSubCategoriesByCategoryIdUseCase = async (
  categoryId: string,
  type: string,
  userId?: string,
): Promise<ISubCategoryWithTracking[]> => {
  const subCategoryRepo = new SubCategoryRepo();
  const subCategories: ISubCategory[] = await subCategoryRepo.findSubCategoriesByCategoryId(
    categoryId,
    type,
  );
  if (!subCategories || subCategories.length === 0) {
    throw new AppError('No subcategories found for the given category', HttpStatus.NOT_FOUND);
  }
  // If user is logged in, get tracking data
  if (userId) {
    const subCategoriesWithTracking: ISubCategoryWithTracking[] = await Promise.all(
      subCategories.map(async (subCategory): Promise<ISubCategoryWithTracking> => {
        const subCategoryId = subCategory._id.toString();
        const subCategoryPlain =
          'toObject' in subCategory
            ? (subCategory as ISubCategory & { toObject: () => object }).toObject()
            : subCategory;
        const { totalMaterials, viewedMaterials, percentageViewed } =
          await getCourseMaterialTrackBySubCategory(userId, subCategoryId);
        return {
          ...subCategoryPlain,
          totalMaterials,
          viewedMaterials,
          percentageViewed: Math.round(percentageViewed),
        };
      }),
    );
    return subCategoriesWithTracking;
  }
  return subCategories as ISubCategoryWithTracking[];
};

export const createSubCategoryUseCase = async (
  data: ISubCategoryBody,
): Promise<Pick<ISubCategory, '_id'>> => {
  const exists = await checkCategoryExists(data.categoryId);
  if (!exists) {
    throw new AppError('No categories found for the given categoryId', HttpStatus.NOT_FOUND);
  }
  const result = await saveSubCategory(data);
  return result;
};

export const updateSubCategoryUseCase = async (
  id: string,
  data: ISubCategoryBody,
): Promise<Pick<ISubCategory, '_id'>> => {
  const exists = await checkCategoryExists(data.categoryId);
  if (!exists) {
    throw new AppError('No categories found for the given categoryId', HttpStatus.NOT_FOUND);
  }
  const result = await updateSubCategory(id, data);
  return result;
};
