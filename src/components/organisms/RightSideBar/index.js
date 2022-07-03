import ColorPicker from "../../atoms/ColorPicker";
import CompileButton from "../../atoms/CompileButton";
import HorizontalLine from "../../atoms/HorizontalLine";
import SideBar from "../../atoms/SideBar";
import NewCanvasButton from "../../molecules/NewCanvasButton";
import ShapeFigures from "../../molecules/ShapeFigures";
import ToolPreset from "../../molecules/ToolPreset";
import FontSizeInputBox from "../../molecules/FontSizeInputBox";
import ThicknessInputBox from "../../molecules/ThicknessInputBox";

function RightSideBar() {
  return (
    <SideBar>
      <ToolPreset />
      <HorizontalLine />
      <NewCanvasButton />
      <HorizontalLine />
      <ShapeFigures />
      <HorizontalLine />
      <ColorPicker />
      <HorizontalLine />
      <FontSizeInputBox />
      <HorizontalLine />
      <ThicknessInputBox />
      <HorizontalLine />
      <CompileButton />
    </SideBar>
  );
}

export default RightSideBar;
