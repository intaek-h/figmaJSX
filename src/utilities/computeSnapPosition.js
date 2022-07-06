function computeSnapPosition(snappables, pointA, pointB, pointC) {
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

  let nearestDistanceFromPointC = Number.MAX_SAFE_INTEGER;
  let snappablePositionFromPointC;

  snappables.forEach((position) => {
    const distance = Math.abs(position - pointC);

    nearestDistanceFromPointC = Math.min(nearestDistanceFromPointC, distance);

    if (nearestDistanceFromPointC === distance) {
      snappablePositionFromPointC = position;
    }
  });

  const nearestSnappablePosition = Math.min(
    nearestDistanceFromPointA,
    nearestDistanceFromPointB,
    nearestDistanceFromPointC
  );

  if (nearestSnappablePosition === nearestDistanceFromPointA)
    return snappablePositionFromPointA;

  if (nearestSnappablePosition === nearestDistanceFromPointB)
    return snappablePositionFromPointB;

  if (nearestSnappablePosition === nearestDistanceFromPointC)
    return snappablePositionFromPointC;
}
export default computeSnapPosition;
