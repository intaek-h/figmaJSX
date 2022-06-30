import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  selectCurrentScale,
  setCurrentScale,
} from "../features/utility/utilitySlice";
import { customizeZoom } from "../utilities/helpers";

function useMockZoom(outerRef, innerRef) {
  const currentScale = useSelector(selectCurrentScale);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!innerRef.current || !outerRef.current) return;

    const outerBoard = outerRef.current;
    const innerBoard = innerRef.current;

    const zoomWithKeyboard = (event) => {
      if (
        (event.ctrlKey || event.metaKey) &&
        (event.which === 61 ||
          event.which === 107 ||
          event.which === 173 ||
          event.which === 109 ||
          event.which === 187 ||
          event.which === 189)
      ) {
        event.preventDefault();

        const { adjustedScroll, scale } = customizeZoom(
          outerBoard,
          event,
          currentScale
        );

        innerBoard.style.transform = `scale(${scale}, ${scale})`;
        outerBoard.scrollTop = adjustedScroll.y;
        outerBoard.scrollLeft = adjustedScroll.x;
        dispatch(setCurrentScale(scale));
      }
    };

    const zoomWithWheel = function (event) {
      if (event.ctrlKey || event.metaKey) {
        event.preventDefault();

        const { adjustedScroll, scale } = customizeZoom(
          outerBoard,
          event,
          currentScale
        );

        innerBoard.style.transform = `scale(${scale}, ${scale})`;
        outerBoard.scrollTop = adjustedScroll.y;
        outerBoard.scrollLeft = adjustedScroll.x;

        dispatch(setCurrentScale(scale));
      }
    };

    innerRef.current.style.transform = `scale(${currentScale}, ${currentScale})`;

    window.addEventListener("wheel", zoomWithWheel, { passive: false });
    window.addEventListener("keydown", zoomWithKeyboard, false);
    return () => {
      window.removeEventListener("keydown", zoomWithKeyboard);
      window.removeEventListener("wheel", zoomWithWheel);
    };
  }, [currentScale, dispatch, innerRef, outerRef]);
}

export default useMockZoom;
