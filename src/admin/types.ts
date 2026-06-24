/** Document shapes stored in the private dataset (no Studio schema needed). */

export type SanityDoc = {
  _id: string;
  _type: string;
  _createdAt?: string;
  _updatedAt?: string;
};

export const CONTACT_STATUSES = [
  'Lead',
  'Contacted',
  'Active',
  'Closed',
] as const;
export type ContactStatus = (typeof CONTACT_STATUSES)[number];

export type Contact = SanityDoc & {
  _type: 'contact';
  name: string;
  company?: string;
  email?: string;
  notes?: string;
  status?: ContactStatus;
};

export const OPPORTUNITY_STAGES = [
  'Application',
  'Interview',
  'Offer',
  'Project',
  'Rejected',
] as const;
export type OpportunityStage = (typeof OPPORTUNITY_STAGES)[number];

export type Opportunity = SanityDoc & {
  _type: 'opportunity';
  title: string;
  company?: string;
  stage?: OpportunityStage;
  link?: string;
  notes?: string;
};

export type Note = SanityDoc & {
  _type: 'note';
  title: string;
  body?: string;
};

export const TASK_STATUSES = ['Backlog', 'In Progress', 'Done'] as const;
export type TaskStatus = (typeof TASK_STATUSES)[number];

export type Task = SanityDoc & {
  _type: 'task';
  title: string;
  status: TaskStatus;
};
