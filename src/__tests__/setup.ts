import { execSync } from 'child_process'
import dotenv from 'dotenv'
import prisma from '../prisma/client'

dotenv.config({ path: '.env.test' })

beforeEach(async () => {
  await prisma.task.deleteMany()
  await prisma.project.deleteMany()
  await prisma.user.deleteMany()
})

afterAll(async () => {
  await prisma.$disconnect()
})