import { Text, TouchableOpacity } from 'react-native'
import React from 'react'

type Props = {
  onPress?: () => void
  containerStyles?: string
  textStyles?: string
  title: string
  isLoading?: boolean
}

const Button = ({ title, onPress, textStyles, containerStyles, isLoading = false }: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      className={`min-h-[62px] items-center justify-center rounded-xl bg-secondary ${containerStyles} ${isLoading && 'opacity-50'}`}
      disabled={isLoading}
    >
      <Text className={`font-p-semibold text-lg text-primary ${textStyles}`}>{title}</Text>
    </TouchableOpacity>
  )
}

export default Button
