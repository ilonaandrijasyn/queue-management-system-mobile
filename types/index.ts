import { z } from 'zod'
import { TicketState } from '../helpers/consts'

export const ticketSchema = z.object({
  id: z.string().uuid(),
  ticketNumber: z.number(),
  dateCreated: z.string().datetime({ offset: true }),
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

export type Ticket = z.infer<typeof ticketSchema>

export const myTicketSchema = z.preprocess((data) => (data === '' ? null : data), z.nullable(ticketSchema))
export type TicketNullable = z.infer<typeof myTicketSchema>

export const ticketsSchema = z.array(ticketSchema)

export type Tickets = z.infer<typeof ticketsSchema>
