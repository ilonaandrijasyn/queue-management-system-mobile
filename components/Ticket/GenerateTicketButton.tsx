import React from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { createTicket, getMyTicketsCount } from '../../requests/tickets'
import Button from '../Button'
import Typography from '../Typography'
import { StyleSheet, View } from 'react-native'
import { palette } from '../../helpers/theme'

const styles = StyleSheet.create({
  limitError: {
    color: palette.error.main,
    fontWeight: 'bold',
    marginBottom: 8
  }
})

interface TicketProps {
  serviceId: string
}

export default function GenerateTicketButton({ serviceId }: TicketProps) {
  const queryClient = useQueryClient()

  const { isLoading, isError, isIdle, data } = useQuery('get_my_tickets_count', getMyTicketsCount)

  const mutationCreateTicket = useMutation('generate_ticket', createTicket, {
    onSuccess: async () => {
      await queryClient.invalidateQueries([`get_my_ticket/${serviceId}`])
    }
  })

  const handleGenerateTicketPress = () => {
    mutationCreateTicket.mutate(serviceId)
  }

  const reachedLimit = data === 5

  return (
    <View>
      {reachedLimit && (
        <Typography variant="body" otherStyles={styles.limitError}>
          Můžete si vygenerovat maximálně 5 lístků.
        </Typography>
      )}
      <Button disabled={isLoading || isIdle || isError || reachedLimit} onPress={handleGenerateTicketPress}>
        {'Vygenerovat lístek'}
      </Button>
    </View>
  )
}
