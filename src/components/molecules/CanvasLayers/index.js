import ShapeLayer from "../../atoms/ShapeLayer";

function CanvasLayers({ currentCanvasIndex, shapes }) {
  return (
    <>
      {shapes.map((shape, i) => (
        <ShapeLayer
          name={shape.name}
          currentCanvasIndex={currentCanvasIndex}
          currentShapeIndex={i}
          key={i}
        />
      ))}
    </>
  );
}

export default CanvasLayers;
