import styles from "./ColorPicker.module.scss";

function ColorPicker({ currentColor }) {
  return (
    <div className={styles["picker-wrapper"]}>
      <input type="color" className={styles.picker} />
      <span>{currentColor}</span>
    </div>
  );
}

export default ColorPicker;
