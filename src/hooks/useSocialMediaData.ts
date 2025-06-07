import { useState, useEffect } from 'react'
import { getSocialMediaData } from '../services/supabase'

interface SocialMediaMetric {
  id: string
  platform_id: string
  date: string
  followers: number
  impressions: number
  organic_impressions: number
  video_views: number
  engagements: number
  organic_engagements: number
  engagement_rate: number
  social_media_platforms: {
    platform_name: string
    platform_color: string
  }
}

export const useSocialMediaData = () => {
  const [data, setData] = useState<SocialMediaMetric[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      const result = await getSocialMediaData()
      setData(result)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch social media data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return { data, loading, error, refetch: fetchData }
} 