import { StyleSheet } from 'react-native'
import { palette } from './theme'

export const commonStyles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: palette.grey.background,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
