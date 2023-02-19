import React from 'react'
import { StatusBar, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { palette } from '../../helpers/theme'

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
    border: '1 transparent',
    borderRadius: 8
  },
  title: {
    fontSize: 32,
    color: palette.gov.grey.dark
  }
})

interface ItemData {
  id: string
  title: string
}

const ListBoxItem = ({ item, onSelect }: { item: ItemData; onSelect: () => void }) => {
  return (
    <TouchableOpacity onPress={onSelect} style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  )
}
export default ListBoxItem
