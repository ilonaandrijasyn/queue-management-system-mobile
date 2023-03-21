import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { palette } from '../../helpers/theme'
import { type NativeStackScreenProps } from '@react-navigation/native-stack'
import { type RootStackParamList } from '../../App'
import Button from '../../components/Button'
import { useQuery } from 'react-query'
import { type Tickets } from '../../types'
import { getAllTicketsForService } from '../../requests/tickets'

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
  const { serviceId } = route.params

  const [tickets, setTickets] = useState<Tickets>([])

  useQuery('get_all_tickets', async () => await getAllTicketsForService(serviceId), {
    onSuccess: (data) => {
      setTickets(data)
    }
  })

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{'There is currently x people before you'}</Text>
      <View style={styles.button}>
        <Button>{'Generate ticket'}</Button>
      </View>
    </View>
  )
}
