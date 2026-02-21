import { useEffect, useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';

interface DrawingInputProps {
  value?: string;
  onChange: (value: string) => void;
  width?: number;
  height?: number;
}

export function DrawingInput({
  value,
  onChange,
  width = 680,
  height = 340,
}: DrawingInputProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext('2d');
    if (!context) {
      return;
    }

    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.strokeStyle = '#0f172a';
    context.lineWidth = 2.4;

    if (value) {
      const image = new Image();
      image.onload = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = '#ffffff';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        setIsLoaded(true);
      };
      image.src = value;
      return;
    }

    setIsLoaded(true);
  }, [value]);

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

    canvas.setPointerCapture(event.pointerId);
    const context = canvas.getContext('2d');
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

    const context = canvas.getContext('2d');
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

    canvas.releasePointerCapture(event.pointerId);
    isDrawingRef.current = false;

    onChange(canvas.toDataURL('image/png'));
  };

  const clear = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext('2d');
    if (!context) {
      return;
    }

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, canvas.width, canvas.height);
    onChange('');
  };

  return (
    <div className="grid" style={{ gap: '8px' }}>
      <div style={{ border: '1px solid #cfd8ea', borderRadius: '12px', overflow: 'hidden' }}>
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            background: '#ffffff',
            touchAction: 'none',
            cursor: 'crosshair',
          }}
          onPointerDown={start}
          onPointerMove={draw}
          onPointerUp={end}
          onPointerCancel={end}
          onPointerLeave={end}
        />
      </div>

      <div className="actions">
        <button type="button" className="btn btn-soft" onClick={clear} disabled={!isLoaded}>
          Limpiar dibujo
        </button>
      </div>
    </div>
  );
}
