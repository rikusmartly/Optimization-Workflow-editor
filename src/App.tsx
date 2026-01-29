import { useState, useCallback } from 'react';
import { Node, Connection, NodeType } from './types';
import { NodeBasedTriggerEditor } from './components/NodeBasedTriggerEditor';
import { TopNavigation } from './components/TopNavigation';
import { Toolbar } from './components/Toolbar';
import { NodeToolbar } from './components/NodeToolbar';
import { OptimizationHome } from './components/OptimizationHome';
import { FloatingPromptInput } from './components/FloatingPromptInput';
import { InsightChatPanel } from './components/InsightChatPanel';
import { createDefaultNodes } from './utils/mockData';

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'workflow'>('home');
  const [workflowName, setWorkflowName] = useState('New workflow');
  const [nodes, setNodes] = useState<Node[]>(() => createDefaultNodes().nodes);
  const [connections, setConnections] = useState<Connection[]>(() => createDefaultNodes().connections);
  const [zoom, setZoom] = useState(1);
  const [showChatPanel, setShowChatPanel] = useState(false);
  const [history, setHistory] = useState<Array<{ nodes: Node[]; connections: Connection[] }>>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const handleAddNode = useCallback((type: NodeType | 'template') => {
    if (type === 'template') {
      // Create template with 4 connected nodes with 250px spacing
      const startX = 100;
      const startY = 200;
      const spacing = 250;
      
      const newNodes: Node[] = [
        {
          id: `node-${Date.now()}`,
          type: 'scope',
          name: 'New Scope',
          position: { x: startX, y: startY },
          scope: { accounts: [] },
        },
        {
          id: `node-${Date.now() + 1}`,
          type: 'schedule',
          name: 'Schedule',
          position: { x: startX + spacing, y: startY },
          schedule: { frequency: 'daily', time: '15:59' },
        },
        {
          id: `node-${Date.now() + 2}`,
          type: 'condition',
          name: 'Condition',
          position: { x: startX + spacing * 2, y: startY },
          condition: { id: 'cond-1', metric: 'ROAS', operator: 'less_than', value: 1.5 },
        },
        {
          id: `node-${Date.now() + 3}`,
          type: 'action',
          name: 'Action',
          position: { x: startX + spacing * 3, y: startY },
          action: { id: 'action-1', type: 'pause' },
        },
      ];

      const newConnections: Connection[] = [
        { id: `conn-${Date.now()}`, sourceId: newNodes[0].id, targetId: newNodes[1].id },
        { id: `conn-${Date.now() + 1}`, sourceId: newNodes[1].id, targetId: newNodes[2].id },
        { id: `conn-${Date.now() + 2}`, sourceId: newNodes[2].id, targetId: newNodes[3].id },
      ];

      setNodes(prev => [...prev, ...newNodes]);
      setConnections(prev => [...prev, ...newConnections]);
    } else {
      // Add single node
      const newNode: Node = {
        id: `node-${Date.now()}`,
        type: type as NodeType,
        name: type === 'scope' ? 'New Scope' :
              type === 'schedule' ? 'Schedule' :
              type === 'condition' ? 'Condition' : 'Action',
        position: { x: 200, y: 200 },
        ...(type === 'scope' && { scope: { accounts: [] } }),
        ...(type === 'schedule' && { schedule: { frequency: 'daily', time: '15:59' } }),
        ...(type === 'condition' && { condition: { id: 'cond-1', metric: 'ROAS', operator: 'less_than', value: 1.5 } }),
        ...(type === 'action' && { action: { id: 'action-1', type: 'pause' } }),
      };
      setNodes(prev => [...prev, newNode]);
    }
  }, []);

  const handleNodesChange = useCallback((newNodes: Node[]) => {
    setNodes(newNodes);
    // Add to history
    setHistory(prev => {
      const newHistory = prev.slice(0, historyIndex + 1);
      newHistory.push({ nodes: newNodes, connections });
      return newHistory.slice(-50); // Keep last 50 states
    });
    setHistoryIndex(prev => Math.min(prev + 1, 49));
  }, [connections, historyIndex]);

  const handleConnectionsChange = useCallback((newConnections: Connection[]) => {
    setConnections(newConnections);
  }, []);

  const handleZoomIn = () => setZoom(prev => Math.min(2, prev + 0.1));
  const handleZoomOut = () => setZoom(prev => Math.max(0.3, prev - 0.1));
  const handleResetView = () => {
    setZoom(1);
    // Reset pan
    if ((window as any).__resetCanvasPan) {
      (window as any).__resetCanvasPan();
    }
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const prevState = history[historyIndex - 1];
      setNodes(prevState.nodes);
      setConnections(prevState.connections);
      setHistoryIndex(prev => prev - 1);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const nextState = history[historyIndex + 1];
      setNodes(nextState.nodes);
      setConnections(nextState.connections);
      setHistoryIndex(prev => prev + 1);
    }
  };

  const handleDelete = () => {
    // Delete selected nodes (would need to track selection in editor)
    // For now, just a placeholder
  };

  const handleDeleteCanvas = () => {
    if (confirm('Are you sure you want to delete the entire canvas?')) {
      setNodes([]);
      setConnections([]);
    }
  };

  const handleActivatePublish = () => {
    alert('Workflow activated and published!');
  };

  if (currentView === 'home') {
    return (
      <OptimizationHome onNavigateToWorkflowBuilder={() => setCurrentView('workflow')} />
    );
  }

  return (
    <div className="h-screen flex flex-col relative" style={{ backgroundColor: '#F5F5F5' }}>
      {/* Canvas - extends full screen behind headers */}
      <div className="absolute inset-0">
        <NodeBasedTriggerEditor
          nodes={nodes}
          connections={connections}
          onNodesChange={handleNodesChange}
          onConnectionsChange={handleConnectionsChange}
          zoom={zoom}
          onZoomChange={setZoom}
          onResetView={handleResetView}
        />
      </div>
      
      {/* Floating headers */}
      <TopNavigation
        workflowName={workflowName}
        onWorkflowNameChange={setWorkflowName}
        onDeleteCanvas={handleDeleteCanvas}
        onActivatePublish={handleActivatePublish}
        onNavigateToHome={() => setCurrentView('home')}
      />
      <Toolbar
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onResetView={handleResetView}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onDelete={handleDelete}
        zoom={zoom}
        canUndo={historyIndex > 0}
        canRedo={historyIndex < history.length - 1}
      />
      <NodeToolbar onAddNode={handleAddNode} />
      <FloatingPromptInput onFocus={() => setShowChatPanel(true)} />
      <InsightChatPanel isOpen={showChatPanel} onClose={() => setShowChatPanel(false)} />
    </div>
  );
}

export default App;
