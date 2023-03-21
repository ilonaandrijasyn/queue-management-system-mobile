import React, { type PropsWithChildren } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { palette } from '../../helpers/theme'

const styles = StyleSheet.create({
  button: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: palette.gov.yellow.main
  },
  text: {
    fontSize: 40,
    color: palette.gov.grey.dark
  }
})

const Button = ({ children }: PropsWithChildren) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        console.log('clicked button')
      }}
    >
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  )
}

export default Button
