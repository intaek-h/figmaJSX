import styles from "./TitleText.module.scss";

function TitleText({ text }) {
  return <div className={styles.text}>{text}</div>;
}

export default TitleText;
