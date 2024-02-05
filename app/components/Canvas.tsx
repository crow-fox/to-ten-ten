import { ChangeEvent, useId, useRef } from "react";

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const uid = useId();

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
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }

  return (
    <div>
      <p className="grid">
        <label htmlFor={uid}>画像の入力</label>
        <input
          type="file"
          id={uid}
          onChange={handleChange}
          className=" file:bg-slate-500 file:border-0 file:p-4 file:text-white file:rounded-full file:font-bold file:grid"
        />
      </p>
      <canvas
        // width={300}
        // height={300}
        ref={canvasRef}
        className="border border-slate-500 border-dashed"
      >
        キャンバス
      </canvas>
    </div>
  );
}

function changeDotCanvasImage(ctx: CanvasRenderingContext2D) {
  // canvasに表示されている画像をドット絵に変換する
  const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);

  console.log(imageData.data);
}
