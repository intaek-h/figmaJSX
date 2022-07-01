import styles from "./NewCanvasButton.module.scss";
import NewCanvasText from "../../atoms/NewCanvasText";

function NewCanvasButton() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper__icon}></div>
      <NewCanvasText text="create new canvas" />
    </div>
  );
}

export default NewCanvasButton;
