function computeSnapPosition(snappables, pointA, pointB) {
  let nearestDistanceFromPointA = Number.MAX_SAFE_INTEGER;
  let snappablePositionFromPointA;

  snappables.forEach((position) => {
    const distance = Math.abs(position - pointA);

    nearestDistanceFromPointA = Math.min(nearestDistanceFromPointA, distance);

    if (nearestDistanceFromPointA === distance) {
      snappablePositionFromPointA = position;
    }
  });

  let nearestDistanceFromPointB = Number.MAX_SAFE_INTEGER;
  let snappablePositionFromPointB;

  snappables.forEach((position) => {
    const distance = Math.abs(position - pointB);

    nearestDistanceFromPointB = Math.min(nearestDistanceFromPointB, distance);

    if (nearestDistanceFromPointB === distance) {
      snappablePositionFromPointB = position;
    }
  });

  if (nearestDistanceFromPointA < nearestDistanceFromPointB) {
    return snappablePositionFromPointA;
  }

  return snappablePositionFromPointB;
}
export default computeSnapPosition;
