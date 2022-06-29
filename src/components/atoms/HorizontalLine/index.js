import styles from "./HorizontalLine.module.scss";

function HorizontalLine({ color }) {
  return <hr className={styles.hr} style={{ ["--color"]: color }} />;
}

export default HorizontalLine;
