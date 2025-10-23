import { Router } from 'express';
import { markLessonComplete, getProgress } from '../controllers/progress.controller.js';
import { authRequired } from '../middleware/auth.js';

const router = Router();

router.use(authRequired);
router.post('/complete', markLessonComplete);
router.get('/:courseId', getProgress);

export default router;
