import { execSync } from 'child_process'
import dotenv from 'dotenv'
import path from 'path'
//Força o carregamento do arquivo .env.test para garantir que as variáveis de ambiente corretas sejam usadas durante os testes
dotenv.config({ path: path.resolve(__dirname, '../.env.test') })

beforeEach(async () => {
    // Redefine o banco de dados antes de cada teste para garantir que os testes sejam independentes
    execSync('npx prisma migrate reset --force --skip-seed', { 
        env: { 
            ...process.env, 
            DATABASE_URL: process.env.DATABASE_URL

        }
    })
})