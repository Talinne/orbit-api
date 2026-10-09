import { Router } from 'express'
import { authMiddleware } from '../middlewares/auth.middlewares'
import { create, index, show, update, remove } from '../controllers/task.controller'

const router = Router({ mergeParams: true })

router.use(authMiddleware)

router.post('/', create)
router.get('/', index)
router.get('/:taskId', show)
router.put('/:taskId', update)
router.delete('/:taskId', remove)

export default router