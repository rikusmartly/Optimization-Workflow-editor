import React, { useState } from 'react';
import {
  Node,
  NodeType,
  ScheduleFrequency,
  ConditionOperator,
  ActionType,
  UseCaseType,
  ComparePeriod,
  WeatherCondition,
  MatchResult,
} from '../types';

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

  const handleTypeChange = (newType: NodeType) => {
    const updated: Node = {
      ...localNode,
      type: newType,
    };
    setLocalNode(updated);
    onUpdate(updated);
  };

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

  return (
    <div className="fixed right-4 top-4 bottom-4 w-[400px] bg-white rounded-3xl shadow-lg z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">Node Settings</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Type Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
          <select
            value={localNode.type}
            onChange={(e) => handleTypeChange(e.target.value as NodeType)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-primary focus:border-transparent"
          >
            <option value="scope">Scope</option>
            <option value="schedule">Schedule</option>
            <option value="condition">Condition</option>
            <option value="action">Action</option>
          </select>
        </div>

        {/* Name Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
          <input
            type="text"
            value={localNode.name}
            onChange={(e) => handleNameChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-primary focus:border-transparent"
          />
        </div>

        {/* Type-Specific Settings */}
        {localNode.type === 'scope' && (
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Scope Settings</h3>
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
            {localNode.scope?.accounts && localNode.scope.accounts.length > 0 && (
              <p className="mt-2 text-sm text-gray-600">
                {localNode.scope.accounts.length} account(s) selected
              </p>
            )}
          </div>
        )}

        {localNode.type === 'schedule' && (
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Schedule Settings</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-700 mb-1">Frequency</label>
                <select
                  value={localNode.schedule?.frequency || 'daily'}
                  onChange={(e) => handleScheduleChange({
                    ...localNode.schedule,
                    frequency: e.target.value as ScheduleFrequency,
                    time: localNode.schedule?.time || '15:59',
                  })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-primary focus:border-transparent"
                >
                  <option value="daily">Daily</option>
                  <option value="hourly">Hourly</option>
                  <option value="weekly">Weekly</option>
                  <option value="once">Once</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Time</label>
                <input
                  type="time"
                  value={localNode.schedule?.time || '15:59'}
                  onChange={(e) => handleScheduleChange({
                    ...localNode.schedule,
                    frequency: localNode.schedule?.frequency || 'daily',
                    time: e.target.value,
                  })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-primary focus:border-transparent"
                />
              </div>
              <div className="pt-2 border-t border-gray-100">
                <p className="text-xs font-medium text-gray-500 mb-2">Active hours (quiet hours)</p>
                <p className="text-xs text-gray-500 mb-2">Only run between these times to avoid false alerts</p>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Start</label>
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
                    <label className="block text-xs text-gray-600 mb-1">End</label>
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
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Condition Settings</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-700 mb-1">Use case</label>
                <select
                  value={localNode.condition?.useCase || 'custom'}
                  onChange={(e) => {
                    const useCase = e.target.value as UseCaseType;
                    const defaults: Record<string, { metric: string; operator: ConditionOperator; value: string | number }> = {
                      catching_underspend: { metric: 'daily_spend', operator: 'less_than', value: 5 },
                      inventory_aware: { metric: 'stock_level', operator: 'out_of_stock', value: 0 },
                      anomaly_spend: { metric: 'spend_change_pct', operator: 'greater_than', value: 20 },
                      weather_dco: { metric: 'weather_condition', operator: 'equals', value: 'rain_chance' },
                      sporting_event: { metric: 'match_result', operator: 'equals', value: 'loss' },
                      custom: { metric: 'ROAS', operator: 'less_than', value: 1.5 },
                    };
                    const d = defaults[useCase] || defaults.custom;
                    handleConditionChange({
                      id: localNode.condition?.id || 'cond-1',
                      metric: d.metric,
                      operator: d.operator,
                      value: d.value,
                      useCase: useCase === 'custom' ? undefined : useCase,
                    });
                  }}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-primary focus:border-transparent"
                >
                  <option value="custom">Custom</option>
                  <option value="catching_underspend">Catching Underspend (with Quiet Hours)</option>
                  <option value="inventory_aware">Inventory-Aware Automation</option>
                  <option value="anomaly_spend">Anomaly Detection → Spikes In Ad Spend</option>
                  <option value="weather_dco">Weather Based Ads (DCO)</option>
                  <option value="sporting_event">Sporting Event Ads (DCO)</option>
                  <option value="seasonal_orchestration">Seasonal Event Orchestration</option>
                  <option value="performance_intervention">Performance Intervention</option>
                  <option value="channel_rotation">Channel Ad Rotation</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Metric</label>
                <select
                  value={localNode.condition?.metric || 'ROAS'}
                  onChange={(e) => handleConditionChange({
                    id: localNode.condition?.id || 'cond-1',
                    metric: e.target.value,
                    operator: localNode.condition?.operator || 'less_than',
                    value: localNode.condition?.value ?? 1.5,
                  })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-primary focus:border-transparent"
                >
                  <option value="ROAS">ROAS</option>
                  <option value="CPA">CPA</option>
                  <option value="CTR">CTR</option>
                  <option value="Name">Name</option>
                  <option value="daily_spend">Daily spend</option>
                  <option value="stock_level">Stock level</option>
                  <option value="spend_change_pct">Spend change %</option>
                  <option value="weather_condition">Weather condition</option>
                  <option value="match_result">Match result</option>
                </select>
              </div>
              {localNode.condition?.metric === 'spend_change_pct' && (
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Compare period</label>
                  <select
                    value={localNode.condition?.comparePeriod || 'daily'}
                    onChange={(e) => handleConditionChange({
                      id: localNode.condition?.id || 'cond-1',
                      metric: localNode.condition?.metric || 'spend_change_pct',
                      operator: localNode.condition?.operator || 'greater_than',
                      value: localNode.condition?.value ?? 20,
                      comparePeriod: e.target.value as ComparePeriod,
                    })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-primary focus:border-transparent"
                  >
                    <option value="daily">Daily (vs previous day)</option>
                    <option value="weekly">Weekly (vs previous week)</option>
                  </select>
                </div>
              )}
              {localNode.condition?.metric === 'weather_condition' && (
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Weather type</label>
                  <select
                    value={localNode.condition?.weatherType || 'rain_chance'}
                    onChange={(e) => handleConditionChange({
                      id: localNode.condition?.id || 'cond-1',
                      metric: localNode.condition?.metric || 'weather_condition',
                      operator: localNode.condition?.operator || 'equals',
                      value: localNode.condition?.value ?? '',
                      weatherType: e.target.value as WeatherCondition,
                    })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-primary focus:border-transparent"
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
                  <label className="block text-sm text-gray-700 mb-1">Match result</label>
                  <select
                    value={localNode.condition?.matchResult || 'loss'}
                    onChange={(e) => handleConditionChange({
                      id: localNode.condition?.id || 'cond-1',
                      metric: localNode.condition?.metric || 'match_result',
                      operator: localNode.condition?.operator || 'equals',
                      value: localNode.condition?.value ?? 'loss',
                      matchResult: e.target.value as MatchResult,
                    })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-primary focus:border-transparent"
                  >
                    <option value="win">Win</option>
                    <option value="loss">Loss</option>
                    <option value="draw">Draw</option>
                  </select>
                </div>
              )}
              {localNode.condition?.metric !== 'match_result' && (
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Operator</label>
                  <select
                    value={localNode.condition?.operator || 'less_than'}
                    onChange={(e) => handleConditionChange({
                      id: localNode.condition?.id || 'cond-1',
                      metric: localNode.condition?.metric || 'ROAS',
                      operator: e.target.value as ConditionOperator,
                      value: localNode.condition?.value ?? 1.5,
                    })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-primary focus:border-transparent"
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
              {(localNode.condition?.metric === 'daily_spend' ||
                localNode.condition?.metric === 'spend_change_pct' ||
                localNode.condition?.metric === 'ROAS' ||
                localNode.condition?.metric === 'CPA' ||
                localNode.condition?.metric === 'CTR' ||
                (localNode.condition?.metric === 'weather_condition' && localNode.condition?.weatherType !== 'sunny')) && (
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    {localNode.condition?.metric === 'daily_spend' ? 'Threshold (e.g. £)' : 'Value'}
                  </label>
                  <input
                    type={typeof localNode.condition?.value === 'number' ? 'number' : 'text'}
                    value={localNode.condition?.value ?? ''}
                    onChange={(e) => handleConditionChange({
                      id: localNode.condition?.id || 'cond-1',
                      metric: localNode.condition?.metric || 'ROAS',
                      operator: localNode.condition?.operator || 'less_than',
                      value: localNode.condition?.metric === 'spend_change_pct' ? Number(e.target.value) : (e.target.value as string | number),
                    })}
                    placeholder={localNode.condition?.metric === 'daily_spend' ? '5' : localNode.condition?.metric === 'spend_change_pct' ? '20' : ''}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-primary focus:border-transparent"
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {localNode.type === 'action' && (
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Action Settings</h3>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Action Type</label>
              <select
                value={localNode.action?.type || 'pause'}
                onChange={(e) => handleActionChange({
                  id: localNode.action?.id || 'action-1',
                  type: e.target.value as ActionType,
                })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-primary focus:border-transparent"
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
      </div>

      {/* Footer Actions */}
      <div className="border-t border-gray-200 p-4 space-y-2">
        <button
          onClick={() => onDelete(localNode.id)}
          className="w-full px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50"
        >
          Delete Node
        </button>
        <button
          onClick={() => onDuplicate(localNode.id)}
          className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Duplicate Node
        </button>
      </div>
    </div>
  );
};
