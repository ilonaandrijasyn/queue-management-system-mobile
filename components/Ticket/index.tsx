import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useQuery } from 'react-query'
import { getMyTicket } from '../../requests/tickets'
import Typography from '../Typography'
import GenerateTicketButton from '../GenerateTicketButton'

const styles = StyleSheet.create({
  ticketId: {
    marginTop: 8,
    fontWeight: 'bold'
  }
})

interface TicketProps {
  serviceId: string
}

export default function Ticket({ serviceId }: TicketProps) {
  const { isLoading, isFetching, isError, isIdle, data } = useQuery(
    'get_my_ticket',
    async () => await getMyTicket(serviceId)
  )

  if (isLoading || isFetching || isIdle) {
    return <Typography variant="h2">Načítám...</Typography>
  }

  if (isError) {
    return <Typography variant="h2">Chyba</Typography>
  }

  return data === null ? (
    <GenerateTicketButton serviceId={serviceId} />
  ) : (
    <View>
      <Typography variant="h2">{'Můj lístek:'}</Typography>
      <Typography variant="h2" otherStyles={styles.ticketId}>
        {data.id}
      </Typography>
    </View>
  )
}
