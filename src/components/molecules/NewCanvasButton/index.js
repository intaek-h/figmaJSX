import styles from "./NewCanvasButton.module.scss";
import HighlightedText from "../../atoms/HighlightedText";

function NewCanvasButton() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper__icon}></div>
      <HighlightedText text="new canvas" />
    </div>
  );
}

export default NewCanvasButton;
