import React from 'react';
import { Node as NodeType } from '../types';
import { ScopeIcon, ScheduleIcon, ConditionIcon, ActionIcon } from '../utils/icons';

interface NodeProps {
  node: NodeType;
  isSelected: boolean;
  zoom: number;
  onSelect: (e: React.MouseEvent, nodeId: string) => void;
  onDragStart: (e: React.MouseEvent, nodeId: string) => void;
  onConnectionStart: (e: React.MouseEvent, nodeId: string, handle?: 'top' | 'right' | 'bottom' | 'left') => void;
  showHandles: boolean;
}

const getNodeIcon = (type: NodeType['type']) => {
  switch (type) {
    case 'scope':
      return <ScopeIcon />;
    case 'schedule':
      return <ScheduleIcon />;
    case 'condition':
      return <ConditionIcon />;
    case 'action':
      return <ActionIcon />;
  }
};

const getNodeDescription = (node: NodeType): string | undefined => {
  switch (node.type) {
    case 'scope':
      const accountCount = node.scope?.accounts?.length || 0;
      return accountCount > 0 ? `${accountCount} account(s) selected` : 'No accounts selected';
    case 'schedule':
      if (node.schedule) {
        const freq = node.schedule.frequency === 'daily' ? 'day' : 
                    node.schedule.frequency === 'hourly' ? 'hour' :
                    node.schedule.frequency === 'weekly' ? 'week' : 'once';
        let desc = `Check every ${freq} at ${node.schedule.time}`;
        if (node.schedule.activeHoursStart != null && node.schedule.activeHoursEnd != null) {
          desc += ` · Active ${node.schedule.activeHoursStart}–${node.schedule.activeHoursEnd}`;
        }
        return desc;
      }
      return 'No schedule set';
    case 'condition':
      if (node.condition) {
        const op = node.condition.operator === 'less_than' ? 'less than' :
                  node.condition.operator === 'greater_than' ? 'greater than' :
                  node.condition.operator === 'equals' ? 'equals' :
                  node.condition.operator === 'contains' ? 'contains' :
                  node.condition.operator === 'out_of_stock' ? 'out of stock' :
                  node.condition.operator === 'excess_stock' ? 'excess stock' : '?';
        const metricLabel = node.condition.metric === 'daily_spend' ? 'Daily spend' :
          node.condition.metric === 'stock_level' ? 'Stock level' :
          node.condition.metric === 'spend_change_pct' ? 'Spend change %' :
          node.condition.metric === 'weather_condition' ? 'Weather' :
          node.condition.metric === 'match_result' ? 'Match result' : node.condition.metric;
        return `${metricLabel} ${op} ${node.condition.value}`;
      }
      return 'No condition set';
    case 'action':
      if (node.action) {
        return node.action.type === 'pause' ? 'Pause campaign' :
               node.action.type === 'activate' ? 'Activate campaign' :
               node.action.type === 'email' ? 'Send email' :
               node.action.type === 'alert' ? 'Alert / Notify' :
               node.action.type === 'scale' ? 'Scale' :
               node.action.type === 'swap_creative' ? 'Swap creatives' : 'Adjust budget';
      }
      return 'No action set';
    default:
      return '';
  }
};

export const Node: React.FC<NodeProps> = ({
  node,
  isSelected,
  onSelect,
  onDragStart,
  onConnectionStart,
  showHandles,
}) => {
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0 && !(e.target as HTMLElement).classList.contains('connection-handle')) {
      onSelect(e, node.id);
      onDragStart(e, node.id);
    }
  };

  const handleHandleMouseDown = (e: React.MouseEvent, handle: 'top' | 'right' | 'bottom' | 'left') => {
    e.stopPropagation();
    e.preventDefault();
    onConnectionStart(e, node.id, handle);
  };

  return (
    <g
      transform={`translate(${node.position.x}, ${node.position.y})`}
      onMouseDown={handleMouseDown}
      style={{ cursor: 'grab' }}
    >
      {/* Node card */}
      <rect
        width={200}
        height={64}
        rx={12}
        fill="#ffffff"
        stroke={isSelected ? '#9333ea' : '#f1f2f3'}
        strokeWidth={isSelected ? 2 : 0.5}
        className="node-shadow"
      />
      
      {/* Icon container */}
      <g transform="translate(16, 16)">
        <circle cx={16} cy={16} r={16} fill="#f8f0ff" stroke="#ecd8fe" strokeWidth={1} />
        <g transform="translate(8, 8)">
          {getNodeIcon(node.type)}
        </g>
      </g>
      
      {/* Text content */}
      <g transform="translate(56, 8)">
        <text
          x={0}
          y={18}
          fontSize={14}
          fontFamily="SF Pro Text"
          fontWeight={500}
          fill="#161718"
          letterSpacing="-0.1"
        >
          {node.name}
        </text>
        <text
          x={0}
          y={36}
          fontSize={12}
          fontFamily="SF Pro Text"
          fontWeight={400}
          fill="#68696a"
        >
          {getNodeDescription(node)}
        </text>
      </g>
      
      {/* Connection handles */}
      {showHandles && (
        <>
          {/* Top */}
          <circle
            cx={100}
            cy={0}
            r={3}
            fill="#9138ea"
            className="connection-handle"
            onMouseDown={(e) => handleHandleMouseDown(e, 'top')}
            style={{ cursor: 'crosshair' }}
            onMouseEnter={(e) => {
              e.currentTarget.setAttribute('r', '4');
            }}
            onMouseLeave={(e) => {
              e.currentTarget.setAttribute('r', '3');
            }}
          />
          {/* Right */}
          <circle
            cx={200}
            cy={32}
            r={3}
            fill="#9138ea"
            className="connection-handle"
            onMouseDown={(e) => handleHandleMouseDown(e, 'right')}
            style={{ cursor: 'crosshair' }}
            onMouseEnter={(e) => {
              e.currentTarget.setAttribute('r', '4');
            }}
            onMouseLeave={(e) => {
              e.currentTarget.setAttribute('r', '3');
            }}
          />
          {/* Bottom */}
          <circle
            cx={100}
            cy={64}
            r={3}
            fill="#9138ea"
            className="connection-handle"
            onMouseDown={(e) => handleHandleMouseDown(e, 'bottom')}
            style={{ cursor: 'crosshair' }}
            onMouseEnter={(e) => {
              e.currentTarget.setAttribute('r', '4');
            }}
            onMouseLeave={(e) => {
              e.currentTarget.setAttribute('r', '3');
            }}
          />
          {/* Left */}
          <circle
            cx={0}
            cy={32}
            r={3}
            fill="#9138ea"
            className="connection-handle"
            onMouseDown={(e) => handleHandleMouseDown(e, 'left')}
            style={{ cursor: 'crosshair' }}
            onMouseEnter={(e) => {
              e.currentTarget.setAttribute('r', '4');
            }}
            onMouseLeave={(e) => {
              e.currentTarget.setAttribute('r', '3');
            }}
          />
        </>
      )}
    </g>
  );
};
