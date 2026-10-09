import prisma from '../prisma/client'

interface TaskData {
    title: string
    description?: string
}

interface UpdateTaskData {
    title?: string
    description?: string
    status?: 'PENDING' | 'IN_PROGRESS' | 'DONE'
}

async function verifyProjectOwnership(userId: number, projectId: number) {
    const project = await prisma.project.findFirst({
        where: { id: projectId, userId },
    });

    if (!project) {
        throw new Error('Projeto não encontrado ou usuário não tem permissão para acessá-lo.');
    }
}

export async function createTask(userId: number, projectId: number, data: TaskData) {
    await verifyProjectOwnership(userId, projectId)

    const task = await prisma.task.create({
        data: {
            title: data.title,
            description: data.description,
            projectId
        }
    })

    return task
}

export async function getProjectTasks(userId: number, projectId: number) {
    await verifyProjectOwnership(userId, projectId)

    const tasks = await prisma.task.findMany({
        where: { projectId },
        orderBy: { createdAt: 'desc' }      
    })

    return tasks
}

export async function getTaskById(userId: number, projectId: number, taskId: number) {
    await verifyProjectOwnership(userId, projectId)

    const task = await prisma.task.findFirst({
        where: { id: taskId, projectId },
    })

    if (!task) {
        throw new Error('Tarefa não encontrada ou usuário não tem permissão para acessá-la.');
    }

    return task
}

export async function updateTask(userId: number, projectId: number, taskId: number, data: UpdateTaskData) {
    await verifyProjectOwnership(userId, projectId)

    const task = await prisma.task.findFirst({
        where: { id: taskId, projectId },
    })

    if (!task) {
        throw new Error('Tarefa não encontrada ou usuário não tem permissão para atualizá-la.');
    }

    const updated = await prisma.task.update({
        where: { id: taskId },
        data
    })

    return updated
}

export async function deleteTask(userId: number, projectId: number, taskId: number) {
    await verifyProjectOwnership(userId, projectId)

    const task = await prisma.task.findFirst({
        where: { id: taskId, projectId },
    })

    if (!task) {
        throw new Error('Tarefa não encontrada ou usuário não tem permissão para deletá-la.');
    }

    await prisma.task.delete({
        where: { id: taskId }
    })
}