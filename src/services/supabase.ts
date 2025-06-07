import { supabase } from '../lib/supabase'

// 获取社交媒体数据 - 使用視圖更簡單
export const getSocialMediaData = async () => {
  try {
    const { data, error } = await supabase
      .from('v_social_media_overview')
      .select('*')
      .order('date', { ascending: false })
      .limit(30)

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching social media data:', error)
    return []
  }
}

// 获取特定平台的社交媒体数据
export const getSocialMediaDataByPlatform = async (platformName: string) => {
  try {
    const { data, error } = await supabase
      .from('v_social_media_overview')
      .select('*')
      .eq('platform_name', platformName)
      .order('date', { ascending: false })
      .limit(30)

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching social media data by platform:', error)
    return []
  }
}

// 获取所有社交媒体平台列表
export const getSocialMediaPlatforms = async () => {
  try {
    const { data, error } = await supabase
      .from('social_media_platforms')
      .select('*')
      .eq('is_active', true)
      .order('platform_name')

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching social media platforms:', error)
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
      .order('created_at', { ascending: false })
      .limit(1)

    if (error) throw error
    return data?.[0] || null
  } catch (error) {
    console.error('Error fetching realtime users:', error)
    return null
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

// 获取 EDM 活动总览统计
export const getEDMSummary = async () => {
  try {
    const { data, error } = await supabase
      .from('brevo_campaign_summary')
      .select('*')
      .limit(1)

    if (error) throw error
    return data?.[0] || null
  } catch (error) {
    console.error('Error fetching EDM summary:', error)
    return null
  }
}

// 获取按资料夹分组的 EDM 统计
export const getEDMByFolder = async () => {
  try {
    const { data, error } = await supabase
      .from('brevo_campaigns_by_folder')
      .select('*')
      .order('campaign_count', { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching EDM by folder:', error)
    return []
  }
}

// 获取高效能 EDM 活动
export const getHighPerformanceCampaigns = async () => {
  try {
    const { data, error } = await supabase
      .from('brevo_high_performance_campaigns')
      .select('*')
      .order('open_rate', { ascending: false })
      .limit(10)

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching high performance campaigns:', error)
    return []
  }
}

// 获取最近的 EDM 活动
export const getRecentCampaigns = async () => {
  try {
    const { data, error } = await supabase
      .from('brevo_recent_campaigns')
      .select('*')
      .order('send_date', { ascending: false })
      .limit(10)

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching recent campaigns:', error)
    return []
  }
} 