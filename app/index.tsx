import { Animated, Easing, Image, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { icons, images } from '../constants'
import Button from '../components/button'
import { Redirect, router } from 'expo-router'
import { useGlobal } from '../contexts/global-context'
import { useEffect } from 'react'

export default function App() {
  const { isLoading, isLoggedIn } = useGlobal()

  let rotateValueHolder = new Animated.Value(0)

  const RotatedData = rotateValueHolder.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  })

  useEffect(() => {
    const startImageRotate = () => {
      rotateValueHolder.setValue(0),
        Animated.timing(rotateValueHolder, {
          toValue: 1,
          duration: 1500,
          easing: Easing.linear,
          useNativeDriver: false
        }).start(() => startImageRotate())
    }

    startImageRotate()
  }, [])

  if (!isLoading && isLoggedIn) {
    return <Redirect href='/home' />
  }

  return (
    <SafeAreaView className='h-full bg-primary relative'>
      {isLoading && (
        <View className='fixed w-full h-full z-10 flex justify-center items-center'>
          <Image source={images.logo} className='h-[84px] w-[130px]' resizeMode='contain' />
          <Animated.Image
            style={[{ transform: [{ rotate: RotatedData }] }]}
            source={icons.loading}
            className='h-14 w-14'
            resizeMode='contain'
          />
        </View>
      )}

      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className='min-h-[85vh] w-full items-center justify-center px-4'>
          <Image source={images.logo} className='h-[84px] w-[130px]' resizeMode='contain' />

          <Image source={images.cards} className='h-[300px] w-full max-w-[380px]' resizeMode='contain' />

          <View className='relative mt-5'>
            <Text className='text-center text-3xl font-bold text-white'>
              Discover Endless Possibilities with <Text className='text-secondary-200'>Aora</Text>
            </Text>

            {/* <Image
                source={images.path}
                className='absolute -bottom-2 -right-8 h-[15px] w-[136px]'
                resizeMode='contain'
              /> */}
          </View>

          <Text className='mt-7 text-center font-p-regular text-sm text-gray-100'>
            Where creative meets innovation: embark on a journey of limitless exploration with Aora
          </Text>

          <Button onPress={() => router.push('/sign-in')} containerStyles='mt-7 w-full' title='Continue with Email' />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
