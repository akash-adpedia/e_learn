import { Request, Response } from 'express';
import {
  getAllCategoryUseCase,
  getCategoriesByPackageIdUseCase,
} from '../useCases/categoryUseCase';
import asyncHandler from 'express-async-handler';
import { responseMessages } from '../../config/localization';
import AppError from '../../common/appError';
import { HttpStatus } from '../../common/httpStatus';
//import { ICategoryBody } from '../../types/category/categoryModel';

export const getCategories = asyncHandler(async (req: Request, res: Response) => {
  const result = await getAllCategoryUseCase();
  res.status(201).json({
    success: true,
    message: responseMessages.response_success_get,
    result: result,
  });
});

export const getCategoriesByPackageId = async (req: Request, res: Response) => {
  try {
    const { packageId } = req.params;
    const result = await getCategoriesByPackageIdUseCase(packageId);
    return res.status(200).json({
      success: true,
      message: responseMessages.response_success_get,
      result: result,
    });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'An unexpected error occurred',
    });
  }
};
