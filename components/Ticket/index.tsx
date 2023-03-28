import React from 'react'
import { StyleSheet, View } from 'react-native'
import Button from '../Button'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { createTicket, getMyTicket } from '../../requests/tickets'
import Typography from '../Typography'

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
  const queryClient = useQueryClient()

  const { isLoading, isFetching, isError, isIdle, data } = useQuery(
    'get_my_ticket',
    async () => await getMyTicket(serviceId)
  )

  const mutationCreateTicket = useMutation('generate_ticket', createTicket, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['get_my_ticket'])
    }
  })

  if (isLoading || isFetching || isIdle) {
    return <Typography variant="h2">Načítám...</Typography>
  }

  if (isError) {
    return <Typography variant="h2">Chyba</Typography>
  }

  const handleGenerateTicketPress = () => {
    mutationCreateTicket.mutate(serviceId)
  }

  return data === null ? (
    <Button onPress={handleGenerateTicketPress}>{'Vygenerovat lístek'}</Button>
  ) : (
    <View>
      <Typography variant="h2">{'Můj lístek:'}</Typography>
      <Typography variant="h2" otherStyles={styles.ticketId}>
        {data.id}
      </Typography>
    </View>
  )
}
