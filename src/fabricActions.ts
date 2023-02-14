import { FabricJSEditor } from "fabricjs-react";
import { fabric } from "fabric";

export const addBackground = (editor?: FabricJSEditor, url?: string) => {
  if (!editor || !fabric || !url) {
    return;
  }
  fabric.Image.fromURL(url, (image) => {
    editor.canvas.setBackgroundImage(
      image,
      editor.canvas.renderAll.bind(editor.canvas),
      {
        scaleX:
          editor.canvas.width && image.width
            ? editor.canvas.width / image.width
            : 0,
        scaleY:
          editor.canvas.height && image.height
            ? editor.canvas.height / image.height
            : 0,
      }
    );
  });
};
export const addImage = (editor?: FabricJSEditor, url?: string) => {
  if (!editor || !fabric || !url) {
    return;
  }
  fabric.Image.fromURL(url, function (oImg) {
    editor?.canvas.add(oImg);
  });
};
