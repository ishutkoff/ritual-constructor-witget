export interface PaletteItem {
  _id: number;
  title: string;
  categoryId: number;
  image: string;
}

export interface CategoryItem {
  _id: number;
  title: string;
}

export interface SendFields {
  name: string;
  phone: string;
}

export interface Monument {
  _id?: number;
  title: string;
  image: string;
}

export enum CanvasObjectType {
  img = "img",
  text = "text",
}

export interface CanvasObject {
  _id?: number;
  title: string;
  type: CanvasObjectType;
}
