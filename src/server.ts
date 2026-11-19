import express from 'express'
import dotenv from 'dotenv'
import swaggerUi from 'swagger-ui-express'
import authRoutes from './routes/auth.routes'
import projectRoutes from './routes/project.routes'
import taskRoutes from './routes/task.routes'
import { errorMiddleware } from './middlewares/error.middleware'
import { swaggerDocument } from './docs/swagger'

dotenv.config()

const app = express()

app.use(express.json())

app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

// Rota do Swagger no navegador
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use('/auth', authRoutes)
app.use('/projects', projectRoutes)
app.use('/projects/:projectId/tasks', taskRoutes)

// O errorMiddleware DEVE ser o último middleware registrado!
app.use(errorMiddleware)

export default app