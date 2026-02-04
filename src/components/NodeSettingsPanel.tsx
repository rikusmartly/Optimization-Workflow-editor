import React, { useState } from 'react';
import {
  Node,
  ScheduleFrequency,
  ConditionOperator,
  ActionType,
  ComparePeriod,
  WeatherCondition,
  MatchResult,
  LOOKBACK_OPTIONS,
  CONDITION_UNIT_OPTIONS,
} from '../types';
import { EXTERNAL_DATA_SOURCES, EXTERNAL_DATA_SOURCE_VALUES, AD_METRIC_CATEGORIES_WITHOUT_NAME, AD_METRIC_NAME_VALUES, NAME_METRICS } from '../utils/adMetrics';
import { SearchableSelect } from './SearchableSelect';
import { getMatchingAds, getSelectedAccountsDisplay } from '../utils/mockData';

interface NodeSettingsPanelProps {
  node: Node;
  onUpdate: (node: Node) => void;
  onDelete: (nodeId: string) => void;
  onDuplicate: (nodeId: string) => void;
  onClose: () => void;
  onOpenScopeDialog: (nodeId: string) => void;
}

export const NodeSettingsPanel: React.FC<NodeSettingsPanelProps> = ({
  node,
  onUpdate,
  onDelete,
  onDuplicate,
  onClose,
  onOpenScopeDialog,
}) => {
  const [localNode, setLocalNode] = useState(node);

  React.useEffect(() => {
    setLocalNode(node);
  }, [node]);

  const handleNameChange = (name: string) => {
    const updated = { ...localNode, name };
    setLocalNode(updated);
    onUpdate(updated);
  };

  const handleScheduleChange = (schedule: Node['schedule']) => {
    const updated = { ...localNode, schedule };
    setLocalNode(updated);
    onUpdate(updated);
  };

  const handleConditionChange = (condition: Node['condition']) => {
    const updated = { ...localNode, condition };
    setLocalNode(updated);
    onUpdate(updated);
  };

  const handleActionChange = (action: Node['action']) => {
    const updated = { ...localNode, action };
    setLocalNode(updated);
    onUpdate(updated);
  };

  const handleNoteChange = (content: string) => {
    const updated = { ...localNode, note: { content } };
    setLocalNode(updated);
    onUpdate(updated);
  };

  return (
    <div className="fixed right-6 top-24 bottom-6 w-[400px] bg-white rounded-2xl border border-gray-200 shadow-lg z-50 flex flex-col overflow-hidden">
      {/* Header - match toolbar bar styling */}
      <div className="flex items-center justify-between px-3 py-2.5 border-b border-gray-200">
        <h2 className="text-sm font-semibold text-gray-800">
          {localNode.type.charAt(0).toUpperCase() + localNode.type.slice(1)}
        </h2>
        <div className="flex items-center gap-0.5">
          <button
            onClick={() => onDuplicate(localNode.id)}
            className="flex items-center justify-center min-w-8 min-h-8 p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded box-border"
            title="Duplicate node"
          >
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
              <path d="M6 12V3h8v9H6zM4 5H2v11h11v-2H4V5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            onClick={() => onDelete(localNode.id)}
            className="flex items-center justify-center min-w-8 min-h-8 p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded box-border"
            title="Delete node"
          >
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
              <path d="M3 5h12M7 5V3a1 1 0 011-1h2a1 1 0 011 1v2m-6 8v-4m4 4v-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
          <button
            onClick={onClose}
            className="flex items-center justify-center min-w-8 min-h-8 p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded box-border"
            title="Close"
          >
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
              <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Content - match toolbar section padding and labels */}
      <div className="flex-1 flex flex-col min-h-0 overflow-y-auto p-3 space-y-5">
        {/* Name Field */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1.5">Name</label>
          <input
            type="text"
            value={localNode.name}
            onChange={(e) => handleNameChange(e.target.value)}
            className="w-full pl-3 pr-8 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-primary focus:border-transparent"
          />
        </div>

        {/* Type-Specific Settings */}
        {localNode.type === 'scope' && (
          <div className="flex-1 flex flex-col min-h-0">
            <div className="shrink-0 space-y-3">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Scope Settings</h3>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Name contains</label>
                <input
                  type="text"
                  value={localNode.scope?.nameContains ?? ''}
                  onChange={(e) => onUpdate({
                    ...localNode,
                    scope: { ...localNode.scope, accounts: localNode.scope?.accounts, campaigns: localNode.scope?.campaigns, adsets: localNode.scope?.adsets, nameContains: e.target.value || undefined },
                  })}
                  placeholder="e.g. Brand, Summer"
                  className="w-full pl-3 pr-8 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-primary focus:border-transparent"
                />
              </div>
              <button
                onClick={() => onOpenScopeDialog(localNode.id)}
                className="w-full px-4 py-2 bg-purple-primary text-white rounded-lg hover:bg-purple-secondary flex items-center justify-center gap-2"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 2C4.7 2 2 4.7 2 8s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6zm0 10c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z" fill="white"/>
                  <circle cx="8" cy="8" r="2" fill="white"/>
                </svg>
                Select accounts
              </button>
            </div>
            {(() => {
              const selected = getSelectedAccountsDisplay(localNode.scope?.accounts);
              return (
                <div className="flex-1 flex flex-col min-h-0 mt-3">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 shrink-0">
                    Selected accounts ({selected.length})
                  </h4>
                  <p className="text-xs text-gray-500 mb-2 shrink-0">
                    Accounts included in this scope
                  </p>
                  {selected.length === 0 ? (
                    <p className="text-sm text-gray-500 py-2 shrink-0">No accounts selected. Use &quot;Select accounts&quot; to add.</p>
                  ) : (
                    <div className="flex-1 min-h-0 overflow-y-auto rounded-lg border border-gray-200 bg-gray-50 p-2 space-y-1">
                      {selected.map((acc) => (
                        <div key={acc.id} className="text-sm text-gray-800 truncate py-0.5" title={acc.name}>
                          {acc.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        )}

        {localNode.type === 'schedule' && (
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Schedule Settings</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Frequency</label>
                <select
                  value={localNode.schedule?.frequency || 'daily'}
                  onChange={(e) => handleScheduleChange({
                    ...localNode.schedule,
                    frequency: e.target.value as ScheduleFrequency,
                    time: localNode.schedule?.time || '15:59',
                  })}
                  className="select-chevron w-full pl-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-primary focus:border-transparent"
                >
                  <option value="daily">Daily</option>
                  <option value="hourly">Hourly</option>
                  <option value="weekly">Weekly</option>
                  <option value="once">Once</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Time</label>
                <input
                  type="time"
                  value={localNode.schedule?.time || '15:59'}
                  onChange={(e) => handleScheduleChange({
                    ...localNode.schedule,
                    frequency: localNode.schedule?.frequency || 'daily',
                    time: e.target.value,
                  })}
                  className="w-full pl-3 pr-8 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-primary focus:border-transparent"
                />
              </div>
              <div className="pt-2 border-t border-gray-200">
                <p className="text-xs font-medium text-gray-500 mb-2">Active hours (quiet hours)</p>
                <p className="text-xs text-gray-500 mb-2">Only run between these times to avoid false alerts</p>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">Start</label>
                    <input
                      type="time"
                      value={localNode.schedule?.activeHoursStart ?? '07:00'}
                      onChange={(e) => handleScheduleChange({
                        ...localNode.schedule,
                        frequency: localNode.schedule?.frequency || 'daily',
                        time: localNode.schedule?.time || '15:59',
                        activeHoursStart: e.target.value,
                        activeHoursEnd: localNode.schedule?.activeHoursEnd,
                      })}
                      className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">End</label>
                    <input
                      type="time"
                      value={localNode.schedule?.activeHoursEnd ?? '00:00'}
                      onChange={(e) => handleScheduleChange({
                        ...localNode.schedule,
                        frequency: localNode.schedule?.frequency || 'daily',
                        time: localNode.schedule?.time || '15:59',
                        activeHoursStart: localNode.schedule?.activeHoursStart,
                        activeHoursEnd: e.target.value,
                      })}
                      className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-primary focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {localNode.type === 'condition' && (
          <div className="flex-1 flex flex-col min-h-0">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4 shrink-0">Condition Settings</h3>
            <div className="flex-1 flex flex-col min-h-0 space-y-3">
              <div>
                <span className="block text-xs font-semibold text-gray-500 mb-2">Trigger</span>
                <div
                  role="radiogroup"
                  aria-label="Metric, Name or ID, or External data source"
                  className="flex rounded-lg bg-gray-200 p-0.5"
                >
                  {(() => {
                    const m = localNode.condition?.metric ?? '';
                    const isExternal = EXTERNAL_DATA_SOURCE_VALUES.has(m);
                    const isName = AD_METRIC_NAME_VALUES.has(m);
                    const isMetric = !isExternal && !isName;
                    return (
                      <>
                        <button
                          type="button"
                          role="radio"
                          aria-checked={isMetric}
                          onClick={() => handleConditionChange({
                            id: localNode.condition?.id || 'cond-1',
                            metric: '',
                            operator: localNode.condition?.operator || 'less_than',
                            value: localNode.condition?.value ?? 1.5,
                          })}
                          className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
                            isMetric ? 'bg-white text-gray-900 shadow-sm' : 'bg-transparent text-gray-500 hover:text-gray-700'
                          }`}
                        >
                          Metric
                        </button>
                        <button
                          type="button"
                          role="radio"
                          aria-checked={isName}
                          onClick={() => handleConditionChange({
                            id: localNode.condition?.id || 'cond-1',
                            metric: AD_METRIC_NAME_VALUES.has(localNode.condition?.metric ?? '') ? (localNode.condition?.metric ?? (NAME_METRICS[0]?.value ?? '')) : (NAME_METRICS[0]?.value ?? ''),
                            operator: 'contains',
                            value: localNode.condition?.value ?? '',
                          })}
                          className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
                            isName ? 'bg-white text-gray-900 shadow-sm' : 'bg-transparent text-gray-500 hover:text-gray-700'
                          }`}
                        >
                          Name or ID
                        </button>
                        <button
                          type="button"
                          role="radio"
                          aria-checked={isExternal}
                          onClick={() => handleConditionChange({
                            id: localNode.condition?.id || 'cond-1',
                            metric: 'stock_level',
                            operator: localNode.condition?.operator || 'less_than',
                            value: localNode.condition?.value ?? 5,
                          })}
                          className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
                            isExternal ? 'bg-white text-gray-900 shadow-sm' : 'bg-transparent text-gray-500 hover:text-gray-700'
                          }`}
                        >
                          External data source
                        </button>
                      </>
                    );
                  })()}
                </div>
              </div>
              {/* Metric / External dropdown – not shown for Name trigger (Name has only "Contains" field) */}
              {!AD_METRIC_NAME_VALUES.has(localNode.condition?.metric ?? '') && (
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">
                    {EXTERNAL_DATA_SOURCE_VALUES.has(localNode.condition?.metric ?? '')
                      ? 'External data source'
                      : 'Metric'}
                  </label>
                  <SearchableSelect
                    value={
                      EXTERNAL_DATA_SOURCE_VALUES.has(localNode.condition?.metric ?? '')
                        ? (localNode.condition?.metric || 'stock_level')
                        : (localNode.condition?.metric ?? '')
                    }
                    onChange={(metricValue) => handleConditionChange({
                      id: localNode.condition?.id || 'cond-1',
                      metric: metricValue,
                      operator: localNode.condition?.operator || 'less_than',
                      value: localNode.condition?.value ?? 1.5,
                    })}
                    options={
                      EXTERNAL_DATA_SOURCE_VALUES.has(localNode.condition?.metric ?? '')
                        ? EXTERNAL_DATA_SOURCES
                        : undefined
                    }
                    optionsGrouped={
                      !EXTERNAL_DATA_SOURCE_VALUES.has(localNode.condition?.metric ?? '')
                        ? AD_METRIC_CATEGORIES_WITHOUT_NAME.map((cat) => ({
                            label: cat.label,
                            options: cat.metrics,
                          }))
                        : undefined
                    }
                    placeholder="Select metric"
                    aria-label={
                      EXTERNAL_DATA_SOURCE_VALUES.has(localNode.condition?.metric ?? '')
                        ? 'External data source'
                        : 'Metric'
                    }
                  />
                </div>
              )}
              {/* Name trigger: dropdown of name options + "Contains" field + Matching items (fills remaining height) */}
              {AD_METRIC_NAME_VALUES.has(localNode.condition?.metric ?? '') && (
                <div className="flex-1 flex flex-col min-h-0">
                  <div className="shrink-0 space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1.5">Name or ID</label>
                      <SearchableSelect
                        value={localNode.condition?.metric ?? (NAME_METRICS[0]?.value ?? '')}
                        onChange={(metricValue) => handleConditionChange({
                          id: localNode.condition?.id || 'cond-1',
                          metric: metricValue,
                          operator: 'contains',
                          value: localNode.condition?.value ?? '',
                        })}
                        options={NAME_METRICS}
                        placeholder="Select option"
                        aria-label="Name or ID"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1.5">Contains</label>
                      <input
                        type="text"
                        value={typeof localNode.condition?.value === 'string' ? localNode.condition.value : ''}
                        onChange={(e) => handleConditionChange({
                          id: localNode.condition?.id || 'cond-1',
                          metric: localNode.condition?.metric ?? (NAME_METRICS[0]?.value ?? ''),
                          operator: 'contains',
                          value: e.target.value,
                        })}
                        placeholder="e.g. Brand, Summer"
                        className="w-full pl-3 pr-8 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-primary focus:border-transparent"
                      />
                    </div>
                  </div>
                  {(() => {
                    const containsValue = typeof localNode.condition?.value === 'string' ? localNode.condition.value : '';
                    const matching = getMatchingAds({ nameContains: containsValue || undefined });
                    return (
                      <div className="flex-1 flex flex-col min-h-0 mt-3">
                        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 shrink-0">
                          Matching items ({matching.length})
                        </h4>
                        <p className="text-xs text-gray-500 mb-2 shrink-0">
                          Items that match the selected Name or ID and Contains filter
                        </p>
                        {matching.length === 0 ? (
                          <p className="text-sm text-gray-500 py-2 shrink-0">No items match. Adjust Contains.</p>
                        ) : (
                          <div className="flex-1 min-h-0 overflow-y-auto rounded-lg border border-gray-200 bg-gray-50 p-2 space-y-1">
                            {matching.map((ad) => (
                              <div key={ad.id} className="text-sm text-gray-800 truncate py-0.5" title={ad.name}>
                                {ad.name}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>
              )}
              {localNode.condition?.metric === 'spend_change_pct' && (
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Compare period</label>
                  <select
                    value={localNode.condition?.comparePeriod || 'daily'}
                    onChange={(e) => handleConditionChange({
                      id: localNode.condition?.id || 'cond-1',
                      metric: localNode.condition?.metric || 'spend_change_pct',
                      operator: localNode.condition?.operator || 'greater_than',
                      value: localNode.condition?.value ?? 20,
                      comparePeriod: e.target.value as ComparePeriod,
                    })}
                    className="select-chevron w-full pl-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-primary focus:border-transparent"
                  >
                    <option value="daily">Daily (vs previous day)</option>
                    <option value="weekly">Weekly (vs previous week)</option>
                  </select>
                </div>
              )}
              {localNode.condition?.metric === 'weather_condition' && (
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Weather type</label>
                  <select
                    value={localNode.condition?.weatherType || 'rain_chance'}
                    onChange={(e) => handleConditionChange({
                      id: localNode.condition?.id || 'cond-1',
                      metric: localNode.condition?.metric || 'weather_condition',
                      operator: localNode.condition?.operator || 'equals',
                      value: localNode.condition?.value ?? '',
                      weatherType: e.target.value as WeatherCondition,
                    })}
                    className="select-chevron w-full pl-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-primary focus:border-transparent"
                  >
                    <option value="sunny">Sunny</option>
                    <option value="rain_chance">Chance of rain &gt; X%</option>
                    <option value="temperature_below">Temperature below</option>
                    <option value="temperature_above">Temperature above</option>
                  </select>
                </div>
              )}
              {localNode.condition?.metric === 'match_result' && (
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Match result</label>
                  <select
                    value={localNode.condition?.matchResult || 'loss'}
                    onChange={(e) => handleConditionChange({
                      id: localNode.condition?.id || 'cond-1',
                      metric: localNode.condition?.metric || 'match_result',
                      operator: localNode.condition?.operator || 'equals',
                      value: localNode.condition?.value ?? 'loss',
                      matchResult: e.target.value as MatchResult,
                    })}
                    className="select-chevron w-full pl-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-primary focus:border-transparent"
                  >
                    <option value="win">Win</option>
                    <option value="loss">Loss</option>
                    <option value="draw">Draw</option>
                  </select>
                </div>
              )}
              {localNode.condition?.metric !== 'match_result' &&
                !AD_METRIC_NAME_VALUES.has(localNode.condition?.metric ?? '') && (
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Operator</label>
                  <select
                    value={localNode.condition?.operator || 'less_than'}
                    onChange={(e) => {
                      const isMetric = !EXTERNAL_DATA_SOURCE_VALUES.has(localNode.condition?.metric ?? '');
                      handleConditionChange({
                        id: localNode.condition?.id || 'cond-1',
                        metric: localNode.condition?.metric ?? '',
                        operator: e.target.value as ConditionOperator,
                        value: localNode.condition?.value ?? 1.5,
                        ...(isMetric && localNode.condition?.lookbackWindow && { lookbackWindow: localNode.condition.lookbackWindow }),
                        ...(localNode.condition?.unit && { unit: localNode.condition.unit }),
                      });
                    }}
                    className="select-chevron w-full pl-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-primary focus:border-transparent"
                  >
                    <option value="less_than">Less than</option>
                    <option value="greater_than">Greater than</option>
                    <option value="equals">Equals</option>
                    <option value="contains">Contains</option>
                    <option value="out_of_stock">Out of stock</option>
                    <option value="excess_stock">Excess stock</option>
                  </select>
                </div>
              )}
              {/* Value field for all metric triggers (after operator), except match_result */}
              {localNode.condition?.metric !== 'match_result' &&
                !EXTERNAL_DATA_SOURCE_VALUES.has(localNode.condition?.metric ?? '') &&
                !AD_METRIC_NAME_VALUES.has(localNode.condition?.metric ?? '') && (
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">
                    {localNode.condition?.metric === 'daily_spend' ? 'Threshold (e.g. £)' : 'Value'}
                  </label>
                  <input
                    type={typeof localNode.condition?.value === 'number' ? 'number' : 'text'}
                    value={localNode.condition?.value ?? ''}
                    onChange={(e) => {
                      const isMetric = !EXTERNAL_DATA_SOURCE_VALUES.has(localNode.condition?.metric ?? '');
                      handleConditionChange({
                        id: localNode.condition?.id || 'cond-1',
                        metric: localNode.condition?.metric ?? '',
                        operator: localNode.condition?.operator || 'less_than',
                        value: localNode.condition?.metric === 'spend_change_pct' ? Number(e.target.value) : (e.target.value as string | number),
                        ...(isMetric && localNode.condition?.lookbackWindow && { lookbackWindow: localNode.condition.lookbackWindow }),
                        ...(localNode.condition?.unit && { unit: localNode.condition.unit }),
                      });
                    }}
                    placeholder={localNode.condition?.metric === 'daily_spend' ? '5' : localNode.condition?.metric === 'spend_change_pct' ? '20' : ''}
                    className="w-full pl-3 pr-8 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-primary focus:border-transparent"
                  />
                </div>
              )}
              {/* Unit selection after value (metric triggers only, except match_result) */}
              {localNode.condition?.metric !== 'match_result' &&
                !EXTERNAL_DATA_SOURCE_VALUES.has(localNode.condition?.metric ?? '') &&
                !AD_METRIC_NAME_VALUES.has(localNode.condition?.metric ?? '') && (
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Unit</label>
                  <select
                    value={localNode.condition?.unit ?? ''}
                    onChange={(e) => {
                      const unit = e.target.value;
                      handleConditionChange({
                        id: localNode.condition?.id || 'cond-1',
                        metric: localNode.condition?.metric ?? '',
                        operator: localNode.condition?.operator || 'less_than',
                        value: localNode.condition?.value ?? 1.5,
                        ...(localNode.condition?.lookbackWindow && { lookbackWindow: localNode.condition.lookbackWindow }),
                        ...(unit ? { unit } : {}),
                      });
                    }}
                    className="select-chevron w-full pl-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-primary focus:border-transparent"
                  >
                    {CONDITION_UNIT_OPTIONS.map((opt) => (
                      <option key={opt.value || 'none'} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              )}
              {!EXTERNAL_DATA_SOURCE_VALUES.has(localNode.condition?.metric ?? '') &&
                !AD_METRIC_NAME_VALUES.has(localNode.condition?.metric ?? '') && (
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Lookback window</label>
                  <select
                    value={localNode.condition?.lookbackWindow ?? ''}
                    onChange={(e) => {
                      const lookbackWindow = e.target.value;
                      handleConditionChange({
                        id: localNode.condition?.id || 'cond-1',
                        metric: localNode.condition?.metric ?? '',
                        operator: localNode.condition?.operator || 'less_than',
                        value: localNode.condition?.value ?? 1.5,
                        ...(lookbackWindow ? { lookbackWindow } : {}),
                        ...(localNode.condition?.unit && { unit: localNode.condition.unit }),
                      });
                    }}
                    className="select-chevron w-full pl-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-primary focus:border-transparent"
                  >
                    {LOOKBACK_OPTIONS.map((opt) => (
                      <option key={opt.value || 'current'} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>
        )}

        {localNode.type === 'action' && (
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Action Settings</h3>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">Action Type</label>
              <select
                value={localNode.action?.type || 'pause'}
                onChange={(e) => handleActionChange({
                  id: localNode.action?.id || 'action-1',
                  type: e.target.value as ActionType,
                })}
                className="select-chevron w-full pl-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-primary focus:border-transparent"
              >
                <option value="pause">Pause campaign</option>
                <option value="activate">Activate campaign</option>
                <option value="alert">Alert / Notify</option>
                <option value="scale">Scale (up/down)</option>
                <option value="swap_creative">Swap creatives</option>
                <option value="budget_change">Adjust budget</option>
                <option value="email">Send email</option>
              </select>
            </div>
          </div>
        )}

        {localNode.type === 'note' && (
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Note</h3>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Content</label>
            <textarea
              value={localNode.note?.content ?? ''}
              onChange={(e) => handleNoteChange(e.target.value)}
              placeholder="Add your note..."
              rows={5}
              className="w-full pl-3 pr-8 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-primary focus:border-transparent resize-y min-h-[100px]"
            />
          </div>
        )}
      </div>
    </div>
  );
};
