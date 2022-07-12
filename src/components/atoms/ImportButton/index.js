import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ActionCreators } from "redux-undo";

import { loadCanvas } from "../../../features/canvas/canvasSlice";
import { loadGlobalStyles } from "../../../features/globalStyles/globalStylesSlice";
import {
  loadUtility,
  utilitySliceName,
} from "../../../features/utility/utilitySlice";
import { INVALID_FILE } from "../../../constants/errors";
import styles from "./ImportButton.module.scss";
import { WORKBENCH_REDUCER_NAME } from "../../../store/configureStore";

const ERROR_DURATION = 2000;

function ImportButton() {
  const dispatch = useDispatch();

  const [isError, setIsError] = useState(false);

  const handleImport = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsText(file);
    reader.onload = (e) => {
      let file;

      try {
        file = JSON.parse(e.target.result);

        if (
          !Object.prototype.hasOwnProperty.call(file, WORKBENCH_REDUCER_NAME) ||
          !Object.prototype.hasOwnProperty.call(file, utilitySliceName)
        )
          throw INVALID_FILE;

        dispatch(loadCanvas(file.workbench.present.canvas));
        dispatch(loadGlobalStyles(file.workbench.present.globalStyles));
        dispatch(loadUtility(file.utility));
        dispatch(ActionCreators.clearHistory());
      } catch {
        setIsError(true);
      }
    };
  };

  useEffect(() => {
    if (!isError) return;

    const timer = setTimeout(() => {
      setIsError(false);
    }, ERROR_DURATION);

    return () => clearTimeout(timer);
  }, [isError]);

  return (
    <>
      <label htmlFor="file" className={isError ? styles.error : styles.button}>
        Import
      </label>
      <input
        id="file"
        type="file"
        style={{ display: "none" }}
        onChange={handleImport}
      />
    </>
  );
}

export default ImportButton;
