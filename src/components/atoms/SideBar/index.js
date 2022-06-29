import styles from "./SideBar.module.scss";

function SideBar({ children }) {
  return <div className={styles.sidebar}>{children}</div>;
}

export default SideBar;
