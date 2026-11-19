export const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Orbit API',
    version: '1.0.0',
    description: 'API REST para gerenciamento de projetos e tarefas'
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  },
  paths: {
    '/auth/register': {
      post: {
        tags: ['Auth'],
        summary: 'Cadastro de usuário',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string', example: 'Talinne' },
                  email: { type: 'string', example: 'talinne@email.com' },
                  password: { type: 'string', example: '123456' }
                }
              }
            }
          }
        },
        responses: {
          201: { description: 'Usuário criado com sucesso' },
          400: { description: 'Email já cadastrado' },
          422: { description: 'Dados inválidos' }
        }
      }
    },
    '/auth/login': {
      post: {
        tags: ['Auth'],
        summary: 'Login de usuário',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: { type: 'string', example: 'talinne@email.com' },
                  password: { type: 'string', example: '123456' }
                }
              }
            }
          }
        },
        responses: {
          200: { description: 'Login realizado com sucesso' },
          401: { description: 'Email ou senha inválidos' }
        }
      }
    },
    '/projects': {
      get: {
        tags: ['Projects'],
        summary: 'Listar projetos do usuário',
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: 'Lista de projetos' },
          401: { description: 'Não autorizado' }
        }
      },
      post: {
        tags: ['Projects'],
        summary: 'Criar projeto',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string', example: 'Site da padaria' },
                  description: { type: 'string', example: 'Site institucional' }
                }
              }
            }
          }
        },
        responses: {
          201: { description: 'Projeto criado com sucesso' },
          401: { description: 'Não autorizado' },
          422: { description: 'Dados inválidos' }
        }
      }
    }
  }
}