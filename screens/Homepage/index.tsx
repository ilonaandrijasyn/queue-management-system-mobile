import React from 'react'
import { StyleSheet, View } from 'react-native'
import MyList from '../../components/List'
import { palette } from '../../helpers/theme'

export default function Homepage() {
  return (
    <View style={styles.container}>
      <MyList />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.gov.blue.dark,
    alignItems: 'center',
    justifyContent: 'center'
  },
  list: {
    color: 'red',
    backgroundColor: 'blue'
  }
})
