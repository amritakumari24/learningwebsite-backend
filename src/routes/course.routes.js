import { Router } from 'express';
import { listCourses, createCourse, getCourse, updateCourse, deleteCourse } from '../controllers/course.controller.js';
import { authRequired } from '../middleware/auth.js';
import { requireRole, Roles } from '../utils/constants.js';

const router = Router();

router.get('/', listCourses); // public browse
router.get('/:id', getCourse);

router.post('/', authRequired, requireRole(Roles.ADMIN, Roles.INSTRUCTOR), createCourse);
router.put('/:id', authRequired, requireRole(Roles.ADMIN, Roles.INSTRUCTOR), updateCourse);
router.delete('/:id', authRequired, requireRole(Roles.ADMIN), deleteCourse);

export default router;
