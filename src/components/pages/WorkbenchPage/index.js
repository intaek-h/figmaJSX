import { useSelector } from "react-redux";

import styles from "./WorkbenchPage.module.scss";
import ArtBoard from "../../atoms/ArtBoard";
import LeftSideBar from "../../organisms/LeftSideBar";
import RightSideBar from "../../organisms/RightSideBar";
import Header from "../../atoms/Header";
import { selectAllCanvas } from "../../../features/canvas/canvasSlice";
import Shape from "../../atoms/Shape";

function WorkbenchPage() {
  const canvases = useSelector(selectAllCanvas);

  const { top, left, width } = canvases[canvases.length - 1];

  return (
    <div>
      <Header />
      <div className={styles.workbench}>
        <LeftSideBar />
        <ArtBoard lastCanvasCoords={{ top, left, width }}>
          {canvases.map((canvas, i) => (
            <Shape {...canvas} key={i} />
          ))}
        </ArtBoard>
        <RightSideBar />
      </div>
    </div>
  );
}

export default WorkbenchPage;
