export type Cost = 'Free' | 'Paid';
export type Access = 'Open' | 'Controlled';

export interface Tool {
  id: string;
  name: string;
  purpose: string;
  description: string;
  howToUse: string; // Rich text content
  region: string;
  businessUnit: string;
  languageSupport: string;
  cost: Cost;
  access: Access;
  views: number;
  tenant_id: string;
  createdAt: string;
  updatedAt: string;
}
