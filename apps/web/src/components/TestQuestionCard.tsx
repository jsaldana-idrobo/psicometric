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

const LEFT_LABELS = ["afirmación izquierda:", "afirmacion izquierda:"];
const RIGHT_LABELS = ["afirmación derecha:", "afirmacion derecha:"];

function parsePairedAffirmation(text: string): PairedAffirmation | null {
  const normalized = text.toLowerCase().trim();
  const leftLabel = LEFT_LABELS.find((label) => normalized.startsWith(label));

  if (!leftLabel) {
    return null;
  }

  const content = text.trim().slice(leftLabel.length).trimStart();
  const pipeIndex = content.indexOf("|");

  if (pipeIndex < 0) {
    return null;
  }

  const left = content.slice(0, pipeIndex).trim();
  const rightWithLabel = content.slice(pipeIndex + 1).trimStart();
  const rightNormalized = rightWithLabel.toLowerCase();
  const rightLabel = RIGHT_LABELS.find((label) =>
    rightNormalized.startsWith(label),
  );

  if (!rightLabel) {
    return null;
  }

  const right = rightWithLabel.slice(rightLabel.length).trim();

  if (!left || !right) {
    return null;
  }

  return {
    left,
    right,
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
