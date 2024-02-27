import { MetaFunction } from "@remix-run/react";
import { useState } from "react";
import DotColorSelect from "~/components/DotColorSelect";
import { DotColor } from "~/components/DotColorSelect/utils";
import DotSizeSelect from "~/components/DotSizeSelect";
import { DotSize } from "~/components/DotSizeSelect/utils";
import ImageUpload from "~/components/ImageUpload";
import OriginArea from "~/components/OriginArea";
import PreviewArea from "~/components/PreviewArea";
import Tabs from "~/components/Tabs";

export const meta: MetaFunction = () => {
  return [
    {
      title: "To Ten Ten",
      description: "ドット絵に変換するアプリ",
    },
  ];
};

export default function IndexPage() {
  const [originImage, setOriginImage] = useState<HTMLImageElement | undefined>(
    undefined,
  );
  const [dotSize, setDotSize] = useState<DotSize>(32);
  const [dotColor, setDotColor] = useState<DotColor>("full");

  function handleUploaded(img: HTMLImageElement) {
    setOriginImage(img);
  }

  function handleSelectDotSize(size: DotSize) {
    setDotSize(size);
  }

  function handleSelectDotColor(color: DotColor) {
    setDotColor(color);
  }

  return (
    <div className=" space-y-20">
      <div className=" mx-auto box-content grid max-w-576 gap-y-20 p-20">
        <h2 className=" sr-only">ダッシュボード</h2>
        <ImageUpload onUploaded={handleUploaded} />
        <div className=" flex flex-wrap gap-20">
          <DotSizeSelect value={dotSize} onChange={handleSelectDotSize} />
          <DotColorSelect value={dotColor} onChange={handleSelectDotColor} />
        </div>
      </div>

      <Tabs
        items={[
          {
            label: "プレビュー",
            content: (
              <>
                <h2 className="sr-only">プレビュー</h2>
                <PreviewArea
                  dotColor={dotColor}
                  dotSize={dotSize}
                  originImage={originImage}
                />
              </>
            ),
          },
          {
            label: "もとの画像",
            content: (
              <>
                <h2 className="sr-only">もとの画像</h2>
                <OriginArea dotSize={dotSize} originImage={originImage} />
              </>
            ),
          },
        ]}
        navLabel="Before Afterの切り替え"
      />
    </div>
  );
}
