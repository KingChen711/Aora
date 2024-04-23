import { View, Text, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormFiled from '../../components/form-field'
import Button from '../../components/button'
import { Link } from 'expo-router'

const SignIn = () => {
  const [formValues, setFormValues] = useState({
    email: '',
    password: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = () => {
    if (isSubmitting) return

    setIsSubmitting(true)
  }

  return (
    <SafeAreaView className='h-full bg-primary'>
      <ScrollView>
        <View className='my-6 min-h-[85vh] w-full justify-center px-4'>
          <Image source={images.logo} resizeMode='contain' className='h-[35px] w-[115px]' />

          <Text className='mt-10 font-p-semibold text-2xl text-white'>Log in to Aora</Text>

          <FormFiled
            label='Email'
            value={formValues.email}
            onChangeText={(e) =>
              setFormValues((prev) => ({
                ...prev,
                email: e
              }))
            }
            otherStyles='mt-7'
            keyboardType='email-address'
          />

          <FormFiled
            label='Password'
            value={formValues.password}
            onChangeText={(e) =>
              setFormValues((prev) => ({
                ...prev,
                password: e
              }))
            }
            otherStyles='mt-7'
          />

          <Button title='Sign In' onPress={handleSubmit} containerStyles='mt-7' isLoading={isSubmitting} />

          <View className='flex-row flex-wrap items-center justify-center gap-2 pt-5'>
            <Text className='font-p-regular text-lg text-gray-100'>Don&apos;t have an account?</Text>
            <Link href='/sign-up' className='font-p-semibold text-lg text-secondary-100'>
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn
