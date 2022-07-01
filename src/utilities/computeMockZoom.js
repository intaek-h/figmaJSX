const SCALE_FACTOR = 0.1;
const MAX_SCALE = 4;
const MINIMUM_ZOOM_OUT = 0.3;

export const computeMockZoom = (element, event, prevScale) => {
  if (typeof event.wheelDelta !== "number") {
    if (event.which === 107 || event.which === 61 || event.which === 187) {
      event.wheelDelta = 1;
    } else {
      event.wheelDelta = -1;
    }
    event.pageX = element.offsetParent.offsetWidth / 2;
    event.pageY = element.offsetParent.offsetHeight / 2;
  }
  const scrollDirection = Math.sign(event.wheelDelta);

  const innerBoardPositionFromOuterBoard = {
    x: element.scrollLeft,
    y: element.scrollTop,
  };

  const relativeCursorPosition = {
    x: event.pageX + innerBoardPositionFromOuterBoard.x,
    y: event.pageY + innerBoardPositionFromOuterBoard.y,
  };

  const zoomPosition = {
    x: relativeCursorPosition.x / prevScale,
    y: relativeCursorPosition.y / prevScale,
  };

  const requestedScale = prevScale + scrollDirection * SCALE_FACTOR * prevScale;
  let scale;

  if (requestedScale < 1) {
    scale = Math.max(MINIMUM_ZOOM_OUT, requestedScale);
  } else {
    scale = Math.max(1, Math.min(MAX_SCALE, requestedScale));
  }

  const newZoomPosition = {
    x: zoomPosition.x * scale,
    y: zoomPosition.y * scale,
  };

  const adjustedScroll = {
    x: newZoomPosition.x - event.pageX,
    y: newZoomPosition.y - event.pageY,
  };

  return { adjustedScroll, scale };
};
