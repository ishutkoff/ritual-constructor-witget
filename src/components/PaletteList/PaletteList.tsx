import React, { useState } from "react";
import cls from "./PaletteList.module.scss";
import { useAppStore } from "../../store";
import { classNames } from "../../libs/classNames";
import { CanvasObjectType } from "../../types/types";
import PaletteListItem from "../PaletteListItem/PaletteListItem";

interface PaletteListProps {
  selectImage: (url: string) => void;
  scrollToCanvas: () => void;
}

const PaletteList = (props: PaletteListProps) => {
  const { selectImage, scrollToCanvas } = props;
  const categoriesList = useAppStore((state) => state.categoriesList);
  const getPalettesByCategory = useAppStore(
    (state) => state.getPalettesByCategory
  );
  const addObjectToCanvas = useAppStore((state) => state.addToOrderList);
  const [currentCategory, setCurrentCategory] = useState(0);
  const selectCategory = (categoryId: number) => {
    if (currentCategory === categoryId) {
      setCurrentCategory(0);
    } else {
      setCurrentCategory(categoryId);
    }
  };
  const baseUrl = useAppStore((state) => state.baseUrl);
  return (
    <div className={cls.root}>
      <h2>Палитра изображений</h2>
      {categoriesList.map((category) => (
        <div
          className={classNames(
            "",
            { [cls.selectedCategory]: currentCategory === category._id },
            []
          )}
          key={category._id}
        >
          <div
            className={cls.categoryTitle}
            onClick={() => selectCategory(category._id)}
          >
            {" "}
            {category.title}
          </div>

          <div className={classNames(cls.paletteWrapper, {}, [])}>
            {getPalettesByCategory(category._id).map((item) => (
              <PaletteListItem
                onClick={() => {
                  addObjectToCanvas({
                    _id: item._id,
                    title: item.title,
                    type: CanvasObjectType.img,
                  });
                  selectImage(`${baseUrl}/files/${item.image}`);
                  setCurrentCategory(0)
                  scrollToCanvas()
                }}
                item={item}
                key={item._id}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
export default PaletteList;
