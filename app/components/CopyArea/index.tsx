import CopyButton from "~/components/CopyButton";
import { DotSize } from "~/components/DotSizeSelect/utils";
import { convertPixelsToCSSBoxShadow } from "~/utils/pixels/convertPixelsToCSSBoxShadow";
import { convertPixelsToSVG } from "~/utils/pixels/convertPixelsToSVG";
import { Pixel2D } from "~/utils/pixels/type";

type Props = {
  pixels: Pixel2D;
  dotSize: DotSize;
};

export default function CopyArea(props: Props) {
  const svg = convertPixelsToSVG(props.pixels);
  const css = convertPixelsToCSSBoxShadow(props.pixels, props.dotSize);

  return (
    <ul className=" grid gap-y-20 ">
      <li className=" grid gap-y-12">
        <h3 className=" text-secondary-text ">SVG</h3>
        <div className=" overflow-x-hidden">
          <div className="overflow-x-auto rounded-sm bg-invert-background px-20 py-12">
            <pre className="text-invert-text">{svg}</pre>
          </div>
        </div>
        <CopyButton copyText={svg}>SVGをコピー</CopyButton>
      </li>
      <li className=" grid gap-y-12">
        <h3 className=" text-secondary-text">CSS box-shadow</h3>
        <div className="overflow-hidden">
          <div className="overflow-x-auto rounded-sm bg-invert-background px-20 py-12">
            <pre className="text-invert-text">{css}</pre>
          </div>
        </div>
        <CopyButton copyText={css}>CSSをコピー</CopyButton>
      </li>
    </ul>
  );
}
