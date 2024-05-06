import { View, Text, Image } from 'react-native'
import React from 'react'
import { images } from '../constants'
import Button from './button'
import { router } from 'expo-router'

type Props = {
  title: string
  subtitle?: string
}

const EmptyState = ({ title, subtitle }: Props) => {
  return (
    <View className='justify-center items-center px-4'>
      <Image source={images.empty} className='w-[270px] h-[210px]' resizeMode='contain' />
      <Text className='text-xl font-p-semibold text-white mt-2'>{title}</Text>
      <Text className='font-p-medium text-sm text-gray-100'>{subtitle}</Text>

      <Button title='Create video' onPress={() => router.push('/create')} containerStyles='w-full my-5'></Button>
    </View>
  )
}

export default EmptyState
