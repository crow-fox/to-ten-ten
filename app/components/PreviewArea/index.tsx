import { useEffect, useRef, useState } from "react";
import CopyArea from "~/components/CopyArea";
import Dialog from "~/components/Dialog";
import { DotColor } from "~/components/DotColorSelect/utils";
import { DotSize } from "~/components/DotSizeSelect/utils";
import { canvasDrawImage } from "~/utils/canvas/canvasDrawImage";
import { canvasDrawImageByPixels } from "~/utils/canvas/canvasDrawImageByPixels";
import { getImagesByCanvas } from "~/utils/canvas/getImagesByCanvas";
import { changePixelsToGrayScale } from "~/utils/pixels/changePixelsToGrayScale";
import { convertDotPixels } from "~/utils/pixels/convertDotPixels";
import { convertImageDataToPixels } from "~/utils/pixels/convertImageDataToPixels";
import { getPixelsSize } from "~/utils/pixels/getPixelsSize";
import { resizePixelsByDotSize } from "~/utils/pixels/resizePixelsByDotSize";
import { Pixel2D } from "~/utils/pixels/type";
import { upscalePixelsByDotSize } from "~/utils/pixels/upscalePixelsByDotSize";

type Props = {
  originImage?: HTMLImageElement;
  dotSize: DotSize;
  dotColor: DotColor;
};

export default function PreviewArea(props: Props) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [pixels, setPixels] = useState<Pixel2D | undefined>(undefined);
  const [images, setImages] = useState<Record<string, string>>({});

  useEffect(() => {
    const canvas = ref.current;

    if (!canvas) {
      throw new Error("実装エラー:canvasが存在しません");
    }

    if (!props.originImage) {
      setPixels(undefined);
      setImages({});
      return;
    }

    // Todo: uploadEventHandler内で実行する
    // 最初の画像をstateに保持することで、uploadされたときのみ初期のpixelsを計算する

    // imageDataを取得するため、最初にもとの画像をcanvasに描画
    const { imageData: originImageData } = canvasDrawImage(
      canvas,
      props.originImage,
    );

    // 画像データを2次元配列に変換
    console.time("convertImageDataToPixels");
    const originPixels = convertImageDataToPixels(originImageData);
    console.timeEnd("convertImageDataToPixels");

    // ２次元配列ををドットで割り切れるように余白を加えて調整
    console.time("resizePixelsByDotSize");
    const dotReadyPixels = resizePixelsByDotSize(originPixels, props.dotSize);
    console.timeEnd("resizePixelsByDotSize");

    // ドットの大きさの分のpixelsの色の平均色をもつを1pxの集合、小さくなったpixels
    console.time("convertDotPixels");
    const dotPixels = convertDotPixels(dotReadyPixels, props.dotSize);
    console.timeEnd("convertDotPixels");

    console.time("changePixelsToGrayScale");
    const coloredPixels = (() => {
      switch (props.dotColor) {
        case "full":
          return dotPixels;
        case "monokuro":
          return changePixelsToGrayScale(dotPixels);
      }
    })();
    console.timeEnd("changePixelsToGrayScale");

    // 小さくなった状態でstateにセットすることで、のちの加工がやりやすくなる
    const resultPixels = coloredPixels;
    setPixels(resultPixels);

    // もとの大きさに戻すことでドット絵の状態になる
    console.time("upscalePixelsByDotSize");
    const forCanvasPixels = upscalePixelsByDotSize(
      coloredPixels,
      props.dotSize,
    );
    console.timeEnd("upscalePixelsByDotSize");

    // 結果をcanvasに描画
    canvasDrawImageByPixels(canvas, forCanvasPixels);

    const images = getImagesByCanvas(canvas);

    setImages(images);
  }, [props.dotSize, props.dotColor, props.originImage]);

  return (
    <div className=" grid justify-items-center gap-y-32">
      <canvas
        ref={ref}
        style={
          pixels
            ? {
                width: "auto",
                maxWidth: "100%",
                height: "auto",
                maxHeight: "512px",
                aspectRatio: `${getPixelsSize(pixels).width * props.dotSize}/${getPixelsSize(pixels).height * props.dotSize}`,
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
                  <CopyArea pixels={pixels} dotSize={props.dotSize} />
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
