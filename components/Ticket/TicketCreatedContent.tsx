import React from 'react'
import Typography from '../Typography'
import { styles } from './styles'
import { View } from 'react-native'
import { type Ticket } from '../../types'

interface TicketCreatedContentProps {
  ticketsNum: number
  ticket: Ticket
}

export default function TicketCreatedContent({ ticketsNum, ticket }: TicketCreatedContentProps) {
  return (
    <>
      <Typography variant="h2" otherStyles={styles.text}>
        {'Lidí přede mnou:'}
      </Typography>
      <Typography variant="h2" otherStyles={styles.ticketsNumber}>
        {ticketsNum}
      </Typography>
      <View>
        <Typography variant="h2">{'Můj lístek:'}</Typography>
        <Typography variant="h2" otherStyles={styles.ticketId}>
          {ticket.ticketNumber}
        </Typography>
      </View>
    </>
  )
}
