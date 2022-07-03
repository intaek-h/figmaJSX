import ThicknessInputField from "../../atoms/ThicknessInputField";
import styles from "./ThicknessInputBox.module.scss";

function ThicknessInputBox() {
  return (
    <div className={styles.wrapper}>
      <span>Thickness</span>
      <ThicknessInputField />
    </div>
  );
}

export default ThicknessInputBox;
