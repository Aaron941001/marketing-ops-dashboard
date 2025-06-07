import { useState, useEffect } from 'react'
import { getEDMCampaigns, getEDMSummary, getEDMByFolder, getHighPerformanceCampaigns, getRecentCampaigns } from '../services/supabase'

// 根據實際資料庫結構 - brevo_campaigns
interface EDMCampaign {
  id: number
  campaign_id: string
  name: string
  subject: string | null
  send_date: string
  folder: string | null
  status: string
  recipients: number | null
  delivered: number | null
  opens: number | null
  open_rate: string | null // numeric 類型會以字串返回
  clicks: number | null
  click_rate: string | null
  unsubscriptions: number | null
  unsubscribe_rate: string | null
  soft_bounces: number | null
  hard_bounces: number | null
  bounce_rate: string | null
  complaints: number | null
  complaint_rate: string | null
  created_at: string
  updated_at: string
}

// 根據實際資料庫結構 - brevo_campaign_summary
interface EDMSummary {
  total_campaigns: number | null
  total_recipients: number | null
  total_delivered: number | null
  total_opens: number | null
  total_clicks: number | null
  total_unsubscriptions: number | null
  total_bounces: number | null
  total_complaints: number | null
  avg_open_rate: string | null
  avg_click_rate: string | null
  avg_unsubscribe_rate: string | null
  avg_bounce_rate: string | null
  avg_complaint_rate: string | null
  latest_campaign_date: string | null
  earliest_campaign_date: string | null
}

// 根據實際資料庫結構 - brevo_campaigns_by_folder
interface EDMByFolder {
  folder: string | null
  campaign_count: number | null
  total_recipients: number | null
  total_opens: number | null
  total_clicks: number | null
  avg_open_rate: string | null
  avg_click_rate: string | null
  latest_campaign_date: string | null
}

export const useEDMData = () => {
  const [campaigns, setCampaigns] = useState<EDMCampaign[]>([])
  const [summary, setSummary] = useState<EDMSummary | null>(null)
  const [folderStats, setFolderStats] = useState<EDMByFolder[]>([])
  const [highPerformanceCampaigns, setHighPerformanceCampaigns] = useState<EDMCampaign[]>([])
  const [recentCampaigns, setRecentCampaigns] = useState<EDMCampaign[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      const [
        campaignsData,
        summaryData,
        folderData,
        highPerfData,
        recentData
      ] = await Promise.all([
        getEDMCampaigns(),
        getEDMSummary(),
        getEDMByFolder(),
        getHighPerformanceCampaigns(),
        getRecentCampaigns()
      ])
      
      setCampaigns(campaignsData)
      setSummary(summaryData)
      setFolderStats(folderData)
      setHighPerformanceCampaigns(highPerfData)
      setRecentCampaigns(recentData)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch EDM data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return { 
    campaigns,
    summary,
    folderStats,
    highPerformanceCampaigns,
    recentCampaigns,
    loading, 
    error, 
    refetch: fetchData 
  }
} 