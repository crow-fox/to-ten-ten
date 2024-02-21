import { ChangeEvent, useId, useRef, useState } from "react";

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const uid = useId();
  const [imageUri, setImageUri] = useState<string>("");

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.drawImage(img, 0, 0);

        /// ドット絵に変換する
        changeDotCanvasImage(ctx);

        setImageUri(canvas.toDataURL());
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="gap-y-8 grid justify-items-center">
      <p className="grid">
        <label htmlFor={uid}>画像の入力</label>
        <input
          type="file"
          id={uid}
          onChange={handleChange}
          className=" file:bg-slate-500 file:border-0 file:p-4 file:text-white file:rounded-full file:font-bold file:grid"
        />
      </p>
      <canvas ref={canvasRef} className="border border-slate-500 border-dashed">
        キャンバス
      </canvas>
      <p>
        <a
          href={imageUri}
          download="ドット絵になった画像"
          className=" underline underline-offset-2 p-4 rounded-full bg-blue-300 grid justify-center"
        >
          ダウンロード
        </a>
      </p>
    </div>
  );
}

function changeDotCanvasImage(ctx: CanvasRenderingContext2D) {
  // canvasに表示されている画像をドット絵に変換する
  const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);

  console.log(imageData.data);

  const blockSize = 20;

  for (let y = 0; y < imageData.height; y += blockSize) {
    for (let x = 0; x < imageData.width; x += blockSize) {
      let totalR = 0;
      let totalG = 0;
      let totalB = 0;
      let totalA = 0;
      let count = 0;

      for (let blockY = y; blockY < y + blockSize; blockY++) {
        for (let blockX = x; blockX < x + blockSize; blockX++) {
          const index = (blockY * imageData.width + blockX) * 4;
          totalR += imageData.data[index];
          totalG += imageData.data[index + 1];
          totalB += imageData.data[index + 2];
          totalA += imageData.data[index + 3];
          count++;
        }
      }

      const averageR = totalR / count;
      const averageG = totalG / count;
      const averageB = totalB / count;
      const averageA = totalA / count;

      ctx.fillStyle = `rgb(${averageR} ${averageG} ${averageB} / ${averageA})`;
      ctx.fillRect(x, y, blockSize, blockSize);
    }
  }
}
