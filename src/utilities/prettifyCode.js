import Prettier from "prettier/standalone";
import HTMLParser from "prettier/parser-babel";

function prettifyCode(code) {
  return Prettier.format(`export default () => (${code})`, {
    parser: "babel",
    plugins: [HTMLParser],
  });
}

export default prettifyCode;
