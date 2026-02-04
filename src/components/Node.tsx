import React from 'react';
import { Node as NodeType, LOOKBACK_OPTIONS } from '../types';
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
    case 'note':
      return null; // Note nodes don't show an icon
  }
};

/** Returns [line1, line2?] for the node description (up to 2 lines on canvas). */
const getNodeDescription = (node: NodeType): [string, string?] => {
  switch (node.type) {
    case 'scope': {
      const accountCount = node.scope?.accounts?.length || 0;
      const line1 = accountCount > 0 ? `${accountCount} account(s) selected` : 'No accounts selected';
      const line2 = node.scope?.nameContains?.trim() ? `Name contains: ${node.scope.nameContains.trim()}` : undefined;
      return [line1, line2];
    }
    case 'schedule':
      if (node.schedule) {
        const freq = node.schedule.frequency === 'daily' ? 'day' :
                    node.schedule.frequency === 'hourly' ? 'hour' :
                    node.schedule.frequency === 'weekly' ? 'week' : 'once';
        const line1 = `Check every ${freq} at ${node.schedule.time}`;
        const line2 = (node.schedule.activeHoursStart != null && node.schedule.activeHoursEnd != null)
          ? `Active ${node.schedule.activeHoursStart}–${node.schedule.activeHoursEnd}`
          : undefined;
        return [line1, line2];
      }
      return ['No schedule set'];
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
        const line1 = `${metricLabel} ${op} ${node.condition.value}`;
        if (node.condition.lookbackWindow) {
          const opt = LOOKBACK_OPTIONS.find((o) => o.value === node.condition!.lookbackWindow);
          const line2 = opt ? opt.label : node.condition.lookbackWindow;
          return [line1, line2];
        }
        if (node.condition.comparePeriod) {
          const line2 = node.condition.comparePeriod === 'weekly' ? 'vs previous week' : 'vs previous day';
          return [line1, line2];
        }
        return [line1];
      }
      return ['No condition set'];
    case 'action':
      if (node.action) {
        const line1 = node.action.type === 'pause' ? 'Pause campaign' :
               node.action.type === 'activate' ? 'Activate campaign' :
               node.action.type === 'email' ? 'Send email' :
               node.action.type === 'alert' ? 'Alert / Notify' :
               node.action.type === 'scale' ? 'Scale' :
               node.action.type === 'swap_creative' ? 'Swap creatives' : 'Adjust budget';
        return [line1];
      }
      return ['No action set'];
    case 'note': {
      const text = node.note?.content?.trim() || '';
      if (!text) return ['Add your note...'];
      const lines = text.split(/\n/).filter(Boolean);
      return [lines[0] || 'Add your note...', lines[1]];
    }
    default:
      return [''];
  }
};

export const NODE_WIDTH = 200;
export const NOTE_WIDTH = 200;
const NOTE_PADDING = 12;
const NOTE_LINE_HEIGHT = 14;
const NOTE_LINE_GAP = 4;
const NOTE_MIN_HEIGHT = 60;
const NOTE_CHARS_PER_LINE = 25;

const PADDING_TOP = 8;
const TITLE_HEIGHT = 18;
const GAP_AFTER_TITLE = 8;
const DESC_LINE_HEIGHT = 14;
const GAP_BETWEEN_LINES = 4;
const PADDING_BOTTOM = 8;
const PADDING_LEFT = 8;
const PADDING_RIGHT = 8;
const FIRST_DESC_LINE_OFFSET = 8;
const MIN_NODE_HEIGHT = 64;

/** Approximate chars per line for 12px font in the description area. */
const DESC_TEXT_WIDTH = NODE_WIDTH - 56 - PADDING_LEFT - PADDING_RIGHT; // ~128px
const CHARS_PER_LINE = Math.floor(DESC_TEXT_WIDTH / 7);

/** Truncates description to a single line with ellipsis if needed. */
function truncateToSingleLine(fullText: string): string {
  const t = fullText.trim();
  if (!t) return '';
  if (t.length <= CHARS_PER_LINE) return t;
  return t.slice(0, CHARS_PER_LINE - 3) + '...';
}

/** Full description string for a node (used for wrapping). */
function getDescriptionText(node: NodeType): string {
  const [line1, line2] = getNodeDescription(node);
  return [line1, line2].filter(Boolean).join(' ');
}

/** Note content split into lines (by newline, then wrap long lines). */
function getNoteContentLines(node: NodeType): string[] {
  const text = node.note?.content?.trim() || '';
  if (!text) return ['Add your note...'];
  const paragraphs = text.split(/\n/).filter(Boolean);
  const lines: string[] = [];
  for (const p of paragraphs) {
    const words = p.trim().split(/\s+/);
    let current = '';
    for (const word of words) {
      const withWord = current ? `${current} ${word}` : word;
      if (withWord.length <= NOTE_CHARS_PER_LINE) {
        current = withWord;
      } else {
        if (current) lines.push(current);
        if (word.length > NOTE_CHARS_PER_LINE) {
          for (let i = 0; i < word.length; i += NOTE_CHARS_PER_LINE) {
            lines.push(word.slice(i, i + NOTE_CHARS_PER_LINE));
          }
          current = '';
        } else {
          current = word;
        }
      }
    }
    if (current) lines.push(current);
  }
  return lines.length ? lines : ['Add your note...'];
}

