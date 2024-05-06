import { View, Text, TextInput, type TextInputProps, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants'
import { router, usePathname } from 'expo-router'

type Props = {
  initialQuery?: string
}

const SearchInput = ({ initialQuery = '' }: Props) => {
  const pathName = usePathname()
  const [query, setQuery] = useState(initialQuery)

  return (
    <View className='focus:border-secondary space-x-4 w-full flex-row items-center rounded-2xl border-2 border-black-200 bg-black-100 px-4 h-16'>
      <TextInput
        value={query}
        className='text-base mt-0.5 text-white flex-1 font-p-regular'
        placeholder='Search for a videos topic'
        placeholderTextColor='#CDCDE0'
        onChangeText={(e) => setQuery(e)}
      />

      <TouchableOpacity
        onPress={() => {
          if (!query) {
            return Alert.alert('Please input something to search.')
          }

          if (!pathName.startsWith('/search')) {
            setQuery('')
          }

          router.push(`/search/${query}`)
        }}
      >
        <Image source={icons.search} className='w-5 h-5' resizeMode='contain' />
      </TouchableOpacity>
    </View>
  )
}

export default SearchInput
