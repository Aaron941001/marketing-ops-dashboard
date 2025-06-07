#!/usr/bin/env python3
"""
測試 Brevo 單個活動統計數據
"""

import os
import sys
import requests
import json
from datetime import datetime

# Brevo API 配置
BREVO_API_URL = 'https://api.brevo.com/v3'
BREVO_API_KEY = os.getenv('BREVO_API_KEY')

def get_brevo_headers():
    """獲取 Brevo API 請求標頭"""
    if not BREVO_API_KEY:
        raise ValueError("BREVO_API_KEY 環境變數未設置")
    
    return {
        'api-key': BREVO_API_KEY,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }

def test_campaign_details(campaign_id):
    """測試獲取特定活動的詳細信息"""
    print(f"🔍 測試獲取活動 {campaign_id} 的詳細信息...")
    
    try:
        headers = get_brevo_headers()
        response = requests.get(f'{BREVO_API_URL}/emailCampaigns/{campaign_id}', headers=headers)
        
        print(f"📡 API 響應狀態: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print("✅ 成功獲取活動詳細信息")
            print(f"📄 完整響應數據:")
            print(json.dumps(data, indent=2, ensure_ascii=False))
            
            # 檢查統計數據
            stats = data.get('statistics', {})
            if stats:
                print(f"\n📊 統計數據:")
                print(f"  - globalStats: {stats.get('globalStats', 'N/A')}")
                print(f"  - campaignStats: {stats.get('campaignStats', 'N/A')}")
            else:
                print("⚠️ 沒有找到統計數據")
                
        else:
            print(f"❌ 獲取失敗: {response.status_code}")
            print(f"錯誤信息: {response.text}")
            
    except Exception as e:
        print(f"❌ 測試異常: {e}")

def test_campaigns_list():
    """測試獲取活動列表"""
    print("📋 測試獲取活動列表...")
    
    try:
        headers = get_brevo_headers()
        params = {
            'limit': 5,
            'offset': 0,
            'sort': 'desc'
        }
        
        response = requests.get(f'{BREVO_API_URL}/emailCampaigns', headers=headers, params=params)
        
        if response.status_code == 200:
            data = response.json()
            campaigns = data.get('campaigns', [])
            print(f"✅ 成功獲取 {len(campaigns)} 個活動")
            
            for i, campaign in enumerate(campaigns[:3]):  # 只顯示前3個
                print(f"\n📧 活動 {i+1}:")
                print(f"  - ID: {campaign.get('id')}")
                print(f"  - 名稱: {campaign.get('name')}")
                print(f"  - 狀態: {campaign.get('status')}")
                print(f"  - 統計數據: {campaign.get('statistics', 'N/A')}")
                
        else:
            print(f"❌ 獲取失敗: {response.status_code}")
            print(f"錯誤信息: {response.text}")
            
    except Exception as e:
        print(f"❌ 測試異常: {e}")

def main():
    """主函數"""
    print("🧪 Brevo API 測試工具")
    print("=" * 50)
    
    # 檢查環境變數
    if not BREVO_API_KEY:
        print("❌ 請設置 BREVO_API_KEY 環境變數")
        return
    
    # 測試活動列表
    test_campaigns_list()
    
    print("\n" + "=" * 50)
    
    # 測試特定活動（使用您數據中的一個 ID）
    test_campaign_details("288")  # 使用您數據中的活動 ID

if __name__ == "__main__":
    main() 