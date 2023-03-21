import { z } from 'zod'

export const ticketSchema = z.object({
  id: z.string().uuid(),
  service: z.object({
    id: z.string().uuid(),
    name: z.string()
  }),
  counter: z.nullable(
    z.object({
      id: z.string().uuid(),
      name: z.string()
    })
  )
})

export const ticketsSchema = z.array(ticketSchema)

export type Tickets = z.infer<typeof ticketsSchema>
