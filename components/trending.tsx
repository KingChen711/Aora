import React, { useState } from 'react'
import { Post } from '../types'
import { FlatList, Image, ImageBackground, TouchableOpacity, ViewToken } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { icons } from '../constants'
import { ResizeMode, Video } from 'expo-av'

type Props = {
  posts: Post[]
}

const zoomIn = {
  from: { transform: [{ scale: 0.9 }] },
  to: { transform: [{ scale: 1 }] }
}

const zoomOut = {
  from: { transform: [{ scale: 1 }] },
  to: { transform: [{ scale: 0.9 }] }
}

type ViewAbleItems = {
  viewableItems: ViewToken[]
  changed: ViewToken[]
}

function Trending({ posts }: Props) {
  const [activeItem, setActiveItem] = useState<string | null>(null)

  const viewableItemsChanges = ({ viewableItems }: ViewAbleItems) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key)
    }
  }

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => <TrendingItem activeItem={activeItem} item={item} />}
      horizontal
      viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
      contentOffset={{ x: 170, y: 0 }}
      onViewableItemsChanged={viewableItemsChanges}
    />
  )
}

export default Trending

type TrendingItemProps = {
  activeItem: string | null
  item: Post
}

function TrendingItem({ activeItem, item }: TrendingItemProps) {
  const animation = activeItem === item.$id ? zoomIn : zoomOut

  const [play, setPlay] = useState(false)

  return (
    <Animatable.View className='mr-5' animation={animation} duration={200}>
      {play ? (
        <Video
          source={{ uri: item.video }}
          className='w-52 h-72 rounded-[33px] mt-3 bg-white/10'
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          // on={() => setPlay(false)}
        />
      ) : (
        <TouchableOpacity
          className='relative justify-center items-center'
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className='w-52 h-72 rounded-[35px] mt-5 overflow-hidden shadow-lg shadow-black/40'
            resizeMode='cover'
          />

          <Image source={icons.play} className='w-12 h-12 absolute' resizeMode='contain' />
        </TouchableOpacity>
      )}
    </Animatable.View>
  )
}
