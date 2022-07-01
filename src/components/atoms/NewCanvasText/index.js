import { useDispatch, useSelector } from "react-redux";

import {
  selectCurrentTool,
  setCurrentTool,
} from "../../../features/utility/utilitySlice";
import styles from "./NewCanvasText.module.scss";

function NewCanvasText({ text }) {
  const currentTool = useSelector(selectCurrentTool);
  const dispatch = useDispatch();

  return (
    <span
      className={currentTool === "canvas" ? styles.selected : styles.idle}
      onClick={() => dispatch(setCurrentTool("canvas"))}
    >
      {text}
    </span>
  );
}

export default NewCanvasText;
