import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middlewares';
import { create, index, show, update, remove } from '../controllers/project.controller';

const router = Router()

router.use(authMiddleware)

router.post('/', create)
router.get('/', index)
router.get('/:id', show)
router.put('/:id', update)
router.delete('/:id', remove)

export default router