import { useEffect, useRef, useState } from "react";
import { DotSize } from "~/components/DotSizeSelect/utils";
import ResultDialog from "~/components/ResultDialog";
import { canvasDrawImage } from "~/utils/canvas/canvasDrawImage";
import { canvasDrawImageByPixels } from "~/utils/canvas/canvasDrawImageByPixels";
import { changeDotCanvasImage } from "~/utils/canvas/changeDotCanvasImage";
import { convertImageDataToPixels } from "~/utils/pixels/convertImageDataToPixels";
import { getPixelsSize } from "~/utils/pixels/getPixelsSize";
import { resizePixelsByDotSize } from "~/utils/pixels/resizePixelsByDotSize";
import { Pixel2D } from "~/utils/pixels/type";

type Props = {
  originImage?: HTMLImageElement;
  dotSize: DotSize;
};

export default function PreviewArea(props: Props) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [pixels, setPixels] = useState<Pixel2D | undefined>(undefined);

  useEffect(() => {
    const canvas = ref.current;

    if (!canvas) {
      throw new Error("実装エラー:canvasが存在しません");
    }

    if (!props.originImage) {
      return;
    }

    const { imageData: originImageData } = canvasDrawImage(
      canvas,
      props.originImage,
    );

    // ２次元配列ををドットで割り切れるように調整
    const pixels = resizePixelsByDotSize(
      // 画像データを2次元配列に変換
      convertImageDataToPixels(originImageData),
      props.dotSize,
    );

    // 調整したデータをcanvasに描画
    const { ctx } = canvasDrawImageByPixels(canvas, pixels);

    /// ドット絵に変換する

    changeDotCanvasImage(ctx, props.dotSize);

    setPixels(pixels);
  }, [props.dotSize, props.originImage]);

  return (
    <>
      <canvas
        ref={ref}
        style={
          pixels
            ? {
                width: "auto",
                maxWidth: "100%",
                height: "auto",
                maxHeight: "512px",
                aspectRatio: `${getPixelsSize(pixels).width}/${getPixelsSize(pixels).height}`,
                background: "none",
              }
            : {
                backgroundSize: `${props.dotSize}px ${props.dotSize}px`,
                backgroundPosition: `0 0, ${props.dotSize / 2}px ${props.dotSize / 2}px`,
              }
        }
        className="
      h-[512px]
      w-full
      border
      border-dashed
      border-secondary-border
      [background-image:repeating-linear-gradient(45deg,theme(colors.primary.background)_25%,transparent_25%,transparent_75%,theme(colors.primary.background)_75%,theme(colors.primary.background)),repeating-linear-gradient(45deg,theme(colors.primary.background)_25%,theme(colors.secondary.background)_25%,theme(colors.secondary.background)_75%,theme(colors.primary.background)_75%,theme(colors.primary.background))]
      "
      >
        {pixels
          ? "ドットに変換された画像"
          : "まだ画像がアップロードされていません"}
      </canvas>

      {pixels && <ResultDialog pixels={pixels} dotSize={props.dotSize} />}
    </>
  );
}
