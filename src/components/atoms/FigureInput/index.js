import styles from "./FigureInput.module.scss";

function FigureInput({ figure }) {
  return (
    <div className={styles.wrapper}>
      <label htmlFor={figure} className={styles.label}>
        {figure}
      </label>
      <input type="number" name={figure} className={styles.input} />
    </div>
  );
}

export default FigureInput;
