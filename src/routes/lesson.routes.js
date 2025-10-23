import { Router } from 'express';
import { createLesson, listLessons, updateLesson, deleteLesson } from '../controllers/lesson.controller.js';
import { authRequired } from '../middleware/auth.js';
import { requireRole, Roles } from '../utils/constants.js';

const router = Router();

router.get('/', listLessons);
router.post('/', authRequired, requireRole(Roles.ADMIN, Roles.INSTRUCTOR), createLesson);
router.put('/:id', authRequired, requireRole(Roles.ADMIN, Roles.INSTRUCTOR), updateLesson);
router.delete('/:id', authRequired, requireRole(Roles.ADMIN, Roles.INSTRUCTOR), deleteLesson);

export default router;
