import { MetaFunction } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    {
      title: "To Ten Ten",
      description: "ドット絵に変換するアプリ",
    },
  ];
};

export default function IndexPage() {
  return <h1>To Ten Ten</h1>;
}
