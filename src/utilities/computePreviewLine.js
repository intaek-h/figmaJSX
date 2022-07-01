const computeSelectionLine = (startPoint, endPoint) => {
  const width = startPoint.x - endPoint.x > 0 ? startPoint.x - endPoint.x : 1;
  const height = startPoint.y - endPoint.y > 0 ? startPoint.y - endPoint.y : 1;

  return { height, width };
};

export default computeSelectionLine;
