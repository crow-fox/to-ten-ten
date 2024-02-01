import type { MetaFunction } from "@remix-run/node";
import { ChangeEvent, useId, useRef } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix SPA" },
    { name: "description", content: "Welcome to Remix (SPA Mode)!" },
  ];
};

export default function Index() {
  const uid = useId();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files === null) {
      return;
    }

    const file = files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      // img.src = event.target.result as string;
      img.onload = () => {
        const canvas = canvasRef.current;
        if (canvas === null) {
          return;
        }

        const ctx = canvas.getContext("2d");
        if (ctx === null) {
          return;
        }

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        convertToDotImage(ctx, img.width, img.height);
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <p className="grid gap-y-2">
        <label htmlFor={uid}>画像のアップロード</label>
        <input
          id={uid}
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleChange}
        />
      </p>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}

function convertToDotImage(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
) {
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;

  // ドットのサイズ（ここを調整してドットの大きさを変えられます）
  const dotSize = 24;

  for (let y = 0; y < height; y += dotSize) {
    for (let x = 0; x < width; x += dotSize) {
      const i = (y * width + x) * 4;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];

      // 各ドットに色を設定
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
      ctx.fillRect(x, y, dotSize, dotSize);
    }
  }
}
