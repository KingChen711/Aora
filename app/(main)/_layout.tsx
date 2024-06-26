import { View, Text, Image, type ImageSourcePropType, type ColorValue } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { icons } from '../../constants'

type TabIconProps = {
  icon?: ImageSourcePropType
  color?: ColorValue
  name: string
  focused: boolean
}

const TabIcon = ({ icon, color, name, focused }: TabIconProps) => {
  return (
    <View className='items-center justify-center gap-2'>
      <Image source={icon} resizeMode='contain' tintColor={color} className='h-6 w-6' />
      <Text className={`${focused ? 'font-p-semibold' : 'font-p-regular'}`} style={{ color }}>
        {name}
      </Text>
    </View>
  )
}

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#FFA001',
        tabBarInactiveTintColor: '#CDCDE0',
        tabBarStyle: {
          backgroundColor: '#161622',
          borderTopWidth: 1,
          borderTopColor: '#232533',
          height: 100
        }
      }}
    >
      <Tabs.Screen
        name='home'
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => <TabIcon icon={icons.home} name='Home' color={color} focused={focused} />
        }}
      />
      <Tabs.Screen
        name='bookmark'
        options={{
          title: 'Bookmark',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon={icons.bookmark} name='Bookmark' color={color} focused={focused} />
          )
        }}
      />
      <Tabs.Screen
        name='create'
        options={{
          title: 'Create',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon={icons.plus} name='Create' color={color} focused={focused} />
          )
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon={icons.profile} name='Profile' color={color} focused={focused} />
          )
        }}
      />
      <Tabs.Screen
        name='search/[query]'
        options={{
          headerShown: false,
          tabBarButton: () => null
        }}
      />
    </Tabs>
  )
}

export default TabsLayout
