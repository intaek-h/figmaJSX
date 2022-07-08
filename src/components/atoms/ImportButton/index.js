import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ActionCreators } from "redux-undo";

import { resetCanvas } from "../../../features/canvas/canvasSlice";
import { resetGlobalStyles } from "../../../features/globalStyles/globalStylesSlice";
import {
  resetUtility,
  utilitySliceName,
} from "../../../features/utility/utilitySlice";
import { INVALID_FILE } from "../../../constants/errors";
import styles from "./ImportButton.module.scss";
import { workbenchReducerName } from "../../../store/configureStore";

const TWO_SECONDS = 2000;

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
          !Object.prototype.hasOwnProperty.call(file, workbenchReducerName) ||
          !Object.prototype.hasOwnProperty.call(file, utilitySliceName)
        )
          throw INVALID_FILE;

        dispatch(resetCanvas(file.workbench.present.canvas));
        dispatch(resetGlobalStyles(file.workbench.present.globalStyles));
        dispatch(resetUtility(file.utility));
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
    }, TWO_SECONDS);

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
