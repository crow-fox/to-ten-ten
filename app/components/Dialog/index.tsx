import { ComponentProps, ReactNode, useRef } from "react";

type DialogProps = ComponentProps<"dialog">;

type Props = Omit<DialogProps, "children" | "onClick"> & {
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

  function handleOutsideClick(event: React.MouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  }

  return (
    <>
      {openButton(handleOpen)}
      {/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
      <dialog
        {...dialogProps}
        onClick={handleOutsideClick}
        ref={dialogRef}
        className="  fixed  inset-0 size-full max-h-full max-w-full overflow-auto bg-[transparent] backdrop:bg-[rgba(0,0,0,0.2)] open:grid"
      >
        {/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}

        <div className={className}>{children(handleClose)}</div>
      </dialog>
    </>
  );
}
