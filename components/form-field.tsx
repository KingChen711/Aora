import { View, Text, TextInput, type TextInputProps, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants'

type Props = TextInputProps & {
  label: string
  otherStyles: string
}

const FormField = ({ label, otherStyles, ...props }: Props) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className='font-p-medium text-base text-gray-100'>{label}</Text>

      <View className='h-16 w-full flex-row items-center rounded-2xl border-2 border-black-200 bg-black-100 px-4 focus:border-secondary'>
        <TextInput
          {...props}
          className='flex-1 font-p-semibold text-base text-white'
          placeholderTextColor='#7b7b8b'
          secureTextEntry={label === 'Password' ? !showPassword : false}
        />

        {label === 'Password' && (
          <TouchableOpacity onPress={() => setShowPassword((prev) => !prev)}>
            <Image source={!showPassword ? icons.eye : icons.eyeHide} className='h-6 w-6' resizeMode='contain' />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default FormField
