import styles from "./WideInputBox.module.scss";

function WideInputBox({ title, children }) {
  return (
    <div className={styles.wrapper}>
      <span>{title}</span>
      {children}
    </div>
  );
}

export default WideInputBox;
