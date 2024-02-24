import { useId } from "react";
import {
  DotColor,
  dotColors,
  isDotColor,
} from "~/components/DotColorSelect/utils";

type Props = {
  value: DotColor;
  onChange: (value: DotColor) => void;
};

export default function DotColorSelect(props: Props) {
  const uid = useId();
  return (
    <p className=" grid justify-items-start gap-y-4 ">
      <label htmlFor={uid} className=" text-xs text-secondary-text">
        ドットの色
      </label>
      <select
        id={uid}
        name="color"
        onChange={(e) => {
          const value = e.target.value;
          if (isDotColor(value)) {
            props.onChange(value);
          }
        }}
        value={props.value}
        className=" rounded-xl border border-secondary-border  bg-primary-background px-8 py-4 text-secondary-text"
      >
        {Object.keys(dotColors).map((color) => {
          if (!isDotColor(color)) return null;
          const name = dotColors[color];
          return (
            <option key={color} value={color}>
              {name}
            </option>
          );
        })}
      </select>
    </p>
  );
}
