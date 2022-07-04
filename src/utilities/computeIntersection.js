const computeIntersection = (boxA, boxB) => {
  if (
    boxA.left <= boxB.left + boxB.width &&
    boxA.left + boxA.width >= boxB.left &&
    boxA.top <= boxB.top + boxB.height &&
    boxA.top + boxA.height >= boxB.top
  ) {
    return true;
  }

  return false;
};

export default computeIntersection;
