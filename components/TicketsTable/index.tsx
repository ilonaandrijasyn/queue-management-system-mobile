import React from 'react'
import { View, StyleSheet } from 'react-native'
import { DataTable } from 'react-native-paper'
import { type Tickets } from '../../types'
import Typography from '../Typography'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    paddingBottom: 120,
    paddingHorizontal: 8,
    width: '100%'
  },
  title: {
    textAlign: 'center'
  },
  head: {
    height: 44,
    width: '100%'
  },
  row: {
    height: 40,
    width: '100%'
  }
})

const TicketsTable = ({ tickets }: { tickets: Tickets }) => {
  return (
    <View style={styles.container}>
      <Typography variant="h2" otherStyles={styles.title}>
        Aktuální fronta
      </Typography>
      <DataTable>
        <DataTable.Header style={styles.head}>
          <DataTable.Title>Číslo</DataTable.Title>
          <DataTable.Title>Přepážka</DataTable.Title>
        </DataTable.Header>
        {tickets.map((ticket) => (
          <DataTable.Row key={ticket.id} style={styles.row}>
            <DataTable.Cell>{ticket.ticketNumber}</DataTable.Cell>
            <DataTable.Cell>{ticket.counter?.name}</DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </View>
  )
}

export default TicketsTable
