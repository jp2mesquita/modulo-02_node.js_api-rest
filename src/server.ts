import fasfify from 'fastify'
import { env } from './env'
import { transactionsRoutes } from './routes/transactions'

const app = fasfify()

app.register(transactionsRoutes)

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('http server running...')
  })
