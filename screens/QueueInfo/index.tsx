import React, { useContext, useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { palette } from '../../helpers/theme'
import { type NativeStackScreenProps } from '@react-navigation/native-stack'
import { type RootStackParamList } from '../../App'
import Button from '../../components/Button'
import { useQuery } from 'react-query'
import { type Tickets, ticketSchema } from '../../types'
import { getAllTicketsForService } from '../../requests/tickets'
import TicketsTable from '../../components/TicketsTable'
import { WebsocketContext } from '../../contexts/WebsocketContext'
import { TicketState } from '../../helpers/consts'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.gov.grey.background,
    alignItems: 'center'
  },
  button: {
    flex: 0.5,
    justifyContent: 'center'
  },
  text: {
    // TODO maybe set this globally
    fontSize: 16,
    paddingTop: 50
  }
})

type Props = NativeStackScreenProps<RootStackParamList, 'QueueInfo'>

export default function QueueInfo({ route }: Props) {
  const { serviceId, officeId } = route.params
  const socket = useContext(WebsocketContext)

  const [tickets, setTickets] = useState<Tickets>([])

  useQuery('get_all_tickets', async () => await getAllTicketsForService(serviceId), {
    onSuccess: (data) => {
      setTickets(data)
    }
  })

  useEffect(() => {
    socket.on(`ON_UPDATE_QUEUE/${officeId}/${serviceId}`, (data: unknown) => {
      const parserResponse = ticketSchema.safeParse(data)
      if (parserResponse.success) {
        const ticket = parserResponse.data
        if (ticket.state === TicketState.CREATED) {
          setTickets((prevState) => [...prevState, ticket])
          return
        }
        if (ticket.state === TicketState.PROCESSING) {
          setTickets((prevState) => {
            return prevState.filter((prevTicket) => prevTicket.id !== ticket.id)
          })
        }
      }
    })

    return () => {
      console.log('unmount')
      socket.off(`ON_UPDATE_QUEUE/${officeId}/${serviceId}`)
    }
  }, [])

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.text}>
          {'There is currently '}
          {tickets.length}
          {' people before you'}
        </Text>
        <View style={styles.button}>
          <Button>{'Generate ticket'}</Button>
        </View>
        <TicketsTable tickets={tickets} />
      </View>
    </ScrollView>
  )
}
