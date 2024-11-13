"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const subCategoryController_1 = require("../controllers/subCategoryController");
const authentication_1 = require("../../middleware/authentication");
const subCategoryRequest_1 = require("../requests/subCategoryRequest");
const router = (0, express_1.Router)();
//router.get('/all', authenticateUser, getCategories);
router.get('/all', authentication_1.authenticateAdmin, subCategoryController_1.getSubCategories);
router.get('/by-category/:categoryId/:type', authentication_1.authenticateUser, subCategoryRequest_1.getSubCategoryByCategoryIdValidation, subCategoryController_1.getSubCategoriesByCategoryId);
router.post('/', authentication_1.authenticateAdmin, subCategoryRequest_1.subCategoryCreateValidation, subCategoryController_1.createSubCategory);
router.put('/:id', authentication_1.authenticateAdmin, subCategoryRequest_1.subCategoryUpdateValidation, subCategoryRequest_1.subCategoryCreateValidation, subCategoryController_1.updateSubCategory);
exports.default = router;
