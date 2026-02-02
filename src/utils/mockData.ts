import { AccountGroup, Node, Connection } from '../types';

/** Mock ads for scope "matching items" – filtered by selected scope and name contains */
export interface MockAd {
  id: string;
  name: string;
  accountId: string;
}

export const mockAds: MockAd[] = [
  { id: 'ad-1', name: 'Summer Sale - Carousel', accountId: 'meta-1' },
  { id: 'ad-2', name: 'Summer Campaign - Video', accountId: 'meta-1' },
  { id: 'ad-3', name: 'Brand Awareness - Static', accountId: 'meta-1' },
  { id: 'ad-4', name: 'Black Friday - Dynamic', accountId: 'meta-2' },
  { id: 'ad-5', name: 'Brand Hero - Video', accountId: 'meta-2' },
  { id: 'ad-6', name: 'Summer Flash Sale', accountId: 'meta-2' },
  { id: 'ad-7', name: 'Holiday Brand Spot', accountId: 'meta-3' },
  { id: 'ad-8', name: 'Summer Collection - DCO', accountId: 'meta-3' },
  { id: 'ad-9', name: 'Brand Launch - Meta', accountId: 'meta-4' },
  { id: 'ad-10', name: 'Summer Promo - 20% off', accountId: 'meta-4' },
  { id: 'ad-11', name: 'Retargeting - Cart', accountId: 'meta-5' },
  { id: 'ad-12', name: 'Brand Video - 15s', accountId: 'meta-5' },
  { id: 'ad-13', name: 'Summer Lookbook', accountId: 'meta-6' },
  { id: 'ad-14', name: 'New Brand Campaign', accountId: 'meta-6' },
  { id: 'ad-15', name: 'Dynamic Summer Ads', accountId: 'meta-6' },
];

/** Returns ads that fit within the selected scope and match name contains (if set). */
export function getMatchingAds(scope: { accounts?: string[]; nameContains?: string } | undefined): MockAd[] {
  if (!scope) return [];
  const accountIds = scope.accounts && scope.accounts.length > 0
    ? new Set(scope.accounts)
    : null; // no selection = all accounts in mock
  const nameQuery = scope.nameContains?.trim().toLowerCase() || null;
  return mockAds.filter(ad => {
    if (accountIds && !accountIds.has(ad.accountId)) return false;
    if (nameQuery && !ad.name.toLowerCase().includes(nameQuery)) return false;
    return true;
  });
}

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
