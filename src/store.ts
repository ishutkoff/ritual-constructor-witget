import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { CategoryItem, Monument, PaletteItem } from "./types/types";
// import { fabric } from "fabric"; // this also installed on your project
// import { useFabricJSEditor } from "fabricjs-react";
interface AppStore {
  currentMonument: Monument;
  paletteList: PaletteItem[];
  categoriesList: CategoryItem[];
  monumentsList: Monument[];
  fetchMonumentsList: () => void;
  fetchPaletteList: () => void;
  fetchCategoriesList: () => void;
  setCurrentMonument: (monument: Monument) => void;
  getPalettesByCategory: (categoryId: number) => PaletteItem[];
}
const useAppStore = create<AppStore>()(
  // immer(
  devtools(
    (set, get, store) => ({
      paletteList: [],
      monumentsList: [],
      currentMonument: {},
      categoriesList: [],
      fetchPaletteList: async () => {
        const result = await fetch("http://localhost:3000/palette/");
        const json = await result.json();
        set({ paletteList: json });
      },
      fetchCategoriesList: async () => {
        const result = await fetch("http://localhost:3000/categories/");
        const json = await result.json();
        set({ categoriesList: json });
      },
      getPalettesByCategory: (categoryId: number) => {
        return get().paletteList.filter(
          (paletteItem) => paletteItem.category === categoryId
        );
      },
      fetchMonumentsList: async () => {
        const result = await fetch("http://localhost:3000/monuments/");
        const json = await result.json();
        set({ monumentsList: json });
        set({ currentMonument: json[0] });
      },
      setCurrentMonument: (monument: Monument) => {
        set({ currentMonument: monument });
      },
    }),
    {
      name: "app-storage",
    }
  )
  // )
);

export { useAppStore };
