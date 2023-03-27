import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Button from './Button'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { createTicket, getMyTicket } from '../requests/tickets'

const styles = StyleSheet.create({
  button: {
    flex: 0.5,
    justifyContent: 'center'
  },
  text: {
    fontSize: 24
  },
  ticketId: {
    marginTop: 8,
    fontSize: 24,
    fontWeight: 'bold'
  }
})

interface TicketInterface {
  serviceId: string
}

export default function Ticket({ serviceId }: TicketInterface) {
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
    return <Text>Načítám...</Text>
  }

  if (isError) {
    return <Text>Chyba</Text>
  }

  const handleGenerateTicketPress = () => {
    mutationCreateTicket.mutate(serviceId)
  }

  return data === null ? (
    <View style={styles.button}>
      <Button onPress={handleGenerateTicketPress}>{'Vygenerovat lístek'}</Button>
    </View>
  ) : (
    <View>
      <Text style={styles.text}>{'Můj lístek:'}</Text>
      <Text style={styles.ticketId}>{data.id}</Text>
    </View>
  )
}
