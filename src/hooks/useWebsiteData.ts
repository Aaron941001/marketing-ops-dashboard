import { useState, useEffect } from 'react'
import { getWebsiteData, getRealtimeUsers, getTopPages, getTrafficTrend } from '../services/supabase'

interface WebsiteMetric {
  id: string
  date: string
  page_views: number
  active_users: number
  key_events: number
  total_events: number
  page_views_change: number
  active_users_change: number
  key_events_change: number
  total_events_change: number
}

interface TopPage {
  id: string
  date: string
  page_path: string
  page_title: string
  views: number
  unique_views: number
}

interface TrafficTrend {
  id: string
  date: string
  visitors: number
  page_views: number
}

interface RealtimeUsers {
  active_users: number
}

export const useWebsiteData = () => {
  const [metrics, setMetrics] = useState<WebsiteMetric[]>([])
  const [realtimeUsers, setRealtimeUsers] = useState<RealtimeUsers>({ active_users: 0 })
  const [topPages, setTopPages] = useState<TopPage[]>([])
  const [trafficTrend, setTrafficTrend] = useState<TrafficTrend[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      const [metricsData, realtimeData, pagesData, trendData] = await Promise.all([
        getWebsiteData(),
        getRealtimeUsers(),
        getTopPages(),
        getTrafficTrend()
      ])
      
      setMetrics(metricsData)
      setRealtimeUsers(realtimeData)
      setTopPages(pagesData)
      setTrafficTrend(trendData)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch website data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return { 
    metrics, 
    realtimeUsers, 
    topPages, 
    trafficTrend, 
    loading, 
    error, 
    refetch: fetchData 
  }
} 