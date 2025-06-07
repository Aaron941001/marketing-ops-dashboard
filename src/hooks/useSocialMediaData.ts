import { useState, useEffect } from 'react'
import { getSocialMediaData, getSocialMediaDataByPlatform, getSocialMediaPlatforms } from '../services/supabase'

// 根據你的實際資料庫結構 (v_social_media_overview 視圖)
interface SocialMediaMetric {
  platform_name: string
  platform_color: string
  date: string
  followers: number
  impressions: number
  organic_impressions: number
  video_views: number | null
  engagements: number
  organic_engagements: number
  engagement_rate: string // 資料庫是 numeric，會以字串形式返回
  created_at: string
  updated_at: string
}

interface SocialMediaPlatform {
  id: string
  platform_name: string
  platform_color: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export const useSocialMediaData = () => {
  const [data, setData] = useState<SocialMediaMetric[]>([])
  const [platforms, setPlatforms] = useState<SocialMediaPlatform[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      const [metricsResult, platformsResult] = await Promise.all([
        getSocialMediaData(),
        getSocialMediaPlatforms()
      ])
      setData(metricsResult)
      setPlatforms(platformsResult)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch social media data')
    } finally {
      setLoading(false)
    }
  }

  const fetchDataByPlatform = async (platformName: string) => {
    try {
      setLoading(true)
      const result = await getSocialMediaDataByPlatform(platformName)
      setData(result)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : `Failed to fetch data for ${platformName}`)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return { 
    data, 
    platforms, 
    loading, 
    error, 
    refetch: fetchData,
    fetchByPlatform: fetchDataByPlatform
  }
} 