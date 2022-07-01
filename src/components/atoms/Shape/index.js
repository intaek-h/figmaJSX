import styles from "./Shape.module.scss";

function Shape({ ...shape }) {
  return <div className={styles.shape} style={{ ...shape }}></div>;
}

export default Shape;
