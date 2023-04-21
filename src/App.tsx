import { useAppStore } from "./store";
import React, { useEffect, useState } from "react";
import "./assets/index.scss";
import PaletteList from "./components/PaletteList/PaletteList";
import TextEdit from "./components/TextEdit/TextEdit";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import MonumentsList from "./components/MonumentsList/MonumentsList";
import { addBackground, addImage, addText } from "./fabricActions";
import TopPanel from "./components/TopPanel/TopPanel";
import { OrderList } from "./components/OrderList/OrderList";
import { OrderForm } from "./components/OrderForm/OrderForm";
// @ts-ignore //TODO Костыль с типизацией. Нужно поправить
import { ReactComponent as PrintIcon } from "./assets/icons/print.svg";
// @ts-ignore //TODO Костыль с типизацией. Нужно поправить
import { ReactComponent as DownloadIcon } from "./assets/icons/download.svg";
// @ts-ignore //TODO Костыль с типизацией. Нужно поправить
import { ReactComponent as CloseIcon } from "./assets/icons/close.svg";

import { SendFields } from "./types/types";

function App() {
  const fetchCategoriesList = useAppStore((state) => state.fetchCategoriesList);
  const fetchShopData = useAppStore((state) => state.fetchShopData);
  const currentMonument = useAppStore((state) => state.currentMonument);
  const clearOrderList = useAppStore((state) => state.clearOrderList);
  const orderList = useAppStore((state) => state.orderList);
  const removeFromOrderList = useAppStore((state) => state.removeFromOrderList);
  const currentFont = useAppStore((state) => state.currentFont);
  const getFileB64 = useAppStore((state) => state.getFileB64);
  const { selectedObjects, editor, onReady } = useFabricJSEditor();

  const [mobileSidebarToggle, SetMobileSidebarToggle] = useState(false)

  const selectImage = (url: string) => {
    getFileB64(
      url,
      // @ts-ignore
      function (myBase64) {
        addImage(editor, myBase64);
      }
    );
      SetMobileSidebarToggle(!mobileSidebarToggle)
  };
  const addTextHandler = () => {
    addText(currentFont, editor);
    SetMobileSidebarToggle(!mobileSidebarToggle)
  };

  const printCanvas = () => {
    let printWin = window.open("", "", "");
    let dataUrl = editor?.canvas.toDataURL();
    printWin?.document.write('<img src="' + dataUrl + '">');
    // printWin?.focus()
    setTimeout(() => {
      printWin?.document.execCommand("print");
      printWin?.close();
    }, 500);
  };

  const removeHandler = (index?: number) => {
    // @ts-ignore
    if (index) editor?.canvas.setActiveObject(editor?.canvas.item(index));
    let activeObject = editor?.canvas.getActiveObjects();
    let objects = editor?.canvas.getObjects() || [];
    if (!activeObject) return;
    if (confirm("Вы точно хотите удалить объект?")) {
      removeFromOrderList(index ? index : objects.indexOf(activeObject[0]));
      editor?.canvas.discardActiveObject();
      editor?.canvas.remove(...activeObject);
    }
  };

  const removeAllHandler = () => {
    let objects = editor?.canvas.getObjects() || [];
    if (confirm("Вы точно хотите удалить все объекты?")) {
      clearOrderList();
      objects.forEach((el, index) => {
        editor?.canvas.remove(el);
      });
    }
  };

  function saveImage() {
    if (!editor) return;
    let a = document.createElement("a");
    document.body.appendChild(a);
    a.href = editor.canvas.toDataURL({
      format: "png",
      quality: 0.8,
    });
    a.download = "canvas.png";
    a.click();
    a.remove();
  }
  function getImage() {
    return editor?.canvas.toDataURL({
      format: "png",
      quality: 0.8,
    });
  }

  useEffect(() => {
    fetchShopData();
    fetchCategoriesList();

    let canvasDize: number = 400;
    if (window.matchMedia("(min-width: 600px)")) {
      canvasDize = 500;
    }

    editor?.canvas.setHeight(canvasDize);
    editor?.canvas.setWidth(canvasDize);
  }, []);
  const baseUrl = useAppStore((state) => state.baseUrl);
  useEffect(() => {
    getFileB64(
      `${baseUrl}/files/${currentMonument.image}`,
      // @ts-ignore               //TODO Костыль с типизацией. Нужно поправить
      function (myBase64) {
        addBackground(editor, myBase64);
      }
    );
  }, [currentMonument]);

  const canvas:React.RefObject<HTMLInputElement> = React.createRef()
  const scrollToCanvas = () => { // @ts-ignore //TODO Костыль с типизацией. Нужно поправить
    window.scrollTo(0, canvas.current.scrollHeight - canvas.current.height)
  }
  return (
    <div className="App">
      <div ref={canvas} className="b-constructor">
        <div onClick={()=>SetMobileSidebarToggle( !mobileSidebarToggle)} className="b-constructor__left-sidebar-toggler">Добавить изображение</div>
        <div className={'b-constructor__left-sidebar '+(mobileSidebarToggle ? 'b-constructor__left-sidebar--toggle': '')}>
          <div onClick={()=>SetMobileSidebarToggle( !mobileSidebarToggle)} className="b-constructor__left-sidebar-close-btn"><CloseIcon/></div>
          <TextEdit addTextHandler={addTextHandler} />
          <MonumentsList scrollToCanvas={scrollToCanvas} setMobileSidebarToggle={SetMobileSidebarToggle} />
          <PaletteList scrollToCanvas={scrollToCanvas} selectImage={selectImage} />
        </div>
        <div className="b-constructor__work-space">
          <TopPanel
            removeHandler={removeHandler}
            removeAllHandler={removeAllHandler}
            isActiveObjects={!!(selectedObjects && selectedObjects.length > 0)}
            isObjects={true} //TODO Заглушка.
          />
          <FabricJSCanvas className="" onReady={onReady} />
        </div>
        <div className="b-constructor__right-sidebar">
          <div className="b-constructor__right-sidebar-wrapper">
            <OrderList removeHandler={removeHandler} />
            <OrderForm getImage={getImage} disabled={orderList.length === 0} />
            <div className="sidebar-button-wrapper">
              <button
                className="b-constructor__download-btn"
                onClick={saveImage}
                disabled={orderList.length === 0}
              >
                <DownloadIcon />
                Скачать
              </button>
              <button
                className="b-constructor__print-btn"
                onClick={() => printCanvas()}
                disabled={orderList.length === 0}
              >
                <PrintIcon />
                На печать
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
