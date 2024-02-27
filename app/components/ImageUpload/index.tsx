import { ChangeEvent, useId } from "react";

type Props = {
  onUploaded?: (img: HTMLImageElement) => void;
};

export default function ImageUpload(props: Props) {
  const uid = useId();

  function handleUpload(e: ChangeEvent<HTMLInputElement>) {
    // 最新のファイルを取得
    const file = e.target.files?.[e.target.files.length - 1];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();

      img.onload = () => {
        // 画像の読み込みが完了したらコールバックを実行
        props.onUploaded?.(img);
      };

      if (typeof e.target?.result !== "string") return;
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  return (
    <p className="grid gap-y-4">
      <label htmlFor={uid} className=" text-xs text-secondary-text ">
        変換したい画像のアップロード
      </label>
      <input
        id={uid}
        type="file"
        name="image"
        accept="image/jpg,image/jpeg,image/png,image/webp"
        onChange={handleUpload}
        className=" w-full cursor-pointer rounded-xl border border-secondary-border pr-8 text-secondary-text  file:mr-8 file:cursor-pointer file:rounded-l-xl  file:border-[transparent] file:bg-secondary-background file:px-8 file:py-4 file:text-primary-accent"
      />
    </p>
  );
}
