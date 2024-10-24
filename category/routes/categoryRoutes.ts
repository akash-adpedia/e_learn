import { Router } from 'express';
import { getCategories, getCategoriesByPackageId } from '../controllers/categoryController';
//import { authenticateUser } from '../../middleware/authentication';
import { getCategoryByPackageIdValidation } from '../requests/categoryRequest';

const router = Router();

//router.get('/all', authenticateUser, getCategories);
router.get('/all', getCategories);
router.get('/by-package/:packageId', getCategoryByPackageIdValidation, getCategoriesByPackageId);

export default router;
