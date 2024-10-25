import { Document } from 'mongoose';

export interface ICourseMaterial extends Document {
  courseMaterialName: string;
  subCategoryId: string;
  courseMaterialUrl: string;
  sorting: number;
  description?: string;
  isActive?: boolean;
  isDeleted?: boolean;
}

export interface ICourseMaterialBody {
  courseMaterialName: string;
  subCategoryId: string;
  courseMaterialUrl: string;
  description?: string;
  sorting: number;
}

export interface ITrackCourseMaterialView extends Document {
  userId: string;
  courseMaterialId: string;
  viewedPercentage?: number;
  isActive: boolean;
}
