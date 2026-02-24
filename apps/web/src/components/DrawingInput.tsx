import { useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";

interface DrawingInputProps {
  readonly value?: string;
  readonly onChange: (value: string) => void;
  readonly width?: number;
  readonly height?: number;
  readonly expandedWidth?: number;
  readonly expandedHeight?: number;
  readonly templateId?: string;
}

interface DrawingCanvasSurfaceProps {
  readonly value?: string;
  readonly onChange: (value: string) => void;
  readonly width: number;
  readonly height: number;
  readonly templateId?: string;
  readonly showExpandButton?: boolean;
  readonly onExpand?: () => void;
}

function setupStroke(context: CanvasRenderingContext2D) {
  context.lineCap = "round";
  context.lineJoin = "round";
  context.strokeStyle = "#0f172a";
  context.lineWidth = 2.4;
}

function paintBlankCanvas(
  context: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  templateId?: string,
) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, canvas.width, canvas.height);
  drawTemplate(context, canvas, templateId);
  setupStroke(context);
}

function drawTemplate(
  context: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  templateId?: string,
) {
  if (!templateId || !templateId.startsWith("wartegg-")) {
    return;
  }

  const plate = Number(templateId.replace("wartegg-", ""));
  if (!Number.isFinite(plate) || plate < 1 || plate > 8) {
    return;
  }

  const { width, height } = canvas;
  const unit = Math.min(width, height);
  const stroke = Math.max(1.3, unit * 0.006);

  context.save();
  context.strokeStyle = "#606b7b";
  context.fillStyle = "#606b7b";
  context.lineWidth = stroke;
  context.lineCap = "round";
  context.lineJoin = "round";

  switch (plate) {
    case 1: {
      context.beginPath();
      context.arc(
        width * 0.5,
        height * 0.5,
        Math.max(2, unit * 0.008),
        0,
        Math.PI * 2,
      );
      context.fill();
      break;
    }
    case 2: {
      context.beginPath();
      context.moveTo(width * 0.32, height * 0.22);
      context.bezierCurveTo(
        width * 0.36,
        height * 0.16,
        width * 0.4,
        height * 0.28,
        width * 0.44,
        height * 0.22,
      );
      context.stroke();
      break;
    }
    case 3: {
      const baseY = height * 0.74;
      const startX = width * 0.33;
      const gap = width * 0.07;
      const heights = [height * 0.06, height * 0.16, height * 0.24];

      context.beginPath();
      context.moveTo(startX - gap * 0.8, baseY);
      context.lineTo(startX - gap * 0.8, baseY - height * 0.03);
      heights.forEach((lineHeight, index) => {
        const x = startX + gap * index;
        context.moveTo(x, baseY);
        context.lineTo(x, baseY - lineHeight);
      });
      context.stroke();
      break;
    }
    case 4: {
      const size = Math.max(6, unit * 0.045);
      context.fillRect(width * 0.7, height * 0.3, size, size);
      break;
    }
    case 5: {
      context.beginPath();
      context.moveTo(width * 0.18, height * 0.82);
      context.lineTo(width * 0.3, height * 0.7);
      context.moveTo(width * 0.29, height * 0.67);
      context.lineTo(width * 0.39, height * 0.76);
      context.stroke();
      break;
    }
    case 6: {
      context.beginPath();
      context.moveTo(width * 0.34, height * 0.34);
      context.lineTo(width * 0.48, height * 0.34);
      context.moveTo(width * 0.66, height * 0.4);
      context.lineTo(width * 0.66, height * 0.52);
      context.stroke();
      break;
    }
    case 7: {
      context.setLineDash([stroke * 1.4, stroke * 2.2]);
      context.beginPath();
      context.arc(
        width * 0.56,
        height * 0.63,
        unit * 0.08,
        Math.PI * 0.1,
        Math.PI * 1.1,
      );
      context.stroke();
      context.setLineDash([]);
      break;
    }
    case 8: {
      context.beginPath();
      context.arc(
        width * 0.55,
        height * 0.42,
        unit * 0.19,
        Math.PI * 1.15,
        Math.PI * 1.85,
      );
      context.stroke();
      break;
    }
    default:
      break;
  }

  context.restore();
}

