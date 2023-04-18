import React from 'react'
import { FlatList, SafeAreaView, StatusBar, StyleSheet } from 'react-native'
import ListBoxItem from './ListBoxItem'
import { type ItemData } from './types'

const BoxList = ({ data, onSelectItem }: { data: ItemData[]; onSelectItem: (id: ItemData) => void }) => {
  const renderItem = ({ item }: { item: ItemData }) => {
    return (
      <ListBoxItem
        item={item}
        onSelect={() => {
          onSelectItem(item)
        }}
      />
    )
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
    width: '100%',
    marginTop: StatusBar.currentHeight ?? 0
  }
})

export default BoxList
