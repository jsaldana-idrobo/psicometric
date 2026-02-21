export interface Patient {
  id: string;
  fullName: string;
  documentId: string;
  dateOfBirth: string;
  age: number;
  phone?: string;
  email?: string;
  company?: string;
  position?: string;
  evaluationDate: string;
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
  _id: string;
  name: string;
  category: string;
  description: string;
  questions: TestQuestion[];
  interpretationRanges: Array<{
    min: number;
    max: number;
    label: string;
    description: string;
  }>;
}

export interface TestResult {
  _id: string;
  totalScore: number;
  interpretationLabel: string;
  interpretationDescription: string;
  observations?: string;
  finalConclusion?: string;
  recommendation?: 'APTO' | 'NO_APTO' | 'APTO_CON_OBSERVACIONES';
  evaluatedAt: string;
  testId:
    | {
        _id: string;
        name: string;
        category: string;
      }
    | string;
}

export interface Profile {
  id: string;
  fullName: string;
  email: string;
  signatureName?: string;
  licenseNumber?: string;
}
