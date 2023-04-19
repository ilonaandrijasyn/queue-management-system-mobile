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
import { z } from 'zod'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.grey.background
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

export const ticketIdSchema = z.string().uuid()

type Props = NativeStackScreenProps<RootStackParamList, 'QueueInfo'>

export default function QueueInfo({ route }: Props) {
  const { officeId, serviceId } = route.params
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
  } = useQuery(`get_my_ticket/${serviceId}`, async () => await getMyTicket(serviceId))

  useEffect(() => {
    socket.on(`ON_DELETE_TICKETS/${officeId}`, (data: unknown) => {
      const parserResponse = z.array(ticketSchema).safeParse(data)
      if (parserResponse.success) {
        const tickets = parserResponse.data
        const isMyTicket = tickets.some((ticket) => ticket.id === myTicket?.id)
        if (isMyTicket) {
          void queryClient.invalidateQueries([`get_my_ticket/${serviceId}`])
        }
        setTickets((prevState) => {
          return prevState.filter((prevTicket) => !tickets.some((removedTicket) => prevTicket.id === removedTicket.id))
        })
      }
    })

    socket.on(`ON_UPDATE_QUEUE/${serviceId}`, (data: unknown) => {
      const parserResponse = ticketSchema.safeParse(data)
      if (parserResponse.success) {
        const ticket = parserResponse.data
        if (ticket.state === TicketState.CREATED) {
          setTickets((prevState) => [...prevState, ticket])
          return
        }
        if (ticket.state === TicketState.PROCESSING) {
          if (myTicket?.id === ticket.id) {
            void queryClient.invalidateQueries([`get_my_ticket/${serviceId}`])
          }
          setTickets((prevState) => {
            return prevState.map((prevTicket) => {
              if (prevTicket.id === ticket.id) {
                return ticket
              }
              return prevTicket
            })
          })
        }
      }
    })

    socket.on(`ON_DONE_TICKET/${serviceId}`, (data: unknown) => {
      const parserResponse = ticketIdSchema.safeParse(data)
      if (parserResponse.success) {
        const ticketId = parserResponse.data
        if (myTicket?.id === ticketId) {
          void queryClient.invalidateQueries([`get_my_ticket/${serviceId}`])
        }
        setTickets((prevState) => {
          return prevState.filter((prevTicket) => prevTicket.id !== ticketId)
        })
      }
    })

    return () => {
      socket.off(`ON_DELETE_TICKETS/${officeId}`)
      socket.off(`ON_UPDATE_QUEUE/${serviceId}`)
      socket.off(`ON_DONE_TICKET/${serviceId}`)
    }
  }, [serviceId, myTicket?.id])

  const getTicketsBeforeMe = () => {
    if (myTicket === undefined || myTicket === null) {
      return tickets.length
    }
    return tickets.filter((t) => t.dateCreated <= myTicket.dateCreated).length - 1
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.info}>
          {isLoadingMyTicket || isFetchingMyTicket || isIdleMyTicket ? (
            <Typography variant="h2">Načítám...</Typography>
          ) : isErrorMyTicket ? (
            <Typography variant="h2">Chyba</Typography>
          ) : (
            <Ticket
              ticket={myTicket}
              ticketsNum={getTicketsBeforeMe()}
              ticketsBeforeMe={getTicketsBeforeMe()}
              serviceId={serviceId}
            />
          )}
        </View>
        <TicketsTable tickets={tickets} />
      </View>
    </ScrollView>
  )
}
