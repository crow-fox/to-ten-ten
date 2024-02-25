import * as RadixTabs from "@radix-ui/react-tabs";
import { ReactNode } from "react";

type Items = {
  label: string;
  content: ReactNode;
};

type Props = {
  navLabel: string;
  items: Items[];
};

export default function Tabs(props: Props) {
  if (props.items.length === 0) {
    return null;
  }

  if (props.items.some((item) => item.label === "")) {
    throw new Error("labelが空文字です");
  }

  const labels = props.items.map((item) => item.label);
  const uniqueLabels = new Set(labels);
  if (labels.length !== uniqueLabels.size) {
    throw new Error("labelが重複しています");
  }

  return (
    <RadixTabs.Root defaultValue={props.items[0].label} className="">
      <RadixTabs.List
        aria-label={props.navLabel}
        className=" mx-auto flex max-w-576 gap-x-32"
      >
        {props.items.map((item) => (
          <RadixTabs.Trigger
            value={item.label}
            key={item.label}
            className=" border-b-4  py-8 font-bold text-secondary-text data-[state=active]:border-b-primary-accent data-[state=inactive]:border-b-[transparent] "
          >
            {item.label}
          </RadixTabs.Trigger>
        ))}
      </RadixTabs.List>

      {props.items.map((item) => (
        <RadixTabs.Content value={item.label} key={item.label}>
          <div className="  bg-secondary-background px-20 py-32">
            <div className="mx-auto grid max-w-576 justify-center justify-items-center  ">
              {item.content}
            </div>
          </div>
        </RadixTabs.Content>
      ))}
    </RadixTabs.Root>
  );
}
