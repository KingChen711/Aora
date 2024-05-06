import { View, Text } from 'react-native'

type Props = {
  title?: string
  subtitle?: string
  containerStyles?: string
  titleStyles: string
  loadingSubtitle?: boolean
}

const InfoBox = ({ title, subtitle, containerStyles, titleStyles, loadingSubtitle = false }: Props) => {
  return (
    <View className={containerStyles}>
      {loadingSubtitle ? (
        <Text>Test</Text>
      ) : (
        <Text className={`text-white text-center font-p-semibold ${titleStyles}`}>{title}</Text>
      )}

      <Text className='text-sm text-gray-100 text-center font-p-regular'>{subtitle}</Text>
    </View>
  )
}

export default InfoBox
