import FontSizeInputField from "../../atoms/FontSizeInputField";
import styles from "./FontSizeInputBox.module.scss";

function FontSizeInputBox() {
  return (
    <div className={styles.wrapper}>
      <span>Font Size</span>
      <FontSizeInputField />
    </div>
  );
}

export default FontSizeInputBox;
