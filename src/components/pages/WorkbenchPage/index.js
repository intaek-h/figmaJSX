import styles from "./WorkbenchPage.module.scss";
import ArtBoard from "../../atoms/ArtBoard";
import LeftSideBar from "../../organisms/LeftSideBar";
import RightSideBar from "../../organisms/RightSideBar";
import Header from "../../molecules/Header";

function WorkbenchPage() {
  return (
    <>
      <Header />
      <div className={styles.workbench}>
        <LeftSideBar />
        <ArtBoard />
        <RightSideBar />
      </div>
    </>
  );
}

export default WorkbenchPage;
