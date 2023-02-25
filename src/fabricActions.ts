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
  if (!editor || !url) {
    return;
  }

  fabric.Image.fromURL(url, function (img) {
    img.scaleToWidth(120);
    img.scaleToHeight(120);
    img.setControlVisible("ml", false);
    img.setControlVisible("mb", false);
    img.setControlVisible("mr", false);
    img.setControlVisible("mt", false);
    // img.setControlVisible('mtr', false)
    editor.canvas.centerObject(img);
    editor.canvas.add(img);
    editor.canvas.renderAll();
  });
};

export const addText = (editor?: FabricJSEditor) => {
  if (!editor) {
    return;
  }
  let text = new fabric.IText("Пример надписи", {
    // fontFamily: "arial black",
    fontFamily: "Times New Roman",
    left: 100,
    top: 100,
    fontSize: 16,
  });
  text.set({ fill: "#c5c5c5" });
  text.setControlVisible("ml", false);
  text.setControlVisible("mb", false);
  text.setControlVisible("mr", false);
  text.setControlVisible("mt", false);
  editor.canvas.centerObject(text);
  editor.canvas.add(text);
};
