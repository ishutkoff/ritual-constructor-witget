import React, { useState } from "react";
import cls from "./Monuments.module.scss";
import { useAppStore } from "../../store";
import { classNames } from "../../libs/classNames";
import MonumentListItem from "../MonumentListItem/MonumentListItem";

interface MonumentListProps {
  scrollToCanvas: ()=>void
  setMobileSidebarToggle: (value:boolean)=>void
}

const MonumentsList = (props:MonumentListProps) => {
  const {scrollToCanvas, setMobileSidebarToggle} = props
  const monumentsList = useAppStore((state) => state.monumentsList);
  const setCurrentMonument = useAppStore((state) => state.setCurrentMonument);


  const [collapsed, setCollapsed] = useState(false);
  const setCollapse = () => {
    setCollapsed((prevState) => !prevState);
  };

  return (
    <div className={cls.root}>
      <h2>Форма памятника</h2>
      <div
        className={classNames(
          cls.monumentsTitle,
          { [cls.monumentsTitleOpen]: collapsed },
          []
        )}
        onClick={() => setCollapse()}
      >
        Выберите монумент
      </div>
      <div
        className={classNames(
          cls.monumentsWrapper,
          { [cls.monumentsWrapperOpen]: collapsed },
          []
        )}
      >
        {monumentsList.map((monument) => (
          <MonumentListItem
            onClick={() => {
              setCurrentMonument(monument)
              setCollapsed(false)
              scrollToCanvas()
              setMobileSidebarToggle(false)
            }
            }
            item={monument}
            key={monument._id}
          />
        ))}
      </div>
    </div>
  );
};
export default MonumentsList;
