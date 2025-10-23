import { Router } from 'express';
import { createQuiz, listQuizzes, updateQuiz, deleteQuiz, attemptQuiz } from '../controllers/quiz.controller.js';
import { authRequired } from '../middleware/auth.js';
import { requireRole, Roles } from '../utils/constants.js';

const router = Router();

router.get('/', listQuizzes);
router.post('/', authRequired, requireRole(Roles.ADMIN, Roles.INSTRUCTOR), createQuiz);
router.put('/:id', authRequired, requireRole(Roles.ADMIN, Roles.INSTRUCTOR), updateQuiz);
router.delete('/:id', authRequired, requireRole(Roles.ADMIN, Roles.INSTRUCTOR), deleteQuiz);
router.post('/:id/attempt', authRequired, attemptQuiz);

export default router;
