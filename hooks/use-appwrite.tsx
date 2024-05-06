import { Alert } from 'react-native'
import { useCallback, useEffect, useState } from 'react'

function useAppwrite<T>(initData: T, fetcher: () => Promise<T>) {
  const [data, setData] = useState<T>(initData)
  const [loading, setLoading] = useState(true) //first fetching
  const [fetching, setFetching] = useState(true)

  const fetchData = useCallback(async () => {
    setFetching(true)

    try {
      const response = await fetcher()

      setData(response)
    } catch (error: any) {
      Alert.alert('Error', error?.message || 'Something went wrong.')
    } finally {
      setFetching(false)
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [])

  const refetch = () => fetchData()

  return { data, loading, refetch, fetching }
}

export default useAppwrite
