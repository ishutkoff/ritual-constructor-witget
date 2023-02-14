import React, { useState } from "react";
import cls from "./Monuments.module.scss";
import { useAppStore } from "../../store";
import { classNames } from "../../libs/classNames";
import MonumentListItem from "../MonumentListItem/MonumentListItem";

const MonumentsList = () => {
  const monumentsList = useAppStore((state) => state.monumentsList);
  const setCurrentMonument = useAppStore((state) => state.setCurrentMonument);

  const [collapsed, setCollapsed] = useState(false);
  const setCollapse = () => {
    setCollapsed((prevState) => !prevState);
  };

  return (
    <div className={cls.root}>
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
            onClick={() => setCurrentMonument(monument)}
            item={monument}
            key={monument.id}
          />
        ))}
      </div>
    </div>
  );
};
export default MonumentsList;
