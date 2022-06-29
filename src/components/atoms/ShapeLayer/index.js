import styles from "./ShapeLayer.module.scss";

function ShapeLayer({ shape }) {
  return <div className={styles.layer}>{shape}</div>;
}

export default ShapeLayer;
