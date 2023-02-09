import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import { z } from 'zod'
import { randomUUID } from 'node:crypto'

export async function transactionsRoutes(app: FastifyInstance) {
  app.post('/', async (req, res) => {
    const createTransactionsBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    })

    const { amount, title, type } = createTransactionsBodySchema.parse(req.body)

    await knex('transactions').insert({
      id: randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
    })

    return res.status(201).send()
  })

  app.get('/', async () => {
    const transactions = await knex('transactions').select()

    return {
      transactions,
    }
  })

  app.get('/summary', async () => {
    const summary = await knex('transactions')
      .sum('amount', { as: 'amount' })
      .first()

    return {
      summary,
    }
  })

  app.get('/:id', async (req, res) => {
    const getTransactionsParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const params = getTransactionsParamsSchema.parse(req.params)

    const { id } = params

    const transaction = await knex('transactions').where('id', id).first()

    return {
      transaction,
    }
  })
}
