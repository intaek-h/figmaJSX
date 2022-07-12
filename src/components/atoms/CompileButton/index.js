import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import {
  emptySelectedShapeIndexes,
  selectCurrentWorkingCanvasIndex,
} from "../../../features/utility/utilitySlice";
import styles from "./CompileButton.module.scss";
import CompileModal from "../CompileModal";

function CompileButton() {
  const dispatch = useDispatch();
  const workingCanvasIndex = useSelector(selectCurrentWorkingCanvasIndex);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [code, setCode] = useState("");

  const compiler = async () => {
    dispatch(emptySelectedShapeIndexes());

    const { default: compileHtmlToJsx } = await import(
      "../../../utilities/compileHtmlToJsx"
    );
    const { default: prettifyCode } = await import(
      "../../../utilities/prettifyCode"
    );

    const canvasNodeIndex = workingCanvasIndex * 2 + 1;
    const canvasNode =
      document.querySelector("#root").childNodes[1].childNodes[1].firstChild
        .childNodes[canvasNodeIndex];

    const clone = canvasNode.cloneNode(true);

    clone.removeAttribute("class");
    clone.style.position = "relative";
    clone.style.removeProperty("top");
    clone.style.removeProperty("left");
    clone.style.removeProperty("cursor");

    clone.childNodes.forEach((node) => {
      node.removeAttribute("class");
      node.removeAttribute("draggable");
      node.style.position = "absolute";
    });

    const jsxDesign = compileHtmlToJsx(clone.outerHTML);
    const prettyCode = prettifyCode(jsxDesign);

    setIsModalOpen(true);
    setCode(prettyCode);
  };

  return (
    <>
      <div className={styles.button} onClick={compiler}>
        Compile to JSX
      </div>
      {isModalOpen && (
        <CompileModal closePortal={() => setIsModalOpen(false)}>
          {code}
        </CompileModal>
      )}
    </>
  );
}

export default CompileButton;
