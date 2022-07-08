import styles from "./ImportButton.module.scss";

function ImportButton() {
  return (
    <>
      <label htmlFor="file" className={styles.button}>
        Import
      </label>
      <input
        id="file"
        type="file"
        style={{ display: "none" }}
        onChange={() => {}}
      />
    </>
  );
}

export default ImportButton;
