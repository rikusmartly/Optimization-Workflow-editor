export type TriggerStatus = 'active' | 'paused';
export type TriggerDimension = 'campaign' | 'ad' | 'adset';
export type ConditionOperator = 'greater_than' | 'less_than' | 'equals' | 'contains' | 'out_of_stock' | 'excess_stock';
export type ConditionLogic = 'AND' | 'OR';
export type ActionType = 'pause' | 'activate' | 'email' | 'budget_change' | 'alert' | 'scale' | 'swap_creative';
export type NodeType = 'scope' | 'schedule' | 'condition' | 'action' | 'note';
export type ScheduleFrequency = 'daily' | 'hourly' | 'weekly' | 'once';

/** Use case presets for condition/schedule/action configuration */
export type UseCaseType =
  | 'catching_underspend'   // Daily spend < threshold, quiet hours
  | 'inventory_aware'      // Stock level → pause/scale
  | 'anomaly_spend'        // Spend change % vs previous period
  | 'weather_dco'          // Weather conditions → pause/scale/swap
  | 'sporting_event'       // Match result (Win/Loss/Draw)
  | 'seasonal_orchestration'
  | 'performance_intervention'
  | 'channel_rotation'
  | 'custom';

export type ConditionMetric =
  | 'ROAS' | 'CPA' | 'CTR' | 'Name'
  | 'daily_spend'          // Catching underspend
  | 'stock_level'          // Inventory-aware
  | 'spend_change_pct'     // Anomaly detection
  | 'weather_condition'    // Weather DCO
  | 'match_result';       // Sporting event

export type ComparePeriod = 'daily' | 'weekly';
export type WeatherCondition = 'sunny' | 'rain_chance' | 'temperature_below' | 'temperature_above';
export type MatchResult = 'win' | 'loss' | 'draw';

/** Lookback window options for metric conditions (stored as value, display via LOOKBACK_OPTIONS). */
export const LOOKBACK_OPTIONS: { value: string; label: string }[] = [
  { value: '', label: 'Current value' },
  { value: 'today', label: 'Today' },
  { value: 'yesterday', label: 'Yesterday' },
  { value: 'last_3_days', label: 'Last 3 days' },
  { value: 'last_5_days', label: 'Last 5 days' },
  { value: 'last_7_days', label: 'Last 7 days' },
  { value: 'last_14_days', label: 'Last 14 days' },
  { value: 'last_28_days', label: 'Last 28 days' },
  { value: 'last_30_days', label: 'Last 30 days' },
  { value: 'last_90_days', label: 'Last 90 days' },
  { value: 'today_and_last_2_days', label: 'Today and last 2 days' },
  { value: 'today_and_last_4_days', label: 'Today and last 4 days' },
  { value: 'today_and_last_6_days', label: 'Today and last 6 days' },
  { value: 'today_and_last_13_days', label: 'Today and last 13 days' },
  { value: 'today_and_last_27_days', label: 'Today and last 27 days' },
  { value: 'today_and_last_29_days', label: 'Today and last 29 days' },
  { value: 'this_week', label: 'This week' },
  { value: 'last_week', label: 'Last week' },
  { value: 'this_month', label: 'This month' },
  { value: 'last_month', label: 'Last month' },
  { value: 'this_quarter', label: 'This quarter' },
  { value: 'last_quarter', label: 'Last quarter' },
];

export interface Condition {
  id: string;
  metric: string;
  operator: ConditionOperator;
  value: string | number;
  /** Use case preset (optional) */
  useCase?: UseCaseType;
  /** For anomaly or metric: compare to previous period */
  comparePeriod?: ComparePeriod;
  /** For metric: lookback window (e.g. Last 30 days) */
  lookbackWindow?: string;
  /** For weather: condition type */
  weatherType?: WeatherCondition;
  /** For sporting: match result */
  matchResult?: MatchResult;
  position?: { x: number; y: number };
}

export interface Action {
  id: string;
  type: ActionType;
  value?: string | number;
  position?: { x: number; y: number };
}

export interface Schedule {
  frequency: ScheduleFrequency;
  date?: string;
  time: string; // 24-hour format, e.g., "15:59"
  /** Quiet hours: only run between these times (e.g. 07:00–00:00) */
  activeHoursStart?: string;
  activeHoursEnd?: string;
}

export interface Scope {
  accounts?: string[];
  campaigns?: string[];
  adsets?: string[];
  /** Filter by name (e.g. "name contains" this text) */
  nameContains?: string;
}

export interface NoteContent {
  content: string;
}

export interface Node {
  id: string;
  type: NodeType;
  name: string;
  position: { x: number; y: number };
  scope?: Scope;
  schedule?: Schedule;
  condition?: Condition;
  action?: Action;
  note?: NoteContent;
}

export interface Connection {
  id: string;
  sourceId: string;
  targetId: string;
}

export interface Trigger {
  id: string;
  name: string;
  status: TriggerStatus;
  dimension: TriggerDimension;
  conditions: Condition[];
  actions: Action[];
  elseActions?: Action[];
  conditionLogic: ConditionLogic;
  position?: { x: number; y: number };
  size?: { width: number; height: number };
  schedule: Schedule;
  scope?: Scope;
  nodes?: Node[];
  connections?: Connection[];
}

export interface Account {
  id: string;
  name: string;
  platform: 'meta' | 'snap' | 'tiktok';
  details?: string;
}

export interface AccountGroup {
  id: string;
  name: string;
  accounts: Account[];
  platform?: 'meta' | 'snap' | 'tiktok';
}
