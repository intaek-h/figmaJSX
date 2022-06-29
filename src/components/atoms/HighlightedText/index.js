import styles from "./HighlightedText.module.scss";

function HighlightedText({ text }) {
  return <span className={styles.text}>{text}</span>;
}

export default HighlightedText;
