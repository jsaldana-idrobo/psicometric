export type Recommendation = "APTO" | "NO_APTO" | "APTO_CON_OBSERVACIONES";

export interface InterpretationRange {
  min: number;
  max: number;
  label: string;
  description: string;
}

export interface TestOption {
  id: string;
  text: string;
  value: number;
}

export interface TestQuestion {
  id: string;
  text: string;
  options: TestOption[];
}

export interface TestDefinition {
  id: string;
  name: string;
  category: string;
  description: string;
  questions: TestQuestion[];
  interpretationRanges: InterpretationRange[];
}

export interface PatientSummary {
  id: string;
  fullName: string;
  documentId: string;
  age: number;
  company: string;
  position: string;
  evaluationDate: string;
}

export interface ScoredResult {
  score: number;
  interpretation: InterpretationRange;
}
