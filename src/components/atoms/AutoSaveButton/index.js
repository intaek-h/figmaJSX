import { useRef, useState } from "react";

import styles from "./AutoSaveButton.module.scss";
import LOCAL_STORAGE_KEY from "../../../constants/localStorage";
import store from "../../../store/configureStore";

const DISPLAY_DURATION = 2000;
const AUTO_SAVE_INTERVAL = 20000;

function AutoSaveButton() {
  const interval = useRef();

  const [isAutoSaveOn, setIsAutoSaveOn] = useState(false);
  const [isSavedMsgDisplayed, setIsSavedMsgDisplayed] = useState(false);

  const toggleAutoSave = () => {
    if (isAutoSaveOn) {
      setIsAutoSaveOn(false);
      clearInterval(interval.current);
      return;
    }

    setIsAutoSaveOn(true);

    interval.current = setInterval(() => {
      const latestStore = store.getState();

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(latestStore));
      setIsSavedMsgDisplayed(true);

      setTimeout(() => {
        setIsSavedMsgDisplayed(false);
      }, DISPLAY_DURATION);
    }, AUTO_SAVE_INTERVAL);
  };

  return (
    <span
      className={isAutoSaveOn ? styles.active : styles.stale}
      onClick={toggleAutoSave}
    >
      {isAutoSaveOn ? "자동 저장 끄기" : "자동 저장 켜기"}
      {isAutoSaveOn && (
        <span
          className={`material-symbols-outlined ${
            isSavedMsgDisplayed ? styles["icon-visible"] : styles["icon-greyed"]
          }`}
        >
          done
        </span>
      )}
    </span>
  );
}

export default AutoSaveButton;
