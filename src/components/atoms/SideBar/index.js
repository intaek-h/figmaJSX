import styles from "./SideBar.module.scss";

function SideBar({ children }) {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar__inner}>{children}</div>
    </div>
  );
}

export default SideBar;
