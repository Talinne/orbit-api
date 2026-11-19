import dotenv from 'dotenv'
import app from './server'

dotenv.config()

const PORT = process.env.PORT || 3333

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})