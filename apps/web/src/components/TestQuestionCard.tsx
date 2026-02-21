import type { TestQuestion } from "../lib/types";
import type { LocalAnswer } from "../lib/test-session";
import { DrawingInput } from "./DrawingInput";

interface TestQuestionCardProps {
  readonly question: TestQuestion;
  readonly index: number;
  readonly answer: LocalAnswer;
  readonly onAnswerChange: (patch: Partial<LocalAnswer>) => void;
}

interface PairedAffirmation {
  left: string;
  right: string;
}

function parsePairedAffirmation(text: string): PairedAffirmation | null {
  const labeledPair = text.match(
    /^Afirmaci[oó]n izquierda:\s*(.+?)\s*\|\s*Afirmaci[oó]n derecha:\s*(.+)$/i,
  );

  if (!labeledPair) {
    return null;
  }

  return {
    left: labeledPair[1].trim(),
    right: labeledPair[2].trim(),
  };
}

export function TestQuestionCard({
  question,
  index,
  answer,
  onAnswerChange,
}: TestQuestionCardProps) {
  const type = question.type ?? "single_choice";
  const pairedAffirmation = parsePairedAffirmation(question.text);

  return (
    <article className="kpi" style={{ background: "#fff" }}>
      {pairedAffirmation ? (
        <div className="paired-question">
          <p className="paired-question-inline">
            <span className="paired-question-index">{index + 1}.</span>
            <span className="paired-question-side">
              <span className="paired-question-tag">Izquierda</span>
              <span className="paired-question-copy">
                {pairedAffirmation.left}
              </span>
            </span>
            <span aria-hidden className="paired-question-separator">
              •
            </span>
            <span className="paired-question-side">
              <span className="paired-question-tag">Derecha</span>
              <span className="paired-question-copy">
                {pairedAffirmation.right}
              </span>
            </span>
          </p>
        </div>
      ) : (
        <p style={{ fontWeight: 700 }}>
          {index + 1}. {question.text}
        </p>
      )}

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
