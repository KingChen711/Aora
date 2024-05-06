import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, Image, FlatList, TouchableOpacity, Text } from 'react-native'

import { icons } from '../../constants'
import { useGlobal } from '../../contexts/global-context'
import useAppwrite from '../../hooks/use-appwrite'
import { getUserPosts, signOut } from '../../lib/appwrite'
import VideoCard from '../../components/video-card'
import EmptyState from '../../components/empty-state'
import InfoBox from '../../components/info-box'

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobal()
  const { data: posts, loading } = useAppwrite([], () => getUserPosts(user?.$id))

  const logout = async () => {
    await signOut()
    setUser(null)
    setIsLoggedIn(false)

    router.replace('/sign-in')
  }

  if (loading) {
    return (
      <SafeAreaView className='bg-primary h-full'>
        <View className='w-full flex justify-center items-center mt-6 mb-12 px-4'>
          <TouchableOpacity onPress={logout} className='flex w-full items-end mb-10'>
            <Image source={icons.logout} resizeMode='contain' className='w-6 h-6' />
          </TouchableOpacity>

          <View className='w-16 h-16 border border-secondary rounded-lg flex justify-center items-center'>
            <Image source={{ uri: user?.avatar }} className='w-[90%] h-[90%] rounded-lg' resizeMode='cover' />
          </View>

          <InfoBox title={user?.username} containerStyles='mt-5' titleStyles='text-lg' />

          <View className='mt-5 flex flex-row'>
            <InfoBox loadingSubtitle subtitle='Posts' titleStyles='text-xl' containerStyles='mr-10' />
            <InfoBox loadingSubtitle subtitle='Followers' titleStyles='text-xl' />
          </View>
        </View>
        <Text className='text-white text-3xl'>Loading</Text>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListEmptyComponent={() => <EmptyState title='No Videos Found' subtitle='No videos found for this profile' />}
        ListHeaderComponent={() => (
          <View className='w-full flex justify-center items-center mt-6 mb-12 px-4'>
            <TouchableOpacity onPress={logout} className='flex w-full items-end mb-10'>
              <Image source={icons.logout} resizeMode='contain' className='w-6 h-6' />
            </TouchableOpacity>

            <View className='w-16 h-16 border border-secondary rounded-lg flex justify-center items-center'>
              <Image source={{ uri: user?.avatar }} className='w-[90%] h-[90%] rounded-lg' resizeMode='cover' />
            </View>

            <InfoBox title={user?.username} containerStyles='mt-5' titleStyles='text-lg' />

            <View className='mt-5 flex flex-row'>
              <InfoBox title={posts.length || 0} subtitle='Posts' titleStyles='text-xl' containerStyles='mr-10' />
              <InfoBox title='1.2k' subtitle='Followers' titleStyles='text-xl' />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  )
}

export default Profile
