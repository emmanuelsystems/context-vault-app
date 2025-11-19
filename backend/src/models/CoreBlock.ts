export interface CoreBlock {
  id: string;
  name: string;
  type: string;
  content: string;
  metadata: Record<string, any>;
  tags: string[];
  created_at: Date;
  updated_at: Date;
}

export interface CreateCoreBlockInput {
  name: string;
  type: string;
  content: string;
  metadata?: Record<string, any>;
  tags?: string[];
}

export interface UpdateCoreBlockInput {
  name?: string;
  type?: string;
  content?: string;
  metadata?: Record<string, any>;
  tags?: string[];
}

export type CoreBlockType = 
  | 'source_of_truth'
  | 'tone'
  | 'constraint'
  | 'guideline'
  | 'template'
  | 'example';
