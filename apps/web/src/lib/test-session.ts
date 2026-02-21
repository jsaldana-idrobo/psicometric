import type { TestAnswer, TestQuestion } from "./types";

export interface LocalAnswer {
  optionId?: string;
  textResponse?: string;
  drawingDataUrl?: string;
}

export type LocalAnswerMap = Record<string, LocalAnswer>;

function hasContent(answer: LocalAnswer): boolean {
  return Boolean(
    answer.optionId || answer.textResponse || answer.drawingDataUrl,
  );
}

export function isQuestionAnswered(
  question: TestQuestion,
  answer?: LocalAnswer,
): boolean {
  if (question.required === false) {
    return true;
  }

  const type = question.type ?? "single_choice";

  if (type === "single_choice") {
    return Boolean(answer?.optionId);
  }

  if (type === "text") {
    return Boolean(answer?.textResponse?.trim());
  }

  return Boolean(answer?.drawingDataUrl);
}

export function buildPayloadAnswers(
  questions: TestQuestion[],
  answers: LocalAnswerMap,
): TestAnswer[] {
  return questions
    .map((question) => {
      const answer = answers[question.id] ?? {};
      return {
        questionId: question.id,
        optionId: answer.optionId,
        textResponse: answer.textResponse,
        drawingDataUrl: answer.drawingDataUrl,
      };
    })
    .filter((answer) => hasContent(answer));
}

export function mapSavedAnswersByQuestion(
  answers: TestAnswer[],
): LocalAnswerMap {
  const mappedAnswers: LocalAnswerMap = {};

  for (const answer of answers) {
    mappedAnswers[answer.questionId] = {
      optionId: answer.optionId,
      textResponse: answer.textResponse,
      drawingDataUrl: answer.drawingDataUrl,
    };
  }

  return mappedAnswers;
}
