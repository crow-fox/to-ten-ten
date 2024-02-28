export function getImagesByCanvas(canvas: HTMLCanvasElement) {
  return {
    png: canvas.toDataURL("image/png"),
    jpeg: canvas.toDataURL("image/jpeg"),
    webp: canvas.toDataURL("image/webp"),
  } as const;
}
