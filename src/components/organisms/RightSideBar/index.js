import ColorPicker from "../../atoms/ColorPicker";
import CompileButton from "../../atoms/CompileButton";
import FigureInputWide from "../../atoms/FigureInputWide";
import HorizontalLine from "../../atoms/HorizontalLine";
import SideBar from "../../atoms/SideBar";
import NewCanvasButton from "../../molecules/NewCanvasButton";
import ShapeFigures from "../../molecules/ShapeFigures";
import ToolPreset from "../../molecules/ToolPreset";
import WideInputBox from "../../molecules/WideInputBox";

function RightSideBar() {
  return (
    <SideBar>
      <ToolPreset />
      <HorizontalLine />
      <NewCanvasButton />
      <HorizontalLine />
      <ShapeFigures />
      <HorizontalLine />
      <ColorPicker currentColor="#fafafa" />
      <HorizontalLine />
      <WideInputBox title="Font Size">
        <FigureInputWide />
      </WideInputBox>
      <HorizontalLine />
      <WideInputBox title="Thickness">
        <FigureInputWide />
      </WideInputBox>
      <HorizontalLine />
      <CompileButton />
    </SideBar>
  );
}

export default RightSideBar;
