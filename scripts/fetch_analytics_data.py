import os
import json
import csv
from datetime import datetime
from dotenv import load_dotenv
import pandas as pd

# GA4, GSC Libraries
from google.analytics.data_v1beta import BetaAnalyticsDataClient
from google.analytics.data_v1beta.types import (
    DateRange,
    Dimension,
    Metric,
    RunReportRequest,
)

# Directories
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Load environment variables from .env.local
load_dotenv(os.path.join(BASE_DIR, ".env.local"))

GA4_PROPERTY_ID = os.getenv("GA4_PROPERTY_ID")
GSC_SITE_URL = os.getenv("GSC_SITE_URL")
CREDENTIALS_PATH = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")
OUTPUT_DIR = os.path.join(BASE_DIR, "documents", "analytics")

def setup_output_dir():
    current_month = datetime.now().strftime("%Y-%m")
    target_dir = os.path.join(OUTPUT_DIR, current_month)
    os.makedirs(target_dir, exist_ok=True)
    return target_dir

def fetch_ga4_data():
    """Fetches GA4 basic metrics (Users, PVs, Engagement Time) for the last 30 days"""
    if not GA4_PROPERTY_ID:
        print("Warning: GA4_PROPERTY_ID is not set.")
        return None
        
    property_id = GA4_PROPERTY_ID.replace("properties/", "")
    client = BetaAnalyticsDataClient()

    request = RunReportRequest(
        property=f"properties/{property_id}",
        dimensions=[Dimension(name="pagePath")],
        metrics=[
            Metric(name="activeUsers"),
            Metric(name="screenPageViews"),
            Metric(name="averageSessionDuration")
        ],
        date_ranges=[DateRange(start_date="30daysAgo", end_date="yesterday")],
    )
    
    try:
        response = client.run_report(request)
        data = []
        for row in response.rows:
            data.append({
                "page_path": row.dimension_values[0].value,
                "users": int(row.metric_values[0].value),
                "page_views": int(row.metric_values[1].value),
                "avg_session_duration": float(row.metric_values[2].value)
            })
        return data
    except Exception as e:
        print(f"Error fetching GA4 data: {e}")
        return None

# Google Search Console API
from googleapiclient.discovery import build
import httplib2
from oauth2client.service_account import ServiceAccountCredentials

# ... 既存のコードは維持 ...

def fetch_ga4_data():
    # ... (GA4 logic remains unchanged)
    pass

def build_gsc_service():
    if not CREDENTIALS_PATH or not os.path.exists(CREDENTIALS_PATH):
        return None
    scopes = ['https://www.googleapis.com/auth/webmasters.readonly']
    credentials = ServiceAccountCredentials.from_json_keyfile_name(CREDENTIALS_PATH, scopes)
    http = credentials.authorize(httplib2.Http())
    return build('searchconsole', 'v1', http=http, cache_discovery=False)

def fetch_gsc_data(service, dimension="query", days=30):
    if not GSC_SITE_URL:
        print("Warning: GSC_SITE_URL is not set.")
        return None
        
    start_date = (datetime.now() - pd.Timedelta(days=days)).strftime('%Y-%m-%d')
    end_date = (datetime.now() - pd.Timedelta(days=2)).strftime('%Y-%m-%d') # GSC data has ~2 days delay
    
    request = {
        'startDate': start_date,
        'endDate': end_date,
        'dimensions': [dimension],
        'rowLimit': 1000
    }
    
    try:
        response = service.searchanalytics().query(siteUrl=GSC_SITE_URL, body=request).execute()
        
        data = []
        if 'rows' in response:
            for row in response['rows']:
                data.append({
                    dimension: row['keys'][0],
                    'clicks': row['clicks'],
                    'impressions': row['impressions'],
                    'ctr': row.get('ctr', 0),
                    'position': row.get('position', 0)
                })
        return data
    except Exception as e:
        print(f"Error fetching GSC data: {e}")
        return None

def save_to_markdown(ga4_data, gsc_query_data, gsc_page_data, out_dir):
    # GA4
    if ga4_data:
        md_path = os.path.join(out_dir, "ga4_summary.md")
        sorted_data = sorted(ga4_data, key=lambda x: x['page_views'], reverse=True)
        with open(md_path, "w", encoding="utf-8") as f:
            f.write(f"# GA4 Analytics Summary ({datetime.now().strftime('%Y-%m')})\n\n")
            f.write("| Page Path | Page Views | Active Users | Avg Session (s) |\n")
            f.write("|---|---|---|---|\n")
            for row in sorted_data[:50]:
                f.write(f"| {row['page_path']} | {row['page_views']} | {row['users']} | {row['avg_session_duration']:.1f} |\n")
        print(f"Saved GA4 markdown summary to {md_path}")

    # GSC Queries
    if gsc_query_data:
        md_path = os.path.join(out_dir, "gsc_queries_summary.md")
        sorted_data = sorted(gsc_query_data, key=lambda x: x['clicks'], reverse=True)
        with open(md_path, "w", encoding="utf-8") as f:
            f.write(f"# GSC Queries Summary ({datetime.now().strftime('%Y-%m')})\n\n")
            f.write("| Query | Clicks | Impressions | CTR | Position |\n")
            f.write("|---|---|---|---|---|\n")
            for row in sorted_data[:50]:
                f.write(f"| {row['query']} | {row['clicks']} | {row['impressions']} | {row['ctr']:.1%} | {row['position']:.1f} |\n")
        print(f"Saved GSC Queries markdown summary to {md_path}")

def main():
    print("Starting Analytics Data Fetcher...")
    
    if not CREDENTIALS_PATH or not os.path.exists(CREDENTIALS_PATH):
        print(f"Error: Credentials not found at {CREDENTIALS_PATH}")
        return

    out_dir = setup_output_dir()
    print(f"Output directory: {out_dir}")
    
    # GA4
    print("Fetching GA4 data...")
    ga4_data = fetch_ga4_data()
    if ga4_data:
        with open(os.path.join(out_dir, "ga4_raw_data.json"), "w", encoding="utf-8") as f:
            json.dump(ga4_data, f, indent=2, ensure_ascii=False)
            
    # GSC
    print("Fetching GSC data...")
    gsc_service = build_gsc_service()
    gsc_query_data = None
    gsc_page_data = None
    
    if gsc_service:
        gsc_query_data = fetch_gsc_data(gsc_service, dimension="query")
        if gsc_query_data:
            with open(os.path.join(out_dir, "gsc_queries_raw.json"), "w", encoding="utf-8") as f:
                json.dump(gsc_query_data, f, indent=2, ensure_ascii=False)
                
        gsc_page_data = fetch_gsc_data(gsc_service, dimension="page")
        if gsc_page_data:
            with open(os.path.join(out_dir, "gsc_pages_raw.json"), "w", encoding="utf-8") as f:
                json.dump(gsc_page_data, f, indent=2, ensure_ascii=False)
                
    # Save Markdowns
    save_to_markdown(ga4_data, gsc_query_data, gsc_page_data, out_dir)
    
    print("Process completed.")

if __name__ == "__main__":
    main()
