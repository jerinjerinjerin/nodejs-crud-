import express from 'express';
import {
  createUser,
  loginUser,
  verifyOtp,
  logOutUser,
} from '../../controller/user';
import upload from '../../config/multerConfig';

const router = express.Router();

router.post('/create', upload.single('avatarUrl'), createUser);
router.post('/otp-varifiction', verifyOtp);
router.post('/login-user', loginUser);
router.get('/logout-user', logOutUser);

export default router;
