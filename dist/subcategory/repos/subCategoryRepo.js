"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubCategoryRepo = void 0;
const subCategoryModel_1 = __importDefault(require("../models/subCategoryModel"));
class SubCategoryRepo {
    async findAllSubCategories() {
        return await subCategoryModel_1.default.find({ isActive: true, isDeleted: false }).sort({ sorting: 1 });
    }
    async findSubCategoriesByCategoryId(categoryId) {
        return await subCategoryModel_1.default
            .find({ categoryId, isActive: true, isDeleted: false })
            .sort({ sorting: 1 });
    }
}
exports.SubCategoryRepo = SubCategoryRepo;
