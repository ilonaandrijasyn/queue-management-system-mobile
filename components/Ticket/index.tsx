import React from 'react'
import { StyleSheet, View } from 'react-native'
import Typography from '../Typography'
import GenerateTicketButton from '../GenerateTicketButton'
import { type Ticket as TicketType } from '../../types'

const styles = StyleSheet.create({
  ticketId: {
    marginTop: 8,
    fontWeight: 'bold'
  }
})

interface TicketProps {
  ticket: TicketType
  serviceId: string
}

export default function Ticket({ ticket, serviceId }: TicketProps) {
  return ticket === null ? (
    <GenerateTicketButton serviceId={serviceId} />
  ) : (
    <View>
      <Typography variant="h2">{'Můj lístek:'}</Typography>
      <Typography variant="h2" otherStyles={styles.ticketId}>
        {ticket.ticketNumber}
      </Typography>
    </View>
  )
}
