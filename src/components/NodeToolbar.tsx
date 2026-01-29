import React from 'react';
import { NodeType } from '../types';
import { ScopeIcon, ScheduleIcon, ConditionIcon, ActionIcon } from '../utils/icons';

interface NodeToolbarProps {
  onAddNode: (type: NodeType | 'template') => void;
}

export const NodeToolbar: React.FC<NodeToolbarProps> = ({ onAddNode }) => {
  const [showMoreMenu, setShowMoreMenu] = React.useState(false);

  return (
    <div className="fixed left-6 top-1/2 transform -translate-y-1/2 z-30">
      <div className="flex flex-col gap-1 bg-white rounded-full py-4 px-2 shadow-lg">
        <button
          onClick={() => onAddNode('scope')}
          className="flex items-center justify-center p-3 rounded-full hover:bg-gray-100 transition-colors"
          title="Add Scope"
        >
          <ScopeIcon />
        </button>
        <button
          onClick={() => onAddNode('schedule')}
          className="flex items-center justify-center p-3 rounded-full hover:bg-gray-100 transition-colors"
          title="Add Schedule"
        >
          <ScheduleIcon />
        </button>
        <button
          onClick={() => onAddNode('condition')}
          className="flex items-center justify-center p-3 rounded-full hover:bg-gray-100 transition-colors"
          title="Add Condition"
        >
          <ConditionIcon />
        </button>
        <button
          onClick={() => onAddNode('action')}
          className="flex items-center justify-center p-3 rounded-full hover:bg-gray-100 transition-colors"
          title="Add Action"
        >
          <ActionIcon />
        </button>
        
        {/* More Button */}
        <div className="relative">
          <button
            onClick={() => setShowMoreMenu(!showMoreMenu)}
            className="flex items-center justify-center p-3 rounded-full hover:bg-gray-100 transition-colors w-full"
            title="More"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="4" r="1.5" fill="#9138ea"/>
              <circle cx="8" cy="8" r="1.5" fill="#9138ea"/>
              <circle cx="8" cy="12" r="1.5" fill="#9138ea"/>
            </svg>
          </button>

          {showMoreMenu && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowMoreMenu(false)}
              />
              <div className="absolute left-full top-0 ml-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
                {/* Templates Section */}
                <div className="p-2">
                  <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Templates
                  </div>
                  <button
                    onClick={() => {
                      onAddNode('template');
                      setShowMoreMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-50"
                  >
                    <div className="font-medium text-gray-900">Trigger Template</div>
                    <div className="text-xs text-gray-500">Creates connected set of 4 nodes</div>
                  </button>
                </div>
                
                <div className="border-t border-gray-200" />
                
                {/* Building Blocks Section */}
                <div className="p-2">
                  <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Building Blocks
                  </div>
                  <button
                    onClick={() => {
                      onAddNode('scope');
                      setShowMoreMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-50 flex items-center gap-2"
                  >
                    <ScopeIcon />
                    <span className="text-gray-700">Scope</span>
                  </button>
                  <button
                    onClick={() => {
                      onAddNode('schedule');
                      setShowMoreMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-50 flex items-center gap-2"
                  >
                    <ScheduleIcon />
                    <span className="text-gray-700">Schedule</span>
                  </button>
                  <button
                    onClick={() => {
                      onAddNode('condition');
                      setShowMoreMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-50 flex items-center gap-2"
                  >
                    <ConditionIcon />
                    <span className="text-gray-700">Condition</span>
                  </button>
                  <button
                    onClick={() => {
                      onAddNode('action');
                      setShowMoreMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-50 flex items-center gap-2"
                  >
                    <ActionIcon />
                    <span className="text-gray-700">Action</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
