import { useEffect } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { View, Text, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import useAppwrite from '../../../hooks/use-appwrite'
import { getAllPosts, searchPosts } from '../../../lib/appwrite'
import { Post } from '../../../types'
import VideoCard from '../../../components/video-card'
import SearchInput from '../../../components/search-input'
import EmptyState from '../../../components/empty-state'

const Search = () => {
  const { query } = useLocalSearchParams()
  const { data: posts, refetch, fetching } = useAppwrite<Post[]>([], () => searchPosts(query))

  useEffect(() => {
    refetch()
  }, [query])

  return (
    <SafeAreaView className='bg-primary h-full'>
      <View className='flex my-6 px-4'>
        <Text className='font-p-medium text-gray-100 text-sm'>Search Results</Text>
        <Text className='text-2xl font-p-semibold text-white mt-1'>{query}</Text>

        <View className='mt-6 mb-8'>
          <SearchInput initialQuery={query as string} />
        </View>
      </View>

      {fetching ? (
        // TODO:SKELETON
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => <VideoCard video={item} />}
          ListEmptyComponent={() => (
            <EmptyState title='No Videos Found' subtitle='No videos found for this search query' />
          )}
        />
      )}
    </SafeAreaView>
  )
}

export default Search
