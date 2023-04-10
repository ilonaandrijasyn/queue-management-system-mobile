import React, { useContext, useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { palette } from '../../helpers/theme'
import { type NativeStackScreenProps } from '@react-navigation/native-stack'
import { type RootStackParamList } from '../../App'
import { useQuery, useQueryClient } from 'react-query'
import { type Tickets, ticketSchema } from '../../types'
import { getAllTicketsForService, getMyTicket } from '../../requests/tickets'
import TicketsTable from '../../components/TicketsTable'
import { WebsocketContext } from '../../contexts/WebsocketContext'
import { TicketState } from '../../helpers/consts'
import Ticket from '../../components/Ticket'
import Typography from '../../components/Typography'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.gov.grey.background
  },
  info: {
    paddingLeft: 24,
    paddingRight: 24
  },
  text: {
    paddingTop: 24
  },
  ticketsNumber: {
    fontWeight: 'bold',
    marginBottom: 48
  }
})

type Props = NativeStackScreenProps<RootStackParamList, 'QueueInfo'>

export default function QueueInfo({ route }: Props) {
  const { serviceId, officeId } = route.params
  const socket = useContext(WebsocketContext)
  const queryClient = useQueryClient()

  const [tickets, setTickets] = useState<Tickets>([])

  useQuery('get_all_tickets', async () => await getAllTicketsForService(serviceId), {
    onSuccess: (data) => {
      setTickets(data)
    }
  })

  const {
    isLoading: isLoadingMyTicket,
    isFetching: isFetchingMyTicket,
    isError: isErrorMyTicket,
    isIdle: isIdleMyTicket,
    data: myTicket
  } = useQuery('get_my_ticket', async () => await getMyTicket(serviceId))

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
          if (myTicket?.id === ticket.id) {
            void queryClient.invalidateQueries(['get_my_ticket'])
          }
          setTickets((prevState) => {
            return prevState.filter((prevTicket) => prevTicket.id !== ticket.id)
          })
        }
      }
    })

    return () => {
      socket.off(`ON_UPDATE_QUEUE/${officeId}/${serviceId}`)
    }
  }, [])

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.info}>
          {isLoadingMyTicket || isFetchingMyTicket || isIdleMyTicket ? (
            <Typography variant="h2">Načítám...</Typography>
          ) : isErrorMyTicket ? (
            <Typography variant="h2">Chyba</Typography>
          ) : (
            <Ticket ticket={myTicket} ticketsNum={tickets.length} serviceId={serviceId} />
          )}
        </View>
        <TicketsTable tickets={tickets} />
      </View>
    </ScrollView>
  )
}
