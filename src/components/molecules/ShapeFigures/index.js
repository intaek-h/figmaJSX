import styles from "./ShapeFigures.module.scss";
import FigureInput from "../../atoms/FigureInput";

function ShapeFigures() {
  return (
    <div className={styles.wrapper}>
      <FigureInput figure="X" />
      <FigureInput figure="Y" />
      <FigureInput figure="W" />
      <FigureInput figure="H" />
    </div>
  );
}

export default ShapeFigures;
