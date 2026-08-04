/** Survey domain types (placeholder shapes — finalized in Module 14). */
export interface SurveyQuestion {
  id: string;
  type: 'single' | 'multiple' | 'scale' | 'text';
  prompt: string;
  options?: string[];
}

export interface SurveyResponse {
  questionId: string;
  value: string | string[] | number;
}
