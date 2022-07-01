import { useDispatch } from "react-redux";
import { createCanvas } from "../../../features/canvas/canvasSlice";
import styles from "./HighlightedText.module.scss";

function HighlightedText({ text }) {
  const dispatch = useDispatch();

  return (
    <span className={styles.text} onClick={() => dispatch(createCanvas({}))}>
      {text}
    </span>
  );
}

export default HighlightedText;
