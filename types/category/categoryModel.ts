import { Document } from 'mongoose';

export interface ICategory extends Document {
  categoryName: string;
  packageId: string;
  imageUrl: string;
  sorting: number;
  description?: string;
  isActive?: boolean;
  isDeleted?: boolean;
}

export interface ICategoryBody {
  categoryName: string;
  packageId: string;
  imageUrl: string;
  description?: string;
  sorting: number;
}
