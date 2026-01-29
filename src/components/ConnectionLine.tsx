import React from 'react';
import { Connection, Node } from '../types';

interface ConnectionLineProps {
  connection: Connection;
  sourceNode: Node;
  targetNode: Node;
}

export const ConnectionLine: React.FC<ConnectionLineProps> = ({
  connection: _connection,
  sourceNode,
  targetNode,
}) => {
  const sourceX = sourceNode.position.x + 200; // Right edge
  const sourceY = sourceNode.position.y + 32; // Center
  const targetX = targetNode.position.x; // Left edge
  const targetY = targetNode.position.y + 32; // Center

  // Calculate control points for Bezier curve
  const dx = targetX - sourceX;
  const cp1x = sourceX + dx * 0.5;
  const cp1y = sourceY;
  const cp2x = sourceX + dx * 0.5;
  const cp2y = targetY;

  const path = `M ${sourceX} ${sourceY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${targetX} ${targetY}`;

  return (
    <path
      d={path}
      stroke="#C6C7C7"
      strokeWidth={2}
      fill="none"
      opacity={0.5}
    />
  );
};
