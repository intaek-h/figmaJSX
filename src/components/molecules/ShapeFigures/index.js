import styles from "./ShapeFigures.module.scss";
import FigureInput from "../../atoms/FigureInput";
import figures from "../../../constants/figures";

function ShapeFigures() {
  return (
    <div className={styles.wrapper}>
      {figures.map((figure) => (
        <FigureInput figure={figure} key={figure} />
      ))}
    </div>
  );
}

export default ShapeFigures;
