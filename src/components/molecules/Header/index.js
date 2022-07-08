import styles from "./Header.module.scss";
import ProjectTitleInput from "../../atoms/ProjectTitleInput";
import DropDownMenu from "../../atoms/DropDownMenu";
import ExportButton from "../../atoms/ExportButton";
import ImportButton from "../../atoms/ImportButton";
import AutoSaveButton from "../../atoms/AutoSaveButton";
import NewProjectButton from "../../atoms/NewProjectButton";

function Header() {
  return (
    <div className={styles.header}>
      <div className={styles["left-side"]}>
        <ProjectTitleInput />
        <NewProjectButton />
      </div>
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
