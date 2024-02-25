import { useEffect, useRef } from "react";
import { canvasDrawImage } from "~/utils/canvas/canvasDrawImage";

type Props = {
  originImage?: HTMLImageElement;
  dotSize: number;
};

export default function OriginArea(props: Props) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) {
      throw new Error("実装エラー:canvasが存在しません");
    }

    if (!props.originImage) {
      return;
    }

    canvasDrawImage(canvas, props.originImage);
  }, [props.originImage]);

  return (
    <canvas
      ref={ref}
      style={
        props.originImage
          ? {
              width: "auto",
              maxWidth: "100%",
              height: "auto",
              maxHeight: "512px",
              aspectRatio: `${props.originImage.width}/${props.originImage.height}`,
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
      {props.originImage
        ? "アップロードした画像"
        : "まだ画像がアップロードされていません"}
    </canvas>
  );
}