function DrawingCanvasSurface({
  value,
  onChange,
  width,
  height,
  templateId,
  showExpandButton = false,
  onExpand,
}: DrawingCanvasSurfaceProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    setupStroke(context);

    if (value) {
      const image = new Image();
      image.onload = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        setupStroke(context);
        setIsLoaded(true);
      };
      image.onerror = () => {
        paintBlankCanvas(context, canvas, templateId);
        setIsLoaded(true);
      };
      image.src = value;
      return;
    }

    paintBlankCanvas(context, canvas, templateId);
    setIsLoaded(true);
  }, [height, templateId, value, width]);

  const getPoint = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return { x: 0, y: 0 };
    }

    const rect = canvas.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * canvas.width;
    const y = ((event.clientY - rect.top) / rect.height) * canvas.height;

    return { x, y };
  };

  const start = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    event.preventDefault();

    try {
      canvas.setPointerCapture(event.pointerId);
    } catch {
      // Ignore capture errors on unsupported pointer transitions.
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    const { x, y } = getPoint(event);
    isDrawingRef.current = true;
    context.beginPath();
    context.moveTo(x, y);
  };

  const draw = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    event.preventDefault();

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    const { x, y } = getPoint(event);
    context.lineTo(x, y);
    context.stroke();
  };

  const end = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    try {
      if (canvas.hasPointerCapture(event.pointerId)) {
        canvas.releasePointerCapture(event.pointerId);
      }
    } catch {
      // Ignore release errors if capture was already lost.
    }

    isDrawingRef.current = false;

    const context = canvas.getContext("2d");
    context?.closePath();

    onChange(canvas.toDataURL("image/png"));
  };

  const clear = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    paintBlankCanvas(context, canvas, templateId);
    onChange("");
  };

  return (
    <div className="grid" style={{ gap: "8px" }}>
      <div
        style={{
          border: "1px solid #cfd8ea",
          borderRadius: "12px",
          overflow: "hidden",
          background: "#fff",
        }}
      >
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            background: "#ffffff",
            touchAction: "none",
            cursor: "crosshair",
          }}
          onPointerDown={start}
          onPointerMove={draw}
          onPointerUp={end}
          onPointerCancel={end}
          onLostPointerCapture={() => {
            isDrawingRef.current = false;
          }}
        />
      </div>

      <div className="actions">
        <button
          type="button"
          className="btn btn-soft"
          onClick={clear}
          disabled={!isLoaded}
        >
          Limpiar dibujo
        </button>

        {showExpandButton && onExpand && (
          <button type="button" className="btn btn-soft" onClick={onExpand}>
            Abrir lienzo grande
          </button>
        )}
      </div>
    </div>
  );
}

export function DrawingInput({
  value,
  onChange,
  width = 680,
  height = 340,
  expandedWidth,
  expandedHeight,
  templateId,
}: DrawingInputProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const modalWidth = expandedWidth ?? Math.max(width, 1100);
  const modalHeight = expandedHeight ?? Math.max(height, 560);

  useEffect(() => {
    if (!isExpanded) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsExpanded(false);
      }
    };

    const previousOverflow = globalThis.document?.body.style.overflow ?? "";
    if (globalThis.document?.body) {
      globalThis.document.body.style.overflow = "hidden";
    }

    globalThis.window?.addEventListener("keydown", onKeyDown);

    return () => {
      globalThis.window?.removeEventListener("keydown", onKeyDown);
      if (globalThis.document?.body) {
        globalThis.document.body.style.overflow = previousOverflow;
      }
    };
  }, [isExpanded]);

  return (
    <>
      <DrawingCanvasSurface
        value={value}
        onChange={onChange}
        width={width}
        height={height}
        templateId={templateId}
        showExpandButton
        onExpand={() => setIsExpanded(true)}
      />

      {isExpanded && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Lienzo de dibujo ampliado"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            background: "rgba(17, 24, 39, 0.62)",
            display: "grid",
            placeItems: "center",
            padding: "18px",
          }}
          onClick={() => setIsExpanded(false)}
        >
          <section
            className="panel"
            style={{
              width: "min(96vw, 1200px)",
              maxHeight: "92vh",
              overflow: "auto",
              padding: "14px",
            }}
            onClick={(event) => event.stopPropagation()}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "10px",
                flexWrap: "wrap",
                marginBottom: "10px",
              }}
            >
              <div>
                <h3 style={{ fontSize: "1.05rem" }}>Lienzo ampliado</h3>
                <p style={{ margin: "4px 0 0", color: "#4b5563" }}>
                  Dibuja aquí con más espacio. Presiona ESC para cerrar.
                </p>
              </div>
              <button
                type="button"
                className="btn btn-soft"
                onClick={() => setIsExpanded(false)}
              >
                Cerrar
              </button>
            </div>

            <DrawingCanvasSurface
              value={value}
              onChange={onChange}
              width={modalWidth}
              height={modalHeight}
              templateId={templateId}
            />
          </section>
        </div>
      )}
    </>
  );
}
