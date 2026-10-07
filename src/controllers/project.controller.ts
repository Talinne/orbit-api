import { Response } from 'express'
import { AuthRequest } from '../middlewares/auth.middlewares'
import {
  createProject,
  getUserProjects,
  getProjectById,
  updateProject,
  deleteProject
} from '../services/project.service'

export async function create(req: AuthRequest, res: Response) {
  try {
    const { name, description } = req.body
    const project = await createProject(req.userId!, { name, description })
    res.status(201).json(project)
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}

export async function index(req: AuthRequest, res: Response) {
  try {
    const projects = await getUserProjects(req.userId!)
    res.status(200).json(projects)
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}

export async function show(req: AuthRequest, res: Response) {
  try {
    const projectId = Number(req.params.id)
    const project = await getProjectById(req.userId!, projectId)
    res.status(200).json(project)
  } catch (error: any) {
    res.status(404).json({ message: error.message })
  }
}

export async function update(req: AuthRequest, res: Response) {
  try {
    const projectId = Number(req.params.id)
    const { name, description } = req.body
    const project = await updateProject(req.userId!, projectId, { name, description })
    res.status(200).json(project)
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}

export async function remove(req: AuthRequest, res: Response) {
  try {
    const projectId = Number(req.params.id)
    await deleteProject(req.userId!, projectId)
    res.status(204).send()
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}