import { useState, useEffect } from 'react'
import { getWebsiteData, getRealtimeUsers, getTopPages, getTrafficTrend } from '../services/supabase'

// 根據實際資料庫結構 - ga4_daily_metrics
interface WebsiteMetric {
  id: number
  date: string
  page_views: number
  active_users: number
  key_events: number
  total_events: number
  page_views_change: string | null // numeric 類型會以字串返回
  active_users_change: string | null
  key_events_change: string | null
  total_events_change: string | null
  created_at: string
  updated_at: string
}

// 根據實際資料庫結構 - ga4_daily_top_pages
interface TopPage {
  id: number
  date: string
  page_path: string
  views: number
  percentage: string | null // numeric 類型會以字串返回
  created_at: string
}

// 根據實際資料庫結構 - ga4_traffic_trend
interface TrafficTrend {
  id: number
  date: string
  visitors: number
  page_views: number
  created_at: string
}

// 根據實際資料庫結構 - ga4_realtime_users
interface RealtimeUsers {
  id: number
  total_users: number
  by_country: any[] // jsonb 類型
  created_at: string
}

export const useWebsiteData = () => {
  const [metrics, setMetrics] = useState<WebsiteMetric[]>([])
  const [realtimeUsers, setRealtimeUsers] = useState<RealtimeUsers | null>(null)
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