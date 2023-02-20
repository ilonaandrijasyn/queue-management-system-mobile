import React from 'react'
import { FlatList, SafeAreaView, StatusBar, StyleSheet } from 'react-native'
import ListBoxItem from './ListBoxItem'
import { type ItemData } from './types'

const BoxList = ({ data, onSelectItem }: { data: ItemData[]; onSelectItem: (id: string) => void }) => {
  const renderItem = ({ item }: { item: ItemData }) => {
    return <ListBoxItem item={item} onSelect={onSelectItem} />
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList data={data} renderItem={renderItem} keyExtractor={(item) => item.id} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight ?? 0
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16
  },
  title: {
    fontSize: 32
  }
})

export default BoxList
