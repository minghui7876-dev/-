export enum GradeLevel {
  Elementary = '國小',
  JuniorHigh = '國中',
  SeniorHigh = '高中',
}

export interface ScienceUnit {
  id: string;
  grade: GradeLevel;
  subject: string; // e.g., Biology, Physics, Chemistry, Earth Science
  topic: string; // e.g., Energy, Climate
  code: string; // e.g., INc-V-1
  description: string;
}

export interface EnvIssue {
  id: string;
  theme: string; // e.g., Environmental Ethics, Sustainable Development
  subTheme: string;
  code: string; // e.g., 環 U6
  content: string; // The substantive connotation
}

export interface Mapping {
  scienceUnitId: string;
  envIssueId: string;
  relevance: string; // Description of why they match
  exampleActivity: string; // A short static example
}

export enum AITaskType {
  LessonPlan = '教案 (Lesson Plan)',
  TeachingMaterial = '教材 (Material)',
  Assessment = '評量 (Assessment)',
  PPTOutline = '投影片大綱 (PPT Outline)',
}

export interface AIRequest {
  scienceUnit: ScienceUnit;
  envIssue: EnvIssue;
  taskType: AITaskType;
  customPrompt?: string;
}