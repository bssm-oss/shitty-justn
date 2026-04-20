// PSI API 응답에서 사용하는 audit 타입
export interface PSIAudit {
  score?: number;
  numericValue?: number;
  details?: { items?: Array<Record<string, unknown>> };
}

export type AnalyzerCategory =
  | 'performance'
  | 'a11y'
  | 'seo'
  | 'security'
  | 'bundle'
  | 'mobile';

export type IssueSeverity = 'info' | 'warning' | 'error';

export interface Issue {
  id: string;
  severity: IssueSeverity;
  message: string; // Korean message from message dictionary
  detail?: string;
}

export interface AnalyzerResult {
  category: AnalyzerCategory;
  score: number; // 0-100
  issues: Issue[];
  meta: Record<string, string | number | boolean>;
}