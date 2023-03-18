import React from 'react'
import { StatusBar, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { palette } from '../../helpers/theme'
import { type ItemData } from './types'

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
    fontSize: 32,
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
      <Text style={styles.title}>{item.name}</Text>
    </TouchableOpacity>
  )
}
export default ListBoxItem
