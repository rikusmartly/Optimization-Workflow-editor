export type TriggerStatus = 'active' | 'paused';
export type TriggerDimension = 'campaign' | 'ad' | 'adset';
export type ConditionOperator = 'greater_than' | 'less_than' | 'equals' | 'contains' | 'out_of_stock' | 'excess_stock';
export type ConditionLogic = 'AND' | 'OR';
export type ActionType = 'pause' | 'activate' | 'email' | 'budget_change' | 'alert' | 'scale' | 'swap_creative';
export type NodeType = 'scope' | 'schedule' | 'condition' | 'action';
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

export interface Condition {
  id: string;
  metric: string;
  operator: ConditionOperator;
  value: string | number;
  /** Use case preset (optional) */
  useCase?: UseCaseType;
  /** For anomaly: compare period */
  comparePeriod?: ComparePeriod;
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
