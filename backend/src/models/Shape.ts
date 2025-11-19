export interface Shape {
  id: string;
  name: string;
  description: string | null;
  template: string;
  output_format: string;
  schema: Record<string, any> | null;
  examples: any[];
  created_at: Date;
  updated_at: Date;
}

export interface CreateShapeInput {
  name: string;
  description?: string;
  template: string;
  output_format?: string;
  schema?: Record<string, any>;
  examples?: any[];
}

export interface UpdateShapeInput {
  name?: string;
  description?: string;
  template?: string;
  output_format?: string;
  schema?: Record<string, any>;
  examples?: any[];
}

export type OutputFormat = 'markdown' | 'json' | 'html' | 'plaintext';
