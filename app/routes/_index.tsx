import Canvas from "~/components/Canvas";
import "../styles/globals.css";

export default function IndexPage() {
  return (
    <div className="grid  gap-y-4 justify-items-center ">
      <h1 className="font-bold text-2xl">Canvas</h1>
      <Canvas />
    </div>
  );
}
