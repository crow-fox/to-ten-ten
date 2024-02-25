import { RefObject } from "react";
import { DotSize } from "~/components/DotSizeSelect/utils";
import { getPixelsSize } from "~/utils/pixels/getPixelsSize";
import { Pixel2D } from "~/utils/pixels/type";

type Props = {
  myRef: RefObject<HTMLCanvasElement>;
  pixels?: Pixel2D;
  dotSize: DotSize;
};

export default function PreviewCanvas(props: Props) {
  return (
    <canvas
      ref={props.myRef}
      style={
        props.pixels
          ? {
              width: "auto",
              maxWidth: "100%",
              height: "auto",
              maxHeight: "512px",
              aspectRatio: `${getPixelsSize(props.pixels).width}/${getPixelsSize(props.pixels).height}`,
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
      {props.pixels
        ? "ドットに変換された画像"
        : "まだ画像がアップロードされていません"}
    </canvas>
  );
}
