// 로스트 템플릿 — 개별 파일에서 임포트 후 통합
import { commitMessageTemplates } from "./templates/commit_message.ts";
import { timePatternTemplates } from "./templates/time_pattern.ts";
import { fileChurnTemplates } from "./templates/file_churn.ts";
import { commitSizeTemplates } from "./templates/commit_size.ts";
import { streakTemplates } from "./templates/streak.ts";
import { contributorTemplates } from "./templates/contributor.ts";
import { forcePushTemplates } from "./templates/force_push.ts";
import { commitFrequencyTemplates } from "./templates/commit_frequency.ts";
import { languageTemplates } from "./templates/language.ts";
import { branchTemplates } from "./templates/branch.ts";
import { closingRoasts } from "./templates/closing.ts";
import type { ClosingRoast, RoastTemplate } from "../types.ts";

export const ALL_TEMPLATES: RoastTemplate[] = [
  ...commitMessageTemplates,
  ...timePatternTemplates,
  ...fileChurnTemplates,
  ...commitSizeTemplates,
  ...streakTemplates,
  ...contributorTemplates,
  ...forcePushTemplates,
  ...commitFrequencyTemplates,
  ...languageTemplates,
  ...branchTemplates,
];

export const CLOSING_ROASTS: ClosingRoast[] = closingRoasts;

// Re-export individual arrays for testing
export {
  branchTemplates,
  closingRoasts,
  commitFrequencyTemplates,
  commitMessageTemplates,
  commitSizeTemplates,
  contributorTemplates,
  fileChurnTemplates,
  forcePushTemplates,
  languageTemplates,
  streakTemplates,
  timePatternTemplates,
};
