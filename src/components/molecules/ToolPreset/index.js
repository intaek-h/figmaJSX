import { lazy, Suspense } from "react";
import { useSelector } from "react-redux";

import { selectToolPresets } from "../../../features/utility/utilitySlice";
import MockToolBox from "../../atoms/ToolBox/MockToolBox";
import styles from "./ToolPreset.module.scss";

const ToolBox = lazy(() => import("../../atoms/ToolBox"));

function ToolPreset() {
  const tools = useSelector(selectToolPresets);

  return (
    <div className={styles.preset}>
      {tools.map(
        (tool, i) =>
          i < 5 && (
            <Suspense fallback={<MockToolBox />} key={i}>
              <ToolBox tool={tool} key={i} />
            </Suspense>
          )
      )}
    </div>
  );
}

export default ToolPreset;
