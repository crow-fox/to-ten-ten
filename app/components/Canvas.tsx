import { useEffect, useRef } from "react";

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas === null) return;

    const ctx = canvas.getContext("2d");

    if (ctx === null) {
      console.log("Canvas サポートされていません");
      return;
    }
  }, []);

  return (
    <canvas
      width={300}
      height={300}
      ref={canvasRef}
      className="border border-slate-500 "
    >
      キャンバス
    </canvas>
  );
}
