function computeSnapPosition(snappables, left, right) {
  let nearestDistanceFromLeft = Number.MAX_SAFE_INTEGER;
  let snappablePositionFromLeft;

  snappables.forEach((position) => {
    const distance = Math.abs(position - left);

    nearestDistanceFromLeft = Math.min(nearestDistanceFromLeft, distance);

    if (nearestDistanceFromLeft === distance) {
      snappablePositionFromLeft = position;
    }
  });

  let nearestDistanceFromRight = Number.MAX_SAFE_INTEGER;
  let snappablePositionFromRight;

  snappables.forEach((position) => {
    const distance = Math.abs(position - right);

    nearestDistanceFromRight = Math.min(nearestDistanceFromRight, distance);

    if (nearestDistanceFromRight === distance) {
      snappablePositionFromRight = position;
    }
  });

  if (nearestDistanceFromLeft < nearestDistanceFromRight) {
    return snappablePositionFromLeft;
  }

  return snappablePositionFromRight;
}
export default computeSnapPosition;
