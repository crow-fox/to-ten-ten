import { ReactNode, useState } from "react";

type Props = {
  copyText: string;
  children: ReactNode;
};

export default function CopyButton(props: Props) {
  const [isCopied, setIsCopied] = useState(false);

  async function handleClick() {
    await navigator.clipboard.writeText(props.copyText);
    setIsCopied(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setIsCopied((prev) => !prev);
  }

  return (
    <button
      onClick={handleClick}
      disabled={isCopied}
      className="inline-grid grid-cols-[1fr,1em] items-center gap-x-12 rounded-xl border border-secondary-border bg-primary-background px-12 py-8   text-secondary-text "
    >
      {isCopied ? "コピーしました" : props.children}
      <svg height="1em" viewBox="0 -960 960 960" width="1em">
        <path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z" />
      </svg>
    </button>
  );
}
