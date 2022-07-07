function translateFigure(figure) {
  switch (figure) {
    case "X":
      return "left";
    case "Y":
      return "top";
    case "W":
      return "width";
    case "H":
      return "height";
    default:
      return;
  }
}

export default translateFigure;
