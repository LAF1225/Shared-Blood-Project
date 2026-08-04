import type { SurveyQuestion, SurveyResponse, ServiceResult } from '@/types';
import { ok } from '../http';

/** Survey service — placeholder until Module 14. */
export async function getSurveyQuestions(): Promise<
  ServiceResult<SurveyQuestion[]>
> {
  return ok<SurveyQuestion[]>([]);
}

export async function submitSurvey(
  _responses: SurveyResponse[],
): Promise<ServiceResult<{ received: boolean }>> {
  return ok({ received: false });
}
