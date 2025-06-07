#!/usr/bin/env python3
"""
Brevo EDM 數據同步腳本
從 Brevo API 獲取 EDM 活動數據並同步到 Supabase
"""

import os
import sys
import requests
import json
from datetime import datetime, timedelta
from supabase import create_client
import argparse
import time

# Brevo API 配置
BREVO_API_URL = 'https://api.brevo.com/v3'
# 從環境變數獲取 API 密鑰
BREVO_API_KEY = os.getenv('BREVO_API_KEY')

# Supabase 配置
SUPABASE_URL = os.getenv('SUPABASE_URL')
SUPABASE_SERVICE_ROLE_KEY = os.getenv('SUPABASE_SERVICE_ROLE_KEY')

def get_brevo_headers():
    """獲取 Brevo API 請求標頭"""
    if not BREVO_API_KEY:
        raise ValueError("BREVO_API_KEY 環境變數未設置")
    
    return {
        'api-key': BREVO_API_KEY,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }

def test_brevo_connection():
    """測試 Brevo API 連接"""
    print("🧪 測試 Brevo API 連接...")
    
    try:
        headers = get_brevo_headers()
        response = requests.get(f'{BREVO_API_URL}/account', headers=headers)
        
        if response.status_code == 200:
            account_info = response.json()
            print(f"✅ Brevo API 連接成功")
            print(f"📧 帳戶: {account_info.get('companyName', 'N/A')}")
            print(f"📧 郵箱: {account_info.get('email', 'N/A')}")
            return True
        else:
            print(f"❌ Brevo API 連接失敗: {response.status_code}")
            print(f"錯誤信息: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Brevo API 連接測試失敗: {e}")
        return False

def get_email_campaigns(limit=50, offset=0, status='sent'):
    """獲取 EDM 活動列表"""
    print(f"🔄 獲取 Brevo EDM 活動數據 (limit={limit}, offset={offset}, status={status})...")
    
    try:
        headers = get_brevo_headers()
        params = {
            'limit': limit,
            'offset': offset,
            'sort': 'desc'
        }
        
        if status:
            params['status'] = status
            
        response = requests.get(f'{BREVO_API_URL}/emailCampaigns', headers=headers, params=params)
        
        if response.status_code == 200:
            data = response.json()
            campaigns = data.get('campaigns', [])
            print(f"✅ 成功獲取 {len(campaigns)} 個 EDM 活動")
            return campaigns
        else:
            print(f"❌ 獲取 EDM 活動失敗: {response.status_code}")
            print(f"錯誤信息: {response.text}")
            return []
            
    except Exception as e:
        print(f"❌ 獲取 EDM 活動異常: {e}")
        return []

def main():
    """主函數"""
    print("🚀 Brevo EDM 數據同步工具")
    print("=" * 50)
    
    # 檢查環境變數
    if not BREVO_API_KEY:
        print("❌ 請設置 BREVO_API_KEY 環境變數")
        return
    
    if not SUPABASE_URL or not SUPABASE_SERVICE_ROLE_KEY:
        print("❌ 請設置 SUPABASE_URL 和 SUPABASE_SERVICE_ROLE_KEY 環境變數")
        return
    
    # 測試連接
    if test_brevo_connection():
        print("✅ 準備開始同步數據...")
        # 這裡可以添加實際的同步邏輯
    else:
        print("❌ 連接測試失敗，請檢查配置")

if __name__ == "__main__":
    main() 