import styles from "./WorkbenchPage.module.scss";
import SideBar from "../../atoms/SideBar";
import ArtBoard from "../../atoms/ArtBoard";
import HorizontalLine from "../../atoms/HorizontalLine";
import ColorPicker from "../../atoms/ColorPicker";
import FigureInputWide from "../../atoms/FigureInputWide";
import CompileButton from "../../atoms/CompileButton";
import TitleText from "../../atoms/TitleText";
import ToolPreset from "../../molecules/ToolPreset";
import NewCanvasButton from "../../molecules/NewCanvasButton";
import ShapeFigures from "../../molecules/ShapeFigures";
import WideInputBox from "../../molecules/WideInputBox";
import CanvasLayers from "../../molecules/CanvasLayers";

function WorkbenchPage() {
  return (
    <div className={styles.workbench}>
      <SideBar>
        <TitleText text="Layers" />
        <HorizontalLine />
        <CanvasLayers />
      </SideBar>
      <ArtBoard></ArtBoard>
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
    </div>
  );
}

export default WorkbenchPage;
