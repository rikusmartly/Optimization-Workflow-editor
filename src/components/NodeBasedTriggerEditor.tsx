import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Node, Connection } from '../types';
import { Node as NodeComponent } from './Node';
import { ConnectionLine } from './ConnectionLine';
import { NodeSettingsPanel } from './NodeSettingsPanel';
import { ScopeSelectionDialog } from './ScopeSelectionDialog';

interface NodeBasedTriggerEditorProps {
  nodes: Node[];
  connections: Connection[];
  onNodesChange: (nodes: Node[]) => void;
  onConnectionsChange: (connections: Connection[]) => void;
  zoom?: number;
  onZoomChange?: (zoom: number) => void;
  onResetView?: () => void;
}

export const NodeBasedTriggerEditor: React.FC<NodeBasedTriggerEditorProps> = ({
  nodes,
  connections,
  onNodesChange,
  onConnectionsChange,
  zoom: externalZoom,
  onZoomChange,
  onResetView,
}) => {
  const [internalZoom, setInternalZoom] = useState(1);
  const zoom = externalZoom !== undefined ? externalZoom : internalZoom;
  const setZoom = onZoomChange || setInternalZoom;
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [selectedNodeIds, setSelectedNodeIds] = useState<Set<string>>(new Set());
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);
  const [draggedNodeIds, setDraggedNodeIds] = useState<Set<string>>(new Set());
  const [connectionDrag, setConnectionDrag] = useState<{
    sourceId: string;
    startX: number;
    startY: number;
    currentX: number;
    currentY: number;
  } | null>(null);
  const [showScopeDialog, setShowScopeDialog] = useState(false);
  const [scopeNodeId, setScopeNodeId] = useState<string | null>(null);

  const canvasRef = useRef<SVGSVGElement>(null);
  const isPanning = useRef(false);
  const panStart = useRef<{ x: number; y: number } | null>(null);

  // Calculate canvas bounds
  const canvasBounds = useMemo(() => {
    if (nodes.length === 0) {
      return { minX: 0, minY: 0, maxX: 4000, maxY: 4000 };
    }
    const xs = nodes.map(n => n.position.x);
    const ys = nodes.map(n => n.position.y);
    const minX = Math.max(0, Math.min(...xs) - 2000);
    const minY = Math.max(0, Math.min(...ys) - 2000);
    const maxX = Math.max(4000, Math.max(...xs) + 2200);
    const maxY = Math.max(4000, Math.max(...ys) + 2200);
    return { minX, minY, maxX, maxY };
  }, [nodes]);

  // Handle canvas panning
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button === 0 && e.target === canvasRef.current) {
      isPanning.current = true;
      panStart.current = { x: e.clientX - panOffset.x, y: e.clientY - panOffset.y };
      (e.target as HTMLElement).style.cursor = 'grabbing';
    }
  }, [panOffset]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isPanning.current && panStart.current) {
      setPanOffset({
        x: e.clientX - panStart.current.x,
        y: e.clientY - panStart.current.y,
      });
    }

    if (dragging && dragStart) {
      const dx = (e.clientX - dragStart.x) / zoom;
      const dy = (e.clientY - dragStart.y) / zoom;

      const updatedNodes = nodes.map(node => {
        if (draggedNodeIds.has(node.id)) {
          const newX = Math.max(0, node.position.x + dx);
          const newY = Math.max(0, node.position.y + dy);
          return { ...node, position: { x: newX, y: newY } };
        }
        return node;
      });

      onNodesChange(updatedNodes);
      setDragStart({ x: e.clientX, y: e.clientY });
    }

    if (connectionDrag) {
      setConnectionDrag({
        ...connectionDrag,
        currentX: e.clientX,
        currentY: e.clientY,
      });
    }
  }, [dragging, dragStart, draggedNodeIds, nodes, zoom, connectionDrag, onNodesChange]);

  const handleMouseUp = useCallback(() => {
    isPanning.current = false;
    panStart.current = null;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = 'grab';
    }
    setDragging(false);
    setDragStart(null);
    setDraggedNodeIds(new Set());

    if (connectionDrag) {
      // Check if we're over a node
      const svg = canvasRef.current;
      if (svg) {
        const rect = svg.getBoundingClientRect();
        const x = (connectionDrag.currentX - rect.left - panOffset.x) / zoom;
        const y = (connectionDrag.currentY - rect.top - panOffset.y) / zoom;

        const targetNode = nodes.find(node => {
          const nodeX = node.position.x;
          const nodeY = node.position.y;
          return (
            x >= nodeX &&
            x <= nodeX + 200 &&
            y >= nodeY &&
            y <= nodeY + 64
          );
        });

        if (targetNode && targetNode.id !== connectionDrag.sourceId) {
          // Check if connection already exists
          const exists = connections.some(
            c => c.sourceId === connectionDrag.sourceId && c.targetId === targetNode.id
          );
          if (!exists) {
            const newConnection: Connection = {
              id: `conn-${Date.now()}`,
              sourceId: connectionDrag.sourceId,
              targetId: targetNode.id,
            };
            onConnectionsChange([...connections, newConnection]);
          }
        }
      }
      setConnectionDrag(null);
    }
  }, [connectionDrag, nodes, connections, onConnectionsChange, panOffset, zoom]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  // Handle node selection
  const handleNodeSelect = useCallback((e: React.MouseEvent, nodeId: string) => {
    if (e.ctrlKey || e.metaKey) {
      setSelectedNodeIds(prev => {
        const next = new Set(prev);
        if (next.has(nodeId)) {
          next.delete(nodeId);
        } else {
          next.add(nodeId);
        }
        return next;
      });
    } else {
      setSelectedNodeIds(new Set([nodeId]));
    }
  }, []);

  // Handle node dragging
  const handleNodeDragStart = useCallback((e: React.MouseEvent, nodeId: string) => {
    e.stopPropagation();
    setDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    if (selectedNodeIds.has(nodeId)) {
      setDraggedNodeIds(selectedNodeIds);
    } else {
      setDraggedNodeIds(new Set([nodeId]));
      setSelectedNodeIds(new Set([nodeId]));
    }
  }, [selectedNodeIds]);

  // Handle connection start
  const handleConnectionStart = useCallback((e: React.MouseEvent, nodeId: string, _handle: 'top' | 'right' | 'bottom' | 'left') => {
    e.stopPropagation();
    e.preventDefault();
    const svg = canvasRef.current;
    if (svg) {
      const startX = e.clientX;
      const startY = e.clientY;
      setConnectionDrag({
        sourceId: nodeId,
        startX,
        startY,
        currentX: startX,
        currentY: startY,
      });
    }
  }, []);

  // Handle zoom with mouse wheel
  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? 0.9 : 1.1;
      const newZoom = Math.max(0.3, Math.min(2, zoom * delta));
      setZoom(newZoom);
    }
  }, [zoom, setZoom]);

  // Reset pan when explicitly requested
  const resetPanRef = useRef<(() => void) | null>(null);
  resetPanRef.current = () => setPanOffset({ x: 0, y: 0 });
  
  useEffect(() => {
    if (onResetView && resetPanRef.current) {
      (window as any).__resetCanvasPan = resetPanRef.current;
      return () => {
        delete (window as any).__resetCanvasPan;
      };
    }
  }, [onResetView]);

  // Handle node updates
  const handleNodeUpdate = useCallback((updatedNode: Node) => {
    onNodesChange(nodes.map(n => n.id === updatedNode.id ? updatedNode : n));
  }, [nodes, onNodesChange]);

  // Handle node delete
  const handleNodeDelete = useCallback((nodeId: string) => {
    onNodesChange(nodes.filter(n => n.id !== nodeId));
    onConnectionsChange(connections.filter(c => c.sourceId !== nodeId && c.targetId !== nodeId));
    setSelectedNodeIds(new Set());
  }, [nodes, connections, onNodesChange, onConnectionsChange]);

  // Handle node duplicate
  const handleNodeDuplicate = useCallback((nodeId: string) => {
    const node = nodes.find(n => n.id === nodeId);
    if (node) {
      const newNode: Node = {
        ...node,
        id: `node-${Date.now()}`,
        position: { x: node.position.x + 50, y: node.position.y + 50 },
      };
      onNodesChange([...nodes, newNode]);
    }
  }, [nodes, onNodesChange]);

  const selectedNode = selectedNodeIds.size === 1 ? nodes.find(n => selectedNodeIds.has(n.id)) : null;

  // Get connection line for drag preview
  const getConnectionDragLine = () => {
    if (!connectionDrag) return null;
    const sourceNode = nodes.find(n => n.id === connectionDrag.sourceId);
    if (!sourceNode || !canvasRef.current) return null;

    const svg = canvasRef.current;
    const rect = svg.getBoundingClientRect();
    const targetX = (connectionDrag.currentX - rect.left - panOffset.x) / zoom;
    const targetY = (connectionDrag.currentY - rect.top - panOffset.y) / zoom;

    const sourceX = sourceNode.position.x + 200;
    const sourceY = sourceNode.position.y + 32;

    const dx = targetX - sourceX;
    const cp1x = sourceX + dx * 0.5;
    const cp1y = sourceY;
    const cp2x = sourceX + dx * 0.5;
    const cp2y = targetY;

    const path = `M ${sourceX} ${sourceY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${targetX} ${targetY}`;

    return (
      <path
        d={path}
        stroke="#9138ea"
        strokeWidth={2}
        strokeDasharray="5,5"
        fill="none"
      />
    );
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      <svg
        ref={canvasRef}
        className="w-full h-full canvas-grid"
        onMouseDown={handleMouseDown}
        onWheel={handleWheel}
        style={{ cursor: 'grab' }}
        width={canvasBounds.maxX}
        height={canvasBounds.maxY}
      >
        <g transform={`translate(${panOffset.x}, ${panOffset.y}) scale(${zoom})`}>
          {/* Connection lines */}
          {connections.map(conn => {
            const sourceNode = nodes.find(n => n.id === conn.sourceId);
            const targetNode = nodes.find(n => n.id === conn.targetId);
            if (!sourceNode || !targetNode) return null;
            return (
              <ConnectionLine
                key={conn.id}
                connection={conn}
                sourceNode={sourceNode}
                targetNode={targetNode}
              />
            );
          })}

          {/* Connection drag preview */}
          {getConnectionDragLine()}

          {/* Nodes */}
          {nodes.map(node => (
            <g
              key={node.id}
              onMouseEnter={() => setHoveredNodeId(node.id)}
              onMouseLeave={() => setHoveredNodeId(null)}
            >
              <NodeComponent
                node={node}
                isSelected={selectedNodeIds.has(node.id)}
                zoom={zoom}
                onSelect={handleNodeSelect}
                onDragStart={handleNodeDragStart}
                onConnectionStart={(e, nodeId, handle) => handleConnectionStart(e, nodeId, handle || 'right')}
                showHandles={hoveredNodeId === node.id}
              />
            </g>
          ))}
        </g>
      </svg>

      {/* Node Settings Panel */}
      {selectedNode && (
        <NodeSettingsPanel
          node={selectedNode}
          onUpdate={handleNodeUpdate}
          onDelete={handleNodeDelete}
          onDuplicate={handleNodeDuplicate}
          onClose={() => setSelectedNodeIds(new Set())}
          onOpenScopeDialog={(nodeId) => {
            setScopeNodeId(nodeId);
            setShowScopeDialog(true);
          }}
        />
      )}

      {/* Scope Selection Dialog */}
      {showScopeDialog && scopeNodeId && (
        <ScopeSelectionDialog
          node={nodes.find(n => n.id === scopeNodeId)!}
          onClose={() => {
            setShowScopeDialog(false);
            setScopeNodeId(null);
          }}
          onApply={(scope) => {
            const updatedNode = nodes.find(n => n.id === scopeNodeId);
            if (updatedNode) {
              handleNodeUpdate({ ...updatedNode, scope });
            }
            setShowScopeDialog(false);
            setScopeNodeId(null);
          }}
        />
      )}
    </div>
  );
};
