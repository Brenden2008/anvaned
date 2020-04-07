document.getElementById('md-editor').onkeyup = function() {
  var md = this.value;
  console.log(md);
  document.getElementById("md-html").innerHTML = marked(md);
}

function insertAtCursor (el, value) {
  el.focus();
  document.execCommand('insertText', false /*no UI*/, value);
}

function insert(md) {
  switch ()
}