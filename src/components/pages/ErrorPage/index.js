import styles from "./ErrorPage.module.scss";
import ErrorDescriptionText from "../../atoms/ErrorDescriptionText";
import ErrorTitleText from "../../atoms/ErrorTitleText";

function ErrorPage() {
  return (
    <div className={styles.page}>
      <ErrorTitleText />
      <ErrorDescriptionText />
    </div>
  );
}

export default ErrorPage;
