function Shape({ ...styles }) {
  return (
    <div
      style={{ ...styles, position: "absolute", backgroundColor: "white" }}
    />
  );
}

export default Shape;
