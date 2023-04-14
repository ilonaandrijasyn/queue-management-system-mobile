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
    backgroundColor: palette.yellow.main
  },
  text: {
    fontSize: 36,
    color: palette.grey.dark
  },
  disabled: {
    opacity: 0.5
  }
})

interface ButtonProps {
  onPress: () => void
  disabled?: boolean
}

const Button = ({ onPress, disabled = false, children }: ButtonProps & PropsWithChildren) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[styles.button, ...(disabled ? [styles.disabled] : [])]}
      onPress={onPress}
    >
      <Typography variant="h2" otherStyles={styles.text}>
        {children}
      </Typography>
    </TouchableOpacity>
  )
}

export default Button
