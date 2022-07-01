const computePreviewElement = (startPoint, endPoint) => {
  const left = Math.min(startPoint.x, endPoint.x);
  const top = Math.min(startPoint.y, endPoint.y);
  const width = Math.abs(startPoint.x - endPoint.x);
  const height = Math.abs(startPoint.y - endPoint.y);

  return { top, left, height: Math.floor(height), width: Math.floor(width) };
};

export default computePreviewElement;
