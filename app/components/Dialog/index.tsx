import { ComponentProps, ReactNode, useRef } from "react";

type DialogProps = ComponentProps<"dialog">;

type Props = Omit<DialogProps, "children"> & {
  openButton: (open: () => void) => ReactNode;
  children: (close: () => void) => ReactNode;
};

export default function Dialog({
  openButton,
  className,
  children,
  ...dialogProps
}: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  function handleOpen() {
    const dialog = dialogRef.current;
    if (!dialog) {
      throw new Error("実装エラー:dialogが存在しません");
    }
    dialog.showModal();
  }

  function handleClose() {
    const dialog = dialogRef.current;
    if (!dialog) {
      throw new Error("実装エラー:dialogが存在しません");
    }
    dialog.close();
  }

  return (
    <>
      {openButton(handleOpen)}
      <dialog
        {...dialogProps}
        ref={dialogRef}
        className="  fixed  inset-0 size-full max-h-full max-w-full overflow-auto bg-[transparent] backdrop:bg-[rgba(0,0,0,0.2)] open:grid"
      >
        <div className={className}>{children(handleClose)}</div>
      </dialog>
    </>
  );
}
