window.oncontextmenu = () => false;

window.onbeforeunload = () => "";

document.addEventListener("dragover", (e) => {
  e.preventDefault();
});
