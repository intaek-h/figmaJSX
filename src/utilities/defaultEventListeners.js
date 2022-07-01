window.oncontextmenu = function () {
  return false;
};

document.addEventListener("dragover", function (e) {
  e.preventDefault();
});
