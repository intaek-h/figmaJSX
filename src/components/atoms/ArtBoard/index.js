import styles from "./ArtBoard.module.scss";

function ArtBoard({ children }) {
  return (
    <div className={styles["artboard-wrapper"]}>
      <div className={styles.artboard}>{children}</div>
    </div>
  );
}

export default ArtBoard;
