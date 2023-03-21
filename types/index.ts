import { z } from 'zod'
import { TicketState } from '../helpers/consts'

export const ticketSchema = z.object({
  id: z.string().uuid(),
  service: z.object({
    id: z.string().uuid(),
    name: z.string()
  }),
  state: z.nativeEnum(TicketState),
  counter: z.nullable(
    z.object({
      id: z.string().uuid(),
      name: z.string()
    })
  )
})

export const ticketsSchema = z.array(ticketSchema)

export type Tickets = z.infer<typeof ticketsSchema>
