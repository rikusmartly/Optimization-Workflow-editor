import { AccountGroup, Node, Connection } from '../types';

export const mockAccountGroups: AccountGroup[] = [
  {
    id: 'all',
    name: 'All ad accounts',
    accounts: Array.from({ length: 16 }, (_, i) => ({
      id: `account-${i + 1}`,
      name: `Account ${i + 1}`,
      platform: 'meta' as const,
      details: `Account ID: ${1000 + i}`,
    })),
  },
  {
    id: 'meta',
    name: 'Meta Accounts',
    platform: 'meta',
    accounts: [
      { id: 'meta-1', name: 'Smartly showcase', platform: 'meta', details: 'Account ID: 2001' },
      { id: 'meta-2', name: 'BoldBanner', platform: 'meta', details: 'Account ID: 2002' },
      { id: 'meta-3', name: 'SocialSpark', platform: 'meta', details: 'Account ID: 2003' },
      { id: 'meta-4', name: 'TrendSetterAds', platform: 'meta', details: 'Account ID: 2004' },
      { id: 'meta-5', name: 'ReachRocket', platform: 'meta', details: 'Account ID: 2005' },
      { id: 'meta-6', name: 'ViralViewpoint', platform: 'meta', details: 'Account ID: 2006' },
    ],
  },
];

export const createDefaultNodes = (): { nodes: Node[]; connections: Connection[] } => {
  const nodes: Node[] = [
    {
      id: 'node-1',
      type: 'scope',
      name: 'New Scope',
      position: { x: 100, y: 200 },
      scope: { accounts: [] },
    },
    {
      id: 'node-2',
      type: 'schedule',
      name: 'Schedule',
      position: { x: 350, y: 200 },
      schedule: { frequency: 'daily', time: '15:59' },
    },
    {
      id: 'node-3',
      type: 'condition',
      name: 'Condition',
      position: { x: 600, y: 200 },
      condition: { id: 'cond-1', metric: 'ROAS', operator: 'less_than', value: 1.5 },
    },
    {
      id: 'node-4',
      type: 'action',
      name: 'Action',
      position: { x: 850, y: 200 },
      action: { id: 'action-1', type: 'pause' },
    },
  ];

  const connections: Connection[] = [
    { id: 'conn-1', sourceId: 'node-1', targetId: 'node-2' },
    { id: 'conn-2', sourceId: 'node-2', targetId: 'node-3' },
    { id: 'conn-3', sourceId: 'node-3', targetId: 'node-4' },
  ];

  return { nodes, connections };
};
