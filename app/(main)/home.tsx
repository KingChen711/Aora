import { View, Text, FlatList, Image, RefreshControl, Alert } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import SearchInput from '../../components/search-input'
import Trending from '../../components/trending'
import EmptyState from '../../components/empty-state'
import { Post } from '../../types'
import { getAllPosts, getLatestPosts } from '../../lib/appwrite'
import useAppwrite from '../../hooks/use-appwrite'
import VideoCard from '../../components/video-card'
import { useFocusEffect } from 'expo-router'
import { useGlobal } from '../../contexts/global-context'

const Home = () => {
  const [refreshing, setRefreshing] = useState(false)
  const { data: posts, loading, refetch } = useAppwrite<Post[]>([], getAllPosts)

  const { trigger } = useGlobal()

  const {
    data: latestPosts,
    loading: latestPostsLoading,
    refetch: refetchTrending
  } = useAppwrite<Post[]>([], getLatestPosts)

  useEffect(() => {
    const handleFocus = async () => {
      refetchTrending()
      refetch()
    }

    handleFocus()
  }, [trigger])

  useEffect(() => {}, [trigger])

  useEffect(() => {}, [posts])
  useEffect(() => {}, [latestPosts])

  const handleRefresh = async () => {
    if (refreshing) return //no reentrancy

    setRefreshing(true)
    await refetch()
    setRefreshing(false)
  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <View className='mt-6 px-4 space-y-6 mb-4'>
        <View className='justify-between items-start flex-row mb-6'>
          <View>
            <Text className='font-p-medium text-sm text-gray-100'>Welcome Back</Text>
            <Text className='text-2xl font-p-semibold text-white'>King Chen</Text>
          </View>

          <View className='mt-1.5'>
            <Image source={images.logoSmall} className='w-9 h-10' resizeMode='contain' />
          </View>
        </View>

        <SearchInput />
      </View>

      {!loading && !latestPostsLoading ? (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => <VideoCard video={item} />}
          ListHeaderComponent={() => (
            <View className='mb-6 px-4 space-y-6'>
              <View className='w-full pb-8'>
                <Text className='text-gray-100 text-lg font-p-regular mb-3'>Latest Videos</Text>

                <Trending posts={latestPosts} />
              </View>
            </View>
          )}
          ListEmptyComponent={() => <EmptyState title='No Videos Found' subtitle='Be the first one to upload videos' />}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor={'white'} />}
        >
          Home
        </FlatList>
      ) : (
        // TODO:SKELETON
        <Text className='text-white'>Loading...</Text>
      )}
    </SafeAreaView>
  )
}

export default Home
