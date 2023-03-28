import React, { type PropsWithChildren } from 'react'
import { type StyleProp, StyleSheet, Text, type TextStyle } from 'react-native'

const variants = {
  body: 'body',
  h1: 'h1',
  h2: 'h2'
}

const styles = StyleSheet.create({
  [variants.body]: {
    fontSize: 16
  },
  [variants.h1]: {
    fontSize: 100
  },
  [variants.h2]: {
    fontSize: 32
  }
})

interface TypographyProps {
  variant: keyof typeof variants
  otherStyles?: StyleProp<TextStyle>
}

export default function Typography({ variant, otherStyles = {}, children }: TypographyProps & PropsWithChildren) {
  return <Text style={[styles[variant], otherStyles]}>{children}</Text>
}
