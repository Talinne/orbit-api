import { Router } from 'express'
import { authMiddleware } from '../middlewares/auth.middleware'
import { validate } from '../middlewares/validate.middleware'
import { taskSchema, updateTaskSchema } from '../schemas/task.schema'
import { create, index, show, update, remove } from '../controllers/task.controller'

const router = Router({ mergeParams: true })

router.use(authMiddleware)

router.post('/', validate(taskSchema), create)
router.get('/', index)
router.get('/:id', show)
router.put('/:id', validate(updateTaskSchema), update)
router.delete('/:id', remove)

export default router