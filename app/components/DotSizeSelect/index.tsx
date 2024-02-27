import { useId } from "react";
import { DotSize, dotSizes, isDotSize } from "~/components/DotSizeSelect/utils";

type Props = {
  value: DotSize;
  onChange: (value: DotSize) => void;
};

export default function DotSizeSelect(props: Props) {
  const uid = useId();

  return (
    <p className=" grid justify-items-start gap-y-4 ">
      <label htmlFor={uid} className=" text-xs text-secondary-text ">
        ドットのサイズ
      </label>
      <select
        id={uid}
        name="size"
        onChange={(e) => {
          const value = Number(e.target.value);
          if (isDotSize(value)) {
            props.onChange(value);
          }
        }}
        value={props.value}
        className=" rounded-xl border border-secondary-border bg-primary-background  px-8 py-4 text-secondary-text"
      >
        {dotSizes.map((size) => (
          <option key={size} value={size}>
            {size}px
          </option>
        ))}
      </select>
    </p>
  );
}
