import request from 'supertest'
import app from '../server'

describe('Auth', () => {
  describe('POST /auth/register', () => {
    it('deve cadastrar um novo usuário com sucesso', async () => {
      const response = await request(app)
        .post('/auth/register')
        .send({
          name: 'Talinne',
          email: 'talinne@email.com',
          password: '123456'
        })

      expect(response.status).toBe(201)
      expect(response.body).toHaveProperty('id')
      expect(response.body.email).toBe('talinne@email.com')
      expect(response.body).not.toHaveProperty('password')
    })

    it('não deve cadastrar usuário com email já existente', async () => {
      await request(app)
        .post('/auth/register')
        .send({
          name: 'Talinne',
          email: 'talinne@email.com',
          password: '123456'
        })

      const response = await request(app)
        .post('/auth/register')
        .send({
          name: 'Talinne',
          email: 'talinne@email.com',
          password: '123456'
        })

      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('message')
    })
  })

  describe('POST /auth/login', () => {
    it('deve fazer login e retornar token', async () => {
      await request(app)
        .post('/auth/register')
        .send({
          name: 'Talinne',
          email: 'talinne@email.com',
          password: '123456'
        })

      const response = await request(app)
        .post('/auth/login')
        .send({
          email: 'talinne@email.com',
          password: '123456'
        })

      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('token')
      expect(response.body).toHaveProperty('user')
    })

    it('não deve fazer login com senha incorreta', async () => {
      await request(app)
        .post('/auth/register')
        .send({
          name: 'Talinne',
          email: 'talinne@email.com',
          password: '123456'
        })

      const response = await request(app)
        .post('/auth/login')
        .send({
          email: 'talinne@email.com',
          password: 'senhaerrada'
        })

      expect(response.status).toBe(401)
    })
  })
})