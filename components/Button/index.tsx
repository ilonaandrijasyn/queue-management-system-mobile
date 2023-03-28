import React, { type PropsWithChildren } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { palette } from '../../helpers/theme'
import Typography from '../Typography'

const styles = StyleSheet.create({
  button: {
    padding: 16,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
    backgroundColor: palette.gov.yellow.main
  },
  text: {
    fontSize: 36,
    color: palette.gov.grey.dark
  }
})

const Button = ({ onPress, children }: { onPress: () => void } & PropsWithChildren) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Typography variant="h2" otherStyles={styles.text}>
        {children}
      </Typography>
    </TouchableOpacity>
  )
}

export default Button
