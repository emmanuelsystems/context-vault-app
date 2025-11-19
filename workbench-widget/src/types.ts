export interface Play {
  id: string;
  name: string;
  description: string | null;
}

export interface DAB {
  id: string;
  name: string;
  role: string;
}

export interface CoreBlock {
  id: string;
  name: string;
  type: string;
  content: string;
}

export interface Shape {
  id: string;
  name: string;
  template: string;
}

export interface ASSETPrompt {
  assistant?: DAB;
  sources: CoreBlock[];
  shape?: Shape;
  expectations: string[];
  task: string;
  fullPrompt: string;
}
