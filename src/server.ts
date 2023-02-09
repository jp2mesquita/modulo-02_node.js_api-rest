import fasfify from 'fastify'

const app = fasfify()

app.get('/hello', () => {
  return 'Hello world'
})

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('http server running...')
  })
