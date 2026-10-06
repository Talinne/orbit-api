import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../prisma/client'

interface RegisterData {
  name: string
  email: string
  password: string
}

interface LoginData {
  email: string
  password: string
}

export async function registerUser(data: RegisterData) {
  const userExists = await prisma.user.findUnique({
    where: { email: data.email }
  })

  if (userExists) {
    throw new Error('Email já cadastrado')
  }

  const hashedPassword = await bcrypt.hash(data.password, 10)

  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword
    }
  })

  return {
    id: user.id,
    name: user.name,
    email: user.email
  }
}

export async function loginUser(data: LoginData) {
  const user = await prisma.user.findUnique({
    where: { email: data.email }
  })

  if (!user) {
    throw new Error('Email ou senha inválidos')
  }

  const passwordMatch = await bcrypt.compare(data.password, user.password)

  if (!passwordMatch) {
    throw new Error('Email ou senha inválidos')
  }

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET as string,
    { expiresIn: '7d' }
  )

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    }
  }
}