/** Single-line description for layout/height (no wrapping). */
export function getWrappedDescription(node: NodeType): string[] {
  const text = truncateToSingleLine(getDescriptionText(node));
  return text ? [text] : [];
}

/** Returns node height in px based on wrapped description line count. */
export function getNodeHeight(node: NodeType): number {
  if (node.type === 'note') {
    const lines = getNoteContentLines(node);
    const lineCount = Math.max(1, lines.length);
    return Math.max(
      NOTE_MIN_HEIGHT,
      NOTE_PADDING * 2 + lineCount * NOTE_LINE_HEIGHT + (lineCount - 1) * NOTE_LINE_GAP
    );
  }
  const lines = getWrappedDescription(node);
  const lineCount = Math.max(1, lines.length);
  const contentHeight = PADDING_TOP + TITLE_HEIGHT + GAP_AFTER_TITLE + FIRST_DESC_LINE_OFFSET
    + lineCount * DESC_LINE_HEIGHT + (lineCount - 1) * GAP_BETWEEN_LINES + PADDING_BOTTOM;
  return Math.max(MIN_NODE_HEIGHT, contentHeight);
}

/** Returns node width in px (notes use NOTE_WIDTH, others NODE_WIDTH). */
export function getNodeWidth(node: NodeType): number {
  return node.type === 'note' ? NOTE_WIDTH : NODE_WIDTH;
}

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

  const height = getNodeHeight(node);
  const width = getNodeWidth(node);
  const isNote = node.type === 'note';

  return (
    <g
      transform={`translate(${node.position.x}, ${node.position.y})`}
      onMouseDown={handleMouseDown}
      style={{ cursor: 'grab' }}
    >
      {/* Node card */}
      <rect
        width={width}
        height={height}
        rx={12}
        fill="#ffffff"
        stroke={isSelected ? '#9333ea' : '#f1f2f3'}
        strokeWidth={isSelected ? 2 : 0.5}
        className="node-shadow"
      />
      
      {isNote ? (
        /* Note: content only, no icon or title */
        <g transform={`translate(${NOTE_PADDING}, ${NOTE_PADDING})`}>
          {getNoteContentLines(node).map((line, i) => (
            <text
              key={i}
              x={0}
              y={NOTE_LINE_HEIGHT + i * (NOTE_LINE_HEIGHT + NOTE_LINE_GAP)}
              fontSize={12}
              fontFamily="SF Pro Text"
              fontWeight={400}
              fill="#374151"
            >
              {line}
            </text>
          ))}
        </g>
      ) : (
        <>
          {/* Icon container */}
          <g transform="translate(16, 16)">
            <circle cx={16} cy={16} r={16} fill="#f8f0ff" stroke="#ecd8fe" strokeWidth={1} />
            <g transform="translate(8, 8)">
              {getNodeIcon(node.type)}
            </g>
          </g>
          {/* Text content: title + wrapped description */}
          <g transform={`translate(${56 + PADDING_LEFT}, ${PADDING_TOP})`}>
            <text
              x={0}
              y={TITLE_HEIGHT}
              fontSize={14}
              fontFamily="SF Pro Text"
              fontWeight={500}
              fill="#161718"
              letterSpacing="-0.1"
            >
              {node.name}
            </text>
            {getWrappedDescription(node).map((line, i) => (
              <text
                key={i}
                x={0}
                y={TITLE_HEIGHT + GAP_AFTER_TITLE + FIRST_DESC_LINE_OFFSET + i * (DESC_LINE_HEIGHT + GAP_BETWEEN_LINES)}
                fontSize={12}
                fontFamily="SF Pro Text"
                fontWeight={400}
                fill="#68696a"
              >
                {line}
              </text>
            ))}
          </g>
        </>
      )}
      
      {/* Connection handle (right only; not shown for notes) */}
      {showHandles && !isNote && (
        <circle
          cx={width}
          cy={height / 2}
          r={6}
          fill="#9138ea"
          className="connection-handle"
          onMouseDown={(e) => handleHandleMouseDown(e, 'right')}
          style={{ cursor: 'crosshair' }}
          onMouseEnter={(e) => {
            e.currentTarget.setAttribute('r', '8');
          }}
          onMouseLeave={(e) => {
            e.currentTarget.setAttribute('r', '6');
          }}
        />
      )}
    </g>
  );
};
