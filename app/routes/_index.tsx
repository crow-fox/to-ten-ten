import Canvas from "~/components/Canvas";

export default function IndexPage() {
  return (
    <div className="grid  gap-y-4 justify-items-center ">
      <h1 className="font-bold text-2xl text-red-500">Canvas</h1>
      <Canvas />
    </div>
  );
}
