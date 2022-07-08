import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import styles from "./AutoSaveButton.module.scss";
import LOCAL_STORAGE_KEY from "../../../constants/localStorage";

const TWO_SECONDS = 2000;
const TWENTY_SECONDS = 20000;

function AutoSaveButton() {
  const store = useSelector((state) => state);

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
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(store));
      setIsSavedMsgDisplayed(true);
      setTimeout(() => {
        setIsSavedMsgDisplayed(false);
      }, TWO_SECONDS);
    }, TWENTY_SECONDS);
  };

  useEffect(() => {
    if (!interval.current) return;

    clearInterval(interval.current);

    interval.current = setInterval(() => {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(store));
      setIsSavedMsgDisplayed(true);
      setTimeout(() => {
        setIsSavedMsgDisplayed(false);
      }, TWO_SECONDS);
    }, TWENTY_SECONDS);
  }, [store]);

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
