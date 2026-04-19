// git-roast 타입 정의

/** 분석기 ID — 각 분석 항목을 식별 */
export type AnalyzerId =
  | "commit_message"
  | "time_pattern"
  | "file_churn"
  | "commit_size"
  | "streak"
  | "contributor"
  | "force_push"
  | "commit_frequency"
  | "language"
  | "branch";

/** 로스팅 심각도 */
export type Severity = "mild" | "medium" | "savage" | "legendary";

/** 파싱된 커밋 데이터 */
export interface CommitData {
  hash: string;
  message: string;
  authorDate: Date;
  filesChanged: string[];
  insertions: number;
  deletions: number;
  author: string;
}

/** 분석 결과 */
export interface AnalysisResult {
  id: AnalyzerId;
  severity: Severity;
  value: number;
  detail: string;
  extras?: Record<string, string | number>;
}

/** 로스트 템플릿 */
export interface RoastTemplate {
  id: AnalyzerId;
  severity: Severity;
  template: string; // "{total}개 커밋 중 fix {fixCount}개. {roast}"
}

/** 마무리 로스트 */
export interface ClosingRoast {
  minSavageCount: number;
  template: string;
}

/** CLI 옵션 */
export interface CliOptions {
  path?: string;
  username?: string;
  repo?: string;
  limit: number;
  noColor: boolean;
  help: boolean;
  version: boolean;
}

/** 컬렉터 인터페이스 — git 데이터 수집 */
export interface Collector {
  collect(limit: number): Promise<CommitData[]>;
  getName(): string;
  getBranches?(): Promise<BranchInfo>;
  getReflog?(): Promise<string[]>;
}

/** 브랜치 정보 */
export interface BranchInfo {
  total: number;
  merged: number;
  unmerged: number;
  names: string[];
}
