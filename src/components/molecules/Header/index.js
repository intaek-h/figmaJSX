import styles from "./Header.module.scss";
import ProjectTitleInput from "../../atoms/ProjectTitleInput";
import DropDownMenu from "../../atoms/DropDownMenu";

function Header() {
  return (
    <div className={styles.header}>
      <ProjectTitleInput />
      <DropDownMenu />
    </div>
  );
}

export default Header;
