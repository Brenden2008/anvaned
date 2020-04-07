var editor = document.getElementById('md-editor');

editor.onkeyup = function() {
  var md = this.value;
  console.log(md);
  document.getElementById("md-html").innerHTML = marked(md);
}

function insertAtCursor(value) {
  editor.focus();
  document.execCommand('insertText', false /*no UI*/, value);
}

function insert(md) {
  switch (md) {
    case "h1":
      insertAtCursor('# ');
    case "h2":
      insertAtCursor('## ');
    case "h3":
      insertAtCursor('### ');
    case "h4":
      insertAtCursor('#### ');
    case "h5":
      insertAtCursor('##### ');
    case "h6":
      insertAtCursor('###### ');
  }
}