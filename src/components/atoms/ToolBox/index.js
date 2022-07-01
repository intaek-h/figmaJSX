import { useDispatch, useSelector } from "react-redux";

import {
  selectCurrentTool,
  setCurrentTool,
} from "../../../features/utility/utilitySlice";
import styles from "./ToolBox.module.scss";

function ToolBox({ tool }) {
  const currentTool = useSelector(selectCurrentTool);
  const dispatch = useDispatch();

  return (
    <div
      className={`${
        tool === currentTool
          ? `${styles[`box-${tool}`]} ${styles.selected}`
          : styles[`box-${tool}`]
      }`}
      onClick={() => dispatch(setCurrentTool(tool))}
    ></div>
  );
}

export default ToolBox;
