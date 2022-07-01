import { useDispatch, useSelector } from "react-redux";

import {
  selectCurrentTool,
  setCurrentTool,
} from "../../../features/utility/utilitySlice";
import styles from "./NewCanvasText.module.scss";
import tools from "../../../constants/tools";

function NewCanvasText({ text }) {
  const currentTool = useSelector(selectCurrentTool);
  const dispatch = useDispatch();

  return (
    <span
      className={currentTool === tools.CANVAS ? styles.selected : styles.idle}
      onClick={() => dispatch(setCurrentTool(tools.CANVAS))}
    >
      {text}
    </span>
  );
}

export default NewCanvasText;
