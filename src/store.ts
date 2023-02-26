import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import {
  CanvasObject,
  CategoryItem,
  Monument,
  PaletteItem,
} from "./types/types";

interface AppStore {
  shopId: string;
  baseUrl: string;
  currentMonument: Monument;
  paletteList: PaletteItem[];
  categoriesList: CategoryItem[];
  monumentsList: Monument[];
  fetchShopData: () => void;
  fetchCategoriesList: () => void;
  setCurrentMonument: (monument: Monument) => void;
  addToOrderList: (object: CanvasObject) => void;
  removeFromOrderList: (index: number) => void;
  clearOrderList: () => void;
  getFileB64: (url: string, callback: () => void) => void;
  getPalettesByCategory: (categoryId: number) => PaletteItem[];
  orderList: CanvasObject[];

  fontsList: string[];
  currentFont: string;

  setCurrentFont: (font: string) => void;
}
const useAppStore = create<AppStore>()(
  immer(
    devtools(
      (set, get) => ({
        paletteList: [],
        monumentsList: [],
        shopId: localStorage.shopId,
        baseUrl: import.meta.env.VITE_URL,
        currentMonument: {
          title: "",
          image: "",
        },
        fontsList: [
          "Times New Roman",
          "Arial",
          "Cancellaresca",
          "CaslonBecker",
          "GoodVibesPro",
          "MiamaNueva",
          "SnellRoundhand",
        ],
        setCurrentFont: (font) => {
          set((state) => {
            state.currentFont = font;
          });
        },
        currentFont: "Times New Roman",
        orderList: [],
        categoriesList: [],

        fetchShopData: async () => {
          const result = await fetch(
            `${get().baseUrl}/shops/vusualizator/${get().shopId}`
          );
          const json = await result.json();
          set({ paletteList: json.sketches });
          set({ monumentsList: json.monuments });
          set({ currentMonument: json.monuments[0] });
        },
        fetchCategoriesList: async () => {
          const result = await fetch(
            `${get().baseUrl}/sketch-categories/?shop_id=${get().shopId}`
          );
          const json = await result.json();
          set({ categoriesList: json });
        },
        getPalettesByCategory: (categoryId: number) => {
          return get().paletteList.filter(
            (paletteItem) => paletteItem.categoryId === categoryId
          );
        },
        setCurrentMonument: (monument: Monument) => {
          set({ currentMonument: monument });
        },
        addToOrderList: (object: CanvasObject) => {
          set((state) => {
            state.orderList.push(object);
          });
        },
        removeFromOrderList: (index: number) => {
          set((state) => {
            state.orderList.splice(index, 1);
          });
        },
        clearOrderList: () => {
          set((state) => {
            state.orderList = [];
          });
        },

        getFileB64: async (url: string, callback: (result: any) => void) => {
          var xhr = new XMLHttpRequest();
          xhr.onload = function () {
            var reader = new FileReader();
            reader.onloadend = function () {
              callback(reader.result);
            };
            reader.readAsDataURL(xhr.response);
          };
          xhr.open("GET", url);
          xhr.responseType = "blob";
          xhr.send();
        },
      }),
      {
        name: "app-storage",
      }
    )
  )
);

export { useAppStore };
