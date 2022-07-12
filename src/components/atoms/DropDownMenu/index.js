import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  selectCurrentScale,
  setCurrentScale,
} from "../../../features/utility/utilitySlice";
import styles from "./DropDownMenu.module.scss";

const ZOOM_LEVELS = [
  { level: "100%", value: 1 },
  { level: "zoom out", value: 0.9 },
];

function DropDownMenu() {
  const dispatch = useDispatch();

  const currentScale = useSelector(selectCurrentScale);

  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (zoom) => () => {
    setIsOpen(false);
    dispatch(setCurrentScale(zoom.value));
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <button
          className={
            isOpen ? `${styles.button} ${styles["is-open"]}` : styles.button
          }
          onClick={() => setIsOpen(!isOpen)}
        >
          {Math.floor(currentScale * 100)} %
          <span className="material-symbols-outlined">expand_more</span>
        </button>
        <nav
          className={
            isOpen ? `${styles.dropdown} ${styles["is-open"]}` : styles.dropdown
          }
        >
          <ul>
            {ZOOM_LEVELS.map((zoom, i) => (
              <li onClick={handleClick(zoom)} key={i}>
                {zoom.level}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default DropDownMenu;
