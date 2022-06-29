import ToolBox from "../../atoms/ToolBox";
import styles from "./ToolPreset.module.scss";

function ToolPreset() {
  return (
    <div className={styles.preset}>
      <ToolBox tool="rectangle" />
      <ToolBox tool="ellipse" />
      <ToolBox tool="line" />
      <ToolBox tool="selector" />
      <ToolBox tool="text" />
    </div>
  );
}

export default ToolPreset;
