import { useAppStore } from "./store";
import { useEffect } from "react";
import "./assets/index.scss";
import PaletteList from "./components/PaletteList/PaletteList";
import WorkSpace from "./components/WorkSpace/WorkSpace";
import TextEdit from "./components/TextEdit/TextEdit";
import classes from "./components/WorkSpace/WorkSpace.module.scss";
import {
  FabricJSCanvas,
  FabricJSEditor,
  useFabricJSEditor,
} from "fabricjs-react";
import { fabric } from "fabric";
import MonumentsList from "./components/MonumentsList/MonumentsList";
import { addBackground } from "./fabricActions";

function App() {
  const fetchPaletteList = useAppStore((state) => state.fetchPaletteList);
  const fetchCategoriesList = useAppStore((state) => state.fetchCategoriesList);
  const fetchMonumentsList = useAppStore((state) => state.fetchMonumentsList);
  const currentMonument = useAppStore((state) => state.currentMonument);

  const { editor, onReady } = useFabricJSEditor();

  useEffect(() => {
    fetchPaletteList();
    fetchCategoriesList();
    fetchMonumentsList();

    let canvasDize: number = 350;
    if (window.matchMedia("(min-width: 600px)")) {
      canvasDize = 500;
    }
    editor?.canvas.setHeight(canvasDize);
    editor?.canvas.setWidth(canvasDize);
  }, []);

  useEffect(() => {
    addBackground(editor, "http://localhost:3000" + currentMonument.image);
  }, [currentMonument]);

  useEffect(() => {
    editor?.addCircle();
  }, []);
  return (
    <div className="App">
      <div className="b-constructor">
        <div className="b-constructor__sidebar">
          <TextEdit />
          <MonumentsList />
          <PaletteList />
        </div>
        <div className="b-constructor__work-space">
          <div className={classes.root}>
            <FabricJSCanvas onReady={onReady} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
