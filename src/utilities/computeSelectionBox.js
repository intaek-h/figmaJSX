function computeSelectionBox(shapes, selectedIdxArr) {
  const result = {
    top: Number.MAX_SAFE_INTEGER,
    left: Number.MAX_SAFE_INTEGER,
    height: Number.MIN_SAFE_INTEGER,
    width: Number.MIN_SAFE_INTEGER,
  };

  shapes.forEach((shape, i) => {
    if (selectedIdxArr.includes(i)) {
      result.top = Math.min(result.top, shape.top);
      result.left = Math.min(result.left, shape.left);
      result.height = Math.max(result.height, shape.height + shape.top);
      result.width = Math.max(result.width, shape.width + shape.left);
    }
  });

  return result;
}

export default computeSelectionBox;
