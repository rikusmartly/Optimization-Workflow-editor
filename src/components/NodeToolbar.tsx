import React from 'react';
import { NodeType } from '../types';
import { ScopeIcon, ScheduleIcon, ConditionIcon, ActionIcon, NoteIcon } from '../utils/icons';

interface NodeToolbarProps {
  onAddNode: (type: NodeType | 'template') => void;
}

const MenuItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  iconBgClass: string;
  onClick: () => void;
}> = ({ icon, label, iconBgClass, onClick }) => (
  <button
    onClick={onClick}
    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors text-left"
  >
    <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${iconBgClass}`}>
      {icon}
    </div>
    <span className="text-sm font-medium text-gray-800">{label}</span>
  </button>
);

const DraggableNodeItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  iconBgClass: string;
  nodeType: NodeType;
}> = ({ icon, label, iconBgClass, nodeType }) => {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('node-type', nodeType);
    e.dataTransfer.effectAllowed = 'copy';
  };
  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors text-left cursor-grab active:cursor-grabbing"
    >
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${iconBgClass}`}>
        {icon}
      </div>
      <span className="text-sm font-medium text-gray-800">{label}</span>
    </div>
  );
};

export const NodeToolbar: React.FC<NodeToolbarProps> = ({ onAddNode }) => {
  const [showMoreMenu, setShowMoreMenu] = React.useState(false);

  return (
    <div className="fixed left-6 top-24 bottom-6 w-56 z-30">
      <div className="h-full bg-white rounded-2xl border border-gray-200 shadow-lg flex flex-col overflow-hidden">
        {/* Core */}
        <div className="p-3">
          <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Core
          </div>
          <div className="space-y-0.5">
            <DraggableNodeItem
              icon={<ScopeIcon />}
              label="Scope"
              iconBgClass="bg-purple-100"
              nodeType="scope"
            />
            <DraggableNodeItem
              icon={<ScheduleIcon />}
              label="Schedule"
              iconBgClass="bg-emerald-100"
              nodeType="schedule"
            />
          </div>
        </div>

        {/* Logic */}
        <div className="p-3 border-t border-gray-100">
          <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Logic
          </div>
          <div className="space-y-0.5">
            <DraggableNodeItem
              icon={<ConditionIcon />}
              label="Condition"
              iconBgClass="bg-amber-100"
              nodeType="condition"
            />
          </div>
        </div>

        {/* Data / Actions */}
        <div className="p-3 border-t border-gray-100">
          <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Data
          </div>
          <div className="space-y-0.5">
            <DraggableNodeItem
              icon={<ActionIcon />}
              label="Action"
              iconBgClass="bg-purple-100"
              nodeType="action"
            />
          </div>
        </div>

        {/* Tools */}
        <div className="p-3 border-t border-gray-100 mt-auto">
          <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Tools
          </div>
          <div className="space-y-0.5 relative">
            <DraggableNodeItem
              icon={<NoteIcon />}
              label="Note"
              iconBgClass="bg-amber-100"
              nodeType="note"
            />
            <button
              onClick={() => setShowMoreMenu(!showMoreMenu)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors text-left"
            >
              <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 bg-gray-100">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="4" r="1.5" fill="#6b7280"/>
                  <circle cx="8" cy="8" r="1.5" fill="#6b7280"/>
                  <circle cx="8" cy="12" r="1.5" fill="#6b7280"/>
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-800">Templates</span>
            </button>

            {showMoreMenu && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowMoreMenu(false)}
                />
                <div className="absolute left-full top-0 ml-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
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
                  <div className="p-2">
                    <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Building Blocks
                    </div>
                    <button
                      onClick={() => { onAddNode('scope'); setShowMoreMenu(false); }}
                      className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-50 flex items-center gap-2"
                    >
                      <ScopeIcon />
                      <span className="text-gray-700">Scope</span>
                    </button>
                    <button
                      onClick={() => { onAddNode('schedule'); setShowMoreMenu(false); }}
                      className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-50 flex items-center gap-2"
                    >
                      <ScheduleIcon />
                      <span className="text-gray-700">Schedule</span>
                    </button>
                    <button
                      onClick={() => { onAddNode('condition'); setShowMoreMenu(false); }}
                      className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-50 flex items-center gap-2"
                    >
                      <ConditionIcon />
                      <span className="text-gray-700">Condition</span>
                    </button>
                    <button
                      onClick={() => { onAddNode('action'); setShowMoreMenu(false); }}
                      className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-50 flex items-center gap-2"
                    >
                      <ActionIcon />
                      <span className="text-gray-700">Action</span>
                    </button>
                    <button
                      onClick={() => { onAddNode('note'); setShowMoreMenu(false); }}
                      className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-50 flex items-center gap-2"
                    >
                      <NoteIcon />
                      <span className="text-gray-700">Note</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
