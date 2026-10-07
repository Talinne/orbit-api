import prisma from '../prisma/client';

interface ProjectData {
    name: string;
    description?: string;
}

export async function createProject(userId: number, data: ProjectData) {
    const project = await prisma.project.create({
        data: {
            name: data.name,
            description: data.description,
            userId: userId
        }
    });

    return project;
}

export async function getUserProjects(userId: number) {
    const projects = await prisma.project.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' }
    });

    return projects;
}

export async function getProjectById(userId: number, projectId: number) {
    const project = await prisma.project.findFirst({
        where: {
            id: projectId,
            userId

        },
        include: {
            tasks: true
        }
    })

    if (!project) {
        throw new Error('Projeto não encontrado');
    }

    return project;
}

export async function updateProject(userId: number, projectId: number, data: ProjectData) {
    const project = await prisma.project.findFirst({
        where: {
            id: projectId,
            userId
        }
    })

    if (!project) {
        throw new Error('Projeto não encontrado');
    }

    const update = await prisma.project.update({
        where: { id: projectId },
        data
    })

    return update;
}

export async function deleteProject(userId: number, projectId: number) {
    const project = await prisma.project.findFirst({
        where: {
            id: projectId,
            userId
        }
    })

    if (!project) {
        throw new Error('Projeto não encontrado');
    }

    await prisma.project.delete({
        where: { id: projectId }
    })
}
     
 