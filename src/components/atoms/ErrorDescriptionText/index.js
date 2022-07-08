import LOCAL_STORAGE_KEY from "../../../constants/localStorage";
import store from "../../../store/configureStore";
import styles from "./ErrorDescriptionText.module.scss";

function ErrorDescriptionText() {
  const storeData = store.getState();

  const exportData = () => {
    const link = document.createElement("a");
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(storeData)
    )}`;

    link.href = jsonString;
    link.download = `${storeData.utility.projectTitle}.json`;
    link.click();

    window.location.reload();
  };

  const saveData = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(storeData));
    window.location.reload();
  };

  const wipeData = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <div className={styles.wrapper}>
      <span className={styles.text}>
        작업물을{" "}
        <span className={styles.clickable} onClick={exportData}>
          파일로 추출하고 새로고침 하기.
        </span>
      </span>
      <span className={styles.text}>
        작업물을{" "}
        <span className={styles.clickable} onClick={saveData}>
          저장하고 새로고침 하기.
        </span>
      </span>
      <span className={styles.text}>
        작업물을{" "}
        <span className={styles.clickable} onClick={wipeData}>
          지우고 새로고침 하기.
        </span>
      </span>
      <span className={styles.text}>
        그냥{" "}
        <span className={styles.clickable} onClick={reloadPage}>
          새로고침 하기.
        </span>
      </span>
    </div>
  );
}

export default ErrorDescriptionText;
