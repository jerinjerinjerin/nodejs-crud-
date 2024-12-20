import express from 'express';
import { createUser } from '../../controller/user';
import upload from '../../config/multerConfig';

const router = express.Router();

router.post('/create', upload.single('avatarUrl'), createUser);

export default router;
