function computeSelectionBox(shapes, selectedIdxArr) {
  const result = {
    top: Number.MAX_SAFE_INTEGER,
    left: Number.MAX_SAFE_INTEGER,
    height: Number.MIN_SAFE_INTEGER,
    width: Number.MIN_SAFE_INTEGER,
  };

  shapes.forEach((obj, i) => {
    if (selectedIdxArr.includes(i)) {
      result.top = Math.min(result.top, obj.top);
      result.left = Math.min(result.left, obj.left);
      result.height = Math.max(result.height, obj.height + obj.top);
      result.width = Math.max(result.width, obj.width + obj.left);
    }
  });

  return result;
}

export default computeSelectionBox;
