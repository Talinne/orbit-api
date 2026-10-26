# Orbit API

API REST para gerenciamento de projetos e tarefas, desenvolvida com Node.js, TypeScript, Express, Prisma e MySQL.

## Tecnologias

- Node.js + TypeScript
- Express
- Prisma ORM
- MySQL
- Docker
- JWT
- Jest + Supertest
- GitHub Actions (CI)

## Funcionalidades

- Cadastro e autenticação de usuários com JWT
- CRUD de projetos
- CRUD de tarefas com status (PENDING, IN_PROGRESS, DONE)
- Testes automatizados
- CI com GitHub Actions

## Como rodar localmente

### Pré-requisitos

- Node.js 20+
- Docker

### Passo a passo

1. Clone o repositório
   ```bash
   git clone https://github.com/Talinne/orbit-api.git
   cd orbit-api
   ```

2. Instale as dependências
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente
   ```bash
   cp .env.example .env
   ```

4. Suba o banco de dados
   ```bash
   docker compose up -d
   ```

5. Rode as migrations
   ```bash
   npx prisma migrate dev
   ```

6. Inicie o servidor
   ```bash
   npm run dev
   ```

O servidor vai estar rodando em `http://localhost:3333`

## Rotas

### Autenticação
| Método | Rota | Descrição |
|--------|------|-----------|
| POST | /auth/register | Cadastro de usuário |
| POST | /auth/login | Login e geração de token |

### Projetos
| Método | Rota | Descrição |
|--------|------|-----------|
| POST | /projects | Criar projeto |
| GET | /projects | Listar projetos |
| GET | /projects/:id | Buscar projeto por ID |
| PUT | /projects/:id | Atualizar projeto |
| DELETE | /projects/:id | Deletar projeto |

### Tarefas
| Método | Rota | Descrição |
|--------|------|-----------|
| POST | /projects/:projectId/tasks | Criar tarefa |
| GET | /projects/:projectId/tasks | Listar tarefas |
| GET | /projects/:projectId/tasks/:id | Buscar tarefa por ID |
| PUT | /projects/:projectId/tasks/:id | Atualizar tarefa |
| DELETE | /projects/:projectId/tasks/:id | Deletar tarefa |

## Testes

```bash
npm test
```

## Licença

MIT