import { View, Text, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import Button from '../../components/button'
import { Link } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormFiled from '../../components/form-field'
import { images } from '../../constants'
import { createUser } from '../../lib/appwrite'

const SignUp = () => {
  const [formValues, setFormValues] = useState({
    username: '',
    email: '',
    password: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = () => {
    if (isSubmitting) return

    setIsSubmitting(true)

    createUser()

    setIsSubmitting(false)
  }

  return (
    <SafeAreaView className='h-full bg-primary'>
      <ScrollView>
        <View className='my-6 min-h-[85vh] w-full justify-center px-4'>
          <Image source={images.logo} resizeMode='contain' className='h-[35px] w-[115px]' />

          <Text className='mt-10 font-p-semibold text-2xl text-white'>Sign up to Aora</Text>

          <FormFiled
            label='Username'
            value={formValues.username}
            onChangeText={(e) =>
              setFormValues((prev) => ({
                ...prev,
                username: e
              }))
            }
            otherStyles='mt-10'
          />

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

          <Button title='Sign Up' onPress={handleSubmit} containerStyles='mt-7' isLoading={isSubmitting} />

          <View className='flex-row flex-wrap items-center justify-center gap-2 pt-5'>
            <Text className='font-p-regular text-lg text-gray-100'>Have an account already?</Text>
            <Link href='/sign-in' className='font-p-semibold text-lg text-secondary-100'>
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp
