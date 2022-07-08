import styles from "./Header.module.scss";
import ProjectTitleInput from "../../atoms/ProjectTitleInput";
import DropDownMenu from "../../atoms/DropDownMenu";
import ExportButton from "../../atoms/ExportButton";
import ImportButton from "../../atoms/ImportButton";
import AutoSaveButton from "../../atoms/AutoSaveButton";

function Header() {
  return (
    <div className={styles.header}>
      <ProjectTitleInput />
      <div className={styles["right-side"]}>
        <AutoSaveButton />
        <ImportButton />
        <ExportButton />
        <DropDownMenu />
      </div>
    </div>
  );
}

export default Header;
