import React from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { createTicket, getMyTicketsCount } from '../requests/tickets'
import Button from './Button'

interface TicketProps {
  serviceId: string
}

export default function GenerateTicketButton({ serviceId }: TicketProps) {
  const queryClient = useQueryClient()

  const { isLoading, isError, isIdle, data } = useQuery('get_my_tickets_count', getMyTicketsCount)

  const mutationCreateTicket = useMutation('generate_ticket', createTicket, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['get_my_ticket'])
    }
  })

  const handleGenerateTicketPress = () => {
    mutationCreateTicket.mutate(serviceId)
  }

  return (
    <Button disabled={isLoading || isIdle || isError || data === 5} onPress={handleGenerateTicketPress}>
      {'Vygenerovat lístek'}
    </Button>
  )
}
