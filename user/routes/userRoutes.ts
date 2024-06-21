import { Router } from 'express';
import { registerUser, uploadAvatar, verifyOtp } from '../controllers/userController';
import multerConfig from '../../middleware/multer';
import { authenticateUser } from '../../middleware/authentication';
import { validateUserRegisterSchema } from '../validations/userRegisterSchema';
import { JSONSchemaType } from 'ajv';
import { validateBody } from '../../middleware/validate';
import { validateVerifyOtpSchema } from '../validations/verifyOtpSchema';

const router = Router();

router.post(
  '/register',
  validateBody(validateUserRegisterSchema as JSONSchemaType<unknown>),
  registerUser,
);
router.post('/verify-otp', validateBody(validateVerifyOtpSchema as JSONSchemaType<unknown>), verifyOtp);
router.post('/upload-avatar', authenticateUser, multerConfig, uploadAvatar);

export default router;
