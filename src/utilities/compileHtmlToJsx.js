import HTMLtoJSX from "htmltojsx-too";

const compiler = new HTMLtoJSX({
  createClass: false,
});

function compileHtmlToJsx(HTML) {
  return compiler.convert(HTML);
}

export default compileHtmlToJsx;
