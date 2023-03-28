import React from 'react'
import { StatusBar, StyleSheet, TouchableOpacity } from 'react-native'
import { palette } from '../../helpers/theme'
import { type ItemData } from './types'
import Typography from '../Typography'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight ?? 0
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: palette.gov.yellow.main,
    borderRadius: 8
  },
  title: {
    color: palette.gov.grey.dark
  }
})

const ListBoxItem = ({ item, onSelect }: { item: ItemData; onSelect: (id: string) => void }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onSelect(item.id)
      }}
      style={styles.item}
    >
      <Typography variant="h2" otherStyles={styles.title}>
        {item.name}
      </Typography>
    </TouchableOpacity>
  )
}
export default ListBoxItem
