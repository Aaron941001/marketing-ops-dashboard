import { supabase } from '../lib/supabase'

// 获取社交媒体数据
export const getSocialMediaData = async () => {
  try {
    const { data, error } = await supabase
      .from('social_media_metrics')
      .select(`
        *,
        social_media_platforms (
          platform_name,
          platform_color
        )
      `)
      .order('date', { ascending: false })
      .limit(30)

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching social media data:', error)
    return []
  }
}

// 获取网站分析数据
export const getWebsiteData = async () => {
  try {
    const { data, error } = await supabase
      .from('ga4_daily_metrics')
      .select('*')
      .order('date', { ascending: false })
      .limit(30)

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching website data:', error)
    return []
  }
}

// 获取实时用户数据
export const getRealtimeUsers = async () => {
  try {
    const { data, error } = await supabase
      .from('ga4_realtime_users')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(1)

    if (error) throw error
    return data?.[0] || { active_users: 0 }
  } catch (error) {
    console.error('Error fetching realtime users:', error)
    return { active_users: 0 }
  }
}

// 获取热门页面数据
export const getTopPages = async () => {
  try {
    const { data, error } = await supabase
      .from('ga4_daily_top_pages')
      .select('*')
      .order('views', { ascending: false })
      .limit(10)

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching top pages:', error)
    return []
  }
}

// 获取流量趋势数据
export const getTrafficTrend = async () => {
  try {
    const { data, error } = await supabase
      .from('ga4_traffic_trend')
      .select('*')
      .order('date', { ascending: false })
      .limit(30)

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching traffic trend:', error)
    return []
  }
}

// 获取 EDM 活动数据
export const getEDMCampaigns = async () => {
  try {
    const { data, error } = await supabase
      .from('brevo_campaigns')
      .select('*')
      .order('send_date', { ascending: false })
      .limit(20)

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching EDM campaigns:', error)
    return []
  }
} 