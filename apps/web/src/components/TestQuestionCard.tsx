import type { TestQuestion } from "../lib/types";
import type { LocalAnswer } from "../lib/test-session";
import { DrawingInput } from "./DrawingInput";

interface TestQuestionCardProps {
  readonly question: TestQuestion;
  readonly index: number;
  readonly answer: LocalAnswer;
  readonly onAnswerChange: (patch: Partial<LocalAnswer>) => void;
}

export function TestQuestionCard({
  question,
  index,
  answer,
  onAnswerChange,
}: TestQuestionCardProps) {
  const type = question.type ?? "single_choice";

  return (
    <article className="kpi" style={{ background: "#fff" }}>
      <p style={{ fontWeight: 700 }}>
        {index + 1}. {question.text}
      </p>

      {type === "single_choice" && (
        <div className="grid" style={{ marginTop: "8px" }}>
          {question.options.map((option) => (
            <label
              key={option.id}
              style={{ display: "flex", gap: "8px", alignItems: "center" }}
            >
              <input
                type="radio"
                name={question.id}
                value={option.id}
                checked={answer.optionId === option.id}
                onChange={() => onAnswerChange({ optionId: option.id })}
              />
              <span>{option.text}</span>
            </label>
          ))}
        </div>
      )}

      {type === "text" && (
        <textarea
          className="textarea"
          style={{ marginTop: "8px" }}
          value={answer.textResponse ?? ""}
          onChange={(event) =>
            onAnswerChange({ textResponse: event.target.value })
          }
        />
      )}

      {type === "drawing" && (
        <div style={{ marginTop: "8px" }}>
          <DrawingInput
            value={answer.drawingDataUrl}
            onChange={(value) => onAnswerChange({ drawingDataUrl: value })}
          />
        </div>
      )}
    </article>
  );
}
