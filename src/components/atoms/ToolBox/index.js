import { useDispatch, useSelector } from "react-redux";

import shortcuts from "../../../constants/shortcuts";
import tools from "../../../constants/tools";
import {
  selectCurrentTool,
  setCurrentTool,
} from "../../../features/utility/utilitySlice";
import styles from "./ToolBox.module.scss";

function ToolBox({ tool }) {
  const dispatch = useDispatch();

  const currentTool = useSelector(selectCurrentTool);

  let shortcut = "";

  switch (tool) {
    case tools.RECTANGLE:
      shortcut = shortcuts.RECTANGLE_TOOL;
      break;
    case tools.ELLIPSE:
      shortcut = shortcuts.ELLIPSE_TOOL;
      break;
    case tools.LINE:
      shortcut = shortcuts.LINE_TOOL;
      break;
    case tools.SELECTOR:
      shortcut = shortcuts.SELECTOR_TOOL;
      break;
    case tools.TEXT:
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
