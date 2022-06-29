import styles from "./WorkbenchPage.module.scss";
import SideBar from "../../atoms/SideBar";
import ArtBoard from "../../atoms/ArtBoard";
import ToolBox from "../../atoms/ToolBox";
import HorizontalLine from "../../atoms/HorizontalLine";
import HighlightedText from "../../atoms/HighlightedText";
import FigureInput from "../../atoms/FigureInput";
import ColorPicker from "../../atoms/ColorPicker";
import FigureInputWide from "../../atoms/FigureInputWide";
import CompileButton from "../../atoms/CompileButton";
import ShapeLayer from "../../atoms/ShapeLayer";
import TitleText from "../../atoms/TitleText";

function WorkbenchPage() {
  return (
    <div className={styles.workbench}>
      <SideBar>
        <TitleText text="Layers" />
        <HorizontalLine />
        <ShapeLayer shape="Rectangle 1" />
        <ShapeLayer shape="Rectangle 2" />
      </SideBar>
      <ArtBoard></ArtBoard>
      <SideBar>
        <ToolBox tool="rectangle" />
        <ToolBox tool="ellipse" />
        <ToolBox tool="line" />
        <ToolBox tool="selector" />
        <ToolBox tool="text" />
        <HorizontalLine />
        <HighlightedText text="new canvas" />
        <HorizontalLine />
        <FigureInput figure="X" />
        <FigureInput figure="Y" />
        <FigureInput figure="W" />
        <FigureInput figure="H" />
        <HorizontalLine />
        <ColorPicker currentColor="#fafafa" />
        <HorizontalLine />
        <FigureInputWide />
        <HorizontalLine />
        <FigureInputWide />
        <HorizontalLine />
        <CompileButton />
      </SideBar>
    </div>
  );
}

export default WorkbenchPage;
