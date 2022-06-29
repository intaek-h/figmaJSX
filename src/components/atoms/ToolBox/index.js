import { useState } from "react";
import styles from "./ToolBox.module.scss";

function ToolBox({ tool }) {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <div
      className={`${
        isClicked
          ? `${styles[`box-${tool}`]} ${styles.selected}`
          : styles[`box-${tool}`]
      }`}
      onClick={() => setIsClicked(!isClicked)}
    ></div>
  );
}

export default ToolBox;
