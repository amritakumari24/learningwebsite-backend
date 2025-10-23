import { Router } from 'express';
import { enroll, listMyEnrollments } from '../controllers/enrollment.controller.js';
import { authRequired } from '../middleware/auth.js';

const router = Router();

router.use(authRequired);
router.post('/', enroll);
router.get('/me', listMyEnrollments);

export default router;
