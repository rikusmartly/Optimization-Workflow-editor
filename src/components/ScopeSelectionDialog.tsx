import React, { useState, useMemo } from 'react';
import { Node, Scope, AccountGroup } from '../types';
import { mockAccountGroups } from '../utils/mockData';
import { FacebookIcon, ChevronRightIcon, ChevronDownIcon } from '../utils/icons';

interface ScopeSelectionDialogProps {
  node: Node;
  onClose: () => void;
  onApply: (scope: Scope) => void;
}

type ScopeLevel = 'account' | 'campaign' | 'adset';

export const ScopeSelectionDialog: React.FC<ScopeSelectionDialogProps> = ({
  node,
  onClose,
  onApply,
}) => {
  const [currentLevel, setCurrentLevel] = useState<ScopeLevel>('account');
  const [selectedAccounts, setSelectedAccounts] = useState<Set<string>>(
    new Set(node.scope?.accounts || [])
  );
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(['meta']));
  const [searchQuery, setSearchQuery] = useState('');

  const filteredGroups = useMemo(() => {
    if (!searchQuery) return mockAccountGroups;
    const query = searchQuery.toLowerCase();
    return mockAccountGroups.map(group => ({
      ...group,
      accounts: group.accounts.filter((acc: { name: string; id: string }) =>
        acc.name.toLowerCase().includes(query) ||
        acc.id.toLowerCase().includes(query)
      ),
    })).filter(group => group.accounts.length > 0);
  }, [searchQuery]);

  const handleGroupToggle = (groupId: string) => {
    setExpandedGroups(prev => {
      const next = new Set(prev);
      if (next.has(groupId)) {
        next.delete(groupId);
      } else {
        next.add(groupId);
      }
      return next;
    });
  };

  const handleAccountToggle = (accountId: string) => {
    setSelectedAccounts(prev => {
      const next = new Set(prev);
      if (next.has(accountId)) {
        next.delete(accountId);
      } else {
        next.add(accountId);
      }
      return next;
    });
  };

  const handleGroupSelectAll = (_groupId: string, accounts: string[]) => {
    setSelectedAccounts(prev => {
      const next = new Set(prev);
      const allSelected = accounts.every(id => next.has(id));
      if (allSelected) {
        accounts.forEach(id => next.delete(id));
      } else {
        accounts.forEach(id => next.add(id));
      }
      return next;
    });
  };

  const handleApply = () => {
    onApply({
      accounts: Array.from(selectedAccounts),
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-[600px] max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Select insight scope</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-200">
          {(['account', 'campaign', 'adset'] as ScopeLevel[]).map((level, idx) => (
            <React.Fragment key={level}>
              <button
                onClick={() => setCurrentLevel(level)}
                className={`px-3 py-1 rounded ${
                  currentLevel === level
                    ? 'bg-gray-900 text-white border border-gray-900'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
              {idx < 2 && (
                <span className="text-gray-400">
                  <ChevronRightIcon />
                </span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <circle cx="7" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              placeholder="Search by account name or account IDs"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-primary focus:border-transparent"
            />
          </div>
        </div>

        {/* Account List */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            {filteredGroups.map(group => {
              const isExpanded = expandedGroups.has(group.id);
              const groupAccounts = group.accounts.map((acc: { id: string }) => acc.id);
              const allSelected = groupAccounts.length > 0 && groupAccounts.every((id: string) => selectedAccounts.has(id));
              const someSelected = groupAccounts.some((id: string) => selectedAccounts.has(id));

              return (
                <div key={group.id} className="border border-gray-200 rounded-lg">
                  {/* Group Header */}
                  <div className="flex items-center p-3 hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={allSelected}
                      ref={(input) => {
                        if (input) input.indeterminate = someSelected && !allSelected;
                      }}
                      onChange={() => handleGroupSelectAll(group.id, groupAccounts)}
                      className="mr-3 w-4 h-4 text-purple-primary focus:ring-purple-primary"
                    />
                    <button
                      onClick={() => handleGroupToggle(group.id)}
                      className="flex-1 flex items-center gap-2"
                    >
                      {isExpanded ? (
                        <ChevronDownIcon />
                      ) : (
                        <ChevronRightIcon />
                      )}
                      {group.platform === 'meta' && <FacebookIcon />}
                      <span className="font-medium text-gray-900">{group.name}</span>
                      <span className="text-sm text-gray-500">({group.accounts.length})</span>
                    </button>
                  </div>

                  {/* Group Accounts */}
                  {isExpanded && (
                    <div className="border-t border-gray-200">
                      {group.accounts.map((account: { id: string; name: string; platform?: string; details?: string }) => (
                        <div
                          key={account.id}
                          className="flex items-center p-3 pl-10 hover:bg-gray-50"
                        >
                          <input
                            type="checkbox"
                            checked={selectedAccounts.has(account.id)}
                            onChange={() => handleAccountToggle(account.id)}
                            className="mr-3 w-4 h-4 text-purple-primary focus:ring-purple-primary"
                          />
                          {account.platform === 'meta' && (
                            <div className="mr-2">
                              <FacebookIcon />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-gray-900 truncate">
                              {account.name}
                            </div>
                            {account.details && (
                              <div className="text-xs text-gray-500 truncate">
                                {account.details}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            {selectedAccounts.size} selected
          </div>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              className="px-4 py-2 bg-purple-primary text-white rounded-lg hover:bg-purple-secondary"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
