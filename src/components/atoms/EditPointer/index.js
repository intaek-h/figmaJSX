let position = {};

function EditPointer({ direction, ...shape }) {
  switch (direction) {
    case "n":
      position = {
        top: shape.top - 3,
        left: shape.left + shape.width / 2 - 3,
        cursor: "ns-resize",
      };
      break;
    case "e":
      position = {
        top: shape.top + shape.height / 2 - 3,
        left: shape.left + shape.width - 3,
        cursor: "ew-resize",
      };
      break;
    case "s":
      position = {
        top: shape.top + shape.height - 3,
        left: shape.left + shape.width / 2 - 3,
        cursor: "ns-resize",
      };
      break;
    case "w":
      position = {
        top: shape.top + shape.height / 2 - 3,
        left: shape.left - 3,
        cursor: "ew-resize",
      };
      break;
    case "ne":
      position = {
        top: shape.top - 3,
        left: shape.left + shape.width - 3,
        cursor: "nesw-resize",
      };
      break;
    case "nw":
      position = {
        top: shape.top - 3,
        left: shape.left - 3,
        cursor: "nwse-resize",
      };
      break;
    case "se":
      position = {
        top: shape.top + shape.height - 3,
        left: shape.left + shape.width - 3,
        cursor: "nwse-resize",
      };
      break;
    case "sw":
      position = {
        top: shape.top + shape.height - 3,
        left: shape.left - 3,
        cursor: "nesw-resize",
      };
      break;
  }

  const style = {
    top: position.top,
    left: position.left,
    width: "6px",
    height: "6px",
    backgroundColor: "#f4f7ff",
    position: "absolute",
    border: "1px solid #1673ff",
    cursor: position.cursor,
  };

  return <div style={style}></div>;
}

export default EditPointer;
