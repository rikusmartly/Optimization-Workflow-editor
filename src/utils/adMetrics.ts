/**
 * Ad metrics for the condition metric selector (report column items).
 * Kept separate from use-case metrics (daily_spend, stock_level, etc.).
 */
export interface MetricOption {
  value: string;
  label: string;
}

export interface MetricCategory {
  label: string;
  metrics: MetricOption[];
}

/** External data sources (e.g. stock, weather, match result). */
export const EXTERNAL_DATA_SOURCES: MetricOption[] = [
  { value: 'stock_level', label: 'Stock level' },
  { value: 'weather_condition', label: 'Weather condition' },
  { value: 'match_result', label: 'Match result' },
];

/** @deprecated Use EXTERNAL_DATA_SOURCES */
export const USE_CASE_METRICS = EXTERNAL_DATA_SOURCES;

export const EXTERNAL_DATA_SOURCE_VALUES = new Set(
  EXTERNAL_DATA_SOURCES.map((m) => m.value)
);

/** Ad metrics by category (Smartly report columns). */
export const AD_METRIC_CATEGORIES: MetricCategory[] = [
  {
    label: 'Performance',
    metrics: [
      { value: 'Budget', label: 'Budget' },
      { value: 'CPC', label: 'CPC' },
      { value: 'CTR', label: 'CTR' },
      { value: 'Impressions', label: 'Impressions' },
      { value: 'Spend', label: 'Spend' },
      { value: 'Video Views 100%', label: 'Video Views 100%' },
      { value: 'Video Views 25%', label: 'Video Views 25%' },
      { value: 'Video Views 50%', label: 'Video Views 50%' },
      { value: 'Video Views 75%', label: 'Video Views 75%' },
    ],
  },
  {
    label: 'Conversions',
    metrics: [
      { value: 'CPA', label: 'CPA' },
      { value: 'CPM', label: 'CPM' },
      { value: 'Conversion Rate', label: 'Conversion Rate' },
      { value: 'Conversions per Impression', label: 'Conversions per Impression' },
      { value: 'Link Clicks', label: 'Link Clicks' },
      { value: 'ROAS', label: 'ROAS' },
      { value: 'ROI', label: 'ROI' },
    ],
  },
  {
    label: 'Campaign',
    metrics: [
      { value: 'Budget Pool', label: 'Budget Pool' },
      { value: 'Campaign', label: 'Campaign' },
      { value: 'Campaign Trigger Sets', label: 'Campaign Trigger Sets' },
      { value: 'Producer', label: 'Producer' },
      { value: 'Ad Rotation (v2) Enabled For Campaign', label: 'Ad Rotation (v2) Enabled For Campaign' },
      { value: 'Ad Rotation (v2) Enabled For Campaign At', label: 'Ad Rotation (v2) Enabled For Campaign At' },
      { value: 'Campaign Budget', label: 'Campaign Budget' },
      { value: 'Campaign Daily Budget', label: 'Campaign Daily Budget' },
      { value: 'Campaign End Time', label: 'Campaign End Time' },
      { value: 'Campaign ID', label: 'Campaign ID' },
      { value: 'Campaign Lifetime Budget', label: 'Campaign Lifetime Budget' },
      { value: 'Campaign Name', label: 'Campaign Name' },
      { value: 'Campaign Smartly ID', label: 'Campaign Smartly ID' },
      { value: 'Campaign Start Time', label: 'Campaign Start Time' },
      { value: 'Campaign Status', label: 'Campaign Status' },
      { value: 'Campaign Type', label: 'Campaign Type' },
      { value: 'Campaign Type (Internal)', label: 'Campaign Type (Internal)' },
      { value: 'Producer ID', label: 'Producer ID' },
      { value: 'Producer Name', label: 'Producer Name' },
    ],
  },
  {
    label: 'Ad Set',
    metrics: [
      { value: 'Ad Set', label: 'Ad Set' },
      { value: 'Ad Set Bid Amount', label: 'Ad Set Bid Amount' },
      { value: 'Ad Set Bid Type', label: 'Ad Set Bid Type' },
      { value: 'Ad Set Budget', label: 'Ad Set Budget' },
      { value: 'Ad Set Daily Budget', label: 'Ad Set Daily Budget' },
      { value: 'Ad Set End Time', label: 'Ad Set End Time' },
      { value: 'Ad Set ID', label: 'Ad Set ID' },
      { value: 'Ad Set Is Delivering', label: 'Ad Set Is Delivering' },
      { value: 'Ad Set Lifetime Budget', label: 'Ad Set Lifetime Budget' },
      { value: 'Ad Set Name', label: 'Ad Set Name' },
      { value: 'Ad Set Optimization Goal', label: 'Ad Set Optimization Goal' },
      { value: 'Ad Set Smartly ID', label: 'Ad Set Smartly ID' },
      { value: 'Ad Set Start Time', label: 'Ad Set Start Time' },
      { value: 'Ad Set Status', label: 'Ad Set Status' },
      { value: 'Adgroup Excluded From Ad Rotation (v2) At', label: 'Adgroup Excluded From Ad Rotation (v2) At' },
    ],
  },
  {
    label: 'Ad',
    metrics: [
      { value: 'Ad', label: 'Ad' },
      { value: 'Variant', label: 'Variant' },
      { value: 'Ad Created Time', label: 'Ad Created Time' },
      { value: 'Ad Excluded From Ad Rotation (v2) At', label: 'Ad Excluded From Ad Rotation (v2) At' },
      { value: 'Ad ID', label: 'Ad ID' },
      { value: 'Ad Is Delivering', label: 'Ad Is Delivering' },
      { value: 'Ad Last Rotated-In At (Ad Rotation v2)', label: 'Ad Last Rotated-In At (Ad Rotation v2)' },
      { value: 'Ad Last Rotated-Out At (Ad Rotation v2)', label: 'Ad Last Rotated-Out At (Ad Rotation v2)' },
      { value: 'Ad Name', label: 'Ad Name' },
      { value: 'Ad Smartly ID', label: 'Ad Smartly ID' },
      { value: 'Ad Status', label: 'Ad Status' },
      { value: 'Ad Updated Time', label: 'Ad Updated Time' },
      { value: 'Ads Have Stats', label: 'Ads Have Stats' },
      { value: 'Common Thumbnail URL', label: 'Common Thumbnail URL' },
      { value: 'Creative Element Is Default', label: 'Creative Element Is Default' },
      { value: 'Creative Name', label: 'Creative Name' },
      { value: 'Segment ID', label: 'Segment ID' },
      { value: 'Segment Name', label: 'Segment Name' },
      { value: 'Variant ID', label: 'Variant ID' },
      { value: 'Variant Name', label: 'Variant Name' },
    ],
  },
  {
    label: 'Account',
    metrics: [
      { value: 'Account ID', label: 'Account ID' },
      { value: 'Account Name', label: 'Account Name' },
      { value: 'Currency', label: 'Currency' },
      { value: 'Currency EUR Exchange Rate', label: 'Currency EUR Exchange Rate' },
      { value: 'Currency Offset', label: 'Currency Offset' },
      { value: 'Timezone', label: 'Timezone' },
    ],
  },
  {
    label: 'Date',
    metrics: [
      { value: 'Month', label: 'Month' },
      { value: 'Month and Year', label: 'Month and Year' },
      { value: 'Quarter and Year', label: 'Quarter and Year' },
      { value: 'Week (Monday First)', label: 'Week (Monday First)' },
      { value: 'Week (Sunday First)', label: 'Week (Sunday First)' },
      { value: 'Weekday', label: 'Weekday' },
      { value: 'Year', label: 'Year' },
      { value: 'Date', label: 'Date' },
    ],
  },
  {
    label: 'Blueprints',
    metrics: [
      { value: 'Ad Code', label: 'Ad Code' },
      { value: 'Ad Set Code', label: 'Ad Set Code' },
      { value: 'Campaign Code', label: 'Campaign Code' },
    ],
  },
  {
    label: 'Creative Intelligence Tags',
    metrics: [
      { value: 'Tag Categories (Creative Intelligence)', label: 'Tag Categories (Creative Intelligence)' },
      { value: 'Tags (Creative Intelligence)', label: 'Tags (Creative Intelligence)' },
    ],
  },
  {
    label: 'Google Analytics',
    metrics: [
      { value: 'GA: Bounces', label: 'GA: Bounces' },
      { value: 'GA: New Users', label: 'GA: New Users' },
      { value: 'GA: Page Views', label: 'GA: Page Views' },
      { value: 'GA: Purchase Revenue', label: 'GA: Purchase Revenue' },
      { value: 'GA: Session Duration', label: 'GA: Session Duration' },
      { value: 'GA: Sessions', label: 'GA: Sessions' },
      { value: 'GA: Transactions', label: 'GA: Transactions' },
      { value: 'GA: Users', label: 'GA: Users' },
    ],
  },
  {
    label: 'Tags',
    metrics: [
      { value: 'Tag Categories', label: 'Tag Categories' },
      { value: 'Tag Category: Aaooxx1', label: 'Tag Category: Aaooxx1' },
      { value: 'Tag Category: Academy', label: 'Tag Category: Academy' },
      { value: 'Tag Category: Academy2', label: 'Tag Category: Academy2' },
      { value: 'Tag Category: Academy_apr25', label: 'Tag Category: Academy_apr25' },
      { value: 'Tag Category: Acl proper category', label: 'Tag Category: Acl proper category' },
      { value: 'Tag Category: Allans_tag_category', label: 'Tag Category: Allans_tag_category' },
      { value: 'Tag Category: Brand', label: 'Tag Category: Brand' },
      { value: 'Tag Category: Brand new category', label: 'Tag Category: Brand new category' },
      { value: 'Tag Category: Colors', label: 'Tag Category: Colors' },
      { value: 'Tag Category: Country', label: 'Tag Category: Country' },
      { value: 'Tag Category: End date', label: 'Tag Category: End date' },
      { value: 'Tag Category: Festivals', label: 'Tag Category: Festivals' },
      { value: 'Tag Category: Google', label: 'Tag Category: Google' },
      { value: 'Tag Category: Kafkacatsyo', label: 'Tag Category: Kafkacatsyo' },
      { value: 'Tag Category: Kafkaftw', label: 'Tag Category: Kafkaftw' },
      { value: 'Tag Category: Lex demo', label: 'Tag Category: Lex demo' },
      { value: 'Tag Category: Lifestyle', label: 'Tag Category: Lifestyle' },
      { value: 'Tag Category: Location', label: 'Tag Category: Location' },
      { value: 'Tag Category: Many tags', label: 'Tag Category: Many tags' },
      { value: 'Tag Category: My category', label: 'Tag Category: My category' },
      { value: 'Tag Category: New', label: 'Tag Category: New' },
      { value: 'Tag Category: New_cat', label: 'Tag Category: New_cat' },
      { value: 'Tag Category: Newwww', label: 'Tag Category: Newwww' },
      { value: 'Tag Category: Test category koala', label: 'Tag Category: Test category koala' },
      { value: 'Tag Category: Test one', label: 'Tag Category: Test one' },
      { value: 'Tag Category: Test1', label: 'Tag Category: Test1' },
      { value: 'Tag Category: Testtesttest', label: 'Tag Category: Testtesttest' },
      { value: 'Tag Category: Tiktok demo', label: 'Tag Category: Tiktok demo' },
      { value: 'Tag Category: Triggertest', label: 'Tag Category: Triggertest' },
      { value: 'Tag Category: Type', label: 'Tag Category: Type' },
      { value: 'Tag Category: Uncategorized', label: 'Tag Category: Uncategorized' },
      { value: 'Tag Category: Vertical', label: 'Tag Category: Vertical' },
      { value: 'Tag Category: Weather', label: 'Tag Category: Weather' },
      { value: 'Tag Category: Zzaoeu', label: 'Tag Category: Zzaoeu' },
      { value: 'Tags', label: 'Tags' },
    ],
  },
  {
    label: 'Targeting',
    metrics: [
      { value: 'Segment', label: 'Segment' },
      { value: 'Segment IDs', label: 'Segment IDs' },
      { value: 'Segment Names', label: 'Segment Names' },
    ],
  },
  {
    label: 'Workspaces',
    metrics: [
      { value: 'Ad Blueprint', label: 'Ad Blueprint' },
      { value: 'Adgroup Blueprint', label: 'Adgroup Blueprint' },
      { value: 'Campaign Blueprint', label: 'Campaign Blueprint' },
      { value: 'Workspace', label: 'Workspace' },
    ],
  },
];
