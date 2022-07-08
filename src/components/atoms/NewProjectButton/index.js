import { useDispatch } from "react-redux";
import { ActionCreators } from "redux-undo";

import styles from "./NewProjectButton.module.scss";
import { resetCanvas } from "../../../features/canvas/canvasSlice";
import { resetGlobalStyles } from "../../../features/globalStyles/globalStylesSlice";
import { resetUtility } from "../../../features/utility/utilitySlice";

function NewProjectButton() {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(resetCanvas());
    dispatch(resetUtility());
    dispatch(resetGlobalStyles());
    dispatch(ActionCreators.clearHistory());
  };

  return (
    <span className={styles.button} onClick={handleClick}>
      New Project
    </span>
  );
}

export default NewProjectButton;
