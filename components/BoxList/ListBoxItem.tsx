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
    padding: 16,
    marginVertical: 16,
    marginHorizontal: 16,
    backgroundColor: palette.yellow.main,
    shadowColor: palette.grey.dark,
    shadowOffset: { width: -2, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderRadius: 10
  },
  title: {
    color: palette.grey.dark
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
