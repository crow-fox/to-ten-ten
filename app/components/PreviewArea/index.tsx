import { useEffect, useMemo, useRef, useState } from "react";
import CopyArea from "~/components/CopyArea";
import Dialog from "~/components/Dialog";
import { DotColor } from "~/components/DotColorSelect/utils";
import { DotSize } from "~/components/DotSizeSelect/utils";
import { canvasDrawImage } from "~/libs/canvas/canvasDrawImage";
import { canvasDrawImageByPixels } from "~/libs/canvas/canvasDrawImageByPixels";
import { getImagesByCanvas } from "~/libs/canvas/getImagesByCanvas";
import { changePixelsToGrayScale } from "~/libs/pixels/changePixelsToGrayScale";
import { convertDotPixels } from "~/libs/pixels/convertDotPixels";
import { convertImageDataToPixels } from "~/libs/pixels/convertImageDataToPixels";
import { getPixelsSize } from "~/libs/pixels/getPixelsSize";
import { resizePixelsByDotSize } from "~/libs/pixels/resizePixelsByDotSize";
import { upscalePixelsByDotSize } from "~/libs/pixels/upscalePixelsByDotSize";

type Props = {
  originImage?: HTMLImageElement;
  dotSize: DotSize;
  dotColor: DotColor;
};

export default function PreviewArea(props: Props) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [originImageData, setOriginImageData] = useState<ImageData | undefined>(
    undefined,
  );
  const [images, setImages] = useState<Record<string, string>>({});

  useEffect(() => {
    const canvas = ref.current;

    if (!canvas) {
      throw new Error("実装エラー:canvasが存在しません");
    }

    if (!props.originImage) {
      return;
    }

    // imageDataを取得するため、最初にもとの画像をcanvasに描画
    const { imageData } = canvasDrawImage(canvas, props.originImage);

    setOriginImageData(imageData);
  }, [props.originImage]);

  const pixels = useMemo(
    () =>
      originImageData
        ? convertPixelsByParams({
            imageData: originImageData,
            dot: {
              size: props.dotSize,
              color: props.dotColor,
            },
          })
        : undefined,
    [originImageData, props.dotSize, props.dotColor],
  );

  useEffect(() => {
    const canvas = ref.current;

    if (!canvas) {
      throw new Error("実装エラー:canvasが存在しません");
    }

    if (!pixels?.forCanvas) {
      setImages({});
      return;
    }

    // 結果をcanvasに描画
    canvasDrawImageByPixels(canvas, pixels.forCanvas);
    const images = getImagesByCanvas(canvas);
    setImages(images);
  }, [pixels?.forCanvas]);

  return (
    <div className=" grid justify-items-center gap-y-32">
      <canvas
        ref={ref}
        style={
          pixels?.forCanvas
            ? {
                width: "auto",
                maxWidth: "100%",
                height: "auto",
                maxHeight: "512px",
                aspectRatio: `${getPixelsSize(pixels.forCanvas).width}/${getPixelsSize(pixels.forCanvas).height}`,
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

      {pixels && (
        <ul className=" flex flex-wrap justify-center gap-20">
          <li>
            <Dialog
              openButton={(open) => (
                <button
                  onClick={open}
                  className=" inline-grid rounded-xl border border-primary-accent px-20 py-12 font-bold  text-invert-text  [background-image:linear-gradient(135deg,theme(colors.primary.accent),theme(colors.secondary.accent))]"
                >
                  ダウンロード
                </button>
              )}
              className=" m-auto grid w-[min(100%,theme(spacing[356]))] rounded-xl bg-primary-background p-32 shadow-xl"
            >
              {(close) => (
                <div className=" grid gap-y-20">
                  <h2 className=" text-xl font-bold text-secondary-text">
                    ダウンロード
                  </h2>
                  <ul className=" grid gap-y-12">
                    {Object.keys(images).map((key) => (
                      <li key={key}>
                        <a
                          href={images[key as keyof typeof images]}
                          download={`dot.${key}`}
                          className=" grid grid-cols-[1fr,1em] items-center gap-x-12 rounded-xl border border-secondary-border bg-primary-background  px-12 py-8  text-secondary-text"
                        >
                          <span>{`.${key}`}</span>
                          <svg
                            role="img"
                            aria-label="ダウンロード"
                            height="1em"
                            viewBox="0 -960 960 960"
                            width="1em"
                          >
                            <path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" />
                          </svg>
                        </a>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={close}
                    className=" inline-grid justify-center rounded-xl bg-secondary-background px-12  py-8  text-secondary-text"
                  >
                    閉じる
                  </button>
                </div>
              )}
            </Dialog>
          </li>
          <li>
            <Dialog
              openButton={(open) => (
                <button
                  onClick={open}
                  className=" inline-grid rounded-xl border border-secondary-border bg-primary-background  px-20 py-12 font-bold text-secondary-text "
                >
                  コード
                </button>
              )}
              className=" m-auto w-[min(100%,theme(spacing[576]))]  rounded-xl bg-primary-background p-32 shadow-xl"
            >
              {(close) => (
                <div className=" grid gap-y-20 ">
                  <h2 className="text-xl font-bold text-secondary-text">
                    コード
                  </h2>
                  <CopyArea pixels={pixels.base} dotSize={props.dotSize} />
                  <button
                    onClick={close}
                    className=" inline-grid justify-center rounded-xl bg-secondary-background px-12  py-8  text-secondary-text"
                  >
                    閉じる
                  </button>
                </div>
              )}
            </Dialog>
          </li>
        </ul>
      )}
    </div>
  );
}

function convertPixelsByParams(params: {
  imageData: ImageData;
  dot: {
    size: DotSize;
    color: DotColor;
  };
}) {
  // 画像データを2次元配列に変換
  const originPixels = convertImageDataToPixels(params.imageData);

  // ２次元配列ををドットで割り切れるように余白を加えて調整
  const dotReadyPixels = resizePixelsByDotSize(originPixels, params.dot.size);

  // ドットの大きさ分のpixelsの色を平均して1px分に置き換えることで小さくなったpixels
  const dotPixels = convertDotPixels(dotReadyPixels, params.dot.size);

  const coloredPixels = (() => {
    switch (params.dot.color) {
      case "full":
        return dotPixels;
      case "monokuro":
        // 必要な場合はモノクロに変換
        return changePixelsToGrayScale(dotPixels);
    }
  })();

  // 最小単位のpixels
  const pixels = coloredPixels;

  // canvasに描画するためのサイズをもとに戻したpixels
  const pixelsForCanvas = upscalePixelsByDotSize(pixels, params.dot.size);

  return { base: pixels, forCanvas: pixelsForCanvas } as const;
}
