import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { palette } from '../../helpers/theme'
import Typography from '../Typography'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 48,
    marginBottom: 16,
    borderRadius: 16,
    width: '100%',
    backgroundColor: palette.gov.blue.inactive2
  }
})

const TicketProcessingAlert = ({ ticketNumber, counterName }: { ticketNumber: number; counterName: string }) => {
  return (
    <View style={styles.container}>
      <Typography variant="h2">
        <Text style={{ color: 'rgb(1, 67, 97)' }}>
          {'Váš lístek s číslem '}
          <Text style={{ fontWeight: 'bold' }}>{ticketNumber}</Text>
          {' je přivolán k přepážce '}
          <Text style={{ fontWeight: 'bold' }}>{counterName}</Text>
          {'.'}
        </Text>
      </Typography>
    </View>
  )
}

export default TicketProcessingAlert
