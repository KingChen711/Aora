import { useState } from 'react'
import { router } from 'expo-router'
import { ResizeMode, Video } from 'expo-av'
import * as ImagePicker from 'expo-image-picker'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, Text, Alert, Image, TouchableOpacity, ScrollView } from 'react-native'
import { icons } from '../../constants'
import { useGlobal } from '../../contexts/global-context'
import { Post } from '../../types'
import { createVideoPost } from '../../lib/appwrite'
import FormField from '../../components/form-field'
import Button from '../../components/button'

type TForm = {
  title: string
  video: ImagePicker.ImagePickerAsset | null
  thumbnail: ImagePicker.ImagePickerAsset | null
  prompt: string
}

const Create = () => {
  const { user, setTrigger, trigger } = useGlobal()
  const [uploading, setUploading] = useState(false)
  const [form, setForm] = useState<TForm>({
    title: '',
    video: null,
    thumbnail: null,
    prompt: ''
  })

  const handlePicker = async (selectType: 'image' | 'video') => {
    // const result = await DocumentPicker.getDocumentAsync({
    //   type: selectType === 'image' ? ['image/png', 'image/jpg', 'image/jpeg'] : ['video/mp4', 'video/gif']
    // })

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: selectType === 'image' ? ImagePicker.MediaTypeOptions.Images : ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    })

    if (!result.canceled) {
      if (selectType === 'image') {
        setForm({
          ...form,
          thumbnail: result.assets[0]
        })
      }

      if (selectType === 'video') {
        setForm({
          ...form,
          video: result.assets[0]
        })
      }
    } else {
      setTimeout(() => {
        Alert.alert('Document picked', JSON.stringify(result, null, 2))
      }, 100)
    }
  }

  const submit = async () => {
    if (form.prompt === '' || form.title === '' || !form.thumbnail || !form.video) {
      return Alert.alert('Please provide all fields')
    }
    setUploading(true)
    try {
      await createVideoPost({
        ...form,
        userId: user!.$id
      })
      Alert.alert('Success', 'Post uploaded successfully')

      setTrigger(!trigger)
      router.push('/home')
    } catch (error: any) {
      Alert.alert('Error', error?.message || 'Something went wrong.')
    } finally {
      setForm({
        title: '',
        video: null,
        thumbnail: null,
        prompt: ''
      })
      setUploading(false)
    }
  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView className='px-4 my-6'>
        <Text className='text-2xl text-white font-p-semibold'>Upload Video</Text>

        <FormField
          label='Video Title'
          value={form.title}
          placeholder='Give your video a catchy title...'
          onChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles='mt-10'
        />

        <View className='mt-7 space-y-2'>
          <Text className='text-base text-gray-100 font-p-medium'>Upload Video</Text>

          <TouchableOpacity onPress={() => handlePicker('video')}>
            {form.video ? (
              <Video
                source={{ uri: form.video.uri }}
                className='w-full h-64 rounded-2xl'
                useNativeControls
                resizeMode={ResizeMode.COVER}
                isLooping
              />
            ) : (
              <View className='w-full h-40 px-4 bg-black-100 rounded-2xl flex justify-center items-center border border-dashed border-secondary-100'>
                <Image source={icons.upload} resizeMode='contain' alt='upload' className='w-10 h-10' />
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View className='mt-7 space-y-2'>
          <Text className='text-base text-gray-100 font-p-medium'>Thumbnail Image</Text>

          <TouchableOpacity onPress={() => handlePicker('image')}>
            {form.thumbnail ? (
              <Image source={{ uri: form.thumbnail.uri }} resizeMode='cover' className='w-full h-64 rounded-2xl' />
            ) : (
              <View className='w-full h-40 px-4 bg-black-100 rounded-2xl flex justify-center items-center border border-dashed border-secondary-100'>
                <Image source={icons.upload} resizeMode='contain' alt='upload' className='w-10 h-10' />
              </View>
            )}
          </TouchableOpacity>
        </View>

        <FormField
          label='AI Prompt'
          value={form.prompt}
          placeholder='The AI prompt of your video....'
          onChangeText={(e) => setForm({ ...form, prompt: e })}
          otherStyles='mt-7'
        />

        <Button title='Submit & Publish' onPress={submit} containerStyles='mt-7' isLoading={uploading} />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Create
