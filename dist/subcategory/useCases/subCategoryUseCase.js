"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSubCategoryUseCase = exports.createSubCategoryUseCase = exports.getSubCategoriesByCategoryIdUseCase = exports.getAllSubCategoryUseCase = void 0;
const appError_1 = __importDefault(require("../../common/appError"));
const httpStatus_1 = require("../../common/httpStatus");
const subCategoryRepo_1 = require("../repos/subCategoryRepo");
const courseMaterialRepo_1 = require("../../coursematerial/repos/courseMaterialRepo");
const categoryRepo_1 = require("../../category/repos/categoryRepo");
const getAllSubCategoryUseCase = async () => {
    const subCategoryRepo = new subCategoryRepo_1.SubCategoryRepo();
    const result = await subCategoryRepo.findAllSubCategories();
    if (!result)
        throw new appError_1.default('No data found', httpStatus_1.HttpStatus.NOT_FOUND);
    return result;
};
exports.getAllSubCategoryUseCase = getAllSubCategoryUseCase;
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
const getSubCategoriesByCategoryIdUseCase = async (categoryId, type, userId) => {
    const subCategoryRepo = new subCategoryRepo_1.SubCategoryRepo();
    const subCategories = await subCategoryRepo.findSubCategoriesByCategoryId(categoryId, type);
    if (!subCategories || subCategories.length === 0) {
        throw new appError_1.default('No subcategories found for the given category', httpStatus_1.HttpStatus.NOT_FOUND);
    }
    // If user is logged in, get tracking data
    if (userId) {
        const subCategoriesWithTracking = await Promise.all(subCategories.map(async (subCategory) => {
            const subCategoryId = subCategory._id.toString();
            const subCategoryPlain = 'toObject' in subCategory
                ? subCategory.toObject()
                : subCategory;
            const { totalMaterials, viewedMaterials, percentageViewed } = await (0, courseMaterialRepo_1.getCourseMaterialTrackBySubCategory)(userId, subCategoryId);
            return {
                ...subCategoryPlain,
                totalMaterials,
                viewedMaterials,
                percentageViewed: Math.round(percentageViewed),
            };
        }));
        return subCategoriesWithTracking;
    }
    return subCategories;
};
exports.getSubCategoriesByCategoryIdUseCase = getSubCategoriesByCategoryIdUseCase;
const createSubCategoryUseCase = async (data) => {
    const exists = await (0, categoryRepo_1.checkCategoryExists)(data.categoryId);
    if (!exists) {
        throw new appError_1.default('No categories found for the given categoryId', httpStatus_1.HttpStatus.NOT_FOUND);
    }
    const result = await (0, subCategoryRepo_1.saveSubCategory)(data);
    return result;
};
exports.createSubCategoryUseCase = createSubCategoryUseCase;
const updateSubCategoryUseCase = async (id, data) => {
    const exists = await (0, categoryRepo_1.checkCategoryExists)(data.categoryId);
    if (!exists) {
        throw new appError_1.default('No categories found for the given categoryId', httpStatus_1.HttpStatus.NOT_FOUND);
    }
    const result = await (0, subCategoryRepo_1.updateSubCategory)(id, data);
    return result;
};
exports.updateSubCategoryUseCase = updateSubCategoryUseCase;
