import { Router } from 'express';
import { listUsers, createUser, updateUser, deleteUser } from '../controllers/user.controller.js';
import { authRequired } from '../middleware/auth.js';
import { requireRole, Roles } from '../utils/constants.js';

const router = Router();
router.use(authRequired, requireRole(Roles.ADMIN));

router.get('/', listUsers);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
