window.oncontextmenu = () => false;

document.addEventListener("dragover", function (e) {
  e.preventDefault();
});

window.onbeforeunload = () => "";
