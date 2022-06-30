// import ToolBox from "../../atoms/ToolBox";
import { lazy, Suspense } from "react";
import MockToolBox from "../../atoms/ToolBox/MockToolBox";
import styles from "./ToolPreset.module.scss";

const ToolBox = lazy(() => import("../../atoms/ToolBox"));

function ToolPreset() {
  return (
    <div className={styles.preset}>
      <Suspense fallback={<MockToolBox />}>
        <ToolBox tool="rectangle" />
      </Suspense>
      <Suspense fallback={<MockToolBox />}>
        <ToolBox tool="ellipse" />
      </Suspense>
      <Suspense fallback={<MockToolBox />}>
        <ToolBox tool="line" />
      </Suspense>
      <Suspense fallback={<MockToolBox />}>
        <ToolBox tool="selector" />
      </Suspense>
      <Suspense fallback={<MockToolBox />}>
        <ToolBox tool="text" />
      </Suspense>
    </div>
  );
}

export default ToolPreset;
