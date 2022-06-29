import HorizontalLine from "../../atoms/HorizontalLine";
import SideBar from "../../atoms/SideBar";
import TitleText from "../../atoms/TitleText";
import CanvasLayers from "../../molecules/CanvasLayers";

function LeftSideBar() {
  return (
    <SideBar>
      <TitleText text="Layers" />
      <HorizontalLine />
      <CanvasLayers />
    </SideBar>
  );
}

export default LeftSideBar;
