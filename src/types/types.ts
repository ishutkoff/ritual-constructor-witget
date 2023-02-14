export interface PaletteItem {
  id: number;
  name: string;
  category: number;
  image: string;
}

export interface CategoryItem {
  id: number;
  name: string;
}

export interface Monument {
  id?: number;
  name?: string;
  image?: string;
}
