import { Router } from 'express'
import { authMiddleware } from '../middlewares/auth.middleware'
import { validate } from '../middlewares/validate.middleware'
import { projectSchema } from '../schemas/project.schema'
import { create, index, show, update, remove } from '../controllers/project.controller'

const router = Router()

router.use(authMiddleware)

router.post('/', validate(projectSchema), create)
router.get('/', index)
router.get('/:id', show)
router.put('/:id', validate(projectSchema), update)
router.delete('/:id', remove)

export default router