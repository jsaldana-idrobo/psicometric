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

export type QuestionType = "single_choice" | "text" | "drawing";

export interface TestOption {
  id: string;
  text: string;
  value: number;
  profileScores?: Record<string, number>;
}

export interface TestQuestion {
  id: string;
  text: string;
  type?: QuestionType;
  required?: boolean;
  options: TestOption[];
}

export interface TestDefinition {
  _id: string;
  name: string;
  category: string;
  description: string;
  instructions?: string;
  questions: TestQuestion[];
  interpretationRanges: Array<{
    min: number;
    max: number;
    label: string;
    description: string;
  }>;
  scoringMode?: "range" | "profile" | "manual";
}

export interface TestCatalogItem {
  _id: string;
  name: string;
  category: string;
  description: string;
}

export interface TestAnswer {
  questionId: string;
  optionId?: string;
  textResponse?: string;
  drawingDataUrl?: string;
  value?: number;
}

export interface TestResult {
  _id: string;
  totalScore: number;
  interpretationLabel: string;
  interpretationDescription: string;
  profileScores?: Record<string, number>;
  answers?: TestAnswer[];
  observations?: string;
  finalConclusion?: string;
  recommendation?: "APTO" | "NO_APTO" | "APTO_CON_OBSERVACIONES";
  evaluatedAt: string;
  testId:
    | {
        _id: string;
        name: string;
        category: string;
      }
    | string;
}

export interface TestResultAnswerDetail {
  questionId: string;
  questionText: string;
  questionType: QuestionType;
  optionId?: string;
  optionText?: string;
  textResponse?: string;
  drawingDataUrl?: string;
  value: number;
}

export interface ValantiDimensionProfile {
  key: "verdad" | "rectitud" | "paz" | "amor" | "noViolencia";
  label: string;
  directScore: number;
  mean: number;
  stdDev: number;
  standardizedScore: number;
  distanceFromBaseline: number;
  interpretationLabel: string;
}

export interface ValantiProfileDetail {
  baselineScore: number;
  dimensions: ValantiDimensionProfile[];
  topDimensionKey: ValantiDimensionProfile["key"];
  topDimensionLabel: string;
  lowDimensionKey: ValantiDimensionProfile["key"];
  lowDimensionLabel: string;
  summaryText: string;
  narrative: string[];
}

export interface TestResultDetail {
  _id: string;
  totalScore: number;
  interpretationLabel: string;
  interpretationDescription: string;
  evaluatedAt: string;
  profileScores?: Record<string, number>;
  profileLabels?: Record<string, string>;
  valantiProfile?: ValantiProfileDetail;
  answers: TestResultAnswerDetail[];
}

export interface Profile {
  id: string;
  fullName: string;
  email: string;
  signatureName?: string;
  licenseNumber?: string;
}

export interface PublicSession {
  id: string;
  token: string;
  status: "created" | "in_progress" | "submitted" | "expired";
  expiresAt: string;
  startedAt?: string;
  submittedAt?: string;
  publicUrl: string;
  testId:
    | string
    | {
        _id: string;
        name: string;
        category: string;
      };
  resultId?:
    | string
    | {
        _id: string;
        totalScore: number;
        interpretationLabel: string;
        evaluatedAt: string;
      };
}

export interface PublicSessionOpen {
  token: string;
  status: "created" | "in_progress" | "submitted" | "expired";
  expiresAt: string;
  startedAt?: string;
  submittedAt?: string;
  patient: {
    fullName: string;
  };
  test: TestDefinition;
  answers: TestAnswer[];
}
