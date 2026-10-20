import request from 'supertest'
import app from '../server'

async function createAndLoginUser(email = 'talinne@email.com') {
  await request(app)
    .post('/auth/register')
    .send({ name: 'Talinne', email, password: '123456' })

  const response = await request(app)
    .post('/auth/login')
    .send({ email, password: '123456' })

  return response.body.token
}

describe('Projects', () => {
  describe('POST /projects', () => {
    it('deve criar um projeto com sucesso', async () => {
      const token = await createAndLoginUser()

      const response = await request(app)
        .post('/projects')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Site da padaria',
          description: 'Site institucional'
        })

      expect(response.status).toBe(201)
      expect(response.body).toHaveProperty('id')
      expect(response.body.name).toBe('Site da padaria')
    })

    it('não deve criar projeto sem token', async () => {
      const response = await request(app)
        .post('/projects')
        .send({ name: 'Site da padaria' })

      expect(response.status).toBe(401)
    })
  })

  describe('GET /projects', () => {
    it('deve listar apenas os projetos do usuário autenticado', async () => {
      const tokenA = await createAndLoginUser('usuarioa@email.com')
      const tokenB = await createAndLoginUser('usuariob@email.com')

      await request(app)
        .post('/projects')
        .set('Authorization', `Bearer ${tokenA}`)
        .send({ name: 'Projeto do usuário A' })

      await request(app)
        .post('/projects')
        .set('Authorization', `Bearer ${tokenB}`)
        .send({ name: 'Projeto do usuário B' })

      const response = await request(app)
        .get('/projects')
        .set('Authorization', `Bearer ${tokenA}`)

      expect(response.status).toBe(200)
      expect(response.body).toHaveLength(1)
      expect(response.body[0].name).toBe('Projeto do usuário A')
    })
  })

  describe('DELETE /projects/:id', () => {
    it('não deve deletar projeto de outro usuário', async () => {
      const tokenA = await createAndLoginUser('usuarioa@email.com')
      const tokenB = await createAndLoginUser('usuariob@email.com')

      const project = await request(app)
        .post('/projects')
        .set('Authorization', `Bearer ${tokenA}`)
        .send({ name: 'Projeto do usuário A' })

      const response = await request(app)
        .delete(`/projects/${project.body.id}`)
        .set('Authorization', `Bearer ${tokenB}`)

      expect(response.status).toBe(400)
    })
  })
})