import styles from "./Header.module.scss";

function Header({ projectTitle = "untitled_project" }) {
  return (
    <div className={styles.header}>
      <span className={styles.header__title}>{projectTitle}</span>
    </div>
  );
}

export default Header;
