export interface DTAL {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  category: string;
  categoryEn: string;
  jurisdiction: string;
  jurisdictionEn: string;
  mcpUrl: string;
  version: string;
  lastUpdated: string;
  parameters: DTALParameter[];
  lawReferences: string[];
}

export interface DTALParameter {
  name: string;
  nameEn: string;
  type: 'string' | 'number' | 'select' | 'boolean';
  required: boolean;
  description: string;
  descriptionEn: string;
  options?: string[];
  unit?: string;
}

export interface CalculationResult {
  amount: number;
  currency: string;
  breakdown: {
    label: string;
    labelEn: string;
    value: string;
  }[];
  lawReferences: string[];
  notes: string;
  notesEn: string;
}

export type Language = 'de' | 'en';