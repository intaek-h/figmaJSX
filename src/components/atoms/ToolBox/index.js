import { useDispatch, useSelector } from "react-redux";
import shortcuts from "../../../constants/shortcuts";

import {
  selectCurrentTool,
  setCurrentTool,
} from "../../../features/utility/utilitySlice";
import styles from "./ToolBox.module.scss";

function ToolBox({ tool }) {
  const currentTool = useSelector(selectCurrentTool);
  const dispatch = useDispatch();

  let shortcut = "";

  switch (tool) {
    case "rectangle":
      shortcut = shortcuts.RECTANGLE_TOOL;
      break;
    case "ellipse":
      shortcut = shortcuts.ELLIPSE_TOOL;
      break;
    case "line":
      shortcut = shortcuts.LINE_TOOL;
      break;
    case "selector":
      shortcut = shortcuts.SELECTOR_TOOL;
      break;
    case "text":
      shortcut = shortcuts.TEXT_TOOL;
      break;
  }

  return (
    <div
      className={`${
        tool === currentTool
          ? `${styles[`box-${tool}`]} ${styles.selected}`
          : styles[`box-${tool}`]
      }`}
      onClick={() => dispatch(setCurrentTool(tool))}
      title={`${tool} (${shortcut})`}
    ></div>
  );
}

export default ToolBox;
