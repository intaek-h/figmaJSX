import { useSelector } from "react-redux";

import { selectAllCanvas } from "../../../features/canvas/canvasSlice";
import { selectCurrentWorkingCanvasIndex } from "../../../features/utility/utilitySlice";
import HorizontalLine from "../../atoms/HorizontalLine";
import SideBar from "../../atoms/SideBar";
import TitleText from "../../atoms/TitleText";
import CanvasLayers from "../../molecules/CanvasLayers";

function LeftSideBar() {
  const canvases = useSelector(selectAllCanvas);
  const currentCanvasIndex = useSelector(selectCurrentWorkingCanvasIndex);

  const workingCanvas = canvases[currentCanvasIndex];

  return (
    <SideBar>
      <TitleText text={workingCanvas.canvasName} />
      <HorizontalLine />
      <CanvasLayers
        currentCanvasIndex={currentCanvasIndex}
        shapes={workingCanvas.children}
      />
    </SideBar>
  );
}

export default LeftSideBar;
