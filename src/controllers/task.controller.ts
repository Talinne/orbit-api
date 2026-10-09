import { Response} from "express"
import { AuthRequest } from '../middlewares/auth.middlewares'
import {
    createTask,
    getProjectTasks,
    getTaskById,
    updateTask,
    deleteTask
} from '../services/task.service'

export async function create(req: AuthRequest, res: Response) {
    try {
        const projectId  = Number(req.params.projectId)
        const { title, description } = req.body

        const task = await createTask(req.userId!, projectId, { title, description })

        res.status(201).json(task)
    } catch (error: any) {
        res.status(400).json({ message: error.message })
    }
}

export async function index(req: AuthRequest, res: Response) {
    try {
        const projectId  = Number(req.params.projectId)

        const tasks = await getProjectTasks(req.userId!, projectId)

        res.status(200).json(tasks)
    } catch (error: any) {
        res.status(400).json({ message: error.message })
    }
}

export async function show(req: AuthRequest, res: Response) {
    try {
        const projectId = Number(req.params.projectId)
        const taskId = Number(req.params.taskId)

        const task = await getTaskById(req.userId!, projectId, taskId)

        res.status(200).json(task)
    } catch (error: any) {
        res.status(404).json({ message: error.message })
    }
}

export async function update(req: AuthRequest, res: Response) {
    try {
        const projectId = Number(req.params.projectId)
        const taskId = Number(req.params.taskId)
        const { title, description, status } = req.body
        const task = await updateTask(req.userId!, projectId, taskId, { title, description, status })
        
        res.status(200).json(task)
    } catch (error: any) {
        res.status(400).json({ message: error.message })
    }
}

export async function remove(req: AuthRequest, res: Response) {
    try {
        const projectId = Number(req.params.projectId)
        const taskId = Number(req.params.taskId)

        await deleteTask(req.userId!, projectId, taskId)

        res.status(204).send()
    } catch (error: any) {
        res.status(400).json({ message: error.message })
    }
}